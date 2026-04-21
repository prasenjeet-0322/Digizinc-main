const FORM_VIEW_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfBJr82Kj5nLS2Ba0TJRFPgsTKZg_cGQsNEK1RT7cGDzaPjFw/viewform";
const FORM_SUBMISSION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfBJr82Kj5nLS2Ba0TJRFPgsTKZg_cGQsNEK1RT7cGDzaPjFw/formResponse";

const ENTRY_MAP = {
  name:    "entry.1497931030",
  phone:   "entry.1844457082",
  email:   "entry.623547362",
  service: "entry.1957790957",
  message: "entry.143834247"
};

function extractToken(html, name) {
  const regex = new RegExp(`name="${name}"[^>]*value="([^"]*)"`, "i");
  const m = html.match(regex);
  if (m) return m[1];
  const altRegex = new RegExp(`value="([^"]*)"[^>]*name="${name}"`, "i");
  const mAlt = html.match(altRegex);
  return mAlt ? mAlt[1] : "";
}

function extractFbzx(html) {
  const inputMatch = html.match(/name="fbzx"[^>]*value="([^"]+)"/i);
  if (inputMatch) return inputMatch[1];
  const dataMatch = html.match(/"fbzx"\s*:\s*"([^"]+)"/);
  if (dataMatch) return dataMatch[1];
  const scriptMatch = html.match(/\["fbzx","([^"]+)"\]/);
  if (scriptMatch) return scriptMatch[1];
  return "";
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    
    // 1. Fetch form to get tokens
    const formRes = await fetch(FORM_VIEW_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      }
    });
    const formHtml = await formRes.text();

    const fbzx = extractFbzx(formHtml);
    const tag = extractToken(formHtml, "tag");
    const partialResponse = extractToken(formHtml, "partialResponse") || `[null,null,"${fbzx}"]`;

    // 2. Prepare payload
    const params = new URLSearchParams();
    for (const [field, entryId] of Object.entries(ENTRY_MAP)) {
      params.append(entryId, body[field] || "");
    }
    
    // Sentinel for choice question
    params.append("entry.1957790957_sentinel", "");
    
    params.append("fvv", "1");
    params.append("pageHistory", "0");
    params.append("partialResponse", partialResponse);
    params.append("submissionTimestamp", "-1");
    if (fbzx) params.append("fbzx", fbzx);
    if (tag) params.append("tag", tag);

    // 3. Submit
    await fetch(FORM_SUBMISSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": FORM_VIEW_URL,
        "Origin": "https://docs.google.com"
      },
      body: params.toString()
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return res.status(500).json({ error: error.message });
  }
}

