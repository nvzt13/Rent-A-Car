import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface DrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function TemporaryDrawer({ open, toggleDrawer }: DrawerProps) {
  const DrawerList = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {['Ana Sayfa', 'Hakkımızda', 'İletişim'].map((text) => (
          <ListItem key={text} disablePadding sx={{ justifyContent: 'center' }}>
            <ListItemButton sx={{ justifyContent: 'center' }}>
              <ListItemText primary={text} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          width: '100vw',
          height: '100vh',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
