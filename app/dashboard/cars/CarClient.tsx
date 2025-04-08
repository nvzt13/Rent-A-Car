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
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAppSelector } from "@/lib/hooks";
import { useGridColumns } from "../_components/gridData";


export default function Dashboard() {
  const router = useRouter();

  // Yeni Araba Ekleme Butonu Fonksiyonu
  const handleAddCarClick = () => {
    router.push("/dashboard/add-car"); // Yeni araba sayfasına yönlendir
  };

  const cars = useAppSelector((state) => state.cars.cars);
  console.log(cars)
  const columns = useGridColumns();
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
            <div style={{ width: "100%" }}>
              <DataGrid
                rows={cars}
                columns={columns}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                initialState={{
                  pagination: { paginationModel: { pageSize: 20 } },
                }}
              />
            </div>
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
