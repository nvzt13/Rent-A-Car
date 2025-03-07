import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer({ open, toggleDrawer }) {

  const DrawerList = (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        width: '100%' 
      }} 
      role="presentation" 
      onClick={toggleDrawer(false)}
    >
      <List sx={{ width: '100%', textAlign: 'center' }}>
        {['Ana Sayfa', 'Hakkımızda', 'İletişim'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
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
            alignItems: 'center'
          }
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}