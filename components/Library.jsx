"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Search } from "lucide-react";
import { matchesBpm, matchesDuration, uniqueValues } from "@/lib/trackUtils";

const bpmOptions = [
  { value: "all", label: "All BPM" },
  { value: "slow", label: "Under 90" },
  { value: "mid", label: "90-119" },
  { value: "fast", label: "120+" }
];

const durationOptions = [
  { value: "all", label: "All lengths" },
  { value: "short", label: "< 1:15" },
  { value: "medium", label: "1:15-2:00" },
  { value: "long", label: "2:00+" }
];

export default function Library({ tracks, currentTrack, isPlaying, onSelectTrack }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [mood, setMood] = useState("all");
  const [bpm, setBpm] = useState("all");
  const [duration, setDuration] = useState("all");

  const genres = useMemo(() => uniqueValues(tracks, "genre"), [tracks]);
  const moods = useMemo(() => uniqueValues(tracks, "mood"), [tracks]);

  const filteredTracks = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return tracks.filter((track) => {
      const text = `${track.title} ${track.genre} ${track.mood} ${track.collection}`.toLowerCase();
      return (
        (!needle || text.includes(needle)) &&
        (genre === "all" || track.genre === genre) &&
        (mood === "all" || track.mood === mood) &&
        matchesBpm(track, bpm) &&
        matchesDuration(track, duration)
      );
    });
  }, [tracks, query, genre, mood, bpm, duration]);

  return (
    <section id="library" className="border-b-2 border-ink bg-paper px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-8 border-b-2 border-ink pb-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-xs uppercase">Indexed material / 001</p>
            <h2 className="mt-4 max-w-3xl font-display text-6xl font-black uppercase leading-[0.86] sm:text-8xl lg:text-[9vw]">
              Music Library
            </h2>
          </div>
          <p className="max-w-2xl self-end text-balance text-2xl leading-tight sm:text-4xl">
            Searchable sync-ready cues for directors, agencies and visual editors.
          </p>
        </div>

        <div className="sticky top-[43px] z-30 -mx-5 border-b-2 border-ink bg-paper px-5 py-4 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
          <div className="mx-auto grid max-w-[1450px] gap-3 lg:grid-cols-[1.2fr_repeat(4,0.7fr)]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <span className="sr-only">Search tracks</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, mood, collection"
                className="focus-ring h-12 w-full border-2 border-ink bg-transparent pl-10 pr-3 font-mono text-xs uppercase placeholder:text-muted"
              />
            </label>
            <FilterSelect label="Genre" value={genre} onChange={setGenre} options={genres} />
            <FilterSelect label="Mood" value={mood} onChange={setMood} options={moods} />
            <NativeSelect label="BPM" value={bpm} onChange={setBpm} options={bpmOptions} />
            <NativeSelect
              label="Duration"
              value={duration}
              onChange={setDuration}
              options={durationOptions}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="hidden border-b-2 border-ink pb-2 font-mono text-xs uppercase text-muted lg:grid lg:grid-cols-[88px_1.5fr_repeat(4,0.65fr)]">
            <span>Play</span>
            <span>Title</span>
            <span>Genre</span>
            <span>Mood</span>
            <span>BPM</span>
            <span>Time</span>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="border-b-2 border-ink py-16 text-center font-mono text-xs uppercase">
              No tracks found. Adjust the filters.
            </div>
          ) : (
            filteredTracks.map((track, index) => {
              const active = currentTrack?.id === track.id;
              return (
                <motion.article
                  key={track.id}
                  className="group grid gap-4 border-b-2 border-ink py-5 transition hover:bg-ink hover:px-4 hover:text-paper lg:grid-cols-[88px_1.5fr_repeat(4,0.65fr)] lg:items-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.25) }}
                >
                  <button
                    type="button"
                    onClick={() => onSelectTrack(track)}
                    aria-label={`${active && isPlaying ? "Pause" : "Play"} ${track.title}`}
                    className="focus-ring flex h-12 w-12 items-center justify-center border-2 border-ink bg-paper text-ink transition group-hover:border-paper"
                  >
                    {active && isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <div>
                    <h3 className="font-display text-3xl font-black uppercase leading-none sm:text-5xl lg:text-4xl">
                      {track.title}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase opacity-70">
                      {track.collection} / {track.audioUrl}
                    </p>
                  </div>
                  <Meta label="Genre" value={track.genre} />
                  <Meta label="Mood" value={track.mood} />
                  <Meta label="BPM" value={track.bpm} />
                  <Meta label="Duration" value={track.duration} />
                </motion.article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <NativeSelect
      label={label}
      value={value}
      onChange={onChange}
      options={[{ value: "all", label: `All ${label.toLowerCase()}` }, ...options.map((item) => ({ value: item, label: item }))]}
    />
  );
}

function NativeSelect({ label, value, onChange, options }) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring h-12 w-full border-2 border-ink bg-paper px-3 font-mono text-xs uppercase"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Meta({ label, value }) {
  return (
    <div className="font-mono text-xs uppercase">
      <span className="mr-2 text-muted group-hover:text-paper/60 lg:hidden">{label}</span>
      <span>{value}</span>
    </div>
  );
}
