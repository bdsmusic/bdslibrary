import { MotionSection } from "@/components/MotionShell";

export function About() {
  return (
    <MotionSection id="about" className="border-b-2 border-ink bg-paper px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <p className="font-mono text-xs uppercase">About / Storytelling through frequency</p>
        <div>
          <h2 className="text-balance font-display text-5xl font-black uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
            A carefully curated sonic archive for visual media.
          </h2>
          <div className="mt-12 grid gap-7 text-xl leading-snug text-ink/78 md:grid-cols-2">
            <p>
              BDS creates music and sound design for advertising, fashion films, branded
              content, documentaries and sync. The work lives between restraint and impact:
              tactile textures, decisive rhythm, and emotional timing.
            </p>
            <p>
              Every cue is treated as a scene partner. The library is shaped for editors,
              directors and agencies who need music that can hold a frame without flattening it.
            </p>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export function Contact() {
  return (
    <MotionSection id="contact" className="bg-paper px-5 pb-40 pt-20 sm:px-8 lg:px-10 lg:pb-48 lg:pt-28">
      <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-[1fr_1fr]">
        <h2 className="font-display text-7xl font-black uppercase leading-[0.84] sm:text-9xl lg:text-[11vw]">
          Contact
        </h2>
        <div className="self-end border-t-2 border-ink pt-5">
          <p className="max-w-xl text-2xl leading-tight sm:text-4xl">
            For briefs, sync requests, custom composition and sound design.
          </p>
          <a
            className="focus-ring mt-8 inline-flex border-2 border-ink bg-ink px-5 py-4 font-mono text-xs uppercase text-paper transition hover:bg-redline hover:text-ink"
            href="mailto:studio@example.com"
          >
            studio@example.com
          </a>
        </div>
      </div>
    </MotionSection>
  );
}
