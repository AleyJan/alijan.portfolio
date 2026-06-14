import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Scatter targets (offset from centre, in vw/vh) + start/end rotation + size.
// One entry per project, in order. Tuned to spread across the screen.
const LAYOUT = [
  { x: -34, y: -18, rot0: -6, rot: -9, w: "clamp(150px, 19vw, 300px)" },
  { x: 33, y: -22, rot0: 5, rot: 8, w: "clamp(140px, 17vw, 270px)" },
  { x: -30, y: 20, rot0: -3, rot: 6, w: "clamp(150px, 18vw, 290px)" },
  { x: 34, y: 19, rot0: 4, rot: -7, w: "clamp(130px, 16vw, 260px)" },
  { x: 2, y: -28, rot0: 2, rot: 3, w: "clamp(140px, 17vw, 270px)" },
  { x: -7, y: 29, rot0: -5, rot: -4, w: "clamp(150px, 18vw, 280px)" },
  { x: 16, y: 4, rot0: 6, rot: 10, w: "clamp(120px, 14vw, 230px)" },
];

function ProjectCard({ project, progress, layout }) {
  const x = useTransform(progress, [0, 1], ["0vw", `${layout.x}vw`]);
  const y = useTransform(progress, [0, 1], ["0vh", `${layout.y}vh`]);
  const rotate = useTransform(progress, [0, 1], [layout.rot0, layout.rot]);

  return (
    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 hover:z-50">
      {/* scroll-driven scatter layer */}
      <motion.div style={{ x, y, rotate }}>
        {/* hover layer — separate transform so it doesn't fight the scatter */}
        <motion.a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.06, y: -12 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative block overflow-hidden rounded-xl shadow-2xl shadow-black/30 ring-1 ring-black/10"
          style={{ width: layout.w }}
        >
          <img
            src={project.img}
            alt={project.title}
            draggable="false"
            loading="lazy"
            className="block h-auto w-full object-cover"
          />
          {/* title, fades in on hover */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-sm font-medium text-white">
              {project.title}
            </span>
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}

export default function MyWork({ heading = "MY WORK", projects = [] }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-theme="light"
      className="relative h-[250vh] w-full bg-white text-black"
    >
      {/* Pinned stage: heading + the pile that scatters on scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fade the section out into Services so there's no hard boundary */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-white to-transparent" />
        <h2
          className="absolute left-1/2 top-[5%] -translate-x-1/2 select-none text-center font-sans font-extrabold uppercase leading-none tracking-tight text-black"
          style={{ fontSize: "clamp(3.5rem, 13.5vw, 12.5rem)" }}
        >
          {heading}
        </h2>

        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            progress={scrollYProgress}
            layout={LAYOUT[i % LAYOUT.length]}
          />
        ))}
      </div>
    </section>
  );
}
