import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

type Param = {
  menuItems: {
    menuText: string;
    icon: JSX.Element;
    onClick?: () => unknown;
    divideBelow?: boolean;
  }[];
};

export const usePopupMenu = (param: Param) => {
  const { menuItems } = param;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuIsOpen = Boolean(anchorEl);

  const PopupMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={() => {
        setAnchorEl(null);
      }}
    >
      {menuItems.map((v, i) => (
        <React.Fragment key={i}>
          <MenuItem onClick={v.onClick}>
            <ListItemIcon>{v.icon}</ListItemIcon>
            {v.menuText}
          </MenuItem>
          {v.divideBelow ? <Divider variant='inset' component='li' /> : ''}
        </React.Fragment>
      ))}
    </Menu>
  );

  return [anchorEl, setAnchorEl, menuIsOpen, PopupMenu] as [typeof anchorEl, typeof setAnchorEl, typeof menuIsOpen, typeof PopupMenu];
};
