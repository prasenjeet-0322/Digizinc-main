import { Link } from "react-router-dom";
import { TextColor } from "@/components/ui/text-color";

const HeroSection = () => {
  const VIDEO_URL =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4";

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center rounded-b-[32pt]">

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 filter grayscale-[0.3] brightness-[0.75] contrast-[1.2]"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* PROPER Red Tone Overlays */}
      <div className="absolute inset-0 bg-[#F23030]/50 mix-blend-color z-[1]" />
      <div className="absolute inset-0 bg-[#F23030]/30 mix-blend-multiply z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/20 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-black/25 z-[1]" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 translate-y-[10pt]">
        <TextColor />

        {/* Subtext */}
        <p className="font-sofia font-normal text-[14px] md:text-base text-white/80 mt-2 max-w-4xl leading-relaxed tracking-[0.15em] uppercase">
          Everything we build is made to <br className="sm:hidden" />
          convert, scale, and win.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-10 translate-y-[8pt]">
          <Link
            to="/contact"
            className="hidden sm:inline-flex px-10 py-4 rounded-full bg-primary text-white font-sofia font-bold text-sm uppercase tracking-widest hover:bg-secondary transition-all shadow-xl shadow-primary/20"
          >
            Book 1:1 Call
          </Link>
          <Link
            to="/portfolio"
            className="px-10 py-4 rounded-full border border-white/20 backdrop-blur-md text-white font-sofia font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Explore Case Studies
          </Link>
        </div>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40 z-[2]" />
    </section>
  );
};

export { HeroSection };
