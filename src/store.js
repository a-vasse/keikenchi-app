// App state (scores + current selection) with subscribe/notify, plus persistence.
import { PREFECTURES, MAX_LEVEL } from "./data.js";

const KEY = "keikenchi-v1";

// Storage adapter. Every access is guarded because storage can be unavailable
// (private mode, blocked cookies) or hold corrupt data.
export const localStorageAdapter = {
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  },
  save(scores) {
    try {
      localStorage.setItem(KEY, JSON.stringify(scores));
    } catch {
      /* ignore: the app still works, it just won't persist */
    }
  },
};

export function createStore(storage = localStorageAdapter) {
  let state = { scores: storage.load(), selected: null };
  const listeners = new Set();

  const notify = () => listeners.forEach((fn) => fn(state));
  const isValidId = (id) => PREFECTURES.some((p) => p.id === id);

  return {
    getState: () => state,

    // Calls fn right away with the current state, then on every change.
    // Returns an unsubscribe function.
    subscribe(fn) {
      listeners.add(fn);
      fn(state);
      return () => listeners.delete(fn);
    },

    select(id) {
      if (!isValidId(id)) return;
      state = { ...state, selected: id };
      notify();
    },

    // Returns false when nothing is selected or the level is out of range.
    setLevel(level) {
      if (state.selected === null) return false;
      if (!Number.isInteger(level) || level < 0 || level > MAX_LEVEL) return false;
      const scores = { ...state.scores, [state.selected]: level };
      state = { ...state, scores };
      storage.save(scores);
      notify();
      return true;
    },

    reset() {
      state = { scores: {}, selected: null };
      storage.save(state.scores);
      notify();
    },
  };
}
