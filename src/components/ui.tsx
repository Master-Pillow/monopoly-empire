import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { StatKey, Stats } from '../domain/types';
import { statKeys } from '../domain/types';
import { sources } from '../content';

const paths: Record<string, ReactNode> = {
  game: <><path d="M4 18V9l5-3v12m4 0V5l5-3v16M2 21h20"/><path d="M20 10v8"/></>,
  book: <><path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15"/></>,
  quiz: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="m8 9 2 2 5-5M8 15h8M8 18h5"/></>,
  chat: <path d="M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 1 1 17-5ZM8 10h8m-8 4h5"/>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
  back: <path d="M20 12H4m6-6-6 6 6 6"/>,
  coin: <><circle cx="12" cy="12" r="9"/><path d="M15 8h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9m3-10v12"/></>,
  chart: <><path d="M3 3v18h18M7 17v-6m5 6V7m5 10V4"/></>,
  heart: <path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-4 4 1 9 8 15 7-6 12-11 8-15Z"/>,
  power: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z"/><path d="m8 12 3 3 5-6"/></>,
  check: <path d="m4 12 5 5L20 6"/>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  reset: <><path d="M3 10a9 9 0 1 1 1 8M3 3v7h7"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
  search: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,
  link: <><path d="M14 3h7v7m0-7-9 9M10 3H3v18h18v-7"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-11v1"/></>,
  copy: <><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/></>,
  trophy: <><path d="M7 3h10v7a5 5 0 0 1-10 0V3Zm0 2H3v3c0 3 2 4 5 4m9-7h4v3c0 3-2 4-5 4M12 15v5m-5 1h10"/></>,
};
export function Icon({ name, size = 20 }: { name: string; size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.info}</svg>; }
export const labels: Record<StatKey, { title: string; short: string; icon: string; color: string }> = {
  capital: { title: 'Vốn', short: 'Vốn', icon: 'coin', color: 'copper' },
  marketShare: { title: 'Thị phần', short: 'Thị phần', icon: 'chart', color: 'blue' },
  welfare: { title: 'Phúc lợi người tiêu dùng', short: 'Phúc lợi', icon: 'heart', color: 'green' },
  marketPower: { title: 'Quyền lực thị trường', short: 'Quyền lực', icon: 'power', color: 'purple' },
};
export function StatsPanel({ stats, before, compact = false }: { stats: Stats; before?: Stats; compact?: boolean }) {
  return <section className={`stats-panel ${compact ? 'compact' : ''}`} aria-label="Bốn chỉ số doanh nghiệp">
    <div className="stats-heading"><span className="eyebrow">SỨC KHỎE DOANH NGHIỆP</span><span className="tiny">/100</span></div>
    <div className="stats-grid">{statKeys.map(key => { const item = labels[key]; const diff = before ? stats[key] - before[key] : 0; return <div className={`stat ${item.color}`} key={key}>
      <div className="stat-top"><span className="stat-label"><Icon name={item.icon} size={18}/><span>{item.short}</span></span><span className="stat-value">{stats[key]}{diff !== 0 && <span className={`delta ${diff > 0 ? 'positive' : 'negative'}`} key={`${key}-${stats[key]}`} aria-label={`Thay đổi ${diff > 0 ? 'tăng' : 'giảm'} ${Math.abs(diff)} điểm`}>{diff > 0 ? '+' : ''}{diff}</span>}</span></div>
      <div className="meter" role="progressbar" aria-label={item.title} aria-valuemin={0} aria-valuemax={100} aria-valuenow={stats[key]}><span style={{width: `${stats[key]}%`}}/></div>
    </div>; })}</div>
    {!compact && <p className="stat-note">Điểm mô phỏng, không phải số liệu lịch sử.</p>}
  </section>;
}
export function SourceLinks({ ids }: { ids: string[] }) { return <div className="source-links">{ids.map(id => { const source = sources.find(s => s.id === id); return source?.url ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer"><Icon name="link" size={12}/>{source.publisher}</a> : null; })}</div>; }
export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const previous = document.activeElement as HTMLElement; dialog.current?.showModal(); return () => previous?.focus(); }, []);
  return <dialog ref={dialog} className="modal" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="modal-top"><h2>{title}</h2><button className="icon-button" aria-label="Đóng" onClick={onClose}><Icon name="close"/></button></div>{children}
  </dialog>;
}
