"use client";

import { motion } from "framer-motion";
import { collections } from "@/data/tracks";

export default function Collections({ tracks, onSelectTrack }) {
  return (
    <section id="collections" className="border-b-2 border-ink bg-ink px-5 py-20 text-paper sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-8 border-b-2 border-paper pb-10 lg:grid-cols-[1fr_1fr]">
          <h2 className="font-display text-6xl font-black uppercase leading-[0.86] sm:text-8xl lg:text-[8vw]">
            Featured Collections
          </h2>
          <p className="self-end text-2xl leading-tight text-paper/72 sm:text-4xl">
            Six focused edits built for picture, rhythm, tension and identity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => {
            const collectionTracks = tracks.filter(
              (track) => track.collection === collection || track.genre === collection || track.mood === collection
            );
            const firstTrack = collectionTracks[0] || tracks[index % tracks.length];
            return (
              <motion.button
                key={collection}
                type="button"
                onClick={() => onSelectTrack(firstTrack)}
                className="focus-ring group min-h-72 border-b-2 border-paper/35 p-5 text-left transition hover:bg-paper hover:text-ink md:border-r-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
              >
                <span className="font-mono text-xs uppercase text-redline group-hover:text-redline">
                  0{index + 1} / {collectionTracks.length || 1} cues
                </span>
                <span className="mt-14 block font-display text-6xl font-black uppercase leading-[0.84] sm:text-7xl">
                  {collection}
                </span>
                <span className="mt-6 block max-w-sm font-mono text-xs uppercase leading-relaxed opacity-60">
                  Play selected cue: {firstTrack.title}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
