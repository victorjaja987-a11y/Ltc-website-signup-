import ltcHeroBg from "./ltc-hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ltcHeroBg})` }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(180deg, transparent 0%, transparent 85%, hsl(120 40% 6% / 0.95) 100%)` }}
      />
      <div className="flex-1 min-h-[90vh]" />
      <div className="relative z-10 flex flex-col items-center pb-8 animate-bounce">
        <span className="text-ltc-lime font-oswald uppercase text-sm tracking-widest mb-2">Register Now</span>
        <svg className="w-6 h-6 text-ltc-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
