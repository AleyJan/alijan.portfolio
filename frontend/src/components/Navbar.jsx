import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// `logo`, `links`, `cta` come from the hero content config. `theme` flips the
// colours so the navbar stays readable over both dark and white sections.
export default function Navbar({
  logo = "ALIJAN",
  links = [],
  cta = "Get a quote",
  theme = "dark",
}) {
  const light = theme === "light";
  const [open, setOpen] = useState(false);

  const logoColor = light ? "text-espresso" : "text-cream";
  const pill = light
    ? "border-black/10 bg-black/5"
    : "border-white/15 bg-white/10";
  const link = light
    ? "text-black/60 hover:bg-black/5 hover:text-black"
    : "text-cream/80 hover:bg-white/15 hover:text-cream";
  const ctaColor = light
    ? "border-espresso/30 text-espresso hover:bg-espresso hover:text-cream"
    : "border-cream/40 text-cream hover:bg-cream hover:text-espresso";
  const burgerColor = light ? "bg-espresso" : "bg-cream";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-5 py-4 sm:px-10 sm:py-5"
    >
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between">
        {/* logo (top-left) */}
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-2 transition-colors duration-300 ${logoColor}`}
        >
          {/* <span className="text-2xl leading-none">✦</span> */}
          <span className="font-gondens text-xl tracking-wide">{logo}</span>
        </a>

        {/* glass-morphic nav (centered) — desktop only */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <ul
            className={`flex items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg shadow-black/10 backdrop-blur-md transition-colors duration-300 ${pill}`}
          >
            {links.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`block rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${link}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA (top-right) — desktop only; micro-interaction on hover/tap */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`hidden rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 lg:block ${ctaColor}`}
        >
          {cta}
        </motion.a>

        {/* Hamburger (top-right) — mobile / tablet only */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${pill}`}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-4 w-5">
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full ${burgerColor}`}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full ${burgerColor}`}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={`absolute left-0 top-[14px] block h-0.5 w-5 rounded-full ${burgerColor}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl border shadow-xl shadow-black/20 backdrop-blur-md lg:hidden ${pill}`}
          >
            <ul className="flex flex-col p-2">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors duration-300 ${link}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="p-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className={`block rounded-full border px-5 py-3 text-center text-base font-medium transition-colors duration-300 ${ctaColor}`}
                >
                  {cta}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
