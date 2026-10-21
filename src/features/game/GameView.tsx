import { useEffect, useRef, useState } from 'react';
import { articles, endings, meta, stages } from '../../content';
import { gameReducer, newGame, shareText } from '../../domain/game';
import type { GameAction } from '../../domain/game';
import type { Game } from '../../domain/types';
import { Icon, Modal, SourceLinks, StatChanges, StatsPanel } from '../../components/ui';

const howTo = [
  { title: 'Đọc tình huống', text: 'Mỗi màn là một thời điểm trong hành trình của doanh nghiệp.' },
  { title: 'Chọn 1 trong 3 phương án', text: 'Bấm vào phương án bạn muốn. Không thể đổi lại sau khi chọn.' },
  { title: 'Xem đánh đổi và lý luận', text: 'Bốn chỉ số thay đổi, kèm thực tế lịch sử và phần giải thích lý luận.' },
  { title: 'Nhận kết cục', text: 'Sau 6 màn, bốn chỉ số quyết định kết cục của doanh nghiệp.' },
];
const phaseSteps = ['Chọn phương án', 'Xem đánh đổi', 'Hiểu lý luận'];

type Props = { game: Game; update: (action: Game | ((current: Game) => Game)) => void; openArticle: (id: string) => void; openQuiz: () => void; blocked: boolean };
export function GameView({ game, update, openArticle, openQuiz, blocked }: Props) {
  const [resetOpen, setResetOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [copyFallback, setCopyFallback] = useState(false);
  const shownRevision = useRef(game.revision);
  useEffect(() => {
    if (shownRevision.current === game.revision) return;
    shownRevision.current = game.revision;
    const main = document.getElementById('main-content');
    if (main && main.getBoundingClientRect().top < 0) main.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, [game.revision]);
  const stage = stages[game.stageIndex]; const entry = game.history.at(-1); const selected = stage.choices.find(c => c.id === entry?.choiceId);
  const apply = (action: GameAction) => { if (!blocked) update(current => gameReducer(current, action)); };
  const next = () => apply({ type: 'advance', revision: game.revision, phase: game.phase });
  async function copy() { try { await navigator.clipboard.writeText(shareText(game)); setCopyStatus('Đã sao chép kết quả'); } catch { setCopyFallback(true); } }
  const rules = <>{rulesOpen && <Modal title="Cách chơi & quy ước" onClose={() => setRulesOpen(false)}>
    <p>Bạn điều hành một doanh nghiệp giả lập qua 6 quyết định. Mỗi lựa chọn có lợi ích và chi phí; điểm chỉ xuất hiện sau khi chọn.</p>
    <HowTo/>
    <p>Bốn chỉ số bắt đầu ở 50 và nằm trong 0–100. Vốn về 0 thì phá sản. Tiến trình tự lưu trên thiết bị này.</p>
    <p className="callout">Bảng điểm và ngưỡng kết cục đang dùng là bản tạm theo kế hoạch của nhóm.</p>
    <ul className="rules-list">{meta.assumptions.map(rule => <li key={rule}>{rule}</li>)}</ul>
    <p className="muted">{meta.notice}</p>
  </Modal>}{resetOpen && <Modal title="Bắt đầu một lượt mới?" onClose={() => setResetOpen(false)}><p>Chỉ tiến trình chơi hiện tại sẽ được đặt lại. Bài đọc và trắc nghiệm vẫn được giữ.</p><div className="button-row"><button className="button secondary" onClick={() => setResetOpen(false)}>Giữ lượt này</button><button className="button primary" disabled={blocked} onClick={() => { update(newGame()); setResetOpen(false); setCopyStatus(''); }}>Chơi lại <Icon name="reset" size={17}/></button></div></Modal>}</>;
  if (game.phase === 'welcome') return <div className="welcome-layout">
    <section className="paper welcome-card">
      <div className="welcome-copy"><span className="eyebrow"><span className="live-dot"/> HỒ SƠ KINH DOANH · CHƯƠNG 4</span><h1>Đế chế<br/><em>Độc quyền.</em></h1><p className="welcome-lead">Sáu quyết định. Một doanh nghiệp.<br/>Bạn sẽ đánh đổi điều gì để đi xa?</p><div className="welcome-actions"><button className="button primary large" disabled={blocked} onClick={() => apply({type:'start'})}>Bắt đầu hành trình <Icon name="arrow"/></button><button className="button secondary large" onClick={() => setRulesOpen(true)}>Cách chơi <Icon name="info" size={18}/></button></div><div className="welcome-meta"><span><Icon name="clock" size={16}/> Khoảng 5–6 phút</span><span>6 màn chơi</span><span>Không có đáp án tuyệt đối</span></div></div>
      <div className="welcome-art"><img src="/illustrations/empire.svg" alt="Minh họa một thành phố công nghiệp với nhà máy và chip nhớ"/><span className="art-caption">TỪ MỘT TIỆM BUÔN ĐẾN THỊ TRƯỜNG TOÀN CẦU</span></div>
    </section>
    <section className="howto" aria-labelledby="howto-title"><div className="section-head"><h2 id="howto-title">Cách chơi</h2><p>Bạn điều hành một doanh nghiệp giả lập qua 6 quyết định. Mỗi lựa chọn có lợi ích và chi phí; điểm chỉ xuất hiện sau khi chọn.</p></div><HowTo/></section>
    <section className="welcome-stats" aria-labelledby="stats-title"><div className="section-head"><h2 id="stats-title">Bốn chỉ số cần theo dõi</h2><p>Bốn chỉ số bắt đầu ở 50 và nằm trong 0–100. Vốn về 0 thì phá sản.</p></div><StatsPanel stats={game.stats} explain/></section>
    <aside className="note-card"><span className="eyebrow">VAI TRÒ CỦA BẠN</span><h2>Nhìn thị trường<br/>từ ghế người quyết định.</h2><p>Mỗi lựa chọn mở ra một câu chuyện về cạnh tranh, tích tụ tư bản và quyền lực thị trường.</p><div className="small-divider"/><p className="muted">Lấy cảm hứng từ lịch sử Samsung. Tình huống và điểm số là mô phỏng phục vụ học tập.</p><button className="text-button" onClick={() => openArticle('k02')}>Đọc kiến thức trước <Icon name="arrow" size={16}/></button></aside>
    <p className="editorial-note"><Icon name="info" size={16}/> Nội dung tham khảo · cần đối chiếu giáo trình.</p>{rules}
  </div>;
  if (game.phase === 'ending') {
    const ending = endings.find(e => e.id === game.endingId)!;
    return <div className="ending-layout"><section className="paper ending-card"><div className="ending-medal"><Icon name="trophy" size={36}/></div><span className="eyebrow">HỒ SƠ TỔNG KẾT · {game.history.length}/6 QUYẾT ĐỊNH</span><h1>{ending.title}</h1><p className="ending-summary">{ending.summary}</p><StatsPanel stats={game.stats} compact/>
      {game.stats.capital === 0 && entry && <div className="callout"><strong>{entry.event?.title ?? 'Nguồn vốn đã cạn'}</strong><p>{entry.event?.text ?? selected?.feedback}</p><button className="text-button" onClick={() => openArticle(stage.articleIds[0])}>Đọc lý luận của màn vừa chơi <Icon name="arrow" size={15}/></button></div>}
      {game.history.some(h => h.choiceId === 'stage-05-a' || h.choiceId === 'stage-05-c') && <p className="callout">Lịch sử có lựa chọn tham gia cartel. Hãy tiếp tục thảo luận ảnh hưởng tới cạnh tranh; nhãn kết cục không xóa đánh đổi này.</p>}
      <div className="button-row"><button className="button primary" onClick={openQuiz}>Làm trắc nghiệm <Icon name="arrow" size={17}/></button><button className="button secondary" onClick={() => setResetOpen(true)}><Icon name="reset" size={17}/> Chơi lại</button><button className="button ghost" onClick={copy}><Icon name="copy" size={17}/> Sao chép</button></div><p className="copy-status" role="status">{copyStatus}</p>{copyFallback && <label className="copy-box">Chọn văn bản để sao chép<textarea readOnly value={shareText(game)} onFocus={e => e.target.select()}/></label>}<div className="ending-links">{ending.articleIds.map(id => <button className="article-link" key={id} onClick={() => openArticle(id)}><Icon name="book" size={16}/>{articles.find(a => a.id === id)?.title}</button>)}</div></section><aside className="paper history-panel"><span className="eyebrow">NHÌN LẠI HÀNH TRÌNH</span><h2>Những quyết định<br/>đã đưa bạn tới đây.</h2><History game={game}/><p className="tiny muted">Ngưỡng kết cục là quy ước tạm của mô hình.</p></aside>{rules}</div>;
  }
  const step = game.phase === 'choice' ? 0 : game.phase === 'theory' ? 2 : 1;
  return <div className="play-layout"><aside className="journey-panel"><span className="eyebrow">HÀNH TRÌNH CỦA BẠN</span><h2>6 quyết định<br/>tạo nên một đế chế.</h2><ol className="timeline">{stages.map((item, index) => <li key={item.id} className={index === game.stageIndex ? 'current' : index < game.stageIndex ? 'done' : ''}><span className="step-dot">{index < game.stageIndex ? <Icon name="check" size={14}/> : String(index + 1).padStart(2,'0')}</span><div><small>{item.year}</small><span>{item.title}</span></div></li>)}</ol></aside>
    <div className="stage-area"><div className="game-bar"><div className="stage-progress" role="img" aria-label={`Màn ${game.stageIndex + 1} trên 6`}>{stages.map((item, index) => <span key={item.id} className={index === game.stageIndex ? 'current' : index < game.stageIndex ? 'done' : ''}/>)}</div><div className="game-tools"><button className="tool-button" onClick={() => setRulesOpen(true)}><Icon name="info" size={16}/> Cách chơi</button><button className="tool-button" onClick={() => setResetOpen(true)}><Icon name="reset" size={16}/> Bắt đầu lại</button></div></div>
      <div className="mobile-stats"><StatsPanel stats={game.stats} before={game.phase !== 'choice' ? entry?.before : undefined} compact/></div><section className="paper stage-card" key={`${stage.id}-${game.phase}`}>
      <div className="stage-top"><span className="eyebrow">{stage.year}</span><span className="tag">MÀN {game.stageIndex + 1}/6</span></div><h1>{stage.title}</h1>
      <ol className="phase-steps" aria-label="Các bước của mỗi màn">{phaseSteps.map((label, index) => <li key={label} className={index === step ? 'current' : index < step ? 'done' : ''} aria-current={index === step ? 'step' : undefined}><span>{index < step ? <Icon name="check" size={13}/> : index + 1}</span>{label}</li>)}</ol>
      {game.phase === 'choice' && <><div className="stage-illustration"><img src={`/illustrations/${stage.illustration}.svg`} alt={`Minh họa: ${stage.title}`}/><span>TÌNH HUỐNG MÔ PHỎNG</span></div><p className="context">{stage.id === 'stage-05' && game.flags.includes('invited-to-cartel') ? stage.branchIntro : stage.context}</p><div className="decision-box"><h2 className="decision">{stage.decision}</h2><p className="decision-hint">Bấm vào một phương án để quyết định. Điểm chỉ xuất hiện sau khi chọn.</p><div className="choices">{stage.choices.map(choice => <button className="choice" disabled={blocked} key={choice.id} onClick={() => apply({type:'choose',stageId:stage.id,choiceId:choice.id,draw:Math.random()})}><span className="choice-letter">{choice.label}</span><span>{choice.text}</span><Icon name="arrow" size={18}/></button>)}</div></div></>}
      {game.phase === 'event' && entry?.event && <div className={`event-card ${entry.event.occurred ? '' : 'safe'}`}><span className="event-symbol"><Icon name={entry.event.occurred ? 'info' : 'power'} size={34}/></span><span className="eyebrow">SỰ KIỆN DOANH NGHIỆP</span><h2>{entry.event.title}</h2><p>{entry.event.text}</p><button className="button primary" disabled={blocked} onClick={next}>Xem kết quả <Icon name="arrow" size={17}/></button></div>}
      {(game.phase === 'result' || game.phase === 'theory') && <><div className="selected-choice"><span className="choice-letter">{selected?.label}</span><span><small>BẠN ĐÃ CHỌN</small>{selected?.text}</span><Icon name="check" size={20}/></div>{game.phase === 'result' ? <>{entry && <><span className="eyebrow">CHỈ SỐ THAY ĐỔI</span><StatChanges before={entry.before} after={entry.after}/></>}<span className="eyebrow feedback-label">ĐÁNH ĐỔI CỦA QUYẾT ĐỊNH</span><p className="context">{selected?.feedback}</p><div className="history-fact"><span className="eyebrow">THỰC TẾ LỊCH SỬ</span><p>{stage.historyText}</p><SourceLinks ids={stage.sourceIds}/></div><button className="button primary full" disabled={blocked} onClick={next}>Lý luận giải thích điều gì? <Icon name="arrow" size={17}/></button></> : <><div className="theory-card"><span className="eyebrow"><Icon name="book" size={16}/> MÁC–LÊNIN GIẢI THÍCH</span><p>{stage.theory}</p>{stage.articleIds.map(id => <button key={id} className="article-link" onClick={() => openArticle(id)}>{articles.find(a => a.id === id)?.title}<Icon name="arrow" size={15}/></button>)}</div><button className="button primary full" disabled={blocked} onClick={next}>{game.stageIndex === 5 ? 'Xem kết cục doanh nghiệp' : 'Màn tiếp theo'} <Icon name="arrow" size={17}/></button></>}</>}
    </section><p className="below-card"><span><span className="live-dot"/> {blocked ? 'Đang khóa thao tác' : 'Tiến trình tự lưu trên thiết bị'}</span><span>Điểm mô phỏng /100</span></p></div>
    <aside className="business-panel"><StatsPanel stats={game.stats} before={game.phase !== 'choice' ? entry?.before : undefined}/><div className="mini-history"><span className="eyebrow">NHẬT KÝ QUYẾT ĐỊNH</span>{game.history.length ? <History game={game} short/> : <p className="muted">Quyết định đầu tiên của bạn sẽ được ghi tại đây.</p>}</div></aside>{rules}
  </div>;
}
function HowTo() { return <ol className="howto-steps">{howTo.map((item, index) => <li key={item.title}><span className="howto-num">{index + 1}</span><strong>{item.title}</strong><p>{item.text}</p></li>)}</ol>; }
function History({ game, short = false }: { game: Game; short?: boolean }) { return <ol className={`history-list ${short ? 'short' : ''}`}>{game.history.map((entry, i) => { const stage = stages.find(s => s.id === entry.stageId)!; const choice = stage.choices.find(c => c.id === entry.choiceId)!; return <li key={entry.stageId}><span className="history-num">{String(i + 1).padStart(2,'0')}</span><div><span className="tiny muted">{stage.year}</span><strong>{choice.label} · {choice.text}</strong>{entry.event && <small>{entry.event.occurred ? 'Sự kiện: ' : 'Vượt rủi ro: '}{entry.event.title}</small>}</div></li>; })}</ol>; }
