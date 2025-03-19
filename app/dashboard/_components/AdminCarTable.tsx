"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAppSelector } from "@/lib/hooks";
import { useGridColumns } from "./gridData";

export default function AdminCarTable() {
  const cars = useAppSelector((state) => state.cars.cars);
  const columns = useGridColumns();

  return (
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
  );
}
