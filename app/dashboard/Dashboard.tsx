"use client";
import * as React from "react";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import MainGrid from "./components/MainGrid";



export default function Dashboard() {
  return (
      <Box sx={{ display: "flex" }}>
        <AppNavbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 1),
            overflow: "auto",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <MainGrid />
          </Stack>
        </Box>
      </Box>
  );
}
