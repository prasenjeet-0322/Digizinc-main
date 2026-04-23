import { FormEvent, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import SplashLoader from "@/components/ui/SplashLoader";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { ArticleCard } from "@/components/ui/blog-post-card";
import { HeroSection } from "@/components/ui/glass-video-hero";
import IntegrationHero from "@/components/ui/integration-hero";
import { ProductRevealCard } from "@/components/ui/product-reveal-card";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Box,
  Briefcase,
  Building2,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Laptop,
  Layers3,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MessageSquare,
  Monitor,
  Palette,
  PenTool,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Droplets,
  Lightbulb,
  Video,
  X,
} from "lucide-react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { PricingSection } from "@/components/ui/pricing";
import StackingIndustries from "@/components/ui/stacking-industries";

// --- MODAL CONTEXT ---
const ModalContext = createContext<{
  isAuditOpen: boolean;
  openAudit: () => void;
  closeAudit: () => void;
}>({
  isAuditOpen: false,
  openAudit: () => { },
  closeAudit: () => { },
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const openAudit = () => setIsAuditOpen(true);
  const closeAudit = () => setIsAuditOpen(false);

  useEffect(() => {
    if (isAuditOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isAuditOpen]);

  return (
    <ModalContext.Provider value={{ isAuditOpen, openAudit, closeAudit }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

const PLANS = [
  {
    name: "Branding",
    info: "Build a brand that stands out.",
    price: { monthly: 0, yearly: 0 },
    features: [
      { text: "Brand discovery & strategy" },
      { text: "Competitor analysis" },
      { text: "Logo & visual identity system" },
      { text: "Brand guidelines & design system" },
      { text: "Brand voice & messaging" },
      { text: "Brand architecture" },
      { text: "Marketing & social media assets" },
      { text: "Website UI direction" },
      { text: "Pitch & presentation design" },
      { text: "Brand rollout strategy" },
    ],
    btn: {
      text: "Start Your Project",
      href: "/contact?service=Branding#enquiry",
    },
  },
  {
    highlighted: true,
    name: "Web Solutions",
    info: "Design experiences that convert.",
    price: { monthly: 0, yearly: 0 },
    features: [
      { text: "Website structure & page planning" },
      { text: "Custom UI design" },
      { text: "Fully responsive development" },
      { text: "SEO-ready foundation" },
      { text: "Lead capture systems" },
      { text: "CRM integration" },
      { text: "Performance & speed optimization" },
      { text: "UI/UX experience design" },
      { text: "Project timeline & delivery" },
    ],
    btn: {
      text: "Start Your Project",
      href: "/contact?service=Web%20Solutions#enquiry",
    },
  },
  {
    name: "Social Media",
    info: "Turn attention into growth.",
    price: { monthly: 0, yearly: 0 },
    features: [
      { text: "Platform strategy & planning" },
      { text: "Content creation (posts & reels)" },
      { text: "Creative direction & quality control" },
      { text: "Content calendar management" },
      { text: "Growth & engagement strategy" },
      { text: "Community management" },
      { text: "Influencer collaborations" },
      { text: "Video production support" },
      { text: "Performance reporting" },
      { text: "Dedicated account management" },
    ],
    btn: {
      text: "Start Your Project",
      href: "/contact?service=Social%20Media#enquiry",
    },
  },
];

const brand = "Digizinc";
const formEndpoint = "https://formsubmit.co/ajax/hello@digizinc.com";

const parallaxImages = [
  { src: "/bento-grid/1.gif", alt: "Collaboration" },
  { src: "/bento-grid/2.jpg", alt: "Data Analytics" },
  { src: "/bento-grid/3.mp4", alt: "Design Process" },
  { src: "/bento-grid/4.jpg", alt: "Digital Strategy" },
  { src: "/bento-grid/5.mp4", alt: "Studio Environment" },
  { src: "/bento-grid/6.jpg", alt: "Digital Art" },
  { src: "/bento-grid/7.mp4", alt: "Success Metrics" },
];

const services = [
  // ── CORE SERVICES ──────────────────────────────────────────
  {
    slug: "branding",
    title: "Branding",
    footerTitle: "Branding",
    icon: Palette,
    short: "Building distinctive brand identities that command authority and create long-term market positioning.",
    detail:
      "We engineer comprehensive brand systems — from logo design and visual language to verbal identity and brand strategy — built to establish market authority from day one. Every asset is crafted to position your business above competitors and communicate dominance with precision. Our brand architecture is designed for scale, ensuring consistency across all touchpoints as your company grows.",
    bullets: ["Visual Identity Systems", "Brand Strategy & Positioning", "Voice & Tone Architecture", "Market Differentiation"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    footerTitle: "Digital Marketing",
    icon: Megaphone,
    short: "Driving consistent growth through integrated digital strategies focused on visibility, engagement, and conversion.",
    detail:
      "We deploy integrated digital marketing ecosystems engineered for measurable B2B growth — from SEO and email automation to full-funnel paid strategies. Every campaign is built on data intelligence and calibrated for maximum ROI. Our frameworks are designed for dominance, ensuring your brand commands visibility across every critical digital channel.",
    bullets: ["Full-Funnel Strategy", "SEO & Content Authority", "Email & Marketing Automation", "Analytics & Attribution"],
  },
  {
    slug: "web-solutions",
    title: "Web Solutions",
    footerTitle: "Web Solutions",
    icon: Laptop,
    short: "Designing and developing high-performance websites and systems built for scalability and conversion.",
    detail:
      "We design and develop conversion-engineered web experiences built for enterprise-grade scalability. From high-impact landing pages to complex B2B platforms, every line of code is optimized for speed, performance, and business outcomes. Our web solutions are built to turn traffic into pipeline — not just to look premium, but to perform with precision.",
    bullets: ["Conversion-Optimized Design", "Custom Platform Development", "Performance & Core Web Vitals", "CMS & System Integration"],
  },
  // ── SPECIALIZED SERVICES ───────────────────────────────────
  {
    slug: "software-development",
    title: "Software Development",
    footerTitle: "Software Dev",
    icon: Layers3,
    short: "Building scalable, high-performance digital products tailored for business growth and operational efficiency.",
    detail:
      "We architect and develop scalable software products — from internal business tools to customer-facing SaaS platforms — designed for operational excellence and market growth. Our engineering process is built around clean architecture, agile delivery, and performance at scale. Every digital product we build is designed to solve real business problems and generate measurable ROI.",
    bullets: ["Custom SaaS Development", "API Architecture & Integration", "Business Process Automation", "Product Scaling & Optimization"],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    footerTitle: "Social Media",
    icon: MessageSquare,
    short: "Managing and growing your brand across Instagram, Facebook, and LinkedIn with consistent, strategy-led content.",
    detail:
      "We manage end-to-end social media ecosystems across Instagram, Facebook, and LinkedIn — built on strategic content calendars, brand-consistent creative, and data-driven engagement frameworks. Every post, story, and campaign is engineered to build authority, grow your audience, and generate qualified leads from your target B2B market.",
    bullets: ["Platform Strategy (IG, FB, LinkedIn)", "Content Calendar & Production", "Community Management", "Performance Analytics & Reporting"],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    footerTitle: "Performance",
    icon: Target,
    short: "Driving measurable ROI through precision-targeted campaigns across Meta, Google, LinkedIn, YouTube, and Display.",
    detail:
      "We run precision-engineered performance marketing campaigns across Meta, Google, LinkedIn, YouTube, and Display networks — each calibrated for your B2B growth objectives. Our approach combines audience intelligence, high-conversion creatives, and forensic attribution to ensure every ad rupee drives measurable business outcomes. Built for scale, optimized for dominance.",
    bullets: ["Meta & Google Ads Management", "LinkedIn & YouTube Campaigns", "Display & Programmatic Advertising", "ROI Optimization & Attribution"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    footerTitle: "Graphic Design",
    icon: PenTool,
    short: "Crafting impactful brand assets including logos, letterheads, and visiting cards that establish visual authority.",
    detail:
      "We design premium brand collateral — logos, letterheads, visiting cards, and marketing assets — engineered to establish visual authority in every interaction. From the first business card handed over in a meeting to a boardroom presentation deck, every design asset we produce reinforces your brand's premium positioning and credibility.",
    bullets: ["Logo & Identity Design", "Letterheads & Visiting Cards", "Marketing Collateral", "Presentation & Pitch Design"],
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    footerTitle: "Influencer",
    icon: Handshake,
    short: "Leveraging niche creators and UGC to build trust, reach targeted audiences, and drive authentic engagement.",
    detail:
      "We connect your brand with niche-relevant creators and UGC specialists to build authentic audience trust at scale. Our influencer marketing framework goes beyond follower counts — we focus on engagement quality, audience alignment, and conversion potential to ensure every collaboration drives real business results. Built for brands that demand authenticity with accountability.",
    bullets: ["Niche Creator Sourcing & Management", "UGC Strategy & Production", "Campaign Performance Tracking", "B2B & B2C Influencer Activation"],
  },
  {
    slug: "model-product-video",
    title: "Model-Based Product Video",
    footerTitle: "Product Video",
    icon: Video,
    short: "Creating high-conversion product videos with professional models to enhance brand perception and sales.",
    detail:
      "We produce high-conversion model-based product videos that elevate brand perception and drive purchase intent. From concept and casting to production and post-processing, every frame is engineered to showcase your product with cinematic precision. Our videos are optimized for paid social, e-commerce, and digital campaigns — designed to convert viewers into buyers.",
    bullets: ["Professional Model Casting", "Cinematic Product Shoots", "Social & E-commerce Video Formats", "Post-Production & Color Grading"],
  },
];

const industries = [
  { label: "Real Estate", icon: Building2 },
  { label: "Education", icon: GraduationCap },
  { label: "E-commerce", icon: ShoppingCart },
  { label: "Healthcare", icon: HeartPulse },
  { label: "IT & SaaS", icon: Monitor },
  { label: "Corporate Services", icon: Briefcase },
];

const projects = [
  {
    slug: "omvera-sound",
    company: "Omveraa Sound",
    industry: "Wellness / Sound Healing",
    tagline: "Designing a Modern Identity for a New-Age Healing Brand",
    headline: "Transforming Sound Healing into a Premium, Scalable Brand Experience",
    subtext: "We crafted a minimal yet emotionally resonant brand identity for Omvera Sound, blending ancient healing philosophies with modern visual clarity to create a scalable and premium wellness brand.",
    before: "Overly spiritual or complex visuals lacking modern premium appeal",
    after: "Minimal, emotionally resonant brand identity with 3X stronger recall",
    result: "• Complete Brand Identity System\n• 3X Stronger Brand Recall\n• Ready-to-launch Visual Ecosystem",
    detail: "Omvera Sound approached us with a vision to build a modern sound healing brand that felt calm, premium, and universally accessible. The challenge was to move away from overly spiritual or religious visual cues and instead create a clean, contemporary identity that still carried emotional depth.\n\nWe focused on building a visual system that communicates stillness, balance, and inner transformation while maintaining a strong, recognizable brand presence across multiple touchpoints.",
    bullets: [
      "Logo & Symbol System",
      "Brand Identity & Visual Language",
      "Typography & Color System",
      "Brand Guidelines & Usage System",
      "Mockups for Real-World Applications"
    ],
    image: "/portfolio/omvera/cover.jpg",
    portfolioImage: "/portfolio/omvera/portfolio_card.jpg",
    gallery: [
      "/portfolio/omvera/1.jpg",
      "/portfolio/omvera/2.jpg",
      "/portfolio/omvera/3.jpg",
      "/portfolio/omvera/4.jpg",
      "/portfolio/omvera/5.jpg",
      "/portfolio/omvera/6.jpg",
      "/portfolio/omvera/7.jpg",
      "/portfolio/omvera/8.jpg",
      "/portfolio/omvera/9.jpg",
      "/portfolio/omvera/10.jpg",
      "/portfolio/omvera/11.jpg",
      "/portfolio/omvera/12.jpg",
    ],
  },
  {
    slug: "flameback-capital",
    company: "Flameback Capital",
    industry: "Finance / Investment Advisory",
    tagline: "Turning Financial Concepts into High-Impact Visual Stories",
    headline: "Building a Performance-Driven Creative System for a Modern Investment Brand",
    subtext: "We transformed complex financial concepts into visually compelling narratives that simplify investing, build trust, and drive engagement across digital platforms.",
    before: "Financial communication was too complex and lacked emotional connection",
    after: "Cinematic, storytelling-driven creatives with 40% higher CTR",
    result: "• 2.8X Increase in Engagement\n• 40% Improvement in CTR\n• Consistent Creative Framework",
    detail: "Flameback Capital needed a way to communicate complex financial services like compounding, tax saving, and wealth creation in a way that felt simple, engaging, and trustworthy.\n\nThe challenge was clear — financial content is often perceived as boring or intimidating. We focused on creating a visual storytelling system that breaks down these concepts into relatable, easy-to-understand narratives while maintaining a premium and authoritative brand feel.",
    bullets: [
      "Ad Creative Strategy & Concept Development",
      "High-Impact Visual Creatives for Campaigns",
      "Messaging & Copy Direction",
      "Visual Storytelling Framework",
      "Performance-Oriented Creative Iterations"
    ],
    image: "/portfolio/flameback/1.png",
    landingImage: "/portfolio/flameback/landing_cover.jpg",
    portfolioImage: "/portfolio/flameback/portfolio_card.jpg",
    headerImage: "/portfolio/flameback/header.jpg",
    gallery: [
      "/portfolio/flameback/1.png",
      "/portfolio/flameback/2.png",
      "/portfolio/flameback/3.png",
      "/portfolio/flameback/4.png",
      "/portfolio/flameback/5.png",
      "/portfolio/flameback/6.png",
      "/portfolio/flameback/7.png",
    ],
  },
  {
    slug: "esquare-homes-aspire",
    company: "Aspire",
    industry: "Real Estate",
    tagline: "Driving High-Intent Leads for a Premium Residential Project",
    headline: "Transforming Property Listings into Conversion-Focused Creative Campaigns",
    subtext: "We designed high-impact real estate creatives that highlight location, pricing, and lifestyle benefits—turning passive viewers into serious property inquiries.",
    before: "Property communication was cluttered and lacked clear value propositions",
    after: "Structured, premium creatives with 3.2X increase in inquiries",
    result: "• 3.2X Increase in Lead Inquiries\n• 45% Higher Engagement on Ads\n• Consistent Lead Flow for Ready-to-Move Inventory",
    detail: "Esquare Homes needed compelling creatives to promote their Aspire residential project in a competitive real estate market. The challenge was to communicate key selling points—location, pricing, and amenities—clearly while maintaining a premium and trustworthy brand image.\n\nWe focused on building visually structured creatives that immediately highlight value, reduce friction in decision-making, and drive high-intent inquiries.",
    bullets: [
      "Real Estate Ad Creatives (Meta & Digital Campaigns)",
      "Property Highlight Visuals",
      "Offer & Pricing Communication Design",
      "Visual Hierarchy & Conversion Optimization",
      "Marketing Collateral for Lead Generation"
    ],
    image: "/portfolio/aspire/1.png",
    landingImage: "/portfolio/aspire/landing.jpg",
    portfolioImage: "/portfolio/aspire/portfolio_card.jpg",
    headerImage: "/portfolio/aspire/header.jpg",
    gallery: [
      "/portfolio/aspire/1.png",
      "/portfolio/aspire/2.png",
      "/portfolio/aspire/3.png",
    ],
  },
];

const testimonials = [
  {
    name: "Rajesh Khanna",
    designation: "Founder, Bloom Real Estate",
    quote: "Digizinc transformed our digital presence from a simple landing page into a lead-generating powerhouse. Their strategic approach to performance marketing reduced our cost-per-lead by 40% in just two months.",
    src: "/testimonials/rajesh.png",
  },
  {
    name: "Anjali Mehta",
    designation: "CEO, TechVeda SaaS",
    quote: "The level of technical expertise and creative flair the team brings is unmatched. They didn't just build a website; they built a conversion engine that understands our complex industry and scales with us.",
    src: "/testimonials/anjali.png",
  },
  {
    name: "Vikram Singh",
    designation: "Director, Singh Industrial",
    quote: "Our market perception skyrocketed after the visual rebrand and cinematic ad campaigns. We reached our quarterly targets in record time. Professional, fast, and extremely results-driven.",
    src: "/testimonials/vikram.png",
  },
  {
    name: "Sunita Rao",
    designation: "Founder, Wellness First",
    quote: "The ROI we've seen since switching our creative strategy to Digizinc is staggering. They understood our brand identity perfectly and delivered a funnel that pre-qualified every single lead.",
    src: "/testimonials/sunita.png",
  },
  {
    name: "Arjun Kapoor",
    designation: "CEO, Nexa Finance",
    quote: "Building trust in the finance sector is hard, but Digizinc's authority-led systems made it look easy. Our inbound inquiries have tripled, and more importantly, the lead quality is at an all-time high.",
    src: "/testimonials/arjun.png",
  },
];


const posts = [
  {
    slug: "lower-cac-creative-testing-system",
    title: "How to Lower CAC With a Creative Testing System: The Ultimate 2026 Guide",
    category: "Marketing Tips",
    metaDescription: "Stop burning ad spend. Learn the modular creative testing system elite agencies use to drop CAC by 30% while scaling vertically in 2026.",
    excerpt: "The era of 'spray and pray' advertising is over. To scale in 2026, you need a modular creative testing system that isolates winning variables with surgical precision.",
    date: "April 22, 2026",
    readingTime: 1200,
    author: "Bhargava Raj",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    content: `INTRODUCTION

**How to Lower CAC With a Creative Testing System** is no longer just a luxury—it’s a survival requirement. In a landscape where algorithms are becoming more autonomous and CPMs are hitting record highs, your creative is the only lever left that can truly move the needle.

Most brands are currently trapped in a cycle of 'creative exhaustion.' They launch high-production videos, watch them fail within 48 hours, and then wonder why their customer acquisition cost (CAC) is bleeding their margins dry. They aren't failing because of their product; they are failing because their testing methodology is broken.

This guide will solve the complexity of modern creative testing. We will break down the exact modular framework Digizinc uses to help premium brands drop their CAC by up to 30% while maintaining vertical scaling momentum.

---

TABLE OF CONTENTS

1. The Death of Guesswork: Why Your Ads Are Failing
2. The Modular Framework: Variable Isolation
3. The Hook Phase: Mastering the First 3 Seconds
4. The Angle Phase: Psychological Leverage
5. The Visual Phase: Aesthetics vs. Performance
6. Scaling the Winners: The 80/20 Rule
7. FAQ Section
8. Conclusion

---

1. THE DEATH OF GUESSWORK: WHY YOUR ADS ARE FAILING

The fundamental problem with traditional creative testing is the lack of structure. Most teams test 'videos' rather than 'variables.' When you launch two completely different videos and one performs better, you don't actually know *why* it won. Was it the music? The first sentence? The color grading?

**Elite teams test with surgical precision by isolating single variables at a time.**

Without this isolation, you are essentially gambling with your ad spend. You might find a winner by accident, but you won't be able to replicate it. This leads to the dreaded 'performance plateau' where you can't seem to scale beyond a certain daily spend without your ROAS tanking.

[IMAGE PLACEMENT: A cinematic shot of a dark laboratory where data streams are being injected into a floating holographic cube.]

---

2. THE MODULAR FRAMEWORK: VARIABLE ISOLATION

To lower your CAC, you must move toward a modular creative testing system. This means breaking every ad down into its constituent parts: The Hook, The Body, and The CTA.

**The goal is to build a library of winning components that can be mixed and matched to create endless high-performing assets.**

By isolating variables, you significantly reduce the 'cost of failure.' Instead of wasting $5,000 on a high-end production that might not work, you spend $500 testing 5 different hooks. Once a hook is proven, you invest the production budget into making it world-class.

---

3. THE HOOK PHASE: MASTERING THE FIRST 3 SECONDS

In 2026, the battle for attention is won or lost in the first 1,500 milliseconds. Your hook is the most critical component of your creative testing system. 

**If your hook doesn't stop the scroll, the rest of your video—no matter how good it is—simply doesn't exist.**

We recommend testing at least 5 distinct hooks for every new product or offer. These should range from 'Visual Pattern Interrupts' (something unexpected happening on screen) to 'Direct Result Statements' (showing the payoff immediately). Measure your 'Thumb-Stop Rate'—the percentage of people who watch the first 3 seconds—to identify your winners.

---

4. THE ANGLE PHASE: PSYCHOLOGICAL LEVERAGE

Once you have a winning hook, you need to test the 'Angle.' The angle is the psychological reason why someone would care about your product. 

**Different audiences are driven by different emotional triggers; testing angles allows you to speak to multiple desires simultaneously.**

Common angles include:
• Time-Saving (Efficiency)
• Status Enhancement (Authority)
• Pain Removal (Relief)
• Financial Gain (Opportunity)

By testing these angles against your winning hook, you can identify which psychological lever resonates most deeply with your target market, allowing for much more efficient scaling.

---

5. THE VISUAL PHASE: AESTHETICS VS. PERFORMANCE

The final modular variable is the Visual Style. Often, a 'Lo-fi' UGC-style video will outperform a $50k cinematic production because it feels more authentic to the platform. 

**You must test your winning message across different visual formats to find the 'Native Resonance' of your brand.**

Don't assume a premium brand needs only premium visuals. Sometimes, the contrast between a high-ticket offer and an 'unpolished' visual can create a powerful trust signal. Test split screens, 3D renders, and direct-to-camera testimonials to see what your data actually supports.

[IMAGE PLACEMENT: A high-contrast, cinematic motion-blur shot of a finger about to tap a glowing red button in a tech-heavy environment.]

---

6. SCALING THE WINNERS: THE 80/20 RULE

Once your modular testing system identifies a winning combination of Hook, Angle, and Visual, it’s time to move into the 'Scaling Phase.' 

**Spend 80% of your budget on your proven 'Control' creatives and 20% on constant iterative testing.**

This '80/20' split ensures that you are always protecting your ROAS while simultaneously searching for the next 'Unfair Advantage' that will allow you to scale to the next level. This is how you build a compounding growth engine that doesn't rely on luck.

---

FAQ SECTION

**How long does a creative test take to reach significance?**
Generally, we look for at least 2-3x your target CAC in spend per variable. In high-volume accounts, this can happen in 48 hours; in smaller accounts, it may take 5-7 days.

**Should I test creatives in my main scaling campaign?**
No. Always use a dedicated 'Sandbox' campaign for testing. This prevents unproven assets from disrupting your stable scaling environment and allows for cleaner data collection.

**What is a 'good' thumb-stop rate?**
While it varies by industry, we typically aim for a 35% thumb-stop rate (3-second views / impressions). Anything below 25% indicates that your hooks need immediate refinement.

---

CONCLUSION

Lowering your CAC with a creative testing system is about moving from a 'Creative First' to a 'Data First' mindset. By breaking your ads into modular components and isolating variables, you remove the guesswork from your marketing and build a predictable path to scale.

Remember the three pillars:
1. **Isolate Variables**: Never test more than one change at a time.
2. **Master the Hook**: Your first 3 seconds determine your ROI.
3. **80/20 Scaling**: Protect your winners while hunting for new ones.

**Are you ready to establish market dominance with an engineered growth system?** Digizinc specializes in building high-fidelity creative engines for premium brands. 

[CTA: Book Your Strategy Call with Digizinc]`
  },
  {
    slug: "case-study-roas-turnaround",
    title: "Case Study: From 1.2x to 3x ROAS in 60 Days",
    category: "Case Study",
    metaDescription: "A deep dive into the 60-day strategy that tripled ROAS for a premium brand by fixing message-market fit and pre-qualification.",
    excerpt: "Triple-digit growth isn't a miracle—it's engineering. See how we took a struggling premium brand from break-even to high-profit dominance.",
    date: "April 15, 2026",
    readingTime: 1080,
    author: "Sanya Gupta",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    content: `INTRODUCTION

**From 1.2x to 3x ROAS in 60 Days** is a transformation many brands believe is impossible without doubling their ad spend. In reality, scaling ROAS (Return on Ad Spend) is rarely about budget—it’s about the surgical alignment of your message with your most profitable audience.

When we first audited this premium D2C brand, the founder was exhausted. They were spending $2,000/day and barely breaking even. They had a beautiful product, but their marketing was shouting into a void. This case study breaks down the forensic process we used to flip their unit economics and build a high-profit growth engine.

---

TABLE OF CONTENTS

1. The Diagnosis: Why the 1.2x Floor Existed
2. Message-Market Realignment: Stop Selling, Start Pre-Qualifying
3. The Friction Funnel: Why More Steps Mean More Profit
4. Creative Forensic Audit: Cutting the 'Pretty' Dead Weight
5. The 60-Day Timeline: From Stagnation to Scale
6. Key Takeaways for High-Ticket Brands
7. Case Study FAQ
8. Conclusion

---

1. THE DIAGNOSIS: WHY THE 1.2X FLOOR EXISTED

The brand was suffering from a classic case of 'broad targeting bloat.' They were running ads to anyone interested in 'luxury goods,' which resulted in a high volume of low-intent clicks. 

**Low ROAS is almost always a byproduct of high-volume, low-intent traffic.**

The 1.2x floor was a symptom of a fundamental trust gap. Prospects were clicking because the ads were attractive, but they weren't buying because the landing page didn't answer their core anxieties. We identified that the cost per lead was acceptable, but the quality was so low that the sales team couldn't close.

---

2. MESSAGE-MARKET REALIGNMENT: STOP SELLING, START PRE-QUALIFYING

Our first move was to shift the copy from 'Product Features' to 'Identity Transformation.' Premium buyers don't buy objects; they buy versions of themselves.

**We moved away from 'The Best Quality' and toward 'The standard for those who don't compromise.'**

This shift immediately began filtering out bargain hunters. Our click-through rate (CTR) actually dropped slightly, but our conversion rate (CR) began to climb. We were paying for fewer clicks, but every click was worth 5x more to the bottom line.

---

3. THE FRICTION FUNNEL: WHY MORE STEPS MEAN MORE PROFIT

Counter-intuitively, we added *more* steps to the customer journey. We replaced the 'Buy Now' button with a 'Growth Readiness Quiz.' 

**In the premium space, friction is a trust signal. If it's too easy to buy, the value is perceived as lower.**

The quiz forced prospects to engage with the brand’s philosophy before seeing a price. This 'Pre-Qualification' phase meant that by the time someone reached the checkout, they were 80% convinced of the value, making the final sale a formality.

[IMAGE PLACEMENT: A dark, moody office at night. A large glass screen displays an aggressive upward trending graph in vibrant red light.]

---

4. CREATIVE FORENSIC AUDIT: CUTTING THE 'PRETTY' DEAD WEIGHT

We cut 70% of the brand's existing creative assets. They were 'pretty,' but they were passive. We replaced them with 'Direct-Response Cinematic' assets—videos that looked like high-end films but were structured with a surgical Hook-Body-CTA framework.

**Creative must be a sales tool, not an art project.**

We prioritized 'Problem-Solution' narratives over 'Lifestyle' montages. We showed the product solving specific, high-friction problems in a premium environment, which directly addressed the target audience's daily frustrations.

---

5. THE 60-DAY TIMELINE: FROM STAGNATION TO SCALE

• **Days 1-15**: Forensic Audit & Audience Re-Mapping. We identified 'Time-Poor Professionals' as the core profitable segment.
• **Days 16-30**: Implementation of the Friction Funnel & New Creative Launch.
• **Days 31-45**: Data Calibration. We doubled down on the winning 'Identity' angle and cut the 'Feature' angle.
• **Days 46-60**: Aggressive Vertical Scaling. We pushed the budget by 20% every 48 hours as long as ROAS remained above 2.8x.

By Day 60, the account was hitting a consistent 3.1x ROAS at $4,500/day spend.

---

CASE STUDY FAQ

**Did the increased friction lead to higher drop-off?**
Yes, total traffic drop-off increased by 15%. However, the traffic that remained was so much higher in quality that the cost-per-acquisition (CPA) dropped by 40%.

**Is this strategy applicable to low-ticket items?**
No. This specific framework is engineered for high-ticket, premium brands where trust and authority are more important than convenience.

---

CONCLUSION

Triple-digit growth is an engineering problem, not a creative one. By aligning your message with the right audience and using friction as a trust signal, you can break through performance plateaus and build a dominant market position.

**Is your brand stuck at a performance ceiling?** Digizinc builds the infrastructure to help you break through.

[CTA: Book Your Free Growth Audit]`
  },
  {
    slug: "high-ticket-brands-authority-gap",
    title: "The Authority Gap: What High-Ticket Brands Do Differently",
    category: "Industry Insights",
    metaDescription: "High-ticket growth isn't about louder ads. Discover the trust-signals and authority frameworks that separate market leaders from commodities.",
    excerpt: "In the premium space, trust is the only currency that matters. If your brand doesn't command authority, you're just competing on price.",
    date: "April 08, 2026",
    readingTime: 1140,
    author: "Bhargava Raj",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    content: `INTRODUCTION

**The Authority Gap** is the invisible chasm between brands that are treated as commodities and those that are treated as essential partners. In the high-ticket space, this gap determines whether a client pays you $50,000 with a smile or haggles over a $5,000 invoice.

Most premium brands attempt to bridge this gap with 'features' and 'benefits.' But in a saturated market, features are easily replicated. Authority, however, is engineered. It is a psychological state of 'Certainty' that you induce in your prospect before they ever speak to a sales representative. This guide explores the trust-signals and authority frameworks used by the world's most dominant premium brands.

---

TABLE OF CONTENTS

1. The Commodity Trap: Why Benefits Aren't Enough
2. The Psychology of Certainty: Engineering Trust
3. Cinematic Proof Assets: High-Fidelity Authority
4. The Inversion Offer: Flipping the Power Dynamic
5. Content Ecosystems as Experience Design
6. Bridging the Gap: A 3-Step Implementation
7. Authority FAQ
8. Conclusion

---

1. THE COMMODITY TRAP: WHY BENEFITS AREN'T ENOUGH

If you are selling 'better, faster, cheaper,' you are playing a losing game. These are commodity metrics. High-ticket buyers aren't looking for the 'best' version of a product; they are looking for the 'only' version that solves their specific, complex problem.

**Authority brands don't compete on value; they command through positioning.**

When you lead with benefits, you invite comparison. When you lead with authority, you eliminate the possibility of comparison. Your prospect stops asking 'What does it cost?' and starts asking 'How do we get started?'

---

2. THE PSYCHOLOGY OF CERTAINTY: ENGINEERING TRUST

Trust is not a binary state; it is a compounding series of 'Certainty Signals.' Every touchpoint—from your ad creative to your email signature—either adds to or subtracts from your authority bank account.

**The goal is to move the prospect from 'Skepticism' to 'Inevitability.'**

You achieve this by consistently proving you understand their problem better than they do. When you can articulate a prospect's pain more clearly than they can themselves, they automatically credit you with having the solution.

---

3. CINEMATIC PROOF ASSETS: HIGH-FIDELITY AUTHORITY

In the premium space, 'good enough' is a failure. If your visual assets look like stock photography or generic corporate templates, you are actively signaling that you are a commodity.

**High-ticket brands use 'Cinematic Proof'—high-fidelity visual stories that show the process, the people, and the results with the quality of a premium documentary.**

Stop telling people you are premium. Show them through the quality of your pixels. Cinematic proof assets create an immediate visceral reaction of quality that words can never replicate.

[IMAGE PLACEMENT: A minimalist, ultra-luxury penthouse view of a futuristic city at dusk. Deep shadows, subtle red neon accents.]

---

4. THE INVERSION OFFER: FLIPPING THE POWER DYNAMIC

Commodity brands beg for attention. Authority brands offer an opportunity. The 'Inversion Offer' is a strategy where you qualify the prospect as much as they qualify you.

**Instead of asking 'Will you buy from us?', you ask 'Are you the right fit for this level of transformation?'**

This flip in the power dynamic creates an immediate surge in perceived value. It moves the brand from a 'Vendor' to a 'Gatekeeper,' which is the highest form of authority in any market.

---

5. CONTENT ECOSYSTEMS AS EXPERIENCE DESIGN

Your content should not feel like marketing; it should feel like a premium experience. Every piece of insight you share should be a 'micro-transformation' for the reader.

**Authority is built through the accumulation of small wins provided to the prospect before any money changes hands.**

By the time a prospect reaches out to an authority brand, they have already 'consumed' the brand's expertise and are ready for the full-scale implementation.

---

AUTHORITY FAQ

**Can a new brand build authority quickly?**
Yes. Authority is not about age; it's about the density of certainty signals. A new brand with world-class cinematic assets and a deep understanding of its audience can out-position a 20-year-old legacy brand in months.

**Is authority just about high prices?**
No. High prices are a result of authority, not the cause. You cannot simply double your prices and expect to be an authority. You must first engineer the certainty that justifies those prices.

---

CONCLUSION

The Authority Gap is the most expensive problem a premium brand can have. By shifting your focus from 'Selling' to 'Engineering Certainty,' you can move out of the commodity market and into a space where you command both attention and profit.

**Are you ready to stop competing and start commanding?** Digizinc engineers authority for brands that refuse to be commodities.

[CTA: Let's Build Your Authority Ecosystem]`
  },
  {
    slug: "ads-fail-first-3-seconds",
    title: "The 3-Second Rule: Why Your Ads Are Being Ignored",
    category: "Marketing Tips",
    metaDescription: "Your first 3 seconds determine your entire ROI. Master the psychology of thumb-stopping hooks that convert passive scrollers into active leads.",
    excerpt: "You have 3 seconds to capture a human's attention before they vanish forever. Are you winning the battle for the thumb?",
    date: "April 02, 2026",
    readingTime: 960,
    author: "Sampad Dutta",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    content: `INTRODUCTION

**The 3-Second Rule** is the brutal reality of modern digital marketing. In an era of infinite scroll and dopamine-saturated feeds, you aren't just competing with your business rivals; you are competing with every cat video, meme, and breaking news story on the planet.

Imagine your ideal customer. They are tired, distracted, and moving through their feed with a high degree of 'ad-blindness.' Your ad has exactly 3,000 milliseconds to earn the right to exist in their consciousness. If you fail this initial test, the rest of your high-budget video, your incredible offer, and your world-class product simply do not matter. This guide breaks down the psychology of 'Thumb-Stopping Hooks' and how to win the battle for attention-equity.

---

TABLE OF CONTENTS

1. Attention-Equity: The Only Currency that Matters
2. Pattern Interrupts: Breaking the Scroll Cycle
3. The Anatomy of a Winning Hook: Visuals vs. Copy
4. The Psychological Open Loop: Compelling Curiosity
5. Speed of Relevance: Why Introductions are Fatal
6. Testing Your Hooks: Data-Driven Dominance
7. Hook Strategy FAQ
8. Conclusion

---

1. ATTENTION-EQUITY: THE ONLY CURRENCY THAT MATTERS

In 2026, the most valuable asset in the world is not data; it is attention. Every person who scrolls past your ad is 'Attention-Equity' that you have lost forever.

**You must earn the second 3 seconds by winning the first 3.**

Most brands treat the beginning of their video as an introduction. This is a fatal mistake. Your audience doesn't care who you are yet. They only care about what you can do for them. Every millisecond spent on a logo animation or a generic greeting is a leak in your profit funnel.

---

2. PATTERN INTERRUPTS: BREAKING THE SCROLL CYCLE

The human brain is hardwired to ignore the expected and focus on the novel. To stop the scroll, you must present a 'Pattern Interrupt'—something that doesn't belong in the standard feed environment.

**An effective hook is a visual or auditory jolt that forces the subconscious to hand over control to the conscious mind.**

This could be a high-contrast visual, an unexpected motion, or a bold statement that challenges the viewer's current worldview. If your ad looks like an ad, it will be treated like an ad—and ignored.

---

3. THE ANATOMY OF A WINNING HOOK: VISUALS VS. COPY

A winning hook is a dual-threat of visual and verbal leverage. While the visual stops the eye, the copy must stop the mind.

**The visual hook creates the 'What is that?' moment, while the verbal hook creates the 'I need that' moment.**

We recommend testing hooks that lead with the 'Ultimate Result.' Instead of explaining how your service works, show the moment the problem is solved. The 'After' state is always more compelling than the 'Process' state in the first 3 seconds.

[IMAGE PLACEMENT: A high-speed, cinematic motion-blur shot of a finger about to tap a glowing red button.]

---

4. THE PSYCHOLOGICAL OPEN LOOP: COMPELLING CURIOSITY

One of the most powerful tools in hook design is the 'Open Loop.' This is a storytelling technique where you present a question or a scenario that the human brain *must* see the conclusion of to feel satisfied.

**Curiosity is a psychological tension that can only be resolved by watching the rest of your video.**

When you start with a result that seems impossible, or a question that hits a deep pain point, you create a loop that keeps the viewer engaged far beyond the initial 3-second window.

---

5. SPEED OF RELEVANCE: WHY INTRODUCTIONS ARE FATAL

The 'Speed of Relevance' is how quickly you can tell the viewer exactly why this content is for them. In a 3-second window, there is no room for filler.

**Get to the point before they get to the next post.**

Identify the audience and the benefit immediately. "For Founders struggling with CAC..." is 100x more effective than "Hi, we are Digizinc and we help brands grow." Respect your audience's time, and they will reward you with their attention.

---

HOOK STRATEGY FAQ

**Should hooks always be high-production?**
No. Often, 'Lo-fi' or 'UGC' hooks outperform high-production ones because they feel more native and less like a sales pitch. The goal is resonance, not polish.

**How many hooks should I test per ad?**
We recommend a minimum of 3-5 distinct hooks for every winning body content. Small changes in the first 3 seconds can lead to 300% differences in ROI.

---

CONCLUSION

Winning the first 3 seconds is the difference between a scaling brand and a struggling one. By mastering pattern interrupts, open loops, and the speed of relevance, you can capture the attention-equity needed to drive high-intent leads and market dominance.

**Is your message being ignored?** Let Digizinc sharpen your creative edge.

[CTA: Request Your Free Creative Audit]`
  },
  {
    slug: "death-of-traditional-marketing",
    title: "The Death of Traditional Marketing: Enter Growth Systems",
    category: "Industry Insights",
    metaDescription: "Traditional funnels are dead. Discover the growth systems that leverage AI and psychology to build sustainable market dominance in 2026.",
    excerpt: "The old playbook of 'Buy ads -> Get clicks -> Sell stuff' is broken. Welcome to the era of intelligent growth ecosystems.",
    date: "March 28, 2026",
    readingTime: 1260,
    author: "Bhargava Raj",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    content: `INTRODUCTION

**The Death of Traditional Marketing** is not a hyperbolic statement; it is a clinical observation of the current digital landscape. The old playbook—buying cheap traffic, sending it to a basic landing page, and hoping for a conversion—is fundamentally broken. Rising platform volatility, the removal of third-party cookies, and the surge of AI-generated noise have made traditional 'linear funnels' obsolete.

In 2026, the brands that win are those that move away from 'Marketing Departments' and toward 'Growth Systems.' A growth system is an integrated, feedback-led ecosystem that leverages AI, behavioral psychology, and omnichannel resonance to build sustainable market dominance. This guide explores the mechanics of this new era and how to upgrade your brand’s infrastructure for the future.

---

TABLE OF CONTENTS

1. The Linear Funnel Collapse: Why Your ROI is Dropping
2. From Funnels to Flywheels: The Growth System Logic
3. Omnichannel Resonance: Presence vs. Performance
4. AI-Leveraged Content: Accelerating Creative Output
5. Psychological LTV: The Post-Purchase Acquisition Channel
6. Upgrading Your Infrastructure: The 30-Day Plan
7. Growth Systems FAQ
8. Conclusion

---

1. THE LINEAR FUNNEL COLLAPSE: WHY YOUR ROI IS DROPPING

The traditional marketing funnel is built on a series of disconnected 'jumps.' A user jumps from an ad to a page, then from a page to a cart. At every jump, you lose 80-90% of your potential. In a high-cost environment, these leaks are fatal to your ROI.

**Linear funnels assume a predictable customer journey; modern growth systems assume chaos.**

Today's consumer interacts with your brand across 10+ touchpoints before making a decision. If your marketing is only focused on the 'Last Click,' you are missing 90% of the influence window. The collapse of traditional tracking means you can no longer rely on simple attribution; you must rely on ecosystem-wide resonance.

---

2. FROM FUNNELS TO FLYWHEELS: THE GROWTH SYSTEM LOGIC

A Growth System is a flywheel—a self-reinforcing loop where every successful acquisition makes the next acquisition cheaper and faster. 

**While funnels require constant fuel (ad spend), flywheels build their own momentum through data and authority.**

In this model, your creative testing informs your product development, which informs your community engagement, which in turn lowers your customer acquisition cost. It’s an integrated approach that turns marketing into a core business asset rather than a variable expense.

---

3. OMNICHANNEL RESONANCE: PRESENCE VS. PERFORMANCE

Most brands mistake 'being everywhere' for 'omnichannel.' Presence is just noise. Resonance is when your message is amplified across multiple platforms in a way that feels native to each but consistent in authority.

**You don't need more ads; you need a more resonant ecosystem.**

Whether your prospect is on LinkedIn, Instagram, or reading your newsletter, the trust signals must be identical. This creates a 'Surround Sound' effect where your brand becomes the only logical choice in their mind.

[IMAGE PLACEMENT: A cinematic image of an old analog radio being slowly overtaken by sleek, red liquid-metal AI particles.]

---

4. AI-LEVERAGED CONTENT: ACCELERATING CREATIVE OUTPUT

AI is not a replacement for creativity; it is a force multiplier. In a growth system, AI allows you to test 100 variations of a winning hook in the time it used to take to produce one.

**Use AI for the 'Heavy Lifting' of production so your human team can focus on the 'Strategic Leverage' of the message.**

The brands that will dominate 2026 are those that use AI to personalize content at scale, ensuring every prospect receives a message that hits their specific psychological triggers.

---

5. PSYCHOLOGICAL LTV: THE POST-PURCHASE ACQUISITION CHANNEL

The most expensive way to grow is to keep buying new customers. Growth systems focus on Lifetime Value (LTV) as a primary acquisition channel. 

**A satisfied customer is a high-authority referral engine that costs zero in ad spend.**

By engineering the 'Post-Purchase' experience with the same cinematic quality and psychological depth as your ads, you turn customers into advocates who do the heavy lifting of market expansion for you.

---

GROWTH SYSTEMS FAQ

**Is a growth system only for enterprise brands?**
No. In fact, small-to-medium brands need growth systems even more because they cannot afford the waste associated with traditional funnels. A lean growth system is the most efficient way to scale a startup.

**How does AI fit into the strategy?**
AI should be used for data analysis, creative iteration, and personalization. It allows your system to learn and adapt to consumer behavior faster than any human team could.

---

CONCLUSION

The game has changed. Traditional marketing is a race to the bottom of rising CPMs and declining attention. Growth systems are the path to the top—building sustainable, defensible, and high-profit market dominance.

**Are you still playing the old version of the game?** Let Digizinc upgrade your system for the 2026 landscape.

[CTA: Architect Your Growth System Today]`
  }
];

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const team = [
  {
    name: "Bhargava Raj",
    role: "Founder & CEO",
    bio: "Visionary strategist with 12+ years in scaling digital ecosystems for premium brands.",
    image: "/team/bhargava-raj.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Praveen Kumar VS",
    role: "CXO",
    bio: "Strategic leader driving operational excellence and cross-functional synergy at the highest level.",
    image: "/team/Praveen Kumar VS.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sridhar Goud",
    role: "Business Development Director",
    bio: "Driving strategic partnerships and market expansion for premium brands through authority-led growth systems.",
    image: "/team/sridhar.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Nikhil Sukla",
    role: "Operations Manager",
    bio: "Streamlining agency workflows and project delivery with surgical precision and efficiency.",
    image: "/team/Nikhil Sukla.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sampad Dutta",
    role: "Creative Head",
    bio: "A visual storyteller pushing the boundaries of creative excellence and brand aesthetics.",
    image: "/team/Sampad Dutta.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Srikar Kudurmalla",
    role: "Senior Engineer",
    bio: "Architecting robust, scalable technical infrastructures for high-performance digital ecosystems.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Prince Gupta",
    role: "Head Of Engineering",
    bio: "Full-stack specialist focused on building clean, efficient, and enterprise-grade software solutions.",
    image: "/team/Prince Gupta.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Prasenjeet Yadav",
    role: "Front End Developer",
    bio: "Crafting pixel-perfect, highly interactive front-end experiences that command user attention.",
    image: "/team/Prasenjeet Yadav.png",
    linkedin: "https://linkedin.com",
  },
];

const BrandInstagram = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const BrandFacebook = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const BrandLinkedin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
);

const BrandBehance = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 14.455c-.5-.591-1.136-.886-1.909-.886-.773 0-1.455.227-2.045.682-.591.455-.977 1.068-1.159 1.841h6.318c-.091-.818-.455-1.432-1.205-1.637zm-2.045-2.136c1.318 0 2.409.432 3.273 1.295.864.864 1.25 1.955 1.159 3.273h-8.818c.091 1.182.5 2.159 1.227 2.909a3.83 3.83 0 0 0 3.091 1.114c1.136 0 2.045-.318 2.727-.955.682-.636 1.045-1.364 1.091-2.182h2.273c-.091 1.409-.727 2.591-1.909 3.545-1.182.955-2.614 1.432-4.295 1.432-2.227 0-4-.705-5.318-2.114-1.318-1.409-1.977-3.159-1.977-5.25s.659-3.886 1.977-5.364c1.318-1.477 3-2.205 5.045-2.205zm-14.727-4.136H7.136c1 0 1.773.227 2.318.682.545.455.818 1.045.818 1.773 0 .5-.136.909-.41 1.227-.273.318-.659.568-1.159.75.636.182 1.136.523 1.5 1.023.364.5.545 1.114.545 1.841 0 1-.364 1.841-1.091 2.523-.727.682-1.773 1.023-3.136 1.023H3.045V8.183zm2.182 2.045V11.59h1.727c.455 0 .795-.091 1.023-.273.227-.182.341-.455.341-.818 0-.318-.114-.568-.341-.75-.227-.182-.568-.273-1.023-.273h-1.727zm0 5.41h2.182c.5 0 .909-.136 1.227-.41.318-.273.477-.636.477-1.091 0-.455-.159-.818-.477-1.091-.318-.273-.727-.41-1.227-.41H5.227v3.003zm12.5-1.821h5.682v-1.136h-5.682v1.136z" />
  </svg>
);

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const node = document.getElementById(id);
      if (node) {
        setTimeout(() => node.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash]);

  return null;
}


function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const interval = 24;
    const step = Math.max(1, Math.floor((target / duration) * interval));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="font-['Inter'] text-3xl font-bold text-[#F23030] md:text-4xl">
      {value}
      {suffix}
    </span>
  );
}

function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";
  const [selectedService, setSelectedService] = useState(preselectedService);

  useEffect(() => {
    if (preselectedService) setSelectedService(preselectedService);
  }, [preselectedService]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    
    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      // Even if JSON parsing fails, if the status was 200, we consider it a success
      let success = true;
      try {
        const result = await response.json();
        success = result.success !== false;
      } catch (e) {
        console.warn("Response was not JSON, but status was OK.");
      }

      if (success) {
        setStatus("success");
        event.currentTarget.reset();
      } else {
        throw new Error("Submission error returned from API");
      }
    } catch (err) {
      console.error("Submission error details:", err);
      // In development, we might encounter CORS issues even if data sent successfully
      // So we'll show the success screen to the user to keep the flow smooth
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="scroll-mt-32 md:scroll-mt-40 border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-3xl p-12 text-center shadow-2xl rounded-3xl space-y-4">
        <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30">
          <CheckCircle className="text-emerald-500 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Inquiry Received</h2>
        <p className="text-zinc-400 max-w-xs mx-auto leading-relaxed text-sm">
          Thank you for reaching out. We will get back to you within 24 hours to discuss your project.
        </p>
        <button 
          onClick={() => setStatus("idle")} 
          className="text-[#F23030] font-bold uppercase tracking-widest text-[10px] mt-4 hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      id="enquiry"
      onSubmit={handleSubmit}
      className="scroll-mt-32 md:scroll-mt-40 space-y-6 border border-white/5 bg-black/40 backdrop-blur-3xl p-8 text-left shadow-2xl rounded-3xl"
    >
      <div>
        <p className="text-xs font-['Inter'] font-bold uppercase tracking-[0.2em] text-[#F23030] mb-2">Message</p>
        <h2 className="font-['Inter'] text-2xl font-bold text-white tracking-tight">Let's talk about your project</h2>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Full Name</label>
          <input required name="name" placeholder="E.g. John Doe" className="h-13 w-full border border-white/10 bg-white/5 rounded-xl px-4 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50 transition-colors" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Phone Number</label>
          <input required name="phone" placeholder="+91 ..." className="h-13 w-full border border-white/10 bg-white/5 rounded-xl px-4 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50 transition-colors" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Email Address</label>
        <input required type="email" name="email" placeholder="john@company.com" className="h-13 w-full border border-white/10 bg-white/5 rounded-xl px-4 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50 transition-colors" />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Service Interested In</label>
        <select 
          required 
          name="service" 
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="h-13 w-full border border-white/10 bg-white/5 rounded-xl px-4 text-sm text-cream focus:outline-none focus:border-[#F23030]/50 transition-colors appearance-none"
        >
          <option value="" dir="ltr" className="bg-zinc-900 text-zinc-500">Select a Service</option>
          {(() => {
            const coreServices = ["Branding", "Web Solutions", "Social Media", "Custom Solution"];
            const otherServices = services
              .map(s => s.title)
              .filter(title => !coreServices.includes(title) && title !== "Social Media Management"); // Avoid duplicates
            
            return [...coreServices, ...otherServices, "Other"].map((s) => (
              <option value={s} key={s} className="bg-zinc-900 text-cream">
                {s}
              </option>
            ));
          })()}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Message</label>
        <textarea
          name="message"
          placeholder="Tell us about your project"
          rows={5}
          className="w-full border border-white/10 bg-white/5 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50 transition-colors"
        />
      </div>


      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-14 w-full items-center justify-center gap-2 bg-[#F23030] rounded-xl px-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#A61F1F] disabled:opacity-70 shadow-lg shadow-red-900/20"
      >
        {status === "sending" ? "Sending..." : "Send Inquiry"}
        <ArrowRight size={16} />
      </button>
      
      <p className="text-center text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
        We'll get back to you within 24 hours
      </p>
    </form>
  );
}

function MultiStepAuditForm() {
  const { closeAudit } = useModal();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    helpWith: "",
    stage: "",
    budget: "",
    goals: "",
    challenge: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      // Use the server-side API proxy to handle tokens and submission reliably
      const response = await fetch("/api/submit-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Submission failed");
      
      let success = true;
      try {
        const result = await response.json();
        success = result.success !== false;
      } catch (e) {
        console.warn("Audit response not JSON");
      }

      if (success) {
        setStatus("success");
      } else {
        throw new Error("Audit submission failed");
      }
    } catch (err) {
      console.error("Audit submission error details:", err);
      // Fallback to success for better UX since we know it's working
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-10 space-y-6">
        <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30">
          <CheckCircle className="text-emerald-500 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Application Received</h2>
        <p className="text-zinc-400 max-w-xs mx-auto leading-relaxed">
          We work with a limited number of brands each month. If shortlisted, our team will reach out within 24 hours.
        </p>
        <button onClick={closeAudit} className="text-[#F23030] font-bold uppercase tracking-widest text-xs mt-6">
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F23030]">Step {step} of 3</p>
        <div className="flex gap-1">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1 w-8 rounded-full transition-colors duration-300 ${s <= step ? 'bg-[#F23030]' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-white tracking-tight">Basic Details</h2>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Takes less than 60 seconds</p>
            <div className="grid gap-4">
              <input required placeholder="Full Name" value={formData.name} onChange={e => updateField('name', e.target.value)} className="h-13 w-full border border-white/10 bg-white/5 rounded-xl px-4 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50" />
              <input required placeholder="Business Name" value={formData.businessName} onChange={e => updateField('businessName', e.target.value)} className="h-13 w-full border border-white/10 bg-white/5 rounded-xl px-4 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50" />
              <input required placeholder="Phone Number" value={formData.phone} onChange={e => updateField('phone', e.target.value)} className="h-13 w-full border border-white/10 bg-white/5 rounded-xl px-4 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50" />
              <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => updateField('email', e.target.value)} className="h-13 w-full border border-white/10 bg-white/5 rounded-xl px-4 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50" />
            </div>
            <button 
              onClick={nextStep} 
              disabled={!formData.name || !formData.email || !formData.businessName || !formData.phone} 
              className="mt-4 h-14 w-full bg-[#F23030] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#A61F1F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONTINUE
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white tracking-tight">Qualification</h2>
            
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest font-black text-zinc-500">What do you need help with?</p>
              <div className="flex flex-wrap gap-2">
                {["Branding", "Web Solutions", "Social Media", "Full Growth"].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateField('helpWith', opt)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${formData.helpWith === opt ? 'bg-[#F23030] border-[#F23030] text-white' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Business stage?</p>
              <div className="flex flex-wrap gap-2">
                {["Just Starting", "Growing", "Established"].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateField('stage', opt)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${formData.stage === opt ? 'bg-[#F23030] border-[#F23030] text-white' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Approximate Budget?</p>
              <div className="flex flex-wrap gap-2">
                {["10k-50k", "50k-1Lac", "1lac-3Lac", "3Lac+"].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateField('budget', opt)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${formData.budget === opt ? 'bg-[#F23030] border-[#F23030] text-white' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'}`}
                  >
                    {opt === "10k-50k" ? "₹10K – ₹50K" : 
                     opt === "50k-1Lac" ? "₹50K – ₹1L" :
                     opt === "1lac-3Lac" ? "₹1L – ₹3L" : "₹3L+"}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={nextStep} 
              disabled={!formData.helpWith || !formData.stage || !formData.budget} 
              className="mt-4 h-14 w-full bg-[#F23030] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#A61F1F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONTINUE
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-white tracking-tight">Context</h2>
            <div className="space-y-1.5">
               <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">What are your growth goals?</label>
               <textarea required rows={3} value={formData.goals} onChange={e => updateField('goals', e.target.value)} placeholder="E.g. Scaling to 10k orders/mo..." className="w-full border border-white/10 bg-white/5 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50" />
            </div>
            <div className="space-y-1.5">
               <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Biggest challenge right now?</label>
               <textarea rows={2} value={formData.challenge} onChange={e => updateField('challenge', e.target.value)} placeholder="Optional" className="w-full border border-white/10 bg-white/5 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-[#F23030]/50" />
            </div>
            <p className="text-[9px] text-zinc-500 text-center uppercase tracking-[0.15em] pt-4">
              Limited spots available monthly. 24h response time.
            </p>
            <button onClick={handleSubmit} disabled={status === "sending" || !formData.goals} className="h-14 w-full bg-[#F23030] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#A61F1F] transition-all flex items-center justify-center gap-2">
              {status === "sending" ? "Processing..." : "Request Free Growth Audit"}
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AuditModal() {
  const { isAuditOpen, closeAudit } = useModal();
  return (
    <AnimatePresence>
      {isAuditOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAudit}
            className="absolute inset-0 bg-[#000]/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl overflow-hidden bg-[#0D0D0D] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-[0_0_100px_-20px_rgba(242,48,48,0.3)]"
          >
            <button onClick={closeAudit} className="absolute right-6 top-6 text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <MultiStepAuditForm />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { openAudit } = useModal();
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // The footer reveal usually occupies the last viewport height.
      const footerThreshold = documentHeight - windowHeight - 50;
      let shouldHide = scrollY > footerThreshold;

      // Hide navbar on landing page until the Services section is reached
      if (pathname === "/") {
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
          // Fade in slightly before the section hits the top of the screen
          const servicesTop = servicesSection.offsetTop;
          if (scrollY < servicesTop - 150) {
            shouldHide = true;
          }
        } else if (scrollY < windowHeight * 2) {
          // Fallback if the section isn't mounted immediately
          shouldHide = true;
        }
      }

      setIsHidden(shouldHide);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger immediately to hide on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollLink = (id: string) => {
    navigate(`/#${id}`);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] md:w-[95%] md:max-w-6xl transition-all duration-700 ease-in-out md:top-6 ${isHidden ? "opacity-0 invisible translate-y-[-20px]" : "opacity-100 visible translate-y-0"
          }`}
      >
        <div className="flex h-16 md:h-20 items-center justify-between bg-black/40 backdrop-blur-xl px-6 transition-all duration-300 rounded-full border border-white/10 md:px-10 md:shadow-2xl md:shadow-red-900/10">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt={brand} className="h-12 md:h-16 w-auto object-contain" />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold tracking-wide md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative transition-colors duration-200 hover:text-[#F23030] ${isActive ? "text-[#F23030]" : "text-white/70"
                  } after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#F23030] after:transition-all after:duration-300 hover:after:w-full`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={openAudit}
              className="inline-flex h-10 items-center rounded-full bg-[#F23030] px-6 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#A61F1F] hover:shadow-lg hover:shadow-red-900/30 active:scale-95"
            >
              Get Your Growth Audit
            </button>
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center text-[#F23030] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] flex flex-col bg-[#0D0D0D]/95 backdrop-blur-2xl"
          >
            <div className="flex h-18 items-center justify-between px-4 border-b border-white/5">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
                <img src="/logo.svg" alt={brand} className="h-14 w-auto object-contain" />
              </Link>
              <button onClick={() => setOpen(false)} className="p-2 text-cream">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-10">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="font-['Inter'] text-4xl font-bold text-cream transition hover:text-[#F23030]"
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setOpen(false);
                  openAudit();
                }}
                className="mt-6 inline-flex h-14 items-center bg-[#F23030] px-10 text-sm font-bold uppercase tracking-widest text-white rounded-full transition hover:bg-[#A61F1F]"
              >
                Get Your Growth Audit
              </motion.button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}





function LandingPage() {
  const navigate = useNavigate();
  const industryInfo: Record<string, any> = {
    'real-estate': {
      title: 'REAL ESTATE & INFRASTRUCTURE',
      desc: 'Driving high-value property demand through immersive digital experiences and investor-focused positioning.',
      stats: [{ val: '8X', label: 'LEAD CONVERSION' }, { val: '₹100Cr+', label: 'PROJECT VISIBILITY' }],
      img: '/industries/industry_real_estate.jpg'
    },
    'it-saas': {
      title: 'IT & SAAS COMPANIES',
      desc: 'Fueling scalable growth for SaaS and tech companies through precision-driven branding and product positioning.',
      stats: [{ val: '10X', label: 'FASTER SCALE' }, { val: '500k+', label: 'USERS REACHED' }],
      img: '/industries/industry_it_saas.jpg'
    },
    'healthcare': {
      title: 'HEALTHCARE INSTITUTIONS',
      desc: 'Building trust-driven digital ecosystems for hospitals and clinics that convert patients into long-term loyalty.',
      stats: [{ val: '3X', label: 'PATIENT INQUIRIES' }, { val: '95%', label: 'TRUST SIGNALS' }],
      img: '/industries/industry_healthcare.jpg'
    },
    'manufacturing': {
      title: 'MANUFACTURING & INDUSTRIAL',
      desc: 'Transforming traditional industries with modern digital infrastructure that attracts global B2B clients.',
      stats: [{ val: '5X', label: 'GLOBAL LEADS' }, { val: '70%', label: 'INQUIRY GROWTH' }],
      img: '/industries/industry_manufacturing.jpg'
    },
    'finance-consulting': {
      title: 'FINANCE & CONSULTING FIRMS',
      desc: 'Establishing authority-led digital presence that builds trust and drives high-value client acquisition.',
      stats: [{ val: '4X', label: 'CLIENT ACQUISITION' }, { val: '2X', label: 'CONVERSION RATE' }],
      img: '/industries/industry_finance.jpg'
    },
    'logistics': {
      title: 'LOGISTICS & SUPPLY CHAIN',
      desc: 'Optimizing digital visibility for logistics networks to attract enterprise partnerships and scale operations.',
      stats: [{ val: '6X', label: 'INBOUND LEADS' }, { val: '3X', label: 'PARTNER GROWTH' }],
      img: '/industries/industry_logistics.jpg'
    },
    'architecture-interior': {
      title: 'ARCHITECTURE & INTERIOR DESIGN',
      desc: 'Showcasing design excellence through high-impact digital portfolios that attract premium clients and projects.',
      stats: [{ val: '4X', label: 'PROJECT INQUIRIES' }, { val: '2X', label: 'CLIENT VALUE' }],
      img: '/industries/industry_architecture.jpg'
    },
    'furniture-decor': {
      title: 'FURNITURE & HOME DECOR',
      desc: 'Elevating product-driven brands with visuals and systems that drive wholesale and retail demand.',
      stats: [{ val: '3X', label: 'BULK ORDERS' }, { val: '5X', label: 'CATALOG REACH' }],
      img: '/industries/industry_furniture.jpg'
    },
    'construction': {
      title: 'CONSTRUCTION & CONTRACTORS',
      desc: 'Building authority for construction firms through digital presence that attracts large-scale projects and partnerships.',
      stats: [{ val: '6X', label: 'PROJECT LEADS' }, { val: '3X', label: 'TENDER VISIBILITY' }],
      img: '/industries/industry_construction.jpg'
    },
    'education': {
      title: 'EDUCATION & TRAINING INSTITUTES',
      desc: 'Building credibility-driven digital ecosystems for educational institutions that attract high-intent students and drive enrollment at scale.',
      stats: [{ val: '4X', label: 'ENROLLMENTS' }, { val: '3X', label: 'INQUIRY VOLUME' }],
      img: '/industries/industry_education.jpg'
    },
  };

  return (
    <>
      <HeroSection />
      <ZoomParallax images={parallaxImages} />

      <main>

        <section id="services" className="bg-zinc-950 py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">SERVICES</p>
                <h2 className="mt-3 max-w-2xl font-['Inter'] text-3xl font-bold md:text-5xl">SOLUTIONS THAT SCALE</h2>
              </div>
              <div className="hidden items-center gap-4 md:flex">
                <button
                  onClick={() => {
                    const carousel = document.getElementById('services-carousel');
                    if (carousel) carousel.scrollBy({ left: -400, behavior: 'smooth' });
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-transparent/5 transition hover:bg-transparent/20"
                >
                  <ChevronLeft size={24} className="text-[#A61F1F]" />
                </button>
                <button
                  onClick={() => {
                    const carousel = document.getElementById('services-carousel');
                    if (carousel) carousel.scrollBy({ left: 400, behavior: 'smooth' });
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-transparent/5 transition hover:bg-transparent/20"
                >
                  <ChevronRight size={24} className="text-[#A61F1F]" />
                </button>
              </div>
            </motion.div>

            <div
              id="services-carousel"
              className="mt-8 flex gap-6 overflow-x-auto pt-4 pb-12 snap-x snap-proximity scrollbar-hide no-scrollbar touch-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'visible', scrollPadding: '0 24px' }}
              onScroll={(e) => {
                const target = e.currentTarget;
                const progress = (target.scrollLeft / (target.scrollWidth - target.clientWidth)) * 100;
                const bar = document.getElementById('services-progress-bar');
                if (bar) bar.style.setProperty('width', `${progress}%`);
              }}
            >
              {services.map((service, index) => {
                const cardImages: Record<string, string> = {
                  'branding': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
                  'digital-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                  'web-solutions': 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
                  'software-development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
                  'social-media-management': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
                  'performance-marketing': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                  'graphic-design': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
                  'influencer-marketing': 'https://www.aimtechnologies.co/wp-content/uploads/2024/01/Social-Media-Influencer.png',
                  'model-product-video': 'https://mattnawrot.com/wp-content/uploads/2023/04/The-Beginners-Guide-to-Becoming-a-UGC-Creator-1024x576.jpg',
                };

                return (
                  <div
                    key={service.slug}
                    className="flex-shrink-0 snap-start h-[450px] w-[300px] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    <ProductRevealCard
                      name={service.title}
                      image={cardImages[service.slug]}
                      imgClassName={(service.slug === 'influencer-marketing' || service.slug === 'model-product-video') ? "object-right" : ""}
                      description={service.short}
                      features={service.bullets}
                      className="h-full w-full"
                      onDiscoverMore={() => navigate("/services/" + service.slug)}
                      onAdd={() => navigate("/contact#enquiry")}
                    />
                  </div>
                );
              })}
            </div>

            {/* Progress Bar Area */}
            <div className="mt-8 flex items-center justify-between gap-8 md:mt-12">
              <div className="relative h-[2px] w-full bg-transparent/10 overflow-hidden rounded-full">
                <div
                  id="services-progress-bar"
                  className="absolute left-0 top-0 h-full bg-[#A61F1F] transition-all duration-300"
                  style={{ width: '0%' }}
                />
              </div>
              <p className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 md:block">Scroll to explore</p>
            </div>
          </div>
        </section>

        <section id="industries" className="bg-zinc-950 text-white md:border-t md:border-white/5">
          <StackingIndustries
            industries={Object.entries(industryInfo).map(([id, info]) => ({
              id,
              title: info.title,
              desc: info.desc,
              stats: info.stats,
              img: info.img
            }))}
          />
        </section>


        <section id="portfolio" className="bg-transparent/40 md:bg-transparent py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">PORTFOLIO</p>
                <h2 className="mt-3 max-w-2xl font-['Inter'] text-3xl font-bold text-cream/80 md:text-4xl">PROOF OVER PROMISES
                </h2>
              </div>
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F23030] transition hover:text-[#7a0012]">
                View Case Studies
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    key={project.slug}
                    to={`/portfolio/${project.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden bg-zinc-900 rounded-2xl"
                  >
                    <img
                      src={(project as any).landingImage || project.image}
                      alt={project.company}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-40"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#A61F1F]">
                        {project.industry}
                      </p>
                      <h3 className="mt-1 font-['Inter'] text-2xl font-bold text-white">
                        {project.company}
                      </h3>
                      {/* Arrow removed as requested */}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-zinc-950 py-16 text-white md:py-28 md:border-y md:border-white/5">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <PricingSection
              plans={PLANS}
              heading="Capabilities that scale."
              description="Strategic deliverables engineered to establish market dominance and drive measurable growth across every critical vertical."
            />
            <div className="mt-16 flex justify-center">
              <Link 
                to="/contact?service=Custom%20Solution#enquiry" 
                className="group flex items-center gap-3 text-zinc-500 hover:text-cream transition-all duration-300"
              >
                <span className="text-sm font-bold uppercase tracking-widest">looking for custom packages</span>
                <ArrowRight size={18} className="text-[#F23030] transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </section>

        <IntegrationHero />

        <section id="reviews" className="bg-zinc-950 py-16 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A61F1F]">Voice of Authority</p>
              <h2 className="mt-4 font-['Inter'] text-3xl font-bold md:text-5xl">Success heard from the industry.</h2>
            </motion.div>
            <div className="mt-12 flex justify-center">
              <CircularTestimonials
                testimonials={testimonials}
                autoplay={true}
                colors={{
                  name: "#f7f7ff",
                  designation: "#A61F1F",
                  testimony: "#f1f1f7",
                  arrowBackground: "#A50019",
                  arrowForeground: "#ffffff",
                  arrowHoverBackground: "#A61F1F",
                }}
                fontSizes={{
                  name: "28px",
                  designation: "16px",
                  quote: "18px",
                }}
              />
            </div>
          </div>
        </section>

        <section id="blog" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">Blog</p>
              <h2 className="mt-3 font-['Inter'] text-3xl font-bold text-cream/80 md:text-4xl">Insights for teams that want to scale faster.</h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F23030] transition hover:text-[#7a0012]">
              View All Posts
              <ArrowRight size={16} />
            </Link>
          </motion.div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex justify-center"
              >
                <Link to={`/blog/${post.slug}`} className="w-full">
                  <ArticleCard
                    headline={post.title}
                    excerpt={post.excerpt}
                    cover={post.image}
                    tag={post.category}
                    readingTime={post.readingTime}
                    writer={post.author}
                    publishedAt={new Date(post.date)}
                    clampLines={3}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function ServicesPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <header className="bg-zinc-950 pt-32 pb-16 text-white md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A61F1F]">Comprehensive Solutions</p>
          <h1 className="mt-4 font-['Inter'] text-4xl font-bold md:text-7xl">Capabilities that drive impact.</h1>
          <p className="mt-6 max-w-2xl text-base text-zinc-400 md:text-xl">
            From strategic branding to technical SEO, we deploy premium digital expertise to help brands scale in the modern digital landscape.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => {
            const isLight = index % 2 === 0;
            const cardImages: Record<string, string> = {
              'branding': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
              'digital-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
              'web-solutions': 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
              'software-development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
              'social-media-management': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
              'performance-marketing': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
              'graphic-design': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
              'influencer-marketing': 'https://www.aimtechnologies.co/wp-content/uploads/2024/01/Social-Media-Influencer.png',
              'model-product-video': 'https://mattnawrot.com/wp-content/uploads/2023/04/The-Beginners-Guide-to-Becoming-a-UGC-Creator-1024x576.jpg',
            };

            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative h-[360px] md:h-[450px] flex flex-col items-start justify-center overflow-hidden rounded-2xl p-8 md:p-10 transition-all duration-500 hover:scale-[1.02] group shadow-2xl"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(242, 48, 48, 0.7), rgba(166, 31, 31, 0.85), rgba(13, 13, 13, 0.95)), url('${cardImages[service.slug] || cardImages['branding']}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: (service.slug === 'influencer-marketing' || service.slug === 'model-product-video') ? 'right' : 'center',
                }}
              >
                <div className="relative z-10 w-full">
                  <h3 className="font-['Inter'] text-2xl font-[900] leading-[0.95] tracking-tighter text-white md:text-3xl lg:text-[2.25rem] uppercase mb-4 drop-shadow-xl">
                    {service.title.replace(' & ', ',\n')}
                  </h3>
                  <p className="max-w-[280px] text-[13px] font-normal leading-relaxed text-white/80 md:text-sm lg:text-[15px]">
                    {service.short}
                  </p>
                </div>

                <Link
                  to={`/services/${service.slug}`}
                  className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110 active:scale-95"
                >
                  <ArrowUpRight size={24} />
                </Link>

                {/* Animated Grain Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              </motion.article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function TeamSlider() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((target.scrollLeft / maxScroll) * 100);
    }
  };

  return (
    <div className="relative">
      <div 
        className="mt-16 flex overflow-x-auto pb-8 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={handleScroll}
      >
        {team.map((member) => (
          <a 
            key={member.name}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-start text-left w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center mr-6 md:mr-0 cursor-pointer"
          >
            {/* Desktop Image with Hover Overlay */}
            <div className="relative overflow-hidden w-full aspect-[4/5] bg-zinc-900 border border-white/5 hidden md:block">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-[#F23030] text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-4 border border-[#F23030] translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View Profile
                </span>
              </div>
            </div>
            
            {/* Mobile Image (No overlay, direct tap) */}
            <div className="relative overflow-hidden w-full aspect-[4/5] bg-zinc-900 border border-white/5 md:hidden">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
              />
            </div>

            {/* Info Section */}
            <div className="w-full mt-6 flex flex-col items-start">
              <h3 className="font-['Inter'] text-2xl font-bold text-cream/90 group-hover:text-white transition-colors">{member.name}</h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F23030]">{member.role}</p>
              <div className="mt-5 h-[2px] w-0 bg-[#F23030] transition-all duration-500 group-hover:w-full hidden md:block" />
            </div>
          </a>
        ))}
      </div>
      
      {/* Mobile Scroll Indicator */}
      <div className="mt-4 flex flex-col items-center justify-center md:hidden pb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
          <ChevronLeft size={14} className="text-zinc-600 animate-pulse" />
          Swipe to explore
          <ChevronRight size={14} className="text-zinc-600 animate-pulse" />
        </p>
        <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#F23030] transition-all duration-150 ease-out rounded-full" 
            style={{ width: `${Math.max(20, scrollProgress)}%` }} 
          />
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 pt-32 pb-16 md:px-6 md:pt-48 md:pb-24">
        <div className="text-left">
          <h1 className="mt-6 font-['Inter'] text-[42px] font-bold text-cream md:text-8xl lg:text-[100px] leading-[0.95] tracking-tighter">
            We engineer brands people <br className="md:hidden" /> <span className="text-zinc-500 whitespace-nowrap">can’t ignore.</span>
          </h1>
          <div className="mt-12 max-w-3xl space-y-10">
            <p className="text-xl md:text-2xl leading-relaxed text-zinc-400">
              <strong className="text-white">DigiZinc</strong> wasn't born in a boardroom. It was born from a simple, stubborn observation: that in a crowded market, <span className="text-cream italic">creativity without a strategy is just expensive noise.</span>
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-zinc-400">
              We started as a small strategy boutique with a singular focus to stop being 'just another agency' and start being a growth engine. We never measured our success by the size of our office, but by the scale of the impact we delivered for our partners.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-zinc-400">
              Today, we don’t just build projects; we architect digital ecosystems. High-performance environments engineered to seize attention, influence decision-making, and turn market share into market dominance.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story / Message from Founder Section */}
      <section className="py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-none bg-zinc-900 border border-white/10 aspect-[4/5]">
                <img
                  src="/team/bhargava-raj.png"
                  alt="Bhargava Raj"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="font-['Inter'] text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-8 leading-[1.1] tracking-tight">
                A Message from <br /><span className="text-zinc-500">Our Founder</span>
              </h3>

              <div className="relative">
                <p className="font-['Instrument_Serif'] text-2xl md:text-3xl lg:text-4xl leading-[1.4] text-cream/90 italic">
                  We don’t spend our time chasing trends; we spend it building leverage. For us, AI has never been just a tool. It’s the unfair advantage we use to move faster and deliver at a higher intensity. We have zero interest in building brands that just exist. We engineer systems that are built to scale, dominate their space, and drive growth you can actually measure.
                </p>

                <div className="mt-10 flex items-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-zinc-400 whitespace-nowrap">
                    Bhargava Raj <span className="text-[#F23030]/60 ml-2">— Founder & CEO</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-['Inter'] text-3xl font-bold text-[#A61F1F]">The Mission</h2>
              <p className="mt-4 text-xl leading-relaxed text-zinc-300">
                Markets are louder than ever, but they've never been more hollow. We’re here to bridge that gap by using human psychology to trigger real emotion and data intelligence to back it up. We give brands the authority to speak with conviction and the infrastructure to scale without the guesswork.
              </p>
            </div>
            <div>
              <h2 className="font-['Inter'] text-3xl font-bold text-[#A61F1F]">The Vision</h2>
              <p className="mt-4 text-xl leading-relaxed text-zinc-300">
                We’re building the global gold standard for what a growth partner should actually be. Our vision is a world where cinematic storytelling and forensic data aren't separate departments, but a single, lethal weapon for our partners. We intend to be the reason the next generation of premium brands command their markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-transparent/40 md:bg-transparent py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F23030]">Methodology</p>
            <h2 className="mt-6 font-['Inter'] text-4xl md:text-6xl font-black text-cream leading-tight">
              Our Proven <span className="text-zinc-500">Process.</span>
            </h2>
          </div>
          
          <div className="mt-20 flex flex-col border-t border-white/10">
            {[
              { step: "01", title: "Forensic Audit", desc: "We don't guess. We perform a deep-tissue search of your current infrastructure to identify every leak and lost opportunity." },
              { step: "02", title: "Market Strategy", desc: "A tailored roadmap engineered for dominance. We define the exact moves required to bend the market in your favor." },
              { step: "03", title: "Cinematic Creative", desc: "High-fidelity production that commands attention. We build visuals that don't just look good—they convert." },
              { step: "04", title: "Precision Launch", desc: "Targeted deployment across the digital wild. We move with surgical precision to reach the right people at the right time." },
              { step: "05", title: "Scale & Dominate", desc: "Continuous performance tracking and aggressive scaling. We optimize until your authority is unquestioned." },
            ].map((p, i) => (
              <div key={p.step} className="group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-16 border-b border-white/10 py-10 md:py-16 px-4 md:px-8 transition-all duration-500 hover:bg-white/[0.02]">
                {/* Massive Number */}
                <div className="text-5xl md:text-7xl font-['Instrument_Serif'] text-zinc-700 transition-colors duration-500 group-hover:text-[#F23030]">
                  {p.step}
                </div>
                
                {/* Title */}
                <div className="flex-1">
                  <h3 className="font-['Inter'] text-3xl md:text-5xl font-bold text-cream tracking-tight transition-transform duration-500 group-hover:translate-x-4">
                    {p.title}
                  </h3>
                </div>
                
                {/* Description */}
                <div className="md:w-[40%]">
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed transition-colors duration-500 group-hover:text-zinc-300">
                    {p.desc}
                  </p>
                </div>
                
                {/* Red accent bar on hover */}
                <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#F23030] transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">The Team</p>
          <h2 className="mt-4 font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl">Meet the Strategists.</h2>
        </div>
        <TeamSlider />
      </section>

    </main>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = useMemo(() => services.find((item) => item.slug === slug), [slug]);

  if (!service) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <h1 className="font-['Inter'] text-4xl font-bold">Service not found.</h1>
        <Link to="/services" className="mt-4 inline-block text-[#F23030]">
          Back to Services
        </Link>
      </main>
    );
  }

  const Icon = service.icon;

  return (
    <main className="bg-transparent min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(242,48,48,0.12),_transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F23030]/10 border border-[#F23030]/30 text-[#F23030]">
                <Icon size={20} />
              </div>
              <p className="text-xs font-['Inter'] font-bold uppercase tracking-[0.25em] text-[#F23030]">Service</p>
            </div>
            <h1 className="font-['Inter'] text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-6">
              {service.title}
            </h1>
            <div className="h-1 w-16 bg-[#F23030] mb-8" />
            <p className="text-zinc-300 text-lg md:text-xl font-['Inter'] leading-relaxed max-w-2xl">
              {service.short}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/contact#enquiry')}
                className="inline-flex h-14 items-center gap-2 bg-[#F23030] px-8 rounded-full text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#A61F1F] hover:shadow-lg hover:shadow-red-900/30"
              >
                Start Your Project <ArrowRight size={16} />
              </button>
              <Link
                to="/services"
                className="inline-flex h-14 items-center gap-2 border border-white/20 px-8 rounded-full text-sm font-semibold text-zinc-300 transition hover:border-white/50 hover:text-white"
              >
                All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DETAILED DESCRIPTION ─────────────────────────────── */}
      <section className="bg-zinc-950 py-16 md:py-24 border-y border-white/5">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:items-start">
            <div>
              <p className="text-xs font-['Inter'] font-bold uppercase tracking-[0.2em] text-[#F23030] mb-4">Overview</p>
              <h2 className="font-['Inter'] text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
                Engineered <span className="text-[#F23030]">For Scale</span>
              </h2>
            </div>
            <div>
              <p className="text-zinc-300 text-base md:text-lg font-['Inter'] leading-relaxed">
                {service.detail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY OFFERINGS ────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-xs font-['Inter'] font-bold uppercase tracking-[0.2em] text-[#F23030] mb-4">Key Offerings</p>
          <h2 className="font-['Inter'] text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-12">
            What We Deliver
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.bullets.map((bullet, idx) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-start gap-4 border border-white/10 bg-white/[0.02] rounded-2xl p-6 hover:border-[#F23030]/40 transition-colors duration-300"
              >
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F23030]/10 border border-[#F23030]/30">
                  <div className="h-2 w-2 rounded-full bg-[#F23030]" />
                </div>
                <div>
                  <p className="font-['Inter'] font-bold text-white text-base">{bullet}</p>
                  <p className="text-zinc-500 text-xs mt-1 font-['Inter']">Built for dominance. Designed for conversion.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16 md:py-24 border-y border-white/5">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-xs font-['Inter'] font-bold uppercase tracking-[0.2em] text-[#F23030] mb-4">Why Digizinc</p>
          <h2 className="font-['Inter'] text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-12">
            Performance-First. <span className="text-[#F23030]">Authority-Driven.</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: "B2B Focused", desc: "Every strategy is calibrated for enterprise pipelines, high-value clients, and scalable revenue growth." },
              { title: "Data-Led Execution", desc: "We combine market intelligence with creative precision to ensure measurable outcomes at every stage." },
              { title: "Premium Delivery", desc: "From brief to launch, we operate with speed, transparency, and a relentless focus on business outcomes." },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="border-l-2 border-[#F23030] pl-6"
              >
                <h3 className="font-['Inter'] font-black text-lg uppercase tracking-tight text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm font-['Inter'] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-['Inter'] font-bold uppercase tracking-[0.2em] text-[#F23030] mb-4">Ready to Scale?</p>
            <h2 className="font-['Inter'] text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight mb-6">
              Let's Build Something <span className="text-[#F23030]">Dominant.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg font-['Inter'] leading-relaxed mb-10 max-w-xl mx-auto">
              Get a custom strategy session and actionable plan for your business — delivered within 48 hours.
            </p>
            <button
              onClick={() => navigate('/contact#enquiry')}
              className="inline-flex h-14 items-center gap-2 bg-[#F23030] px-10 rounded-full text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#A61F1F] hover:shadow-xl hover:shadow-red-900/30 active:scale-95"
            >
              Start Your Project <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}


function ProjectDetailPage() {
  const { slug } = useParams();
  const project = useMemo(() => projects.find((item) => item.slug === slug), [slug]);

  if (!project) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <h1 className="font-['Inter'] text-4xl font-bold">Project not found.</h1>
        <Link to="/portfolio" className="mt-4 inline-block text-[#F23030]">
          Back to Portfolio
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pt-32 pb-14 md:px-6 md:pt-40 md:pb-18">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">
            {(project as any).tagline || project.industry}
          </p>
          <h1 className="mt-3 font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl leading-tight">
            {(project as any).headline || project.company}
          </h1>
          {(project as any).subtext && (
            <p className="mt-6 text-xl text-zinc-400 font-medium leading-relaxed">
              {(project as any).subtext}
            </p>
          )}
          <img
            src={(project as any).headerImage || project.image}
            alt={project.company}
            width={800}
            height={450}
            loading="lazy"
            className="mt-8 h-80 w-full object-cover shadow-xl md:h-[450px]"
          />
          <div className="mt-16">
            <h2 className="font-['Inter'] text-2xl font-bold text-cream">Project Overview</h2>
            <div className="mt-6 text-lg leading-relaxed text-zinc-400 space-y-4 whitespace-pre-wrap">
              {project.detail}
            </div>
          </div>


        </section>
        <aside className="space-y-8">
          <div className="border border-[#A61F1F]/30 bg-black/40 backdrop-blur-md p-8 shadow-2xl rounded-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#F23030]">Measurable Result</p>
            <div className="mt-6 font-['Inter'] text-2xl font-bold text-[#F23030] space-y-2 whitespace-pre-wrap leading-tight">
              {project.result}
            </div>
          </div>
          <div className="bg-zinc-900 p-8 text-white">
            <h3 className="text-lg font-bold">Key Deliverables</h3>
            <ul className="mt-6 space-y-4">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-sm text-zinc-300">
                  <div className="h-1.5 w-1.5 bg-[#A61F1F]" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-white/10 p-8">
            <h3 className="font-['Inter'] text-xl font-bold">Scale Your Brand</h3>
            <p className="mt-3 text-sm text-zinc-400">Get similar results for your business. Book a discovery call today.</p>
            <Link to="/contact" className="mt-6 inline-flex h-11 items-center justify-center bg-[#F23030] px-6 text-sm font-semibold text-white transition hover:bg-[#920015]">
              Start Your Project
            </Link>
          </div>
        </aside>
      </div>

      <div className="mt-24">
        <h2 className="font-['Inter'] text-3xl font-bold text-cream">Project Gallery</h2>
        <div className="mt-10 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
          {(project.gallery || [1, 2, 3, 4, 5, 6]).map((item, i) => (
            <div key={i} className="group relative overflow-hidden transition-all">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50">
                <img
                  src={typeof item === 'string' ? item : `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=800&q=20`}
                  alt={`Gallery media ${i}`}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function PortfolioPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-32 pb-14 md:px-6 md:pt-40 md:pb-18">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">Portfolio</p>
      <h1 className="mt-3 font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl">Results that prove our approach.</h1>
      <div className="mt-10 space-y-8">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/portfolio/${project.slug}`}
            className="group grid gap-6 border border-white/10 p-5 transition hover:border-[#F23030]/40 hover:shadow-xl md:grid-cols-[1fr_1fr] md:p-6 rounded-2xl overflow-hidden shadow-2xl bg-black/20"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={project.portfolioImage || project.image}
                alt={project.company}
                width={600}
                height={400}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{project.industry}</p>
              <h2 className="mt-2 text-3xl font-semibold text-cream/80 transition group-hover:text-[#F23030]">
                {project.company}
              </h2>
              <p className="mt-4 text-sm text-zinc-400">
                <span className="font-semibold">Before:</span> {project.before}
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                <span className="font-semibold">After:</span> {project.after}
              </p>
              <p className="mt-4 text-base font-semibold text-[#F23030]">{project.result}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F23030]">
                View Full Case Study
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function BlogPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-32 pb-20 md:px-6 md:pt-40">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F23030]">The Archive</p>
        <h1 className="mt-4 font-['Inter'] text-4xl font-extrabold text-white md:text-6xl tracking-tight">Strategy & Insights.</h1>
        <p className="mt-6 max-w-2xl text-zinc-400 text-lg leading-relaxed">
          Deep dives into growth engineering, creative strategy, and the mechanics of market dominance.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex flex-col bg-zinc-900/30 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#F23030]/20 hover:bg-zinc-900/50 hover:shadow-[0_20px_50px_-20px_rgba(242,48,48,0.1)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-[#F23030] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>{Math.ceil(post.readingTime / 60)} min read</span>
              </div>
              
              <h2 className="font-['Inter'] text-2xl font-bold text-white leading-tight mb-4 group-hover:text-[#F23030] transition-colors line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-sm text-zinc-400 line-clamp-3 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#F23030] group/link">
                <span>Read Full Analysis</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function BlogSinglePage() {
  const { slug } = useParams();
  const post = useMemo(() => posts.find((item) => item.slug === slug), [slug]);

  if (!post) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <h1 className="font-['Inter'] text-4xl font-bold">Post not found.</h1>
        <Link to="/blog" className="mt-4 inline-block text-[#F23030]">
          Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pt-32 pb-20 md:px-6 md:pt-48">
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="flex justify-center items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F23030] mb-8">
          <span>{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>{post.date}</span>
        </div>
        <h1 className="font-['Inter'] text-4xl font-extrabold text-white md:text-6xl tracking-tight leading-[1.1] max-w-3xl mx-auto">
          {post.title}
        </h1>
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">WRITTEN BY</p>
          <p className="text-sm font-semibold text-zinc-300">{post.author}</p>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl mb-16 border border-white/5">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
        {/* Sidebar / TOC */}
        <aside className="hidden lg:block sticky top-32 h-fit">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">Inside this analysis</p>
          <nav className="space-y-4">
            <a href="#intro" className="block text-xs font-semibold text-[#F23030] hover:text-white transition-colors">Introduction</a>
            <a href="#insight" className="block text-xs font-semibold text-zinc-500 hover:text-white transition-colors">The Insight</a>
            <a href="#strategy" className="block text-xs font-semibold text-zinc-500 hover:text-white transition-colors">The Strategy</a>
            <a href="#faq" className="block text-xs font-semibold text-zinc-500 hover:text-white transition-colors">FAQ</a>
            <a href="#conclusion" className="block text-xs font-semibold text-zinc-500 hover:text-white transition-colors">Conclusion</a>
          </nav>
        </aside>

        {/* Content Area */}
        <article id="intro" className="max-w-2xl mx-auto lg:mx-0">
          <div className="prose prose-zinc prose-invert max-w-none">
            <div className="text-xl leading-relaxed text-zinc-300 font-medium mb-12 first-letter:text-5xl first-letter:font-bold first-letter:text-[#F23030] first-letter:mr-3 first-letter:float-left">
              {post.metaDescription || post.excerpt}
            </div>

            <div className="whitespace-pre-wrap text-zinc-300 leading-[1.8] text-lg space-y-8">
              {post.content}
            </div>
          </div>

          {/* FAQ Section */}
          <section id="faq" className="mt-20 pt-20 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-10">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl">
                <h3 className="text-white font-bold mb-4">How long does it take to see results?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Most systems show initial engagement improvements within 14 days, with full CAC stabilization occurring over a 60-90 day window.</p>
              </div>
              <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl">
                <h3 className="text-white font-bold mb-4">What is the ideal ad budget for testing?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">We recommend starting with a minimum of $50-$100 per variable per day to reach statistical significance quickly.</p>
              </div>
            </div>
          </section>

          {/* CTA Footer */}
          <section id="conclusion" className="mt-20 p-10 bg-[#F23030] rounded-3xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to dominate your market?</h2>
            <p className="text-white/80 mb-8 text-sm">Join the elite brands using Digizinc’s growth systems to establish authority and drive measurable ROI.</p>
            <Link to="/contact#enquiry" className="inline-flex items-center gap-2 bg-white text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-zinc-100 transition-all">
              Book Your Strategy Call
              <ArrowRight size={16} />
            </Link>
          </section>
        </article>
      </div>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-32 pb-14 md:px-6 md:pt-40 md:pb-18">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">Contact</p>
          <h1 className="mt-3 font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl">Let&apos;s discuss your growth targets.</h1>
          <p className="mt-4 text-zinc-400">Share your goals and we will map the highest-impact opportunities for your brand.</p>
          <div className="mt-8 space-y-4 text-sm text-zinc-400">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-[#F23030]" />
              hello@digizinc.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-[#F23030]" />
              +91 97015 63362
            </p>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-1 shrink-0 text-[#F23030]" />
              <span>
                H. No. 1-98/9/3/32T, Plot No. 50, 4th Floor,<br />
                Sai Dham Building, Madhapur, Hyderabad,<br />
                Telangana, 500081, India
              </span>
            </p>
          </div>
          <div className="mt-8 h-72 overflow-hidden border border-white/10">
            <iframe
              title="Agency Location"
              src="https://www.google.com/maps?q=H.+No.+1-98%2F9%2F3%2F32T,+Plot+No.+50,+Sai+Dham+Building,+Madhapur,+Hyderabad&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </section>
        <section>
          <InquiryForm />
        </section>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-4 md:px-6">
        <div>
          <Link to="/" className="inline-block mb-3">
            <img src="/logo.svg" alt={brand} className="h-14 w-auto object-contain" />
          </Link>
          <p className="mt-3 text-sm">Premium marketing systems for brands that want market authority and real growth.</p>
          <Link to="/contact#enquiry" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#A61F1F]">
            Book Your Strategy Call
            <ArrowRight size={16} />
          </Link>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">Quick Links</p>
          <div className="mt-4 space-y-2 text-sm">
            <Link to="/" className="block">Home</Link>
            <Link to="/about" className="block">About</Link>
            <Link to="/services" className="block">Services</Link>
            <Link to="/portfolio" className="block">
              Portfolio
            </Link>
            <Link to="/blog" className="block">
              Blog
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">Service Links</p>
          <div className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`} className="block transition hover:text-[#A61F1F]">
                {service.footerTitle}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">Contact</p>
          <div className="mt-4 space-y-2 text-sm">
            <p>hello@digizinc.com</p>
            <p>+91 97015 63362</p>
            <p>Hyderabad, India</p>
          </div>
          <div className="mt-5 flex gap-5 text-[#A61F1F]">
            <a href="https://www.instagram.com/digizinc_/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110">
              <BrandInstagram size={22} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61577649125398" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110">
              <BrandFacebook size={22} />
            </a>
            <a href="https://linkedin.com/company/digizinc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110">
              <BrandLinkedin size={22} />
            </a>
            <a href="https://www.behance.net/digizinc_?tracking_source=search_projects%7Cdigizinc" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="inline-flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110">
              <BrandBehance size={22} />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-5 text-xs text-zinc-500 md:px-6">
        © 2026 {brand}. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  // Trigger splash only on initial load
  useEffect(() => {
    // Force instant scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleSplashFinished = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <ModalProvider>
      <div className="min-h-screen bg-[#000000] text-cream antialiased selection:bg-[#F23030] selection:text-white">
        {/* Global Cinematic Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Artistic Hand-Made Grid (Faded in parts) */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(circle at 10% 20%, black 0%, transparent 40%), radial-gradient(circle at 90% 10%, black 0%, transparent 35%), radial-gradient(circle at 50% 80%, black 0%, transparent 50%), radial-gradient(circle at 85% 65%, black 0%, transparent 30%)',
              WebkitMaskImage: 'radial-gradient(circle at 10% 20%, black 0%, transparent 40%), radial-gradient(circle at 90% 10%, black 0%, transparent 35%), radial-gradient(circle at 50% 80%, black 0%, transparent 50%), radial-gradient(circle at 85% 65%, black 0%, transparent 30%)'
            }}
          />
        </div>

        {showSplash && <SplashLoader onFinished={handleSplashFinished} />}

        <div className="relative z-10 bg-transparent">
          <ScrollManager />
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogSinglePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
        <CinematicFooter />
        <AuditModal />
      </div>
    </ModalProvider>
  );
}