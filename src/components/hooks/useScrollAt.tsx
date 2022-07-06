import { createRef, useEffect } from 'react';

/**
 * 指定した要素にスクロールする機能を提供するhooks。
 * 戻り値のref要素をスクロール対象の要素に指定する。
 *
 * @param onChange スクロールを実施するuseEffectに渡す依存変数。この配列内の値が変化した時にスクロールを行う。省略、または空配列を指定すると、初期表示のみスクロールする。
 * @returns スクロール対象の要素に設定するReference。
 */
export const useScrollAt = (...onChange: unknown[]) => {
  const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    ref.current?.scrollIntoView({
      block: 'end',
    });
  }, [...onChange]);
  return { ref };
};
