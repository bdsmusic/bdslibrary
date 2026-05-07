export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/92 px-5 py-3 backdrop-blur-sm sm:px-8 lg:px-10">
      <nav className="mx-auto flex max-w-[1450px] items-center justify-between gap-5 font-mono text-[10px] uppercase sm:text-xs">
        <a className="focus-ring font-bold" href="#">
          BDS Library
        </a>
        <div className="flex items-center gap-4 sm:gap-7">
          <a className="focus-ring transition hover:text-redline" href="#library">
            Library
          </a>
          <a className="focus-ring transition hover:text-redline" href="#collections">
            Works
          </a>
          <a className="focus-ring transition hover:text-redline" href="#about">
            About
          </a>
          <a className="focus-ring transition hover:text-redline" href="#contact">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
