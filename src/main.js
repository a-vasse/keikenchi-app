import { createStore } from "./store.js";
import { mountMap, mountLevelPanel, mountScoreboard, mountActions, mountKeyboard } from "./ui.js";

const store = createStore();

mountMap(store);
mountLevelPanel(store);
mountScoreboard(store);
mountActions(store);
mountKeyboard(store);
