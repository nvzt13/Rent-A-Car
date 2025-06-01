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
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useGridColumns } from "../_components/gridData";

export default function Dashboard() {
  const router = useRouter();

  // Yeni Araba Ekleme Butonu Fonksiyonu
  const handleAddCarClick = () => {
    router.push("/dashboard/cars/form"); // Yeni araba sayfasına yönlendir
  };

  const cars = useAppSelector((state) => state.cars.cars);
  const dispatch = useAppDispatch(); // Use dispatch in the component
  const columns = useGridColumns(dispatch); // Pass dispatch to useGridColumns hook
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
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center", // Ortalamak için
              fontWeight: "bold", // Daha belirgin yapmak için
              fontSize: "2rem", // Yazı boyutunu artırarak daha büyük hale getirebiliriz
              color: "primary.main", // Temaya bağlı renk ekleyebiliriz
              textTransform: "uppercase", // Başlığı büyük harflerle yazabiliriz
              borderBottom: "2px solid", // Başlık altına ince bir çizgi eklemek için
              paddingBottom: 1, // Başlık altına biraz boşluk eklemek için
              marginTop: 5, // Başlık üstüne biraz boşluk eklemek için
            }}
          >
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
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleRoundedIcon />}
                onClick={handleAddCarClick}
                sx={{ width: "200px", mb: 2, mt: 4, marginLeft: "auto" }} // Butonu sağa hizalamak için marginLeft kullanıldı
              >
                Yeni Araba Ekle
              </Button>
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
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
