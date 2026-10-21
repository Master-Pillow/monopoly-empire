import { useCallback, useEffect, useRef, useState } from 'react';
import { articles, meta } from './content';
import { newGame, validGame } from './domain/game';
import { validQuiz } from './domain/quiz';
import type { Quiz } from './domain/types';
import { GAME_KEY, QUIZ_KEY, useStored } from './lib/storage';
import { Icon } from './components/ui';
import { GameView } from './features/game/GameView';
import { KnowledgeView } from './features/knowledge/KnowledgeView';
import { QuizView } from './features/quiz/QuizView';
import { ChatView } from './features/chat/ChatView';

const tabs = [
  { id: 'choi', label: 'Chơi', icon: 'game' },
  { id: 'kien-thuc', label: 'Kiến thức', icon: 'book' },
  { id: 'trac-nghiem', label: 'Trắc nghiệm', icon: 'quiz' },
  { id: 'hoi-dap', label: 'Hỏi đáp', icon: 'chat' },
];
function parseRoute() { const [id, article] = location.hash.replace(/^#\/?/,'').split('/'); return { tab: tabs.some(t => t.id === id) ? id : 'choi', articleId: articles.some(a => a.id === article) ? article : null }; }
export default function App() {
  const [route, setRoute] = useState(parseRoute);
  const [notice, setNotice] = useState('');
  const [conflict, setConflict] = useState(false);
  const [originTab, setOriginTab] = useState<string | null>(null);
  const [chatTopic, setChatTopic] = useState<{id: string | null; revision: number}>({ id: null, revision: 0 });
  const [offlineReady, setOfflineReady] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState<ServiceWorkerRegistration | null>(null);
  const acceptUpdate = useRef(false);
  const reportError = useCallback((text: string) => setNotice(text), []);
  const [game, updateGame, gameNotice] = useStored(GAME_KEY, validGame, newGame, reportError);
  const [quiz, updateQuiz, quizNotice] = useStored<Quiz | null>(QUIZ_KEY, (value): value is Quiz | null => value === null || validQuiz(value), () => null, reportError);
  useEffect(() => { if (gameNotice || quizNotice) setNotice([gameNotice,quizNotice].filter(Boolean).join(' ')); }, [gameNotice,quizNotice]);
  useEffect(() => {
    const hash = () => { setRoute(parseRoute()); window.scrollTo({ top: 0, behavior: 'instant' }); };
    const storage = (event: StorageEvent) => { if (!event.key || [GAME_KEY,QUIZ_KEY].includes(event.key)) setConflict(true); };
    const network = () => setOnline(navigator.onLine);
    window.addEventListener('hashchange', hash); window.addEventListener('storage', storage); window.addEventListener('online', network); window.addEventListener('offline', network);
    if (!location.hash) history.replaceState(null,'','#/choi');
    return () => { window.removeEventListener('hashchange',hash); window.removeEventListener('storage',storage); window.removeEventListener('online',network); window.removeEventListener('offline',network); };
  }, []);
  useEffect(() => {
    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
    let disposed = false;
    navigator.serviceWorker.register('/sw.js').then(registration => {
      if (registration.waiting && !disposed) setUpdateAvailable(registration);
      registration.addEventListener('updatefound', () => { const worker = registration.installing; worker?.addEventListener('statechange', () => { if (worker.state === 'installed' && navigator.serviceWorker.controller && !disposed) setUpdateAvailable(registration); }); });
      navigator.serviceWorker.ready.then(() => { if (!disposed) setOfflineReady(true); });
    }).catch(() => { if (!disposed) setNotice('Chưa lưu được bản ngoại tuyến. Bạn vẫn có thể sử dụng khi có kết nối mạng.'); });
    const change = () => { if (acceptUpdate.current) location.reload(); };
    navigator.serviceWorker.addEventListener('controllerchange',change);
    return () => { disposed = true; navigator.serviceWorker.removeEventListener('controllerchange',change); };
  }, []);
  const go = (tab: string, articleId?: string) => { location.hash = `/${tab}${articleId ? `/${articleId}` : ''}`; };
  const openArticle = (id: string) => { if (route.tab !== 'kien-thuc') setOriginTab(route.tab); go('kien-thuc',id); };
  return <><a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Đến nội dung chính</a><header className="app-header"><a href="#/choi" className="brand" aria-label="Đế chế Độc quyền — về Chơi"><span className="brand-mark"><Icon name="game" size={25}/></span><span>ĐẾ CHẾ<span>ĐỘC QUYỀN</span></span></a><nav className="desktop-nav" aria-label="Điều hướng chính">{tabs.map(tab => <a href={`#/${tab.id}`} key={tab.id} aria-current={route.tab === tab.id ? 'page' : undefined} className={route.tab === tab.id ? 'active' : ''}><Icon name={tab.icon} size={18}/>{tab.label}</a>)}</nav><span className="header-edition">KINH TẾ CHÍNH TRỊ<span>CHƯƠNG 04</span></span></header>
    {conflict && <div className="notice conflict" role="alert"><Icon name="info"/><span>Tiến trình đã thay đổi ở cửa sổ khác. Tải lại để dùng bản mới và tránh ghi đè.</span><button onClick={() => location.reload()}>Tải lại</button></div>}
    {notice && <div className="notice" role="status"><Icon name="info"/><span>{notice}</span><button aria-label="Đóng thông báo" onClick={() => setNotice('')}><Icon name="close" size={16}/></button></div>}
    {updateAvailable && <div className="notice"><span>Có phiên bản mới. Tiến trình hiện tại đã được lưu; nội dung mới có thể yêu cầu lượt chơi mới.</span><button onClick={() => { acceptUpdate.current = true; updateAvailable.waiting?.postMessage('ACTIVATE_UPDATE'); }}>Cập nhật & tải lại</button></div>}
    <main id="main-content" className="content-shell" tabIndex={-1}>
      <div hidden={route.tab !== 'choi'}><GameView game={game} update={updateGame} openArticle={openArticle} openQuiz={() => go('trac-nghiem')} blocked={conflict}/></div>
      <div hidden={route.tab !== 'kien-thuc'}><KnowledgeView articleId={route.articleId} select={id => go('kien-thuc', id ?? undefined)} backToGame={originTab === 'choi'} returnToGame={() => go('choi')} ask={id => { setChatTopic(current => ({id,revision:current.revision+1})); go('hoi-dap'); }}/>{originTab && originTab !== 'choi' && route.articleId && <div className="return-origin"><button className="button secondary" onClick={() => go(originTab)}><Icon name="back" size={16}/> Quay lại {tabs.find(t => t.id === originTab)?.label.toLowerCase()}</button></div>}</div>
      <div hidden={route.tab !== 'trac-nghiem'}><QuizView quiz={quiz} update={updateQuiz} openArticle={openArticle} blocked={conflict}/></div>
      <div hidden={route.tab !== 'hoi-dap'}><ChatView topic={chatTopic.id} requestId={chatTopic.revision} openArticle={openArticle}/></div>
    </main>
    <footer className="app-footer"><span>HỌC QUA QUYẾT ĐỊNH, HIỂU QUA ĐÁNH ĐỔI.</span><span><span className="live-dot"/>{!online ? offlineReady ? 'Đang dùng ngoại tuyến' : 'Mất kết nối · giữ trang mở' : offlineReady ? 'Sẵn sàng dùng ngoại tuyến' : 'Tiến trình lưu trên thiết bị'}</span></footer>
    <nav className="bottom-nav" aria-label="Điều hướng trên điện thoại">{tabs.map(tab => <a href={`#/${tab.id}`} key={tab.id} aria-current={route.tab === tab.id ? 'page' : undefined} className={route.tab === tab.id ? 'active' : ''}><Icon name={tab.icon} size={21}/><span>{tab.label}</span></a>)}</nav>
  </>;
}
