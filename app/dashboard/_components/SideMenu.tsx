"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Divider, Typography } from "@mui/material"; 

const mainListItems = [
  {
    text: "Kontrol Paneli",
    icon: <DashboardCustomizeRoundedIcon />,
    link: "/dashboard",
  },
  {
    text: "Arabalar",
    icon: <DirectionsCarRoundedIcon />,
    link: "/dashboard/cars",
  },
  {
    text: "Kiralama",
    icon: <CalendarMonthRoundedIcon />,
    link: "/dashboard/rental",
  },
  {
    text: "Ana Sayfa",
    icon: <HomeRoundedIcon />,
    link: "/",
  },
  {
    text: "Çıkış Yap",
    icon: <LogoutRoundedIcon />,
    link: null,
  },
];

export default function MenuContent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleLogout = (index: number) => {
    setSelectedIndex(index);
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/signin");
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {/* Main Menu Items */}
        {mainListItems.slice(0, 4).map((item, index) => (
          <ListItem key={index}>
            {item.link ? (
              <Link href={item.link} passHref legacyBehavior>
                <ListItemButton
                  component="a"
                  onClick={() => handleListItemClick(index)}
                  sx={{
                    bgcolor:
                      selectedIndex === index ? "black" : "transparent", // Seçili öğe siyah
                    color: selectedIndex === index ? "white" : "inherit", // Seçili öğe metin beyaz
                    "&:hover": {
                      bgcolor: "primary.dark", // Hover rengi koyulaştırıldı
                      color: "white", // Hover'da metin beyaz
                    },
                    borderRadius: "8px",
                    mb: 1, // her item arasında mesafe
                    transition: "all 0.3s ease", // yumuşak geçiş efekti
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedIndex === index ? "white" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight: selectedIndex === index ? "bold" : "normal",
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </Link>
            ) : (
              <ListItemButton
                onClick={() => handleLogout(index)}
                sx={{
                  bgcolor:
                    selectedIndex === index ? "black" : "transparent", // Seçili öğe siyah
                  color: selectedIndex === index ? "white" : "inherit", // Seçili öğe metin beyaz
                  "&:hover": {
                    bgcolor: "primary.dark", // Hover rengi koyulaştırıldı
                    color: "white", // Hover'da metin beyaz
                  },
                  borderRadius: "8px",
                  mb: 1, // her item arasında mesafe
                  transition: "all 0.3s ease", // yumuşak geçiş efekti
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedIndex === index ? "white" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: selectedIndex === index ? "bold" : "normal",
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>

      {/* Logout Item with Divider */}
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItem key="logout">
          <ListItemButton
            onClick={() => handleLogout(4)}
            sx={{
              bgcolor:
                selectedIndex === 4 ? "black" : "transparent", // Seçili öğe siyah
              color: selectedIndex === 4 ? "white" : "inherit", // Seçili öğe metin beyaz
              "&:hover": {
                bgcolor: "error.dark", // Logout hover rengi koyulaştırıldı
                color: "white", // Hover'da metin beyaz
              },
              borderRadius: "8px",
              transition: "all 0.3s ease", // yumuşak geçiş efekti
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedIndex === 4 ? "white" : "inherit",
              }}
            >
              {mainListItems[4].icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight: selectedIndex === 4 ? "bold" : "normal",
                  }}
                >
                  {mainListItems[4].text}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
