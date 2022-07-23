import { useState } from 'react';

/**
 * 文字列のstateと、それをTextFieldに適用するためのpropを取得する。
 * 戻り値の第3要素（props）をspread演算子で使うことを想定。
 * @param initialValue 状態の初期値
 */
export const useTextField = (initialValue?: string) => {
  const [value, setter] = useState(initialValue ?? '');
  const props = {
    value,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setter(e.target.value);
    },
  };
  return [value, setter, props] as [typeof value, typeof setter, typeof props];
};
