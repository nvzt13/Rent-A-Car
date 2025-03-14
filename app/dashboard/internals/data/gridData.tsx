import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

type SparkLineData = number[];

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString("en-US", {
    month: "short",
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={["hsl(210, 98%, 42%)"]}
        xAxis={{
          scaleType: "band",
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status: "Online" | "Offline") {
  const colors: { [index: string]: "success" | "default" } = {
    Online: "success",
    Offline: "default",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>
) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: "24px",
        height: "24px",
        fontSize: "0.85rem",
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  { field: "name", headerName: "Car Name", flex: 1, minWidth: 150 },
  {
    field: "status",
    headerName: "Durum",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => renderStatus(params.value as any),
  },
  { field: "price", headerName: "Fiyat (Günlük)", flex: 1, minWidth: 150 },
  { field: "startDate", headerName: "Alış Tarihi", flex: 1, minWidth: 100 },
  {field: "endDate", headerName: "Teslim Tarihi", flex: 1, minWidth: 150 },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    name: "Toyota Corolla",
    status: "Online",
    price: 500, // Fiyat eklendi
    day:5,
    initialDate: "03-27 ",
    endDate: "03-27 ",
    kar:'6000'
  },
  {
    id: 2,
    name: "Tesla Model S",
    status: "Offline",
    price: 750, // Fiyat eklendi
    day: 5 + "  (2)",
    initialDate: "03-27 ",
    endDate: "03-27 ",
    kar: "15000 ",
  },
];
