import { motion } from "framer-motion";

// The portrait now lives in <Portrait /> (a shared, scroll-driven layer) so it
// can travel into the next section. Hero keeps just the giant title + spotlight.
export default function Hero({ title = "PORTFOLIO" }) {
  return (
    <section
      id="home"
      data-theme="dark"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-black to-espresso"
    >
      {/* Giant title — entrance (scale + fade) on the wrapper, idle float inside */}
      <div className="absolute inset-0">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="select-none font-gondens leading-none text-cream text-[9vw] lg:text-[clamp(3.9rem,14.5vw,12.6rem)]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {title}
          </motion.span>
        </motion.h1>
      </div>

      {/* Section spotlight blur overlay (blurs the title, reveals at cursor) */}
      <div className="spotlight-blur absolute inset-0 z-20 hidden lg:block" />
    </section>
  );
}
