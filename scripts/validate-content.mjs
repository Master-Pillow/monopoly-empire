import { readFile, access } from 'node:fs/promises';
const names = ['stages','endings','articles','questions','faq','sources','content-meta'];
const [stages,endings,articles,questions,faq,sources,meta] = await Promise.all(names.map(name => readFile(`src/content/${name}.json`,'utf8').then(JSON.parse)));
const keys = ['capital','marketShare','welfare','marketPower'];
const errors = [];
const check = (condition,message) => { if (!condition) errors.push(message); };
for (const [name,list] of [['màn',stages],['kết cục',endings],['bài',articles],['câu hỏi',questions],['FAQ',faq],['nguồn',sources]]) check(new Set(list.map(x=>x.id)).size === list.length,`Trùng ID ${name}`);
check(stages.length===6,'Phải có 6 màn'); check(articles.length===12,'Phải có 12 bài'); check(questions.length===24,'Phải có 24 câu hỏi'); check(faq.length===40,'Phải có 40 FAQ');
const reference = (ids,list,kind) => check(Array.isArray(ids) && ids.every(id=>list.some(x=>x.id===id)),`Liên kết ${kind} không tồn tại: ${ids}`);
let provisional = 0;
for (const [i,stage] of stages.entries()) {
  check(stage.id===`stage-${String(i+1).padStart(2,'0')}`,'Sai thứ tự màn');
  check(stage.choices.length===3,`${stage.id}: thiếu lựa chọn`); check(new Set(stage.choices.map(c=>c.id)).size===3,`${stage.id}: trùng lựa chọn`);
  for (const field of ['context','decision','historyText','theory','title','year','illustration']) check(typeof stage[field]==='string' && stage[field].trim(),`${stage.id}: thiếu ${field}`);
  reference(stage.articleIds,articles,'bài học'); reference(stage.sourceIds,sources,'nguồn');
  try { await access(`public/illustrations/${stage.illustration}.svg`); } catch { errors.push(`${stage.id}: thiếu minh họa`); }
  for (const choice of stage.choices) {
    check(keys.every(key=>Number.isFinite(choice.delta[key])) && Object.keys(choice.delta).length===4,`${choice.id}: cần đủ 4 số`);
    check(choice.text && choice.feedback,`${choice.id}: thiếu nội dung`);
    if (choice.provisional) provisional++;
    if (choice.risk) { check(choice.risk.probability>=0 && choice.risk.probability<=1,`${choice.id}: sai xác suất`); check(['bankrupt','fine'].includes(choice.risk.effect),`${choice.id}: sai sự kiện`); if (choice.risk.effect==='fine') check(Number.isFinite(choice.risk.amount),`${choice.id}: thiếu tiền phạt`); }
  }
}
for (const question of questions) {
  check(question.options.length===4 && new Set(question.options.map(o=>o.id)).size===4,`${question.id}: cần 4 đáp án khác ID`);
  check(question.options.some(o=>o.id===question.correctOptionId),`${question.id}: thiếu đáp án chuẩn`);
  check(question.prompt && question.explanation && question.options.every(o=>o.text),`${question.id}: nội dung trống`);
  reference([question.articleId],articles,'bài câu hỏi');
}
for (const item of [...articles,...faq]) {
  reference(item.sourceIds,sources,'nguồn');
  if ('answer' in item) { reference(item.articleIds,articles,'bài FAQ'); check(item.question && item.answer,`${item.id}: câu trả lời trống`); check(item.answer.trim().split(/\s+/).length<=150,`${item.id}: câu trả lời quá 150 từ`); }
}
for (const ending of endings) { reference(ending.articleIds,articles,'bài kết cục'); check(ending.conditions.every(c=>keys.includes(c.key) && ['gte','lte','gt','eq'].includes(c.op) && Number.isFinite(c.value)),`${ending.id}: điều kiện không hợp lệ`); }
check(endings.length>=5 && endings.at(-1).conditions.length===0,'Thiếu kết cục dự phòng');
check(new Set(endings.map(e=>e.priority)).size===endings.length,'Trùng ưu tiên kết cục');
for (const source of sources) check(!source.url || new URL(source.url).protocol==='https:',`Nguồn ${source.id} phải dùng HTTPS`);
if (process.argv.includes('--classroom')) check(meta.editorialStatus==='approved' && [...articles,...questions,...faq].every(x=>x.approved),'Bản lớp học cần người phụ trách duyệt nội dung và xác nhận trạng thái approved.');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Nội dung hợp lệ: ${stages.length} màn / 18 lựa chọn / ${articles.length} bài / ${questions.length} câu trắc nghiệm / ${faq.length} FAQ.`);
console.log(`Trạng thái biên tập: ${meta.editorialStatus}; ${provisional} lựa chọn có điểm tạm. Chưa xác nhận giáo trình của lớp.`);
