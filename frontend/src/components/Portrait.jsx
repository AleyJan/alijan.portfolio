import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const portraitFilter = "grayscale(1) contrast(1.12) brightness(0.95)";
const edgeMask = {
  WebkitMaskImage:
    "linear-gradient(to top, transparent 0%, black 9%), linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "linear-gradient(to top, transparent 0%, black 9%), linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
  maskComposite: "intersect",
};

/**
 * Shared portrait that travels from the hero (centred) into the intro section
 * (right side) as you scroll. Driven by the intro section's scroll progress:
 *   progress 0 → hero look (centred, with the cursor spotlight)
 *   progress 1 → intro look (shifted right, smaller, fully sharp)
 * The spotlight crossfades out within the first 15% so it never moves misaligned.
 */
export default function Portrait({ image, introRef }) {
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start end", "start start"],
  });

  // Exit: as the intro scrolls up and away, fade the portrait out so it doesn't
  // float over the (white) section that follows.
  const { scrollYProgress: exitProgress } = useScroll({
    target: introRef,
    offset: ["end end", "end start"],
  });

  // On small screens the portrait is smaller and tucks further to the
  // bottom-right so it never sits under the intro's (left-aligned) text.
  // A ref keeps the scroll transforms in sync without re-subscribing them.
  // < 1024px: "mobile" behaviour — smaller image, portrait fades out in intro
  // so it never sits on top of the intro text. lg+ gets the full travel effect.
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024,
  );
  const mobileRef = useRef(mobile);
  useEffect(() => {
    const onResize = () => {
      const m = window.innerWidth < 1024;
      mobileRef.current = m;
      setMobile(m);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const x = useTransform(
    scrollYProgress,
    (p) => `${p * (mobileRef.current ? 26 : 26)}vw`,
  );
  // Desktop lifts off the bottom to centre on the intro's right; mobile stays
  // low so the figure tucks into the bottom-right corner.
  const y = useTransform(
    scrollYProgress,
    (p) => `${p * (mobileRef.current ? 0 : -5)}vh`,
  );
  const scale = useTransform(
    scrollYProgress,
    (p) => 1 + p * (mobileRef.current ? -0.28 : -0.05),
  );
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const exitOpacity = useTransform(exitProgress, [0, 0.55], [1, 0]);

  // On small screens (< 1024px) the portrait fades out gradually as the user
  // scrolls away from the hero — it does NOT travel into the intro section.
  // Fades from full opacity at p=0 to gone by p=0.75 (a slow, gentle exit).
  // Desktop keeps it fully opaque (portrait travels right, clear of the text).
  const introOpacity = useTransform(scrollYProgress, (p) =>
    mobileRef.current ? Math.max(0, 1 - p / 0.75) : 1,
  );
  const opacity = useTransform(
    [exitOpacity, introOpacity],
    ([e, i]) => e * i,
  );

  // Smaller on mobile so it stays in the lower half of the hero and doesn't
  // cover the PORTFOLIO title; full height on desktop.
  const imgClass = `${
    mobile ? "h-[48vh]" : "h-[95vh]"
  } w-auto select-none object-contain object-bottom`;

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="pointer-events-none fixed inset-0 z-30 origin-bottom"
    >
      {/* Mount entrance (rise + fade), independent of the scroll transform above */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        {/* Base: fully-sharp copy, always present (what shows after the handoff) */}
        <div className="absolute inset-0 flex items-end justify-center pb-16 lg:pb-0">
          <img
            src={image}
            alt="Portrait"
            draggable="false"
            className={imgClass}
            style={{ ...edgeMask, filter: portraitFilter }}
          />
        </div>

        {/* Spotlight group: soft copy + sharp circle. Fades out as you scroll.
            Hidden on small screens — no cursor = no interactive spotlight. */}
        <motion.div style={{ opacity: spotlightOpacity }} className="absolute inset-0 hidden lg:block">
          <div className="absolute inset-0 flex items-end justify-center pb-16 lg:pb-0">
            <img
              src={image}
              alt=""
              aria-hidden="true"
              draggable="false"
              className={imgClass}
              style={{ ...edgeMask, filter: `${portraitFilter} blur(2.5px)` }}
            />
          </div>
          <div className="spotlight-reveal absolute inset-0 flex items-end justify-center pb-16 lg:pb-0">
            <img
              src={image}
              alt=""
              aria-hidden="true"
              draggable="false"
              className={imgClass}
              style={{ ...edgeMask, filter: portraitFilter }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
