import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
let chromium;
try { ({chromium} = require('playwright')); }
catch { ({chromium} = require(process.env.PLAYWRIGHT_MODULE_PATH ?? 'C:/Users/metan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const base = process.env.APP_TEST_URL ?? 'http://127.0.0.1:5174';
const browserPath = process.env.CHROMIUM_PATH ?? ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);
const browser = await chromium.launch({headless:true,...(browserPath ? {executablePath:browserPath} : {})});
await mkdir('docs/screenshots',{recursive:true});
const context = await browser.newContext({viewport:{width:1440,height:1000}});
const page = await context.newPage();
const failures = [];
page.on('pageerror',error=>failures.push(error.message));
page.on('console',message=>{if(message.type()==='error')failures.push(message.text());});
const completed=[];
const gameKey='de-che.game.v1', quizKey='de-che.quiz.v1';
const saved = key => page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
async function reset() { await page.goto(base); await page.evaluate(()=>localStorage.clear()); await page.goto(base+'/#/choi'); await page.reload(); await page.getByRole('button',{name:'Bắt đầu hành trình'}).waitFor(); }
async function choose(letter) { await page.locator('.choices .choice').nth(letter.charCodeAt(0)-65).click(); }
async function proceed() {
  const phase=(await saved(gameKey)).phase;
  if(phase==='ending')return;
  if(phase==='event')await page.getByRole('button',{name:'Xem kết quả',exact:true}).click();
  await page.getByRole('button',{name:'Lý luận giải thích điều gì?'}).click();
  await page.getByRole('button',{name:/^(Màn tiếp theo|Xem kết cục doanh nghiệp)$/}).click();
}
try {
  await page.goto(base); await page.getByRole('button',{name:'Bắt đầu hành trình'}).waitFor();
  await page.screenshot({path:'docs/screenshots/desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'docs/screenshots/mobile.png',fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false); completed.push('Màn chào desktop/mobile không tràn ngang');
  await page.setViewportSize({width:1440,height:1000});
  await page.getByRole('button',{name:'Bắt đầu hành trình'}).click();
  await page.locator('.choices .choice').evaluateAll(buttons=>{buttons[0].click();buttons[1].click();});
  assert.equal((await saved(gameKey)).history.length,1);assert.equal((await saved(gameKey)).stats.capital,45);
  const transaction=await saved(gameKey);await page.reload();assert.deepEqual(await saved(gameKey),transaction);completed.push('Bấm chọn liên tiếp chỉ ghi một lần; tải lại giữ giao dịch');
  await page.screenshot({path:'docs/screenshots/game-result.png',fullPage:true});
  await page.getByRole('button',{name:'Lý luận giải thích điều gì?'}).click();
  await page.locator('.theory-card .article-link').first().click();
  await page.getByRole('heading',{name:'Quy luật giá trị và cạnh tranh',exact:true}).waitFor();
  await page.getByRole('button',{name:'Về màn chơi',exact:true}).click();assert.equal((await saved(gameKey)).phase,'theory');
  await page.getByRole('button',{name:'Màn tiếp theo',exact:true}).click();
  for(const letter of 'BCABB'){await choose(letter);await proceed();}
  await page.getByRole('heading',{name:'Doanh nghiệp cạnh tranh lành mạnh',exact:true}).waitFor();
  assert.equal((await saved(gameKey)).stats.welfare,85);completed.push('Đủ 6 màn, kết cục lành mạnh đúng chỉ số; bài học quay lại đúng pha');
  await reset();await page.addInitScript(()=>{Math.random=()=>0.9;});await page.reload();
  await page.getByRole('button',{name:'Bắt đầu hành trình'}).click();for(const letter of 'CB'){await choose(letter);await proceed();}await choose('B');
  await page.locator('.event-card').waitFor();const risk=await saved(gameKey);await page.reload();
  await page.locator('.event-card').waitFor();assert.deepEqual(await saved(gameKey),risk);completed.push('Rủi ro được lưu, tải lại không bốc lại');
  await page.getByRole('link',{name:'Hỏi đáp',exact:true}).filter({visible:true}).click();
  await page.locator('.starter-questions').getByRole('button',{name:'Phân biệt tích tụ và tập trung tư bản thế nào?'}).click();
  await page.locator('.answer-message').last().waitFor();assert.match(await page.locator('.answer-message').last().innerText(),/nguồn lực/);
  await page.locator('.answer-links .article-link').first().click();await page.getByRole('heading',{name:'Tích tụ và tập trung tư bản',exact:true}).waitFor();
  await page.getByRole('button',{name:'Quay lại hỏi đáp'}).click();assert.equal(await page.locator('.answer-message').count(),1);completed.push('Hỏi đáp bấm chọn, liên kết bài và giữ hội thoại khi đổi tab');
  await page.getByRole('link',{name:'Trắc nghiệm',exact:true}).filter({visible:true}).click();await page.getByRole('button',{name:'Bắt đầu trắc nghiệm'}).click();
  const questions=JSON.parse(await readFile('src/content/questions.json','utf8'));
  for(let i=0;i<10;i++){
    const state=await saved(quizKey);const item=questions.find(q=>q.id===state.questionIds[state.index]);const answer=item.options.find(o=>o.id===item.correctOptionId).text;
    await page.locator('.quiz-options').getByRole('button',{name:new RegExp(answer.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).click();
    if(i===0){const before=await saved(quizKey);await page.reload();await page.locator('.quiz-feedback').waitFor();assert.deepEqual(await saved(quizKey),before);}
    await page.getByRole('button',{name:i===9?'Xem kết quả':'Câu tiếp theo',exact:true}).click();
  }
  await page.locator('.score-number').waitFor();assert.equal((await page.locator('.score-number').innerText()).replace(/\s/g,''),'10/10');completed.push('Trắc nghiệm 10 câu, đảo đáp án, chấm đúng và giữ tiến trình');
  await page.goto(base+'/#/kien-thuc');
  await page.getByRole('textbox',{name:'Tìm bài kiến thức'}).fill('tap trung');
  await page.locator('.article-card:visible').filter({hasText:'Tích tụ và tập trung tư bản'}).waitFor();completed.push('Tìm kiến thức không dấu');
  await page.getByRole('textbox',{name:'Tìm bài kiến thức'}).fill('');
  for(const width of [360,390,430]){
    await page.setViewportSize({width,height:844});
    for(const route of ['choi','kien-thuc','trac-nghiem','hoi-dap']){await page.goto(base+'/#/'+route);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Tràn ngang ${route} ở ${width}`);}
  }
  completed.push('Bốn tab ở chiều rộng 360/390/430 px không tràn ngang');
  await page.goto(base+'/#/hoi-dap');await page.screenshot({path:'docs/screenshots/chat-mobile.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'docs/screenshots/chat-desktop.png',fullPage:true});
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload();await context.setOffline(true);await page.reload();
  await page.locator('.starter-questions').getByRole('button',{name:'Cartel là gì?',exact:true}).click();
  await page.locator('.answer-message').last().waitFor();assert.match(await page.locator('.answer-message').last().innerText(),/Cartel/);
  await page.getByRole('link',{name:'Kiến thức',exact:true}).filter({visible:true}).click();await page.locator('.article-card').first().click();
  await page.getByRole('heading',{name:'Quy luật giá trị và cạnh tranh',exact:true}).waitFor();completed.push('Cache ngoại tuyến: tải lại, Hỏi đáp và bài học chạy khi mất mạng');
  await context.setOffline(false);
  const html=await fetch(base).then(r=>r.text());const asset=html.match(/src="([^"]+\.js)"/)[1];
  const started=performance.now();const times=await Promise.all(Array.from({length:60},async()=>{const start=performance.now();for(const path of ['/',asset,'/illustrations/shop.svg']){const response=await fetch(base+path);assert.equal(response.status,200);await response.arrayBuffer();}return performance.now()-start;}));
  const p95=times.sort((a,b)=>a-b)[56];completed.push(`60 phiên tải đồng thời trên máy cục bộ: 180/180 HTTP 200; p95 ${Math.round(p95)} ms; tổng ${Math.round(performance.now()-started)} ms`);
  assert.deepEqual(failures,[]);
  await writeFile('docs/browser-test-results.json',JSON.stringify({testedAt:new Date().toISOString(),target:base,checks:completed,consoleErrors:failures},null,2));
  console.log(completed.join('\n'));
} catch(error) {
  await page.screenshot({path:'docs/screenshots/test-failure.png',fullPage:true}).catch(()=>{});
  await writeFile('docs/browser-test-failure.json',JSON.stringify({checks:completed,error:error.message,url:page.url(),body:await page.locator('body').innerText().catch(()=>''),consoleErrors:failures},null,2));
  throw error;
} finally {await context.close();await browser.close();}
