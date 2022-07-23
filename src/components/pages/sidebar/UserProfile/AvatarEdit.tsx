import { Avatar, Button, useTheme } from '@mui/material';
import { useState } from 'react';

type Props = {
  initialImageUrl: string;
  setter: (file: File) => void;
};
/**
 * アバター編集部品。
 */
const AvatarEdit = (props: Props) => {
  const { initialImageUrl, setter } = props;
  const theme = useTheme();
  const [previewImageSrc, setPreviewImageSrc] = useState<any>(initialImageUrl);

  const onChangeAvatarImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setter(file);
      const reader = new FileReader();
      reader.onload = (f) => {
        const result = f.target?.result;
        if (result) setPreviewImageSrc(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Avatar sx={{ width: theme.spacing(10), height: theme.spacing(10) }} variant='square' src={previewImageSrc} />
      <Button sx={{ width: theme.spacing(10), height: theme.spacing(10) }} component='label'>
        CHANGE PHOTO
        <input type='file' hidden onChange={onChangeAvatarImage} />
      </Button>
    </>
  );
};

export default AvatarEdit;
