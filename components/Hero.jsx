"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const navItems = [
  { label: "Library", href: "#library" },
  { label: "Latest Works", href: "#collections" },
  { label: "Contact", href: "#contact" }
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const rotate = useTransform(scrollY, [0, 700], [-3, 4]);

  return (
    <section className="relative flex min-h-screen overflow-hidden border-b-2 border-ink bg-paper px-5 py-5 sm:px-8 lg:px-10">
      <div className="absolute left-5 top-5 z-20 font-mono text-xs uppercase tracking-normal sm:left-8 lg:left-10">
        BDS / Sound Archive
      </div>
      <a
        className="focus-ring absolute right-5 top-5 z-20 font-mono text-xs uppercase tracking-normal underline decoration-ink/30 underline-offset-4 transition hover:text-redline sm:right-8 lg:right-10"
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
      >
        Instagram
      </a>

      <motion.div
        aria-hidden="true"
        className="poster-word pointer-events-none absolute left-1/2 top-[42%] w-[150vw] -translate-x-1/2 -translate-y-1/2 select-none text-center font-display text-[36vw] font-black uppercase leading-[0.72] text-redline sm:top-[45%] sm:text-[30vw] lg:text-[22vw]"
        style={{ y, rotate }}
      >
        BDS
      </motion.div>

      <div className="relative z-10 grid w-full grid-rows-[1fr_auto] pt-28">
        <div className="mx-auto flex w-full max-w-[1450px] flex-col justify-center gap-7 sm:gap-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="focus-ring group block w-fit font-display text-[18vw] font-black uppercase leading-[0.78] tracking-normal text-ink mix-blend-multiply transition hover:text-redline sm:text-[13vw] lg:text-[9.6vw]"
              initial={{ opacity: 0, x: index % 2 === 0 ? -44 : 44 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.14 * index, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block transition duration-500 group-hover:translate-x-3">
                {item.label}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="grid gap-4 border-t-2 border-ink pt-4 font-mono text-[10px] uppercase leading-relaxed sm:grid-cols-[1fr_auto_1fr] sm:text-xs">
          <p>Music for moving images.</p>
          <p className="sm:text-center">Advertising / Film / Branded Content / Sync</p>
          <p className="sm:text-right">Curated sonic material, raw and deliberate.</p>
        </div>
      </div>
    </section>
  );
}
