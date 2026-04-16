import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import SplashLoader from "@/components/ui/SplashLoader";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { ArticleCard } from "@/components/ui/blog-post-card";
import { HeroSection } from "@/components/ui/glass-video-hero";
import IntegrationHero from "@/components/ui/integration-hero";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Box,
  Briefcase,
  Building2,
  Camera,
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
} from "react-router-dom";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { PricingSection } from "@/components/ui/pricing";

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    info: 'For most individuals',
    price: {
      monthly: 7,
      yearly: Math.round(7 * 12 * (1 - 0.12)),
    },
    features: [
      { text: 'Up to 3 Blog posts', tooltip: '100 tags limit' },
      { text: 'Up to 3 Transcriptions' },
      { text: 'Up to 3 Posts stored' },
      {
        text: 'Markdown support',
        tooltip: 'Export content in Markdown format',
      },
      {
        text: 'Community support',
        tooltip: 'Get answers your questions on discord',
      },
      {
        text: 'AI powered suggestions',
        tooltip: 'Get up to 100 AI powered suggestions',
      },
    ],
    btn: {
      text: 'Get started',
      href: '#',
    },
  },
  {
    highlighted: true,
    id: 'pro',
    name: 'Pro',
    info: 'For small businesses',
    price: {
      monthly: 17.99,
      yearly: Math.round(17.99 * 12 * (1 - 0.12)),
    },
    features: [
      { text: 'Up to 500 Blog Posts', tooltip: '500 tags limit' },
      { text: 'Up to 500 Transcriptions' },
      { text: 'Up to 500 Posts stored' },
      {
        text: 'Unlimited Markdown support',
        tooltip: 'Export content in Markdown format',
      },
      { text: 'SEO optimization tools' },
      { text: 'Priority support', tooltip: 'Get 24/7 chat support' },
      {
        text: 'AI powered suggestions',
        tooltip: 'Get up to 500 AI powered suggestions',
      },
    ],
    btn: {
      text: 'Get started',
      href: '#',
    },
  },
  {
    name: 'Business',
    info: 'For large organizations',
    price: {
      monthly: 69.99,
      yearly: Math.round(49.99 * 12 * (1 - 0.12)),
    },
    features: [
      { text: 'Unlimited Blog Posts' },
      { text: 'Unlimited Transcriptions' },
      { text: 'Unlimited Posts stored' },
      { text: 'Unlimited Markdown support' },
      {
        text: 'SEO optimization tools',
        tooltip: 'Advanced SEO optimization tools',
      },
      { text: 'Priority support', tooltip: 'Get 24/7 chat support' },
      {
        text: 'AI powered suggestions',
        tooltip: 'Get up to 500 AI powered suggestions',
      },
    ],
    btn: {
      text: 'Get started',
      href: '#',
    },
  },
];

const brand = "Digizinc";
const formEndpoint = "https://formsubmit.co/ajax/hello@digizinc.com";

