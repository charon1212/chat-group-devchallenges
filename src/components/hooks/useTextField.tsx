import { TextFieldProps } from '@mui/material';
import { useState } from 'react';

export const useTextField = (initialValue?: string): [string, React.Dispatch<React.SetStateAction<string>>, TextFieldProps] => {
  const [value, setter] = useState(initialValue ?? '');
  return [
    value,
    setter,
    {
      value,
      onChange: (e) => {
        setter(e.target.value);
      },
    },
  ];
};
