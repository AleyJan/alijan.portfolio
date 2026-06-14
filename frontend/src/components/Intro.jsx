import { forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Socials from "./Socials.jsx";

// The portrait floats in on the right via <Portrait /> on lg+ screens.
// On smaller screens Portrait fades out during the scroll, so intro is text-only.
const Intro = forwardRef(function Intro({ content }, ref) {
  const { eyebrow, greeting, name, roles, description, socials } = content;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <section
      ref={ref}
      id="about"
      data-theme="dark"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-espresso via-black to-black text-cream"
    >
      <div className="mx-auto flex min-h-screen max-w-7xl items-start px-6 pt-28 sm:px-10 sm:pt-24 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl"
        >
          {/* eyebrow
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-cream/55 sm:text-sm">
            {eyebrow}
          </p> */}

          {/* HELLO I'M / NAME */}
          <h2
            className="font-sans font-extrabold uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
          >
            <span className="block text-cream/85">{greeting}</span>
            <span className="block text-cream">{name}</span>
          </h2>

          {/* rotating role */}
          <div
            className="mt-3 flex h-[1.2em] items-center overflow-hidden font-sans font-bold uppercase tracking-tight"
            style={{ fontSize: "clamp(1.4rem, 4vw, 3rem)" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[index]}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-110%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-transparent"
                style={{ WebkitTextStroke: "2px #c9a27e" }}
              >
                {roles[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* description */}
          <p className="mt-8 max-w-md text-sm leading-relaxed text-cream/65 sm:text-base">
            {description}
          </p>

          {/* socials */}
          <div className="mt-8">
            <Socials items={socials} />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Intro;
