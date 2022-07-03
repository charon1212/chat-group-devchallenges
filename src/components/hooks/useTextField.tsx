import { useState } from 'react';

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
