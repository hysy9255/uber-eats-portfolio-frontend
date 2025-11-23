import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  auto?: boolean; // autoplay on/off
  interval?: number; // autoplay interval ms
};

// const BannerCarousel = () => {
//   return <div>BannerCarousel</div>;
// };

const BannerCarousel: React.FC<Props> = ({
  children,
  auto = true,
  interval = 4000,
}) => {
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // autoplay
  useEffect(() => {
    if (!auto || slides.length <= 1) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (!hoveringRef.current) next();
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [auto, interval, slides.length, index]); // re-sync after manual nav

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full shrink-0 grow-0 basis-full">
            {slide}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="hidden min-[475px]:block">
        <button
          aria-label="Previous"
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white w-9 h-9 grid place-items-center backdrop-blur-sm hover:bg-black/60"
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white w-9 h-9 grid place-items-center backdrop-blur-sm hover:bg-black/60"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
