// Seed data for the editable portfolio content. Mirrors the frontend's
// fallback in frontend/src/content.js. Used the first time content is requested
// and by `npm run seed`.
export const defaultContent = {
  logo: "ALIJAN",
  nav: ["Home", "About", "Projects", "Services"],
  cta: "Get a quote",
  heroTitle: "PORTFOLIO",
  image: "/hero.png",
  eyebrow: "Creative Developer",
  greeting: "Hello I'm",
  name: "Ali jan",
  roles: ["Web Developer", "Web Designer", "UI/UX Designer", "ML Enthusiast"],
  description:
    "I craft fast, accessible, and visually refined web experiences, blending clean engineering with thoughtful design to turn ideas into products people genuinely enjoy using.",
  socials: [
    { name: "GitHub", icon: "github", href: "#" },
    { name: "LinkedIn", icon: "linkedin", href: "#" },
    { name: "Instagram", icon: "instagram", href: "#" },
  ],
  welcome: {
    eyebrow: "Why you're here",
    statement:
      "Looking for a website that makes your business look as good as it actually is? You're in the right place. I design and build fast, modern websites for companies, startups, and brands turning visitors into customers.",
    subline:
      "From a single landing page to a full product, I handle design and development end to end, clean, responsive, and built to perform.",
  },
  workHeading: "My Work",
  projects: [
    { title: "Aurora Commerce", href: "#", img: "https://picsum.photos/seed/aurora/600/440" },
    { title: "Nimbus Dashboard", href: "#", img: "https://picsum.photos/seed/nimbus/600/420" },
    { title: "Folio Studio", href: "#", img: "https://picsum.photos/seed/folio/600/460" },
    { title: "Pulse Fitness", href: "#", img: "https://picsum.photos/seed/pulse/600/400" },
    { title: "Verdant Travel", href: "#", img: "https://picsum.photos/seed/verdant/600/440" },
    { title: "Cobalt Finance", href: "#", img: "https://picsum.photos/seed/cobalt/600/420" },
    { title: "Ember Coffee", href: "#", img: "https://picsum.photos/seed/ember/600/400" },
  ],
  servicesHeading: "SERVICES",
  services: [
    { title: "Business Website Development", desc: "Marketing sites that build trust and convert." },
    { title: "Admin Dashboard Development", desc: "Powerful internal tools, panels & analytics." },
    { title: "E-commerce Website", desc: "Fast online stores built to sell." },
    { title: "Portfolio Website", desc: "Personal brands that stand out." },
  ],
  contact: {
    heading: "Let's work together",
    subline:
      "Have a project in mind? Tell me about it — I usually reply within a day.",
    email: "alijan.dev507@gmail.com",
    projectTypes: [
      "Business Website",
      "Admin Dashboard",
      "E-commerce Website",
      "Portfolio Website",
      "Something else",
    ],
    socials: [
      { name: "GitHub", icon: "github", href: "#" },
      { name: "LinkedIn", icon: "linkedin", href: "#" },
      { name: "Instagram", icon: "instagram", href: "#" },
    ],
  },
  footer: {
    available: "Available for projects · 2026",
    headlineLead: "Let's build something",
    headlineAccent: "worth sharing",
    ctaLabel: "Start a project",
    trust: ["Replies within a day", "No obligation", "Fixed, upfront quotes"],
    copyright: "© 2026 Alijan",
  },
};
