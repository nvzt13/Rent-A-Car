"use client";

import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"; // Buton ikonu
import { useRouter } from "next/navigation";

import AdminCarTable from "../_components/CarPage";
import { Typography } from "@mui/material";

export default function Dashboard() {
  const router = useRouter();

  // Yeni Araba Ekleme Butonu Fonksiyonu
  const handleAddCarClick = () => {
    router.push("/dashboard/add-car"); // Yeni araba sayfasına yönlendir
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 1),
            overflow: "auto",
          }}
        >
                     <Typography variant="h4" gutterBottom>
                  Arabalar
                </Typography>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >

            <AdminCarTable />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleRoundedIcon />}
              onClick={handleAddCarClick}
              sx={{ width: "200px", mb: 4 }}
            >
              Yeni Araba Ekle
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
