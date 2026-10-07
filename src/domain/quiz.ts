import { meta, questions } from '../content';
import type { Quiz } from './types';
export function shuffle<T>(items: T[], random = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
}
export function newQuiz(random = Math.random): Quiz {
  const chosen = shuffle(questions, random).slice(0, 10);
  return { contentVersion: meta.version, questionIds: chosen.map(q => q.id), optionOrders: Object.fromEntries(chosen.map(q => [q.id, shuffle(q.options.map(o => o.id), random)])), answers: {}, index: 0, completed: false };
}
export function answerQuiz(quiz: Quiz, answerId: string): Quiz {
  const id = quiz.questionIds[quiz.index];
  if (quiz.completed || quiz.answers[id] || !quiz.optionOrders[id].includes(answerId)) return quiz;
  return { ...quiz, answers: { ...quiz.answers, [id]: answerId } };
}
export function nextQuestion(quiz: Quiz): Quiz {
  if (quiz.completed || !quiz.answers[quiz.questionIds[quiz.index]]) return quiz;
  return quiz.index === 9 ? { ...quiz, completed: true } : { ...quiz, index: quiz.index + 1 };
}
export function quizScore(quiz: Quiz) { return quiz.questionIds.filter(id => questions.find(q => q.id === id)?.correctOptionId === quiz.answers[id]).length; }
export function validQuiz(value: unknown): value is Quiz {
  if (!value || typeof value !== 'object') return false;
  const q = value as Quiz;
  try {
    if (q.contentVersion !== meta.version || q.questionIds.length !== 10 || new Set(q.questionIds).size !== 10 || !Number.isInteger(q.index) || q.index < 0 || q.index > 9 || typeof q.completed !== 'boolean') return false;
    if (Object.keys(q.answers).some(id => !q.questionIds.includes(id))) return false;
    return q.questionIds.every((id, i) => {
      const question = questions.find(item => item.id === id); const order = q.optionOrders[id]; const answer = q.answers[id];
      return !!question && Array.isArray(order) && order.length === 4 && new Set(order).size === 4 && order.every(option => question.options.some(o => o.id === option)) && (!answer || order.includes(answer)) && (i < q.index || q.completed ? !!answer : i > q.index ? !answer : true);
    }) && (!q.completed || q.index === 9);
  } catch { return false; }
}
