import { describe, it, expect } from 'vitest';
import { stages, endings, questions, meta } from '../src/content';
import { gameReducer, newGame, getEnding, validGame } from '../src/domain/game';
import { newQuiz, answerQuiz, nextQuestion, quizScore, validQuiz } from '../src/domain/quiz';
import { statKeys } from '../src/domain/types';
import type { Game } from '../src/domain/types';

function choose(game: Game, letter: string, draw = 0.75) { return gameReducer(game,{type:'choose',stageId:stages[game.stageIndex].id,choiceId:stages[game.stageIndex].choices.find(c=>c.label===letter)!.id,draw}); }
function advance(game: Game) { return gameReducer(game,{type:'advance',revision:game.revision,phase:game.phase}); }
function continueGame(game: Game) { while (!['choice','ending'].includes(game.phase)) game=advance(game); return game; }
function path(letters: string, draw = 0.75) { let game=gameReducer(newGame(),{type:'start'}); for (const letter of letters) { game=continueGame(choose(game,letter,draw)); if(game.phase==='ending')break; } return game; }

describe('Luật game',()=>{
  it('bắt đầu với 50 và không cho chọn trước khi bắt đầu',()=>{const g=newGame(); expect(statKeys.map(k=>g.stats[k])).toEqual([50,50,50,50]); expect(choose(g,'A')).toBe(g);});
  it.each([['BAB','bankrupt',[0,65,55,70]],['CBCAAA','investigation',[55,80,15,100]],['CBCABA','tycoon',[60,80,45,90]],['ABCABB','healthy',[25,100,85,80]]])('đường %s đạt %s',(letters,id,stats)=>{const g=path(letters as string);expect(g.endingId).toBe(id);expect(statKeys.map(k=>g.stats[k])).toEqual(stats);expect(validGame(g)).toBe(true);});
  it('phạt trước khi cắt trần vốn',()=>{let g=gameReducer(newGame(),{type:'start'});g={...g,stageIndex:4,stats:{...g.stats,capital:95}};expect(choose(g,'A').stats.capital).toBe(85);});
  it.each([[0,true],[0.4999,true],[0.5,false],[0.9999,false]])('rủi ro tại %s có phá sản=%s',(draw,dead)=>{const g=choose(path('CB'),'B',draw as number); expect(g.stats.capital===0).toBe(dead);expect(g.history.at(-1)?.randomDraw).toBe(draw);});
  it('không bốc rủi ro khi chi phí cơ bản đã làm cạn vốn',()=>{const g=choose(path('BA'),'B',0.1);expect(g.endingId).toBe('bankrupt');expect(g.history.at(-1)?.randomDraw).toBeNull();expect(g.history.at(-1)?.event).toBeNull();});
  it('không nhận chọn trùng, sai màn hoặc bấm tiếp với revision cũ',()=>{const g=gameReducer(newGame(),{type:'start'});const result=choose(g,'A');expect(choose(result,'B')).toBe(result);expect(gameReducer(g,{type:'choose',stageId:'stage-02',choiceId:'stage-02-a',draw:0.1})).toBe(g);const next=advance(result);expect(gameReducer(next,{type:'advance',revision:result.revision,phase:result.phase})).toBe(next);});
  it('4C chỉ đổi ngữ cảnh, vẫn đi đủ màn',()=>{const g=path('CBCC');expect(g.flags).toContain('invited-to-cartel');expect(g.stageIndex).toBe(4);expect(g.history.length).toBe(4);});
  it('ưu tiên phá sản rồi điều tra rồi phúc lợi',()=>{expect(getEnding({capital:0,marketShare:100,welfare:10,marketPower:100}).id).toBe('bankrupt');expect(getEnding({capital:80,marketShare:90,welfare:35,marketPower:80}).id).toBe('investigation');expect(getEnding({capital:80,marketShare:90,welfare:70,marketPower:80}).id).toBe('healthy');expect(getEnding({capital:80,marketShare:90,welfare:36,marketPower:80}).id).toBe('tycoon');});
  it('khôi phục mọi pha nhưng từ chối bản lưu bị sửa/hỏng/cũ',()=>{let g=gameReducer(newGame(),{type:'start'});for(const letter of 'CBCABB'){expect(validGame(JSON.parse(JSON.stringify(g)))).toBe(true);g=choose(g,letter);while(!['choice','ending'].includes(g.phase)){expect(validGame(JSON.parse(JSON.stringify(g)))).toBe(true);g=advance(g);}}expect(validGame({...g,contentVersion:'old'})).toBe(false);expect(validGame({...g,stats:{...g.stats,capital:99}})).toBe(false);expect(validGame({})).toBe(false);});
  it('duyệt toàn bộ đường chơi, giới hạn đúng và đủ kết cục',()=>{const reached=new Set<string>();let terminals=0;function walk(g:Game){if(g.phase==='ending'){reached.add(g.endingId!);terminals++;return;}for(const c of stages[g.stageIndex].choices){for(const draw of c.risk?.type==='chance'?[0.1,0.9]:[0.9]){const next=gameReducer(g,{type:'choose',stageId:stages[g.stageIndex].id,choiceId:c.id,draw});expect(statKeys.every(k=>next.stats[k]>=0&&next.stats[k]<=100)).toBe(true);expect(validGame(next)).toBe(true);walk(continueGame(next));}}}walk(gameReducer(newGame(),{type:'start'}));expect(terminals).toBeGreaterThan(500);expect(reached).toEqual(new Set(endings.map(e=>e.id)));});
});
describe('Trắc nghiệm',()=>{
  it('10 câu không trùng và đảo đủ các đáp án',()=>{for(let i=0;i<30;i++){const q=newQuiz();expect(new Set(q.questionIds).size).toBe(10);expect(validQuiz(q)).toBe(true);for(const id of q.questionIds)expect(new Set(q.optionOrders[id])).toEqual(new Set(questions.find(x=>x.id===id)!.options.map(o=>o.id)));}});
  it('chấm theo ID, không đổi điểm khi trả lời lần hai',()=>{let q=newQuiz(()=>0.1);for(let i=0;i<10;i++){const item=questions.find(x=>x.id===q.questionIds[q.index])!;q=answerQuiz(q,item.correctOptionId);expect(answerQuiz(q,item.options.find(o=>o.id!==item.correctOptionId)!.id)).toBe(q);expect(validQuiz(q)).toBe(true);q=nextQuestion(q);}expect(q.completed).toBe(true);expect(quizScore(q)).toBe(10);expect(validQuiz(q)).toBe(true);expect(nextQuestion(q)).toBe(q);});
  it('không cho tiếp khi chưa trả lời hoặc nhận đáp án lạ',()=>{const q=newQuiz();expect(nextQuestion(q)).toBe(q);expect(answerQuiz(q,'invalid')).toBe(q);});
  it('từ chối thứ tự trùng, phiên bản cũ và đáp án sai cấu trúc',()=>{const q=newQuiz();expect(validQuiz({...q,questionIds:Array(10).fill(q.questionIds[0])})).toBe(false);expect(validQuiz({...q,contentVersion:meta.version+'x'})).toBe(false);expect(validQuiz({...q,answers:{other:'a'}})).toBe(false);});
});
