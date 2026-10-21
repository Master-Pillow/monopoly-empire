import { useCallback, useRef, useState } from 'react';

export const GAME_KEY = 'de-che.game.v1';
export const QUIZ_KEY = 'de-che.quiz.v1';
export function readSaved<T>(key: string, valid: (value: unknown) => value is T, fallback: () => T): { value: T; notice: string } {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { value: fallback(), notice: '' };
    const saved: unknown = JSON.parse(raw);
    return valid(saved) ? { value: saved, notice: '' } : { value: fallback(), notice: 'Tiến trình cũ không còn phù hợp hoặc đã bị lỗi. Bạn có thể bắt đầu lượt mới.' };
  } catch { return { value: fallback(), notice: 'Không đọc được tiến trình trên thiết bị. Bạn vẫn có thể chơi; hãy giữ trang mở nếu trình duyệt chặn lưu dữ liệu.' }; }
}
export function useStored<T>(key: string, valid: (value: unknown) => value is T, fallback: () => T, onError: (notice: string) => void) {
  const [loaded] = useState(() => readSaved(key, valid, fallback));
  const [value, setValue] = useState<T>(loaded.value);
  const ref = useRef(value);
  const update = useCallback((action: T | ((current: T) => T)) => {
    const next = typeof action === 'function' ? (action as (current: T) => T)(ref.current) : action;
    if (next === ref.current) return;
    ref.current = next;
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { onError('Trình duyệt không cho lưu tiến trình. Lượt này vẫn chạy, nhưng dữ liệu sẽ mất khi tải lại hoặc đóng trang.'); }
    setValue(next);
  }, [key, onError]);
  return [value, update, loaded.notice] as const;
}