const services = [
  {
    slug: "branding",
    title: "Branding ",
    footerTitle: "Branding",
    icon: Palette,
    short: "Crafting distinct identities that resonate with your audience and define your market presence.",
    detail:
      "We build comprehensive brand systems including logo design, color theory, and verbal identity that ensure your brand stands out in a crowded marketplace. Every element is crafted to communicate your core values with precision and flair.",
    bullets: ["Visual Identity Systems", "Brand Strategy & Positioning", "Voice & Tone Guidelines"],
  },
  {
    slug: "website-design",
    title: "Web Design ",
    footerTitle: "Web Design",
    icon: Laptop,
    short: "High-performance digital homes built for speed, conversion, and premium user experience.",
    detail:
      "From custom landing pages to complex enterprise platforms, we develop responsive, SEO-ready websites that turn visitors into loyal customers. Our development process prioritizes clean code and lightning-fast performance.",
    bullets: ["Responsive Web Design", "Custom CMS Integration", "Performance Optimization"],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    footerTitle: "Content",
    icon: MessageSquare,
    short: "Narratives that captivate and convert through strategic content across all digital touchpoints.",
    detail:
      "We turn your brand's mission into compelling stories that build authority and community engagement. Through high-value blogs, social narratives, and email sequences, we keep your audience coming back for more.",
    bullets: ["Editorial Strategy", "Social Media Content", "Copywriting & Scripting"],
  },
  {
    slug: "printpackaging",
    title: "Print Packaging",
    footerTitle: "Print & Packaging",
    icon: Box,
    short: "Tangible brand experiences through premium packaging design and high-quality print collateral.",
    detail:
      "We bring your brand into the physical world with sustainable packaging solutions and stunning print materials. From the unboxing experience to the feel of the cardstock, every detail matters.",
    bullets: ["Product Packaging Design", "Stationery & Collateral", "Premium Print Finishing"],
  },
  {
    slug: "advertising-marketing",
    title: "360° Advertising",
    footerTitle: "Advertising",
    icon: Megaphone,
    short: "Omnichannel campaigns engineered to scale your pipeline and maximize return on ad spend.",
    detail:
      "We combine data-driven strategy with creative excellence to run profitable campaigns across Google, Meta, and LinkedIn. Our approach ensures every dollar spent is an investment in measurable growth.",
    bullets: ["Paid Search & Social", "Ad Creative Strategy", "Analytics & Attribution"],
  },
  {
    slug: "ui-ux-digital-experience",
    title: "UI/UX ",
    footerTitle: "UI/UX",
    icon: Layers3,
    short: "Intuitive interfaces designed to solve complex problems and provide seamless user journeys.",
    detail:
      "We focus on user-centric design principles to create interactive prototypes and final products that delight users and drive results. Our designs bridge the gap between technical complexity and effortless usability.",
    bullets: ["User Research & Testing", "Interactive Prototyping", "Design System Management"],
  },
  {
    slug: "video-production",
    title: "Video Production",
    footerTitle: "Motion",
    icon: Video,
    short: "Dynamic visual storytelling through professional video production and high-impact motion graphics.",
    detail:
      "From cinematic brand films to social-first video ads, we bring your message to life with professional production and engaging animation. We capture attention in seconds and hold it with quality.",
    bullets: ["Commercial Video Production", "2D/3D Motion Graphics", "Social Video Optimization"],
  },
  {
    slug: "illustration",
    title: "Illustration ",
    footerTitle: "Illustration",
    icon: PenTool,
    short: "Unique visual assets and bespoke illustrations that give your brand a one-of-a-kind personality.",
    detail:
      "Our artists create custom icons, illustrations, and digital art that differentiate your brand from the cookie-cutter competitors. We add a human touch to your digital presence through mastery of craft.",
    bullets: ["Custom Iconography", "Digital Illustration", "Character Design"],
  },

  {
    slug: "prouct photoshoot",
    title: "prouct photoshoot ",
    footerTitle: "Photography",
    icon: Camera,
    short: "Premium commercial photography and visual assets tailored for modern marketing channels.",
    detail:
      "High-end product, lifestyle, and corporate photography that elevates your brand's aesthetic. We capture the essence of your brand in every frame, ensuring your visuals are as premium as your offering.",
    bullets: ["Product Photography", "Corporate & Headshots", "Lifestyle Shoots"],
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
    slug: "vantage-properties",
    company: "Vantage Properties",
    industry: "Real Estate",
    before: "Low quality leads and underperforming Meta campaigns",
    after: "3.2x ROAS in 60 days with 42% lower CPL",
    result: "180 qualified leads in 8 weeks",
    detail: "We implemented a full-funnel lead generation system focusing on high-intent creative hooks and a simplified inquiry process. By auditing their existing CRM integration, we ensured no lead was left behind.",
    bullets: ["Meta Ads Performance", "Landing Page Optimization", "Lead Scoring Logic"],
    image: "/portfolio-vantage.jpg",
    gallery: [
      "/vantage-gallery-1.png",
      "/vantage-gallery-2.png",
      "/vantage-gallery-3.png",
      "/vantage-gallery-4.png",
      "/vantage-gallery-5.jpg",
    ],
  },
  {
    slug: "uzivo-construction",
    company: "Uzivo",
    industry: "Construction",
    before: "Low brand visibility in a competitive developer market",
    after: "Establishment of a premium architectural narrative",
    result: "12 major projects showcased with 85% lead growth",
    detail: "We humanized the construction industry by focusing on the passion behind the build. Through industrial storytelling and high-fidelity visual assets, Uzivo became the go-to partner for premium urban developments.",
    bullets: ["Industrial Branding", "Visual Storytelling", "B2B Lead Gen"],
    image: "/portfolio-uzivo.jpg",
  },
  {
    slug: "pv-plus-solar",
    company: "PV+",
    industry: "Renewable Energy",
    before: "Technical complexity making the offer confusing",
    after: "64% increase in consultation requests",
    result: "300+ solar audits booked monthly",
    detail: "Renewable energy sales are about trust and clarity. We simplified the messaging and built interactive calculators that showed immediate ROI, significantly lowering the barrier to entry for homeowners.",
    bullets: ["Educational Content", "Conversion Funnels", "Technical SEO"],
    image: "/portfolio-pvplus.png",
  },
  {
    slug: "skybil-education",
    company: "Skybil",
    industry: "Education",
    before: "Poor conversion from digital enrollment traffic",
    after: "2.7x student-to-enrollment uplift",
    result: "11,000+ prospective students reached",
    detail: "We overhauled the registration process and post-inquiry follow-up sequences. By introducing personalized SMS and email tracks, we kept the momentum high from the first click to enrollment.",
    bullets: ["Funnel Automation", "EdTech Strategy", "Retention Systems"],
    image: "/portfolio-skybil.jpg",
  },
  {
    slug: "vta-engineering",
    company: "VTA Engineering",
    industry: "Industrial Tech",
    before: "Inconsistent brand representation across global markets",
    after: "Unified digital presence in 12 countries",
    result: "$2.4M attributed pipeline growth",
    detail: "Engineering excellence requires precision in marketing. We built a data-driven content ecosystem that positioned VTA as a global leader in exoskeleton systems and industrial innovation.",
    bullets: ["Industrial Marketing", "Global SEO", "ABM Strategy"],
    image: "/portfolio-vta.png",
  },
  {
    slug: "beton-architecture",
    company: "Beton",
    industry: "Architecture",
    before: "Weak online portfolio and low organic discovery",
    after: "Top 3 ranking for 'Premium Architecture' keywords",
    result: "Featured in 5 major design publications",
    detail: "Architecture is art. We designed a cinematic web experience that treated each project as a masterpiece, driving high-intent inquiries from luxury developers and private clients.",
    bullets: ["Artistic Direction", "Search Domination", "PR & Outreach"],
    image: "/portfolio-beton.png",
  },
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    designation: "CEO, Vantage Properties",
    quote: "Digizinc transformed our digital presence from a simple landing page into a lead-generating powerhouse. Their strategic approach to Meta ads reduced our cost-per-lead by 42% in just two months.",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Michael Chen",
    designation: "Founder, Solaris Energy",
    quote: "The level of technical expertise and creative flair the team brings is unmatched. They didn't just build a website; they built a conversion engine that understands our complex industry.",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Elena Rodriguez",
    designation: "Marketing Director, Aura Jewelry",
    quote: "Aura's luxury perception skyrocketed after the visual rebrand and cinematic ad campaigns. We sold out our holiday collection in record time. Professional, fast, and results-driven.",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "David Miller",
    designation: "Tech Lead, Nexa Commerce",
    quote: "The ROI we've seen since switching our retention strategy to Digizinc is staggering. They automated our customer lifecycle, resulting in a 38% increase in LTV within the first quarter.",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sophia Wei",
    designation: "Founder, Amaya Residences",
    quote: "The architectural visualization and creative direction for Amaya was world-class. They understood our target demographic perfectly and delivered a funnel that pre-qualified every lead.",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
];


