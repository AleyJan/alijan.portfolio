import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// One card riding the semicircle arc. Its position is parametric: an angle θ
// (0 = right end, π = left end) advances with scroll, so cards flow right→left
// and wrap around (conveyor). Opacity fades at both ends to hide the wrap.
function ServiceCard({ service, progress, index, total, speed }) {
  const u = (p) => {
    let v = (index / total + p * speed) % 1;
    return v < 0 ? v + 1 : v;
  };
  const theta = (p) => u(p) * Math.PI;
  const radius = () =>
    Math.min(window.innerWidth * 0.32, window.innerHeight * 0.52);

  const x = useTransform(progress, (p) => radius() * Math.cos(theta(p)));
  // +8px nudge so the cards clear the navbar at the top of the arc.
  const y = useTransform(progress, (p) => -radius() * Math.sin(theta(p)) + 8);
  const scale = useTransform(progress, (p) => 0.6 + 0.5 * Math.sin(theta(p)));
  const rotate = useTransform(
    progress,
    (p) => (((Math.PI / 2 - theta(p)) * 180) / Math.PI) * 0.4,
  );
  const opacity = useTransform(progress, (p) => {
    const uu = u(p);
    const edge = 0.1;
    return Math.max(0, Math.min(uu / edge, (1 - uu) / edge, 1));
  });

  return (
    <div className="absolute left-1/2 top-[86%] z-10 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        style={{ x, y, scale, rotate, opacity }}
        className="w-52 rounded-2xl bg-espresso px-6 py-7 text-cream shadow-2xl shadow-black/40 ring-1 ring-black/5 sm:w-60"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/45">
          Service
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cream/60">
          {service.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function Services({ heading = "SERVICES", services = [] }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative h-[300vh] w-full bg-white"
    >
      <div
        data-theme="light"
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Fade in from the MyWork section above */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-white to-transparent" />
        {/* Curved SERVICES watermark (faint black on white) along a dome arc.
            Positioned above the card orbit so it isn't hidden beneath them. */}
        <svg
          className="absolute left-1/2 top-[58%] w-[94vw] max-w-[1300px] -translate-x-1/2 -translate-y-1/2 overflow-visible sm:top-[63%] lg:top-[calc(63%+140px)]"
          viewBox="0 0 1000 540"
          fill="none"
        >
          <path id="servicesArc" d="M 30 500 A 470 470 0 0 1 970 500" />
          <text
            fill="rgba(0,0,0,0.09)"
            style={{ fontWeight: 800, letterSpacing: "0.14em" }}
            className="font-sans"
            fontSize="150"
          >
            <textPath href="#servicesArc" startOffset="50%" textAnchor="middle">
              {heading}
            </textPath>
          </text>
        </svg>

        {/* Conveyor of service cards */}
        {services.map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            progress={scrollYProgress}
            index={i}
            total={services.length}
            // 1 / 0.667 — cards complete exactly one loop by the time the
            // Contact overlay begins rising (at scroll progress ≈ 0.667).
            speed={1.5}
          />
        ))}
      </div>
    </section>
  );
}
