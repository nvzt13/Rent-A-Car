"use client";

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Link from 'next/link'; // Next.js Link importu
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import { useRouter } from 'next/navigation'; // useRouter'u sadece client tarafında kullanabilirsiniz

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, link: '/dashboard' },
  { text: 'Kiralama', icon: <AnalyticsRoundedIcon />, link: '/dashboard/rental' },
  { text: 'Yeni Araba', icon: <AnalyticsRoundedIcon />, link: '/dashboard/add-car' },
  { text: 'Çıkış Yap' }
];

export default function MenuContent() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter(); // useRouter hook'u sadece client'ta kullanılabilir

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Cookie'yi sil
    router.push('/signin'); // Giriş sayfasına yönlendir
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index}>
            {item.link ? (
              <Link href={item.link} passHref legacyBehavior>
                <ListItemButton
                  component="a"
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index)}
                  sx={{
                    bgcolor: selectedIndex === index ? 'primary.main' : 'transparent',
                    color: selectedIndex === index ? 'black' : 'inherit',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: selectedIndex === index ? 'white' : 'inherit' }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            ) : (
              <ListItemButton
                onClick={handleLogout} // Çıkış işlemi
                sx={{
                  bgcolor: selectedIndex === index ? 'primary.main' : 'transparent',
                  color: selectedIndex === index ? 'black' : 'inherit',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: selectedIndex === index ? 'white' : 'inherit' }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}