const posts = [
  {
    slug: "how-to-lower-cac-with-creative-testing",
    title: "How to Lower CAC With a Creative Testing System",
    category: "Marketing Tips",
    excerpt: "A practical framework to test hooks, formats, and angles without burning ad spend.",
    date: "Jan 18, 2026",
    readingTime: 300,
    author: "Bhargava Raj",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    content:
      "Most teams test ads randomly. Elite teams test with structure. Start with one offer, build 3 audience clusters, and launch 5 creative angles per cluster. Measure thumb-stop rate, hold rate, and conversion rate before scaling.",
  },
  {
    slug: "case-study-from-1-2x-to-3x-roas",
    title: "Case Study: From 1.2x to 3x ROAS in 60 Days",
    category: "Case Studies",
    excerpt: "See exactly what changed in targeting, landing pages, and offer positioning.",
    date: "Feb 04, 2026",
    readingTime: 420,
    author: "Sanya Gupta",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    content:
      "We rebuilt the funnel from offer to thank-you page. The biggest wins came from message-market fit and pre-qualifying visitors before checkout. Performance improved week-over-week because each iteration was tied to one clear hypothesis.",
  },
  {
    slug: "what-high-ticket-brands-do-differently",
    title: "What High-Ticket Brands Do Differently in 2026",
    category: "Industry Insights",
    excerpt: "Premium brands align authority content, proof assets, and conversion pathways.",
    date: "Mar 12, 2026",
    readingTime: 360,
    author: "Vikram Shah",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    content:
      "Premium growth is not about louder ads. It is about stronger trust signals and cleaner positioning. Build proof into every stage: ads, landing pages, sales calls, and follow-up sequences. Consistency compounds conversions.",
  },
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
    image: "/bhargava-raj.png",
  },
  {
    name: "Sanya Gupta",
    role: "Creative Director",
    bio: "Award-winning designer obsessed with blending minimalism with high-impact visual storytelling.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Vikram Shah",
    role: "Head of Growth",
    bio: "Data scientist turned marketer specializing in ROAS-first performance campaigns.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rhea Kapoor",
    role: "Lead Strategist",
    bio: "Behavioral analyst focusing on building deep consumer trust through content ecosystems.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
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
    if (hash) {
      const id = hash.replace("#", "");
      const node = document.getElementById(id);
      if (node) {
        setTimeout(() => node.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

function AboutCarousel() {
  const images = ["/about-office-1.png", "/about-office-2.png", "/about-office-3.png"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
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

function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      id="enquiry"
      onSubmit={handleSubmit}
      className={`scroll-mt-32 md:scroll-mt-40 space-y-4 border border-white/10 bg-black/60 backdrop-blur-2xl p-5 text-left shadow-2xl shadow-black/50 rounded-2xl ${compact ? "" : "md:p-8"
        }`}
      aria-label="Lead enquiry form"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#F23030]">Get Free Audit</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required name="name" placeholder="Name" className="h-12 border border-white/10 bg-white/5 rounded-lg px-4 text-sm text-cream placeholder:text-zinc-500 focus:outline-none focus:border-[#F23030]/50 transition-colors" />
        <input required name="phone" placeholder="Phone Number" className="h-12 border border-white/10 bg-white/5 rounded-lg px-4 text-sm text-cream placeholder:text-zinc-500 focus:outline-none focus:border-[#F23030]/50 transition-colors" />
      </div>
      <input required type="email" name="email" placeholder="Email" className="h-12 w-full border border-white/10 bg-white/5 rounded-lg px-4 text-sm text-cream placeholder:text-zinc-500 focus:outline-none focus:border-[#F23030]/50 transition-colors" />
      <select required name="service" className="h-12 w-full border border-white/10 bg-white/5 rounded-lg px-4 text-sm text-zinc-400 focus:outline-none focus:border-[#F23030]/50 transition-colors">
        <option value="">Service Interested In</option>
        {services.map((service) => (
          <option value={service.title} key={service.slug}>
            {service.title}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        placeholder="Tell us your growth goals"
        rows={compact ? 3 : 4}
        className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-3 text-sm text-cream placeholder:text-zinc-500 focus:outline-none focus:border-[#F23030]/50 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#F23030] rounded-lg px-4 text-sm font-bold text-white transition hover:bg-[#A61F1F] disabled:opacity-70 shadow-lg shadow-red-900/20"
      >
        {status === "sending" ? "Sending..." : "Get Free Consultation"}
        <ArrowRight size={16} />
      </button>
      {status === "success" && <p className="text-xs font-medium text-emerald-600">Request sent. We will contact you shortly.</p>}
      {status === "error" && <p className="text-xs font-medium text-red-600">Could not submit right now. Please email hello@digizinc.com.</p>}
    </form>
  );
}

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // The footer reveal usually occupies the last viewport height.
      // We start fading out when the footer reveal begins.
      const threshold = documentHeight - windowHeight - 50;

      if (scrollY > threshold) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="flex h-14 md:h-16 items-center justify-between bg-black/40 backdrop-blur-xl px-6 transition-all duration-300 rounded-full border border-white/10 md:px-10 md:shadow-2xl md:shadow-red-900/10">
          <Link to="/" className="font-['Inter'] text-2xl font-bold tracking-tight text-[#F23030]">
            {brand}
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
              onClick={() => navigate("/contact#enquiry")}
              className="inline-flex h-10 items-center rounded-full bg-[#F23030] px-6 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#A61F1F] hover:shadow-lg hover:shadow-red-900/30 active:scale-95"
            >
              Get Free Audit
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
              <span className="font-['Inter'] text-2xl font-bold text-[#F23030]">{brand}</span>
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
                  navigate("/contact#enquiry");
                }}
                className="mt-6 inline-flex h-14 items-center bg-[#F23030] px-10 text-sm font-bold uppercase tracking-widest text-white rounded-full transition hover:bg-[#A61F1F]"
              >
                Get Free Audit
              </motion.button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}





function LandingPage() {
  const industryInfo: Record<string, any> = {
    'real-estate': {
      title: 'LUXURY',
      highlight: 'SPACES.',
      desc: 'Elevating property value through immersive digital experiences and high-end visual storytelling that captivates investors.',
      stats: [{ val: '15%', label: 'YIELD INCREASE' }, { val: '45+', label: 'PROJECTS' }],
      img: '/industry_tech.png'
    },
    'education': {
      title: 'ENLIGHTENED',
      highlight: 'BRANDING.',
      desc: 'Modernizing the pursuit of knowledge. We build platforms and identities for educational institutions that value both tradition and evolution.',
      stats: [{ val: '24%', label: 'ENROLLMENT UP' }, { val: '120+', label: 'GLOBAL REACH' }],
      img: '/industry_education.png'
    },
    'ecommerce': {
      title: 'CONVERSION',
      highlight: 'ENGINE.',
      desc: 'Engineering high-velocity digital storefronts that blend aesthetic excellence with forensic optimization for maximum ROI.',
      stats: [{ val: '300%', label: 'ROI BOOST' }, { val: '2M+', label: 'SHOPPERS' }],
      img: '/industry_tech.png'
    },
    'healthcare': {
      title: 'DIGITAL',
      highlight: 'TRUST.',
      desc: 'Bridging the gap between patient care and digital innovation through secure, human-centered design for modern medical leaders.',
      stats: [{ val: '40%', label: 'GROWTH' }, { val: '15+', label: 'AWARDS' }],
      img: '/industry_education.png'
    },
    'it-saas': {
      title: 'SCALABLE',
      highlight: 'SYSTEMS.',
      desc: 'Fueling hyperscale growth for SaaS and Tech through aggressive brand positioning and precision-engineered digital products.',
      stats: [{ val: '10X', label: 'FASTER SCALE' }, { val: '500k+', label: 'USERS' }],
      img: '/industry_tech.png'
    },
    'corporate': {
      title: 'MARKET',
      highlight: 'AUTHORITY.',
      desc: 'Establishing market dominance for professional services through sophisticated brand systems and strategic digital dominance.',
      stats: [{ val: '50%', label: 'EFFICIENCY' }, { val: '100+', label: 'PARTNERS' }],
      img: '/industry_education.png'
    }
  };

  return (
    <>
      <HeroSection />

      <main>
        <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-['Bebas Neue'] text-4xl font-bold tracking-tight text-cream md:text-5xl lg:text-5.5xl leading-[1.1]"
                >
                  ABOUT US
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="max-w-xl text-lg leading-relaxed text-zinc-400"
                >
                  We're not your typical design agency. Founded in 2014, we're a collective of designers, developers, and strategists who believe great digital experiences should be beautiful, functional, and human-centered. From startups to global brands, we help ambitious businesses stand out.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-3xl group shadow-2xl"
              >
                <AboutCarousel />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
              </motion.div>
            </div>


          </motion.div>
        </section>

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
              className="mt-8 flex gap-6 overflow-x-auto pt-4 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'visible' }}
              onScroll={(e) => {
                const target = e.currentTarget;
                const progress = (target.scrollLeft / (target.scrollWidth - target.clientWidth)) * 100;
                const bar = document.getElementById('services-progress-bar');
                if (bar) bar.style.width = `${progress}%`;
              }}
            >
              {services.map((service, index) => {
                const cardImages: Record<string, string> = {
                  'branding-identity': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
                  'website-design-development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
                  'content-creation-storytelling': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
                  'print-packaging': 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=800&q=80',
                  'advertising-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                  'ui-ux-digital-experience': 'https://images.unsplash.com/photo-1541462608141-ad67577467b4?auto=format&fit=crop&w=800&q=80',
                  'motion-video-production': 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
                  'illustration-custom-artwork': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
                  'experiential-interactive-design': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
                  'photography-visual-content': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
                };

                return (
                  <motion.article
                    key={service.slug}
                    className="relative min-w-[300px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] h-[320px] md:h-[450px] flex flex-col items-start justify-center overflow-hidden rounded-2xl p-8 md:p-10 snap-start transition-all duration-500 hover:scale-[1.02] group"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(242, 48, 48, 0.7), rgba(166, 31, 31, 0.85), rgba(13, 13, 13, 0.95)), url('${cardImages[service.slug] || cardImages['branding-identity']}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="relative z-10 w-full">
                      <h3 className="font-['Inter'] text-2xl font-[900] leading-[0.95] tracking-tighter text-white md:text-3xl lg:text-[2.25rem] uppercase mb-4 drop-shadow-xl">
                        {service.title.replace(' & ', ',\n')}
                      </h3>
                      <p className="max-w-[260px] text-[13px] font-normal leading-relaxed text-white/80 md:text-sm lg:text-[15px]">
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

        <section id="industries" className="bg-zinc-950 text-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-12"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">INDUSTRIES</p>
                <h2 className="mt-3 font-['Inter'] text-3xl font-bold text-cream/80 md:text-5xl">WHO WE BUILD FOR</h2>
              </div>
              <div className="hidden items-center gap-4 md:flex">
                <button
                  onClick={() => {
                    const carousel = document.getElementById('industries-carousel');
                    if (carousel) carousel.scrollBy({ left: -400, behavior: 'smooth' });
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-transparent/5 transition hover:bg-transparent/20"
                >
                  <ChevronLeft size={24} className="text-[#A61F1F]" />
                </button>
                <button
                  onClick={() => {
                    const carousel = document.getElementById('industries-carousel');
                    if (carousel) carousel.scrollBy({ left: 400, behavior: 'smooth' });
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-transparent/5 transition hover:bg-transparent/20"
                >
                  <ChevronRight size={24} className="text-[#A61F1F]" />
                </button>
              </div>
            </motion.div>

            <div
              id="industries-carousel"
              className="flex gap-6 overflow-x-auto pt-4 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={(e) => {
                const target = e.currentTarget;
                const progress = (target.scrollLeft / (target.scrollWidth - target.clientWidth)) * 100;
                const bar = document.getElementById('industries-progress-bar');
                if (bar) bar.style.width = `${progress}%`;
              }}
            >
              {Object.entries(industryInfo).map(([id, info], index) => (
                <motion.article
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative min-w-[300px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] flex flex-col items-start justify-between overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/5 p-8 snap-start transition-all duration-500 hover:scale-[1.02] group shadow-2xl h-[580px] md:h-[620px]"
                >
                  <div className="relative z-10 w-full">
                    <h3 className="mb-4 text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#F23030] transition-colors duration-300">
                      {id.replace('-', ' ')}
                    </h3>
                    <p className="mb-8 text-sm leading-relaxed text-zinc-400">
                      {info.desc}
                    </p>
                    <div className="mb-8 flex justify-start gap-8">
                      {info.stats.map((stat: any, i: number) => (
                        <div key={i}>
                          <p className="text-2xl font-bold text-[#A61F1F]">{stat.val}</p>
                          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-auto w-[calc(100%+4rem)] h-64 overflow-hidden -mx-8 -mb-8">
                    <img
                      src={info.img}
                      alt=""
                      width={400}
                      height={256}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Progress Bar Area */}
            <div className="mt-8 flex items-center justify-between gap-8 md:mt-12">
              <div className="relative h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                <div
                  id="industries-progress-bar"
                  className="absolute left-0 top-0 h-full bg-[#F23030] transition-all duration-300"
                  style={{ width: '0%' }}
                />
              </div>
              <p className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 md:block">Swipe to explore</p>
            </div>
            <p className="mt-4 block text-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 md:hidden">Swipe to explore</p>
          </div>
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
                View All Projects
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
                      src={project.image}
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

        <section id="pricing" className="bg-zinc-950 py-16 text-white md:py-28 border-y border-white/5">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <PricingSection
              plans={PLANS}
              heading="PLANS THAT SCALE WITH YOU"
              description="Whether you're just starting out or growing fast, our flexible pricing has you covered — with no hidden costs."
            />
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
            {posts.map((post, idx) => (
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
              'video-production': '/service_video.png',
              'motion-video-production': '/service_video.png',
              'advertising-marketing': '/service_ppc.png',
              'content-creation-storytelling': '/service_social.png',
              'search-engine-optimization': '/service_seo.png',
              'branding-identity': '/service_branding.png',
              'website-design-development': '/service_web.png',
              'print-packaging': '/service_print.png',
              'ui-ux-digital-experience': '/service_uiux.png',
              'illustration-custom-artwork': '/service_illustration.png',
              'experiential-interactive-design': '/service_interactive.png',
              'photography-visual-content': 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=800&q=80',
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
                  backgroundImage: `linear-gradient(to bottom, rgba(242, 48, 48, 0.7), rgba(166, 31, 31, 0.85), rgba(13, 13, 13, 0.95)), url('${cardImages[service.slug] || cardImages['branding-identity']}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
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

function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-32 pb-16 md:px-6 md:pt-40 md:pb-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">Our Story</p>
            <h1 className="mt-4 font-['Inter'] text-4xl font-bold text-cream/80 md:text-6xl">
              We build the future of premium brands.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              Founded on the belief that bold creative should be backed by precision data, <strong>Digizinc</strong> started as a small strategy boutique. Today, we are a full-scale growth partner for ambitious brands who refuse to settle for average.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              We don't just run ads or build websites; we design ecosystems that dominate markets and command authority.
            </p>
          </div>
          <div className="relative aspect-square">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
              alt="Digizinc office"
              width={600}
              height={600}
              loading="lazy"
              className="h-full w-full object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-['Inter'] text-3xl font-bold text-[#A61F1F]">The Mission</h2>
              <p className="mt-4 text-xl leading-relaxed text-zinc-300">
                To bridge the gap between human emotion and digital performance, empowering brands to speak with conviction and scale with certainty.
              </p>
            </div>
            <div>
              <h2 className="font-['Inter'] text-3xl font-bold text-[#A61F1F]">The Vision</h2>
              <p className="mt-4 text-xl leading-relaxed text-zinc-300">
                To become the global gold standard for agencies that blend cinematic creative with forensic data analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-transparent/40 md:bg-transparent py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">Methodology</p>
            <h2 className="mt-4 font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl">Our Proven Process.</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-5">
            {[
              { step: "01", title: "Audit", desc: "Forensic research to find growth leaks.", icon: <Search size={24} /> },
              { step: "02", title: "Strategy", desc: "Tailored roadmap for market dominance.", icon: <MapPin size={24} /> },
              { step: "03", title: "Creative", desc: "Cinematic production and high-fidelity dev.", icon: <Palette size={24} /> },
              { step: "04", title: "Launch", desc: "Precision targeting across all channels.", icon: <Sparkles size={24} /> },
              { step: "05", title: "Scale", desc: "Performance tracking and future handoff.", icon: <Rocket size={24} /> },
            ].map((p, i) => (
              <div key={p.step} className="relative group">
                {i < 4 && (
                  <div className="absolute right-0 top-8 z-0 hidden h-[2px] w-full bg-zinc-200 md:block translate-x-1/2" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent border-2 border-[#A61F1F] text-[#F23030] transition duration-500 group-hover:bg-[#F23030] group-hover:text-white group-hover:border-[#F23030] shadow-xl">
                    {p.icon}
                  </div>
                  <span className="mt-4 text-xs font-bold uppercase tracking-widest text-[#F23030]">{p.step}</span>
                  <h3 className="mt-2 font-['Inter'] text-xl font-bold text-cream">{p.title}</h3>
                  <p className="mt-3 text-sm text-zinc-400 px-2">{p.desc}</p>
                </div>
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
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="group flex flex-col items-center text-center">
              <div className="overflow-hidden shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={400}
                  loading="lazy"
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 font-['Inter'] text-xl font-bold text-cream/80">{member.name}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[#F23030]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-transparent/40 md:bg-transparent py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl">Ready to write your growth story?</h2>
          <p className="mt-6 text-lg text-zinc-400">
            Join the ranks of premium brands that scale with Digizinc. Let's discuss your targets.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex h-14 items-center bg-[#F23030] px-10 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#920015]"
          >
            Start Your Audit
          </Link>
        </div>
      </section>
    </main>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams();
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

  return (
    <main className="mx-auto max-w-4xl px-4 pt-32 pb-14 md:px-6 md:pt-40 md:pb-18">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">Service Detail</p>
      <h1 className="mt-3 font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl">{service.title}</h1>
      <p className="mt-5 text-zinc-400">{service.detail}</p>
      <ul className="mt-8 space-y-3 text-zinc-800">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3 border-l-2 border-[#A61F1F] pl-3">
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-10 border border-white/10 p-6">
        <h2 className="font-['Inter'] text-2xl font-bold text-cream/80">Need this for your brand?</h2>
        <p className="mt-3 text-sm text-zinc-400">Book a consultation and get a custom plan in 48 hours.</p>
        <Link to="/#enquiry" className="mt-5 inline-flex h-10 items-center bg-[#F23030] px-4 text-sm font-semibold text-white">
          Get Free Consultation
        </Link>
      </div>
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
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">{project.industry}</p>
          <h1 className="mt-3 font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl">{project.company}</h1>
          <img
            src={project.image}
            alt={project.company}
            width={800}
            height={450}
            loading="lazy"
            className="mt-8 h-80 w-full object-cover shadow-xl md:h-[450px]"
          />
          <div className="mt-10">
            <h2 className="font-['Inter'] text-2xl font-bold text-cream">Project Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">{project.detail}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border border-white/5 md:border-white/10 bg-transparent/40 md:bg-transparent p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Before</p>
              <p className="mt-2 font-medium text-zinc-800">{project.before}</p>
            </div>
            <div className="border border-emerald-100 bg-emerald-50 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">After</p>
              <p className="mt-2 font-bold text-emerald-900">{project.after}</p>
            </div>
          </div>


        </section>
        <aside className="space-y-8">
          <div className="border border-[#A61F1F]/30 bg-transparent p-8 shadow-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-[#F23030]">Measurable Result</p>
            <p className="mt-4 font-['Inter'] text-3xl font-bold text-[#F23030]">{project.result}</p>
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
            <div key={i} className="group relative overflow-hidden transition-all md:bg-transparent md:hover:shadow-xl">
              <div className="flex h-full w-full items-center justify-center border border-white/10 bg-transparent/40 md:bg-transparent/50 p-4 transition-colors group-hover:bg-white/5 md:border-none md:bg-transparent md:p-0 md:group-hover:bg-transparent">
                <img
                  src={typeof item === 'string' ? item : `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=800&q=20`}
                  alt={`Gallery media ${i}`}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="h-auto w-full object-contain transition duration-500 group-hover:scale-105 md:object-cover md:shadow-xl"
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
                src={project.image}
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
    <main className="mx-auto max-w-6xl px-4 pt-32 pb-14 md:px-6 md:pt-40 md:pb-18">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030]">Blog</p>
      <h1 className="mt-3 font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl">Marketing intelligence from the field.</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="border border-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{post.category}</p>
            <h2 className="mt-3 text-2xl font-semibold text-cream/80">{post.title}</h2>
            <p className="mt-3 text-sm text-zinc-400">{post.excerpt}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-zinc-500">{post.date}</p>
            <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F23030]">
              Read Article
              <ArrowRight size={16} />
            </Link>
          </article>
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
    <main className="mx-auto max-w-3xl px-4 pt-32 pb-14 md:px-6 md:pt-40 md:pb-18">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{post.category}</p>
      <h1 className="mt-3 font-['Inter'] text-4xl font-bold text-cream/80 md:text-5xl">{post.title}</h1>
      <p className="mt-3 text-sm uppercase tracking-[0.12em] text-zinc-500">{post.date}</p>
      <article className="mt-8 border-l-2 border-[#A61F1F] pl-5 text-lg leading-relaxed text-zinc-800">{post.content}</article>
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
          <EnquiryForm />
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
          <p className="font-['Inter'] text-2xl font-bold text-white">{brand}</p>
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

  const handleSplashFinished = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
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
    </div>
  );
}