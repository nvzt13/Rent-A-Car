"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAppSelector } from "@/lib/hooks";
import { useGridColumns } from "./gridData";
import { Typography } from "@mui/material";

export default function CarPage() {
  const cars = useAppSelector((state) => state.cars.cars);
  const columns = useGridColumns();
React.useEffect(() => {
    console.log(cars);
  }, [cars]);
  return (
    <div style={{ width: "100%" }}>
           <Typography variant="h4" gutterBottom>
        Arabalar
      </Typography>
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
  );
}
