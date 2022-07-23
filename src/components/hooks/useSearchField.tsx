import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';

/**
 * 検索用テキストボックス
 */
export const useSearchField = () => {
  const [searchWord, setSearchWord] = useState('');
  const searchFieldElement = (
    <TextField
      value={searchWord}
      onChange={(e) => {
        setSearchWord(e.target.value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
  return { searchWord, searchFieldElement };
};
