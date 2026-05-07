"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

export default function Player({ tracks, currentTrack, isPlaying, setIsPlaying, onTrackChange }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(0.78);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    setIsLoading(true);
    setHasError(false);
    audio.src = currentTrack.audioUrl;
    audio.load();
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentTrack) {
      audio.play().catch(() => {
        setHasError(true);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const index = currentTrack ? tracks.findIndex((track) => track.id === currentTrack.id) : 0;

  function togglePlayback() {
    if (!currentTrack) {
      onTrackChange(tracks[0]);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((playing) => !playing);
  }

  function skip(direction) {
    const nextIndex = (index + direction + tracks.length) % tracks.length;
    onTrackChange(tracks[nextIndex]);
    setIsPlaying(true);
  }

  function seek(event) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const next = ((event.clientX - rect.left) / rect.width) * duration;
    audio.currentTime = next;
    setProgress(next);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-ink bg-ink text-paper">
      <audio
        ref={audioRef}
        preload="metadata"
        onCanPlay={() => setIsLoading(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
        onEnded={() => skip(1)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
          setIsPlaying(false);
        }}
      />
      <div
        className="grid h-8 cursor-pointer grid-cols-48 border-b border-paper/20"
        role="slider"
        tabIndex={0}
        aria-label="Track progress"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration || 0)}
        aria-valuenow={Math.round(progress || 0)}
        onClick={seek}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") audioRef.current.currentTime += 5;
          if (event.key === "ArrowLeft") audioRef.current.currentTime -= 5;
        }}
      >
        {Array.from({ length: 48 }).map((_, itemIndex) => {
          const active = duration ? itemIndex / 48 <= progress / duration : false;
          const height = 18 + ((itemIndex * 13) % 12);
          return (
            <span
              key={itemIndex}
              className={`self-end border-r border-ink transition ${active ? "bg-redline" : "bg-paper/18"}`}
              style={{ height }}
            />
          );
        })}
      </div>
      <div className="mx-auto grid max-w-[1450px] gap-3 px-5 py-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-8 lg:px-10">
        <div className="flex items-center gap-2">
          <IconButton label="Previous track" onClick={() => skip(-1)}>
            <SkipBack size={17} />
          </IconButton>
          <IconButton label={isPlaying ? "Pause" : "Play"} onClick={togglePlayback} primary>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </IconButton>
          <IconButton label="Next track" onClick={() => skip(1)}>
            <SkipForward size={17} />
          </IconButton>
        </div>

        <div className="min-w-0">
          <p className="truncate font-display text-2xl font-black uppercase leading-none">
            {currentTrack ? currentTrack.title : "Select a track"}
          </p>
          <p className="mt-1 truncate font-mono text-[10px] uppercase text-paper/62">
            {isLoading ? "Loading" : hasError ? "Audio placeholder missing" : currentTrack ? `${currentTrack.genre} / ${currentTrack.mood} / ${currentTrack.bpm} BPM` : "Ready"}
          </p>
        </div>

        <label className="hidden items-center gap-3 sm:flex">
          <Volume2 size={16} />
          <span className="sr-only">Volume</span>
          <input
            className="range-reset h-6 w-28"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

function IconButton({ children, label, onClick, primary = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`focus-ring flex h-10 w-10 items-center justify-center border border-paper transition hover:bg-paper hover:text-ink ${
        primary ? "bg-paper text-ink hover:bg-redline" : "bg-transparent"
      }`}
    >
      {children}
    </button>
  );
}
