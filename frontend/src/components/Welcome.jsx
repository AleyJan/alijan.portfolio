import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// One word of the scroll-revealed statement: starts faint, turns solid black as
// its slice of the section's scroll progress passes.
function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {children}
    </motion.span>
  );
}

export default function Welcome({ content }) {
  const { eyebrow, statement, subline } = content;
  const textRef = useRef(null);

  // Drives the word-by-word reveal as the statement scrolls up through view.
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "end 0.55"],
  });

  const words = statement.split(" ");

  return (
    <section id="welcome" className="relative w-full bg-white text-black">
      {/* Dark → white seam. Tagged dark so the navbar stays light-on-dark while
          this band is under it; only flips once the white body arrives. */}
      <div
        data-theme="dark"
        className="h-[60vh] w-full bg-gradient-to-b from-black via-black to-white"
      />

      {/* White body */}
      <div
        data-theme="light"
        className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pb-32 sm:px-10"
      >
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-sm">
          {eyebrow}
        </p>

        {/* Big statement: word-reveal on scroll + edge fade at top/bottom */}
        <h2
          ref={textRef}
          className="font-sans font-semibold leading-[1.1] tracking-tight"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)",
          }}
        >
          {words.map((w, i) => (
            <Word
              key={`${w}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {w}
            </Word>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-xl text-base leading-relaxed text-black/55"
        >
          {subline}
        </motion.p>
      </div>
    </section>
  );
}
