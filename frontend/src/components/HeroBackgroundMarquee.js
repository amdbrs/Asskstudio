export const HeroBackgroundMarquee = ({ text = "ASSK STUDIO" }) => {
  // Repeat text enough times to fill the screen
  const repeatedText = Array(10).fill(text).join(' • ');
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap">
        <span className="hero-bg-marquee inline-block font-anton text-[20vw] text-[#0047FF]/[0.03] uppercase tracking-wider">
          {repeatedText} • {repeatedText}
        </span>
      </div>
    </div>
  );
};

export default HeroBackgroundMarquee;
