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
import { useRouter, usePathname } from "next/navigation";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Typography } from "@mui/material";

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
    text: "Çıkış Yap",
    icon: <LogoutRoundedIcon />,
    link: null,
  },
];

export default function MenuContent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    for (let i = mainListItems.length - 1; i >= 0; i--) {
      const item = mainListItems[i];
      if (item.link && pathname.startsWith(item.link)) {
        setSelectedIndex(i);
        break;
      }
    }
  }, [pathname]);

  const handleLogout = (index: number) => {
    setSelectedIndex(index);
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/signin");
  };

  return (
    <Stack
      sx={{
        flexGrow: 1,
        p: 2,
        justifyContent: "space-between",
        bgcolor: "#f5f5f5",
        minHeight: "calc(100vh - 64px)",
        color: "white",
      }}
    >
      <List dense>
        {mainListItems.slice(0, 3).map((item, index) => (
          <ListItem key={index} disablePadding>
            {item.link && (
              <Link href={item.link} passHref legacyBehavior>
                <ListItemButton
                  component="a"
                  sx={{
                    bgcolor:
                      selectedIndex === index ? "#4b77de" : "transparent",
                    color: selectedIndex === index ? "#ffffff" : "#ccc",
                    "&:hover": {
                      bgcolor: "#0a9396",
                    },
                    borderRadius: "8px",
                    mb: 1,
                    pl: selectedIndex === index ? 2 : 3,
                    borderLeft:
                      selectedIndex === index
                        ? "4px solid #94d2bd"
                        : "4px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedIndex === index ? "#ffffff" : "#000",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight:
                            selectedIndex === index ? "bold" : "normal",
                          color: selectedIndex === index ? "#ffffff" : "#000",
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </Link>
            )}
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem key="logout" disablePadding>
          <ListItemButton
            onClick={() => handleLogout(3)}
            sx={{
              bgcolor: selectedIndex === 3 ? "#222" : "transparent",
              color: "white",
              "&:hover": {
                bgcolor: "#b71c1c",
              },
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
          >
            <ListItemIcon sx={{ color: "#000", minWidth: 40 }}>
              {mainListItems[3].icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight: selectedIndex === 3 ? "bold" : "normal",
                    color: "#000",
                  }}
                >
                  {mainListItems[3].text}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
