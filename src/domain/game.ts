import { stages, endings, meta } from '../content';
import { statKeys } from './types';
import type { Game, Stats, HistoryEntry } from './types';

export const initialStats = (): Stats => ({ capital: 50, marketShare: 50, welfare: 50, marketPower: 50 });
const clamp = (stats: Stats): Stats => Object.fromEntries(statKeys.map(key => [key, Math.max(0, Math.min(100, stats[key]))])) as Stats;
export function getEnding(stats: Stats) {
  return [...endings].sort((a, b) => a.priority - b.priority).find(ending => ending.conditions.every(c => c.op === 'gte' ? stats[c.key] >= c.value : c.op === 'lte' ? stats[c.key] <= c.value : c.op === 'gt' ? stats[c.key] > c.value : stats[c.key] === c.value))!;
}
export function newGame(): Game {
  return { schemaVersion: 1, contentVersion: meta.version, runId: globalThis.crypto?.randomUUID?.() ?? `run-${Date.now()}`, revision: 0, phase: 'welcome', stageIndex: 0, stats: initialStats(), flags: [], history: [], endingId: null };
}
export type GameAction = { type: 'start' } | { type: 'choose'; stageId: string; choiceId: string; draw: number } | { type: 'advance'; revision: number; phase: Game['phase'] };
export function gameReducer(game: Game, action: GameAction): Game {
  if (action.type === 'start') return game.phase === 'welcome' ? { ...game, phase: 'choice', revision: game.revision + 1 } : game;
  if (action.type === 'choose') {
    const stage = stages[game.stageIndex];
    if (game.phase !== 'choice' || stage.id !== action.stageId || game.history.some(h => h.stageId === stage.id)) return game;
    const choice = stage.choices.find(c => c.id === action.choiceId);
    if (!choice || !Number.isFinite(action.draw) || action.draw < 0 || action.draw >= 1) return game;
    const draft = Object.fromEntries(statKeys.map(key => [key, game.stats[key] + choice.delta[key]])) as Stats;
    let event: HistoryEntry['event'] = null;
    let randomDraw: number | null = null;
    if (draft.capital > 0 && choice.risk) {
      const risk = choice.risk;
      const occurred = risk.type === 'certain' || action.draw < risk.probability;
      if (risk.type === 'chance') randomDraw = action.draw;
      if (occurred) { if (risk.effect === 'bankrupt') draft.capital = 0; else draft.capital -= risk.amount ?? 0; }
      event = { occurred, title: risk.title, text: occurred ? risk.text : risk.safeText ?? 'Không xảy ra tổn thất thêm.' };
    }
    const stats = clamp(draft);
    const entry: HistoryEntry = { stageId: stage.id, choiceId: choice.id, before: { ...game.stats }, after: stats, event, randomDraw };
    return { ...game, stats, history: [...game.history, entry], flags: choice.flag ? [...game.flags, choice.flag] : game.flags, revision: game.revision + 1, phase: stats.capital === 0 ? 'ending' : event ? 'event' : 'result', endingId: stats.capital === 0 ? 'bankrupt' : null };
  }
  if (action.revision !== game.revision || action.phase !== game.phase) return game;
  if (game.phase === 'event') return { ...game, phase: 'result', revision: game.revision + 1 };
  if (game.phase === 'result') return { ...game, phase: 'theory', revision: game.revision + 1 };
  if (game.phase === 'theory') return game.stageIndex === stages.length - 1
    ? { ...game, phase: 'ending', endingId: getEnding(game.stats).id, revision: game.revision + 1 }
    : { ...game, phase: 'choice', stageIndex: game.stageIndex + 1, revision: game.revision + 1 };
  return game;
}
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
export function validGame(value: unknown): value is Game {
  if (!value || typeof value !== 'object') return false;
  const g = value as Game;
  if (g.contentVersion !== meta.version || g.schemaVersion !== 1 || typeof g.runId !== 'string' || !Number.isInteger(g.revision) || !Array.isArray(g.history) || !Array.isArray(g.flags) || g.history.length > 6) return false;
  try {
    let replay = newGame();
    if (g.phase === 'welcome') return g.revision === 0 && g.stageIndex === 0 && g.endingId === null && g.history.length === 0 && same(g.stats, replay.stats) && g.flags.length === 0;
    replay = gameReducer(replay, { type: 'start' });
    for (const entry of g.history) {
      if (!entry || entry.stageId !== stages[replay.stageIndex].id) return false;
      replay = gameReducer(replay, { type: 'choose', stageId: entry.stageId, choiceId: entry.choiceId, draw: entry.randomDraw ?? 0.75 });
      if (!same(replay.history.at(-1), entry)) return false;
      if (replay.phase === 'ending') break;
      while (replay.phase !== 'choice' && replay.phase !== 'ending' && (replay.stageIndex < g.stageIndex || (g.phase === 'ending' && replay.stageIndex === 5))) replay = gameReducer(replay, { type: 'advance', revision: replay.revision, phase: replay.phase });
    }
    while (replay.stageIndex === g.stageIndex && replay.phase !== g.phase && ['event', 'result', 'theory'].includes(replay.phase)) replay = gameReducer(replay, { type: 'advance', revision: replay.revision, phase: replay.phase });
    return replay.stageIndex === g.stageIndex && replay.phase === g.phase && replay.revision === g.revision && replay.endingId === g.endingId && same(replay.stats, g.stats) && same(replay.flags, g.flags) && same(replay.history, g.history);
  } catch { return false; }
}
export function shareText(game: Game): string {
  return `Đế chế Độc quyền · Kết quả mô phỏng: ${getEnding(game.stats).title}. Vốn ${game.stats.capital}/100 · Thị phần ${game.stats.marketShare}/100 · Phúc lợi ${game.stats.welfare}/100 · Quyền lực ${game.stats.marketPower}/100.`;
}
