// Pure scoring functions. `scores` is a plain object: { [prefectureId]: level }.
import { PREFECTURES, LEVELS, MAX_LEVEL } from "./data.js";

export function levelOf(scores, id) {
  const n = scores[id];
  return Number.isInteger(n) && n >= 0 && n <= MAX_LEVEL ? n : 0;
}

export function total(scores) {
  return PREFECTURES.reduce((sum, p) => sum + levelOf(scores, p.id), 0);
}

// Returns an array indexed by level: how many prefectures sit at each one.
export function countByLevel(scores) {
  const counts = LEVELS.map(() => 0);
  for (const p of PREFECTURES) counts[levelOf(scores, p.id)]++;
  return counts;
}

export function formatResult(scores, max) {
  const counts = countByLevel(scores);
  const breakdown = [...LEVELS.keys()]
    .reverse()
    .map((k) => `${LEVELS[k].ja} ${counts[k]}`)
    .join(" / ");
  return `My 経県値: ${total(scores)}/${max}\n${breakdown}`;
}
