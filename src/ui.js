// DOM wiring. Each mount function builds its elements once, subscribes to the
// store, and updates in place on every change.
import { PREFECTURES, LEVELS, MAX_SCORE } from "./data.js";
import { levelOf, total, countByLevel, formatResult } from "./score.js";

const $ = (id) => document.getElementById(id);

export function showMessage(text) {
  $("msg").textContent = text;
}

export function mountMap(store) {
  const map = $("map");
  const tiles = PREFECTURES.map((p) => {
    const b = document.createElement("button");
    b.className = "t";
    b.type = "button";
    b.textContent = p.ja;
    b.style.gridColumn = p.col + 1;
    b.style.gridRow = p.row + 1;
    b.addEventListener("click", () => store.select(p.id));
    map.appendChild(b);
    return b;
  });

  store.subscribe(({ scores, selected }) => {
    PREFECTURES.forEach((p, i) => {
      const l = levelOf(scores, p.id);
      const t = tiles[i];
      t.dataset.l = l;
      t.setAttribute("aria-pressed", p.id === selected ? "true" : "false");
      t.setAttribute("aria-label", `${p.id} ${p.ja}, level ${l}`);
      t.title = `${p.id} · ${LEVELS[l].ja}`;
    });
  });
}

export function mountLevelPanel(store) {
  const list = $("lv");
  const heading = $("ph");
  const buttons = [];

  // Highest level first.
  for (let k = LEVELS.length - 1; k >= 0; k--) {
    const b = document.createElement("button");
    b.type = "button";
    const sw = document.createElement("span");
    sw.className = "sw";
    sw.style.background = `var(--l${k})`;
    sw.style.color = `var(--t${k})`;
    sw.textContent = k;
    const name = document.createElement("strong");
    name.textContent = `${LEVELS[k].ja} · ${LEVELS[k].en}`;
    const desc = document.createElement("em");
    desc.textContent = LEVELS[k].desc;
    b.append(sw, name, desc);
    b.addEventListener("click", () => chooseLevel(store, k));
    list.appendChild(b);
    buttons[k] = b;
  }

  store.subscribe(({ scores, selected }) => {
    const p = PREFECTURES.find((x) => x.id === selected);
    const current = p ? levelOf(scores, p.id) : -1;
    heading.replaceChildren();
    if (!p) {
      heading.append("Select a prefecture ");
      heading.append(small("or press 0–5 on a keyboard"));
    } else {
      heading.append(`${p.id} ${p.ja} `);
      heading.append(small(`currently ${LEVELS[current].ja}`));
    }
    buttons.forEach((b, k) => b.setAttribute("aria-pressed", k === current ? "true" : "false"));
  });
}

export function mountScoreboard(store) {
  $("max").textContent = `of ${MAX_SCORE} points`;
  const counts = $("counts");

  store.subscribe(({ scores }) => {
    const sum = total(scores);
    $("total").textContent = sum;
    $("fill").style.width = `${(sum / MAX_SCORE) * 100}%`;

    const by = countByLevel(scores);
    counts.replaceChildren(
      ...[...LEVELS.keys()].reverse().map((k) => {
        const d = document.createElement("div");
        const n = document.createElement("b");
        n.textContent = by[k];
        d.append(n, LEVELS[k].ja);
        return d;
      })
    );
  });
}

export function mountActions(store) {
  $("copy").addEventListener("click", async () => {
    const text = formatResult(store.getState().scores, MAX_SCORE);
    try {
      await navigator.clipboard.writeText(text);
      showMessage("Copied.");
    } catch {
      showMessage(`Couldn’t copy. Your score is ${total(store.getState().scores)}.`);
    }
  });

  // Two-step reset: the first click arms the button, the second (within 3s) clears.
  const reset = $("reset");
  let timer = null;
  const disarm = () => {
    reset.textContent = "Reset all";
    timer = null;
  };
  reset.addEventListener("click", () => {
    if (!timer) {
      reset.textContent = "Tap again to clear all";
      timer = setTimeout(disarm, 3000);
      return;
    }
    clearTimeout(timer);
    disarm();
    store.reset();
    showMessage("All cleared.");
  });
}

export function mountKeyboard(store) {
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^[0-5]$/.test(e.key) && store.getState().selected !== null) {
      chooseLevel(store, Number(e.key));
    }
  });
}

function chooseLevel(store, level) {
  if (!store.setLevel(level)) showMessage("Select a prefecture first.");
}

function small(text) {
  const s = document.createElement("small");
  s.textContent = text;
  return s;
}
