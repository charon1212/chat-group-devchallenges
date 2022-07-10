import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { User } from '../../domain/type/User';
import AddIcon from '@mui/icons-material/Add';

type Param = {
  onSelect: (user: User) => unknown;
};
export const useSelectUserDialog = (param: Param) => {
  const { onSelect } = param;
  const [open, setOpen] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const openSelectUserDialog = (userList: User[]) => {
    setUserList(userList);
    setOpen(true);
  };
  const onClickSelectIcon = (user: User) => {
    return async () => {
      await onSelect(user);
      setOpen(false);
    };
  };

  const selectUserDialog = (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Select User</DialogTitle>
        <DialogContent>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>User Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <IconButton onClick={onClickSelectIcon(user)}>
                      <AddIcon fontSize='small' />
                    </IconButton>
                  </TableCell>
                  <TableCell>{user.displayName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
  return { openSelectUserDialog, selectUserDialog };
};
