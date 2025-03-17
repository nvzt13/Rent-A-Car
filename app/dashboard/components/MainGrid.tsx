import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ChartUserByCountry from "@/app/dashboard/components/ChartUserByCountry";
import AdminCarTable from "@/app/dashboard/components/AdminCarTable";

export default function MainGrid() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
        margin: "50px auto",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "3fr 1fr" },
        gap: 2,
      }}
    >
      <Box>
        <AdminCarTable />
      </Box>

      {/* Sağ içerik: Ülkeler Grafiği */}
      <Box sx={{ height: "100%" }}>
        <Stack
          spacing={2}
          sx={{ height: "100%", justifyContent: "flex-start" }}
        >
          <ChartUserByCountry />
        </Stack>
      </Box>
    </Box>
  );
}
