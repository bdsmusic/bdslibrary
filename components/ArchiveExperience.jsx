"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import Library from "@/components/Library";
import Player from "@/components/Player";
import Collections from "@/components/Collections";
import { About, Contact } from "@/components/AboutContact";
import { PageReveal } from "@/components/MotionShell";
import { tracks } from "@/data/tracks";

export default function ArchiveExperience() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleSelectTrack(track) {
    if (currentTrack?.id === track.id) {
      setIsPlaying((playing) => !playing);
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
  }

  return (
    <PageReveal>
      <div className="grain pb-28">
        <Hero />
        <SiteHeader />
        <Library
          tracks={tracks}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onSelectTrack={handleSelectTrack}
        />
        <Collections tracks={tracks} onSelectTrack={handleSelectTrack} />
        <About />
        <Contact />
        <Player
          tracks={tracks}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onTrackChange={setCurrentTrack}
        />
      </div>
    </PageReveal>
  );
}
