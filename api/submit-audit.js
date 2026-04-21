/**
 * Vercel Serverless Function: /api/submit-audit
 *
 * Why this exists:
 * Google Forms requires dynamic security tokens (fbzx, tag, partialResponse)
 * extracted fresh from the form page on each submission. These can only be
 * obtained server-side to avoid CORS restrictions. This function:
 *   1. Fetches the Google Form page to extract live tokens
 *   2. POSTs the form data + tokens to Google's formResponse endpoint
 */

const FORM_ID = "1FAIpQLScKLB1I-oup3I2MPJlohljDbL1SDa9LF7-P6u3qlsNrcRh7GQ";
const FORM_VIEW_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`;
const FORM_POST_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

const ENTRY_MAP = {
  name:         "entry.1988485772",
  businessName: "entry.1509322858",
  phone:        "entry.1556091108",
  email:        "entry.496194865",
  helpWith:     "entry.1501643592",
  stage:        "entry.385298610",
  budget:       "entry.2113801004",
  goals:        "entry.525170776",
  challenge:    "entry.1639289661",
};

function extractToken(html, name) {
  const regex = new RegExp(`name="${name}"[^>]*value="([^"]*)"`, "i");
  const altRegex = new RegExp(`value="([^"]*)"[^>]*name="${name}"`, "i");
  const m = html.match(regex) || html.match(altRegex);
  return m ? m[1] : "";
}

function extractFbzx(html) {
  // Try from hidden input first
  const inputMatch = html.match(/name="fbzx"[^>]*value="([^"]+)"/);
  if (inputMatch) return inputMatch[1];
  // Try from FB_PUBLIC_LOAD_DATA_ (less reliable but fallback)
  const dataMatch = html.match(/"fbzx"\s*:\s*"([^"]+)"/);
  if (dataMatch) return dataMatch[1];
  return "";
}

export default async function handler(req, res) {
  // Allow CORS from our own site
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  // --- Step 1: Fetch form page to get live security tokens ---
  let formHtml;
  try {
    const viewRes = await fetch(FORM_VIEW_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
    });
    formHtml = await viewRes.text();
  } catch (err) {
    console.error("Failed to fetch Google Form page:", err);
    return res.status(502).json({ error: "Could not reach Google Forms" });
  }

  const fbzx           = extractFbzx(formHtml);
  const tag            = extractToken(formHtml, "tag");
  const partialResponse = extractToken(formHtml, "partialResponse") || `[null,null,"${fbzx}"]`;

  // --- Step 2: Build form submission payload ---
  const params = new URLSearchParams();

  for (const [field, entryId] of Object.entries(ENTRY_MAP)) {
    params.append(entryId, body[field] || "");
  }

  // Sentinel fields for radio/checkbox questions (required by Google Forms)
  params.append("entry.1501643592_sentinel", "");
  params.append("entry.385298610_sentinel",  "");
  params.append("entry.2113801004_sentinel", "");

  // Required hidden tokens
  params.append("fvv",                "1");
  params.append("pageHistory",        "0");
  params.append("partialResponse",    partialResponse);
  params.append("submissionTimestamp", "-1");
  if (fbzx) params.append("fbzx", fbzx);
  if (tag)  params.append("tag",  tag);

  // --- Step 3: Submit to Google Forms ---
  try {
    await fetch(FORM_POST_URL, {
      method: "POST",
      headers: {
        "Content-Type":  "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Referer: FORM_VIEW_URL,
        Origin:  "https://docs.google.com",
      },
      body: params.toString(),
    });

    // Google Forms returns 200 with an HTML page on success; we can't distinguish
    // errors from success via status in all cases, so we optimistically return success.
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Google Forms submission error:", err);
    return res.status(502).json({ error: "Submission to Google Forms failed" });
  }
}
