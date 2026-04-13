import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
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

const brand = "Digizinc";
const formEndpoint = "https://formsubmit.co/ajax/hello@digizinc.com";

const services = [
  {
    slug: "branding-identity",
    title: "Branding & Identity",
    footerTitle: "Branding",
    icon: Palette,
    short: "Crafting distinct identities that resonate with your audience and define your market presence.",
    detail:
      "We build comprehensive brand systems including logo design, color theory, and verbal identity that ensure your brand stands out in a crowded marketplace. Every element is crafted to communicate your core values with precision and flair.",
    bullets: ["Visual Identity Systems", "Brand Strategy & Positioning", "Voice & Tone Guidelines"],
  },
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    footerTitle: "Web Design",
    icon: Laptop,
    short: "High-performance digital homes built for speed, conversion, and premium user experience.",
    detail:
      "From custom landing pages to complex enterprise platforms, we develop responsive, SEO-ready websites that turn visitors into loyal customers. Our development process prioritizes clean code and lightning-fast performance.",
    bullets: ["Responsive Web Design", "Custom CMS Integration", "Performance Optimization"],
  },
  {
    slug: "content-creation-storytelling",
    title: "Content Creation & Storytelling",
    footerTitle: "Content",
    icon: MessageSquare,
    short: "Narratives that captivate and convert through strategic content across all digital touchpoints.",
    detail:
      "We turn your brand's mission into compelling stories that build authority and community engagement. Through high-value blogs, social narratives, and email sequences, we keep your audience coming back for more.",
    bullets: ["Editorial Strategy", "Social Media Content", "Copywriting & Scripting"],
  },
  {
    slug: "print-packaging",
    title: "Print & Packaging",
    footerTitle: "Print & Packaging",
    icon: Box,
    short: "Tangible brand experiences through premium packaging design and high-quality print collateral.",
    detail:
      "We bring your brand into the physical world with sustainable packaging solutions and stunning print materials. From the unboxing experience to the feel of the cardstock, every detail matters.",
    bullets: ["Product Packaging Design", "Stationery & Collateral", "Premium Print Finishing"],
  },
  {
    slug: "advertising-marketing",
    title: "Advertising & Marketing",
    footerTitle: "Advertising",
    icon: Megaphone,
    short: "Omnichannel campaigns engineered to scale your pipeline and maximize return on ad spend.",
    detail:
      "We combine data-driven strategy with creative excellence to run profitable campaigns across Google, Meta, and LinkedIn. Our approach ensures every dollar spent is an investment in measurable growth.",
    bullets: ["Paid Search & Social", "Ad Creative Strategy", "Analytics & Attribution"],
  },
  {
    slug: "ui-ux-digital-experience",
    title: "UI/UX & Digital Experience",
    footerTitle: "UI/UX",
    icon: Layers3,
    short: "Intuitive interfaces designed to solve complex problems and provide seamless user journeys.",
    detail:
      "We focus on user-centric design principles to create interactive prototypes and final products that delight users and drive results. Our designs bridge the gap between technical complexity and effortless usability.",
    bullets: ["User Research & Testing", "Interactive Prototyping", "Design System Management"],
  },
  {
    slug: "motion-video-production",
    title: "Motion & Video Production",
    footerTitle: "Motion",
    icon: Video,
    short: "Dynamic visual storytelling through professional video production and high-impact motion graphics.",
    detail:
      "From cinematic brand films to social-first video ads, we bring your message to life with professional production and engaging animation. We capture attention in seconds and hold it with quality.",
    bullets: ["Commercial Video Production", "2D/3D Motion Graphics", "Social Video Optimization"],
  },
  {
    slug: "illustration-custom-artwork",
    title: "Illustration & Custom Artwork",
    footerTitle: "Illustration",
    icon: PenTool,
    short: "Unique visual assets and bespoke illustrations that give your brand a one-of-a-kind personality.",
    detail:
      "Our artists create custom icons, illustrations, and digital art that differentiate your brand from the cookie-cutter competitors. We add a human touch to your digital presence through mastery of craft.",
    bullets: ["Custom Iconography", "Digital Illustration", "Character Design"],
  },
  {
    slug: "experiential-interactive-design",
    title: "Experiential & Interactive Design",
    footerTitle: "Interactive",
    icon: Sparkles,
    short: "Immersive digital and physical experiences that bridge the gap between brands and their audiences.",
    detail:
      "We design interactive installations, AR/VR experiences, and digital activations that leave a lasting impression. We create moments of wonder that turn passive observers into active participants.",
    bullets: ["Interactive Installations", "AR/VR Filters & Apps", "Event Digital Strategy"],
  },
  {
    slug: "photography-visual-content",
    title: "Photography & Visual Content",
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
  },
  {
    slug: "monarch-residences",
    company: "Monarch Residences",
    industry: "Real Estate",
    before: "Stagnant offline sales with zero digital footprint",
    after: "Complete sell-out of Phase 1 within 3 months",
    result: "45 premium units sold digitally",
    detail: "A premium luxury development required a premium digital aura. We built a high-end visual narrative that emphasized lifestyle over specs, driving elite quality traffic to a private viewing funnel.",
    bullets: ["Luxury Branding", "High-Ticket Lead Gen", "Architectural Visualization"],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "solaris-energy",
    company: "Solaris Energy",
    industry: "Renewable Energy",
    before: "Technical complexity making the offer confusing",
    after: "64% increase in consultation requests",
    result: "300+ solar audits booked monthly",
    detail: "Renewable energy sales are about trust and clarity. We simplified the messaging and built interactive calculators that showed immediate ROI, significantly lowering the barrier to entry for homeowners.",
    bullets: ["Educational Content", "Conversion Funnels", "Technical SEO"],
    image:
      "https://images.unsplash.com/photo-1509391366360-fe5bb6583e22?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "apex-learning",
    company: "Apex Learning",
    industry: "Education",
    before: "Poor conversion from webinar traffic",
    after: "2.7x lead-to-enrollment uplift",
    result: "11,000+ prospective students reached",
    detail: "We overhauled the registration process and post-webinar follow-up sequences. By introducing personalized SMS and email tracks, we kept the momentum high from the first click to enrollment.",
    bullets: ["Funnel Automation", "EdTech Strategy", "Retention Systems"],
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "nexa-commerce",
    company: "Nexa Commerce",
    industry: "E-commerce",
    before: "Inconsistent revenue and no retention system",
    after: "4.1x blended ROAS with retention strategy",
    result: "$920K attributed revenue in one quarter",
    detail: "Our strategy focused on scaling winner products while building an automated LTV system. We reduced reliance on cold traffic by maximizing the value of existing customers through data-driven loyalty loops.",
    bullets: ["E-com Paid Acquisition", "Email Retention", "Inventory Scaling"],
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "aura-jewelry",
    company: "Aura Jewelry",
    industry: "Luxury Retail",
    before: "Low brand perception and weak creative assets",
    after: "38% increase in average order value (AOV)",
    result: "Sold out luxury collection in 21 days",
    detail: "Jewelry is emotional. We produced cinematic visual content and implemented high-conversion store layouts that showcased the craft. Strategic influencer partnerships further solidified the premium brand positioning.",
    bullets: ["Visual Storytelling", "Social Media Scale", "Premium CRO"],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  },
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, Vantage Properties",
    content: "Digizinc transformed our digital presence from a simple landing page into a lead-generating powerhouse. Their strategic approach to Meta ads reduced our cost-per-lead by 42% in just two months.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder, Solaris Energy",
    content: "The level of technical expertise and creative flair the team brings is unmatched. They didn't just build a website; they built a conversion engine that understands our complex industry.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director, Aura Jewelry",
    content: "Aura's luxury perception skyrocketed after the visual rebrand and cinematic ad campaigns. We sold out our holiday collection in record time. Professional, fast, and results-driven.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    name: "David Miller",
    role: "Tech Lead, Nexa Commerce",
    content: "The ROI we've seen since switching our retention strategy to Digizinc is staggering. They automated our customer lifecycle, resulting in a 38% increase in LTV within the first quarter.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    name: "Sophia Wei",
    role: "Founder, Amaya Residences",
    content: "The architectural visualization and creative direction for Amaya was world-class. They understood our target demographic perfectly and delivered a funnel that pre-qualified every lead.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
];

function CarouselReviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative mt-12 flex flex-col items-center justify-center px-4 md:px-14">
      <div className="relative flex w-full items-center justify-center">
        <button
          onClick={prev}
          className="absolute left-0 z-10 hidden h-12 w-12 items-center justify-center border border-white/10 bg-white/5 transition hover:bg-white/20 md:flex"
          aria-label="Previous review"
        >
          <ChevronLeft size={24} className="text-[#D4AF37]" />
        </button>

        <div className="relative min-h-[480px] w-full max-w-4xl py-8 sm:min-h-[340px] md:min-h-[280px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(_, info) => {
                const swipe = info.offset.x;
                if (swipe < -50) next();
                else if (swipe > 50) prev();
              }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 flex cursor-grab active:cursor-grabbing flex-col items-center justify-center px-4 text-center md:px-8"
            >
              <div className="mb-6 flex gap-1">
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <div key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37] md:h-5 md:w-5">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.322 9.397c-.784-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                  </div>
                ))}
              </div>
              <p className="max-w-3xl font-['Playfair_Display'] text-lg leading-relaxed text-zinc-200 md:text-2xl md:leading-relaxed select-none">
                "{testimonials[index].content}"
              </p>
              <div className="mt-8 flex flex-col items-center gap-2">
                <img src={testimonials[index].image} alt={testimonials[index].name} className="h-14 w-14 rounded-full object-cover grayscale" />
                <div className="text-center">
                  <p className="font-bold text-white tracking-wide">{testimonials[index].name}</p>
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-semibold">{testimonials[index].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="absolute right-0 z-10 hidden h-12 w-12 items-center justify-center border border-white/10 bg-white/5 transition hover:bg-white/20 md:flex"
          aria-label="Next review"
        >
          <ChevronRight size={24} className="text-[#D4AF37]" />
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-1 transition-all duration-300 ${
              i === index ? "w-8 bg-[#D4AF37]" : "w-4 bg-white/20"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const posts = [
  {
    slug: "how-to-lower-cac-with-creative-testing",
    title: "How to Lower CAC With a Creative Testing System",
    category: "Marketing Tips",
    excerpt: "A practical framework to test hooks, formats, and angles without burning ad spend.",
    date: "Jan 18, 2026",
    content:
      "Most teams test ads randomly. Elite teams test with structure. Start with one offer, build 3 audience clusters, and launch 5 creative angles per cluster. Measure thumb-stop rate, hold rate, and conversion rate before scaling.",
  },
  {
    slug: "case-study-from-1-2x-to-3x-roas",
    title: "Case Study: From 1.2x to 3x ROAS in 60 Days",
    category: "Case Studies",
    excerpt: "See exactly what changed in targeting, landing pages, and offer positioning.",
    date: "Feb 04, 2026",
    content:
      "We rebuilt the funnel from offer to thank-you page. The biggest wins came from message-market fit and pre-qualifying visitors before checkout. Performance improved week-over-week because each iteration was tied to one clear hypothesis.",
  },
  {
    slug: "what-high-ticket-brands-do-differently",
    title: "What High-Ticket Brands Do Differently in 2026",
    category: "Industry Insights",
    excerpt: "Premium brands align authority content, proof assets, and conversion pathways.",
    date: "Mar 12, 2026",
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
    <span className="font-['Playfair_Display'] text-3xl font-bold text-[#B3001B] md:text-4xl">
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
      onSubmit={handleSubmit}
      className={`space-y-4 border border-white/20 bg-white p-5 text-left shadow-2xl shadow-black/30 backdrop-blur-sm ${
        compact ? "" : "md:p-6"
      }`}
      aria-label="Lead enquiry form"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Get Free Audit</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required name="name" placeholder="Name" className="h-11 border border-black/10 px-3 text-sm text-zinc-900 placeholder:text-zinc-400" />
        <input required name="phone" placeholder="Phone Number" className="h-11 border border-black/10 px-3 text-sm text-zinc-900 placeholder:text-zinc-400" />
      </div>
      <input required type="email" name="email" placeholder="Email" className="h-11 w-full border border-black/10 px-3 text-sm text-zinc-900 placeholder:text-zinc-400" />
      <select required name="service" className="h-11 w-full border border-black/10 px-3 text-sm text-zinc-700">
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
        className="w-full border border-black/10 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 w-full items-center justify-center gap-2 bg-[#B3001B] px-4 text-sm font-semibold text-white transition hover:bg-[#920015] disabled:opacity-70"
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
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#B3001B]">
            {brand}
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition hover:text-[#B3001B] ${isActive ? "text-[#B3001B]" : "text-zinc-700"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={() => scrollLink("enquiry")}
              className="inline-flex h-10 items-center bg-[#B3001B] px-4 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#920015]"
            >
              Get Free Audit
            </button>
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center text-[#B3001B] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={32} />
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
            className="fixed inset-0 z-[10000] flex flex-col !bg-white"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="flex h-18 items-center justify-between px-4 border-b border-black/5">
              <span className="font-['Playfair_Display'] text-2xl font-bold text-[#B3001B]">{brand}</span>
              <button onClick={() => setOpen(false)} className="p-2 text-zinc-900">
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
                    className="font-['Playfair_Display'] text-4xl font-bold text-zinc-900 transition hover:text-[#B3001B]"
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
                  const node = document.getElementById("enquiry");
                  if (node) node.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 inline-flex h-14 items-center bg-[#B3001B] px-10 text-sm font-bold uppercase tracking-widest text-white"
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

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-black text-white"
      style={{
        backgroundImage:
          "linear-gradient(95deg, rgba(20,0,0,0.88) 12%, rgba(20,0,0,0.64) 48%, rgba(20,0,0,0.72) 100%), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1900&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(179,0,27,0.55),transparent_48%),radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.28),transparent_42%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-12 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="mb-4 inline-flex items-center gap-2 border border-[#D4AF37]/50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
            <ShieldCheck size={14} />
            Premium Growth Partner
          </p>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-6xl">
            We Build Brands That Dominate Their Market.
          </h1>
          <p className="mt-5 max-w-xl text-base text-zinc-200 md:text-lg">
            Digizinc helps ambitious brands scale revenue through performance marketing, bold creative, and precision strategy.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex h-11 items-center bg-[#B3001B] px-5 text-sm font-semibold text-white transition hover:bg-[#920015]">
              Get Free Consultation
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex h-11 items-center border border-white/60 px-5 text-sm font-semibold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              View Our Work
            </Link>
          </div>

        </motion.div>
        <motion.div
          id="enquiry"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto w-full max-w-lg"
        >
          <EnquiryForm compact />
        </motion.div>
      </div>
    </section>
  );
}

function LogoMarquee() {
  const logos = ["Vantage", "Nexa", "Monarch", "Apex", "Northline", "Solaris"];
  return (
    <div className="flex overflow-hidden bg-zinc-950 border-y border-white/5 py-10">
      <div className="flex shrink-0 items-center border-r border-white/10 px-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Trusted By</span>
      </div>
      <div className="flex overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <span
              key={i}
              className="mx-12 font-['Playfair_Display'] text-2xl font-bold uppercase tracking-widest text-[#D4AF37]/50 transition hover:text-[#D4AF37]"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <>
      <HeroSection />
      <LogoMarquee />

      <main>
        <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">About Us</p>
              <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-bold text-zinc-950 md:text-4xl">
                We scale brands with discipline, speed, and premium execution.
              </h2>
              <p className="mt-4 max-w-2xl text-zinc-700">
                For over a decade, we have helped founders and enterprise teams break growth plateaus. Our mission is simple: turn marketing into a predictable revenue engine through elite strategy and relentless optimization.
              </p>
              <p className="mt-4 max-w-2xl text-zinc-700">
                You get one accountable team, one growth roadmap, and one standard: measurable outcomes.
              </p>
            </div>
            <div className="space-y-8 border-l-2 border-[#D4AF37] pl-6">
              <div>
                <Counter target={120} suffix="+" />
                <p className="mt-2 text-sm uppercase tracking-[0.12em] text-zinc-500">Brands Scaled</p>
              </div>
              <div>
                <Counter target={5} suffix="M+" />
                <p className="mt-2 text-sm uppercase tracking-[0.12em] text-zinc-500">Reach Generated</p>
              </div>
              <div>
                <Counter target={94} suffix="%" />
                <p className="mt-2 text-sm uppercase tracking-[0.12em] text-zinc-500">Client Retention Rate</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="services" className="bg-zinc-950 py-16 text-white md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">Services</p>
                <h2 className="mt-3 max-w-2xl font-['Playfair_Display'] text-3xl font-bold md:text-4xl">Focused capabilities that drive pipeline and revenue.</h2>
              </div>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition hover:text-[#c39b1f]">
                View All Services
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {services.slice(0, 4).map((service, index) => (
                <motion.article
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.55 }}
                  className="border border-white/10 bg-white/5 p-6 transition hover:border-[#D4AF37]/70 hover:bg-white/10"
                >
                  <service.icon size={20} className="text-[#D4AF37]" />
                  <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-sm text-zinc-300">{service.short}</p>
                  <Link to={`/services/${service.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                    Learn More
                    <ChevronRight size={16} />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Industries We Serve</p>
          <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-bold text-zinc-950 md:text-4xl">Tailored strategies for every industry.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {industries.map((industry) => (
              <div key={industry.label} className="flex items-center gap-3 border border-zinc-200 px-4 py-4 text-zinc-800 transition hover:border-[#B3001B] hover:text-[#B3001B]">
                <industry.icon size={18} />
                <span className="font-medium">{industry.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="bg-zinc-50 py-16 md:py-20">
          {/* Existing Portfolio Content */}
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Work</p>
                <h2 className="mt-3 max-w-2xl font-['Playfair_Display'] text-3xl font-bold text-zinc-950 md:text-4xl">Results built on before-and-after outcomes.</h2>
              </div>
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-[#B3001B] transition hover:text-[#7a0012]">
                View All Projects
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  to={`/portfolio/${project.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-zinc-900"
                >
                  <img
                    src={project.image}
                    alt={project.company}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-40"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                      {project.industry}
                    </p>
                    <h3 className="mt-1 font-['Playfair_Display'] text-2xl font-bold text-white">
                      {project.company}
                    </h3>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white">
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-zinc-950 py-16 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">Voice of Authority</p>
              <h2 className="mt-4 font-['Playfair_Display'] text-3xl font-bold md:text-5xl">Success heard from the industry.</h2>
            </div>
            <CarouselReviews />
          </div>
        </section>

        <section id="blog" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Blog</p>
              <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-bold text-zinc-950 md:text-4xl">Insights for teams that want to scale faster.</h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#B3001B] transition hover:text-[#7a0012]">
              View All Posts
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="border border-zinc-200 p-5 transition hover:border-[#B3001B]">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{post.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-zinc-950">{post.title}</h3>
                <p className="mt-3 text-sm text-zinc-700">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B3001B]">
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#B3001B] py-16 text-white md:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-6xl px-4 md:px-6"
          >
            <div className="border border-[#D4AF37]/60 p-8 md:flex md:items-center md:justify-between md:gap-8 md:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">Ready to Scale Your Brand?</p>
                <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-bold md:text-4xl">Let&apos;s build something powerful together.</h2>
                <p className="mt-3 max-w-xl text-sm text-red-100">Book a strategy call with our lead team and receive a personalized growth roadmap.</p>
              </div>
              <a href="#enquiry" className="mt-6 inline-flex h-11 items-center bg-[#D4AF37] px-5 text-sm font-semibold text-black transition hover:bg-[#c39b1f] md:mt-0">
                Book a Free Strategy Call
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-18">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Our Services</p>
      <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">Solutions tailored for exponential brand growth.</h1>
      <p className="mt-5 max-w-2xl text-lg text-zinc-700">From digital-first identities to tangible physical experiences, Digizinc provides a comprehensive ecosystem of creative and strategic capabilities.</p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.slug} className="border border-zinc-200 p-6">
            <service.icon size={20} className="text-[#B3001B]" />
            <h2 className="mt-3 text-2xl font-semibold text-zinc-950">{service.title}</h2>
            <p className="mt-3 text-zinc-700">{service.detail}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-[#D4AF37]" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link to={`/services/${service.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B3001B]">
              Learn More
              <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Our Story</p>
            <h1 className="mt-4 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-6xl">
              We build the future of premium brands.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-zinc-600">
              Founded on the belief that bold creative should be backed by precision data, <strong>Digizinc</strong> started as a small strategy boutique. Today, we are a full-scale growth partner for ambitious brands who refuse to settle for average.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">
              We don't just run ads or build websites; we design ecosystems that dominate markets and command authority.
            </p>
          </div>
          <div className="relative aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
              alt="Digizinc office" 
              className="h-full w-full object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#D4AF37]">The Mission</h2>
              <p className="mt-4 text-xl leading-relaxed text-zinc-300">
                To bridge the gap between human emotion and digital performance, empowering brands to speak with conviction and scale with certainty.
              </p>
            </div>
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#D4AF37]">The Vision</h2>
              <p className="mt-4 text-xl leading-relaxed text-zinc-300">
                To become the global gold standard for agencies that blend cinematic creative with forensic data analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Methodology</p>
            <h2 className="mt-4 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">Our Proven Process.</h2>
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
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-[#D4AF37] text-[#B3001B] transition duration-500 group-hover:bg-[#B3001B] group-hover:text-white group-hover:border-[#B3001B] shadow-xl">
                    {p.icon}
                  </div>
                  <span className="mt-4 text-xs font-bold uppercase tracking-widest text-[#B3001B]">{p.step}</span>
                  <h3 className="mt-2 font-['Playfair_Display'] text-xl font-bold text-zinc-900">{p.title}</h3>
                  <p className="mt-3 text-sm text-zinc-600 px-2">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">The Team</p>
          <h2 className="mt-4 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">Meet the Strategists.</h2>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="group flex flex-col items-center text-center">
              <div className="overflow-hidden shadow-lg">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 font-['Poppins'] text-xl font-bold text-zinc-950">{member.name}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[#B3001B]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">Ready to write your growth story?</h2>
          <p className="mt-6 text-lg text-zinc-600">
            Join the ranks of premium brands that scale with Digizinc. Let's discuss your targets.
          </p>
          <Link 
            to="/contact" 
            className="mt-10 inline-flex h-14 items-center bg-[#B3001B] px-10 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#920015]"
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
        <h1 className="font-['Playfair_Display'] text-4xl font-bold">Service not found.</h1>
        <Link to="/services" className="mt-4 inline-block text-[#B3001B]">
          Back to Services
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-18">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Service Detail</p>
      <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">{service.title}</h1>
      <p className="mt-5 text-zinc-700">{service.detail}</p>
      <ul className="mt-8 space-y-3 text-zinc-800">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3 border-l-2 border-[#D4AF37] pl-3">
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-10 border border-zinc-200 p-6">
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-950">Need this for your brand?</h2>
        <p className="mt-3 text-sm text-zinc-700">Book a consultation and get a custom plan in 48 hours.</p>
        <Link to="/#enquiry" className="mt-5 inline-flex h-10 items-center bg-[#B3001B] px-4 text-sm font-semibold text-white">
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
        <h1 className="font-['Playfair_Display'] text-4xl font-bold">Project not found.</h1>
        <Link to="/portfolio" className="mt-4 inline-block text-[#B3001B]">
          Back to Portfolio
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-18">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">{project.industry}</p>
          <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">{project.company}</h1>
          <img src={project.image} alt={project.company} className="mt-8 h-80 w-full object-cover shadow-xl md:h-[450px]" />
          <div className="mt-10">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900">Project Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-700">{project.detail}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border border-zinc-100 bg-zinc-50 p-6">
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
          <div className="border border-[#D4AF37]/30 bg-white p-8 shadow-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B3001B]">Measurable Result</p>
            <p className="mt-4 font-['Playfair_Display'] text-3xl font-bold text-[#B3001B]">{project.result}</p>
          </div>
          <div className="bg-zinc-900 p-8 text-white">
            <h3 className="text-lg font-bold">Key Deliverables</h3>
            <ul className="mt-6 space-y-4">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-sm text-zinc-300">
                  <div className="h-1.5 w-1.5 bg-[#D4AF37]" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-zinc-200 p-8">
            <h3 className="font-['Playfair_Display'] text-xl font-bold">Scale Your Brand</h3>
            <p className="mt-3 text-sm text-zinc-600">Get similar results for your business. Book a discovery call today.</p>
            <Link to="/contact" className="mt-6 inline-flex h-11 items-center justify-center bg-[#B3001B] px-6 text-sm font-semibold text-white transition hover:bg-[#920015]">
              Start Your Project
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

function PortfolioPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-18">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Portfolio</p>
      <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">Results that prove our approach.</h1>
      <div className="mt-10 space-y-8">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/portfolio/${project.slug}`}
            className="group grid gap-6 border border-zinc-200 p-5 transition hover:border-[#B3001B]/40 hover:shadow-xl md:grid-cols-[1fr_1fr] md:p-6"
          >
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.company}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{project.industry}</p>
              <h2 className="mt-2 text-3xl font-semibold text-zinc-950 transition group-hover:text-[#B3001B]">
                {project.company}
              </h2>
              <p className="mt-4 text-sm text-zinc-700">
                <span className="font-semibold">Before:</span> {project.before}
              </p>
              <p className="mt-2 text-sm text-zinc-700">
                <span className="font-semibold">After:</span> {project.after}
              </p>
              <p className="mt-4 text-base font-semibold text-[#B3001B]">{project.result}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B3001B]">
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
    <main className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-18">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Blog</p>
      <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">Marketing intelligence from the field.</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="border border-zinc-200 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{post.category}</p>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-950">{post.title}</h2>
            <p className="mt-3 text-sm text-zinc-700">{post.excerpt}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-zinc-500">{post.date}</p>
            <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B3001B]">
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
        <h1 className="font-['Playfair_Display'] text-4xl font-bold">Post not found.</h1>
        <Link to="/blog" className="mt-4 inline-block text-[#B3001B]">
          Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-18">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{post.category}</p>
      <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">{post.title}</h1>
      <p className="mt-3 text-sm uppercase tracking-[0.12em] text-zinc-500">{post.date}</p>
      <article className="mt-8 border-l-2 border-[#D4AF37] pl-5 text-lg leading-relaxed text-zinc-800">{post.content}</article>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-18">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3001B]">Contact</p>
          <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-zinc-950 md:text-5xl">Let&apos;s discuss your growth targets.</h1>
          <p className="mt-4 text-zinc-700">Share your goals and we will map the highest-impact opportunities for your brand.</p>
          <div className="mt-8 space-y-4 text-sm text-zinc-700">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-[#B3001B]" />
              hello@digizinc.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-[#B3001B]" />
              +91 97015 63362
            </p>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-1 shrink-0 text-[#B3001B]" />
              <span>
                H. No. 1-98/9/3/32T, Plot No. 50, 4th Floor,<br />
                Sai Dham Building, Madhapur, Hyderabad,<br />
                Telangana, 500081, India
              </span>
            </p>
          </div>
          <div className="mt-8 h-72 overflow-hidden border border-zinc-200">
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
          <p className="font-['Playfair_Display'] text-2xl font-bold text-white">{brand}</p>
          <p className="mt-3 text-sm">Premium marketing systems for brands that want market authority and real growth.</p>
          <Link to="/#enquiry" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
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
              <Link key={service.slug} to={`/services/${service.slug}`} className="block transition hover:text-[#D4AF37]">
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
          <div className="mt-5 flex gap-5 text-[#D4AF37]">
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
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
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
      <Footer />
    </div>
  );
}