export function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))].sort((a, b) =>
    String(a).localeCompare(String(b))
  );
}

export function formatBpmRange(value) {
  if (value === "all") return "All tempos";
  if (value === "slow") return "Under 90";
  if (value === "mid") return "90-119";
  return "120+";
}

export function matchesBpm(track, value) {
  if (value === "all") return true;
  if (value === "slow") return track.bpm < 90;
  if (value === "mid") return track.bpm >= 90 && track.bpm < 120;
  return track.bpm >= 120;
}

export function matchesDuration(track, value) {
  if (value === "all") return true;
  if (value === "short") return track.durationSeconds < 75;
  if (value === "medium") return track.durationSeconds >= 75 && track.durationSeconds <= 120;
  return track.durationSeconds > 120;
}
