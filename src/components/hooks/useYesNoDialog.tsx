import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';

type YesNoDialogParam = {
  title?: string;
  message: string;
  onClickYes?: (closeDialog: () => void) => unknown;
  onClickNo?: (closeDialog: () => void) => unknown;
};

/**
 * Yes/Noダイアログ。
 */
export const useYesNoDialog = (param: YesNoDialogParam) => {
  const { title, message, onClickYes, onClickNo } = param;
  const [open, setOpen] = useState(false);
  const openYesNoDialog = () => {
    setOpen(true);
  };
  const closeYesNoDialog = () => {
    setOpen(false);
  };

  const yesNoDialog = (
    <>
      <Dialog
        open={open}
        onClose={() => {
          if (onClickNo) onClickNo(closeYesNoDialog);
        }}
      >
        {title ? <DialogTitle>{title}</DialogTitle> : ''}
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (onClickYes) onClickYes(closeYesNoDialog);
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              if (onClickNo) onClickNo(closeYesNoDialog);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return { openYesNoDialog, yesNoDialog };
};
