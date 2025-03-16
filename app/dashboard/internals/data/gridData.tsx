"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

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

// Add type for car
interface Car {
  id: string;
  name: string;
  status: "Online" | "Offline";
  price: number;
  startDate: string;
  endDate: string;
}

// Create a component for the grid actions
function GridActions({
  params,
  onEdit,
  onDelete,
}: {
  params: GridCellParams;
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <IconButton onClick={() => onEdit(params.row as Car)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(params.row.id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}

// Create a hook to handle grid actions
export function useGridActions() {
  const router = useRouter();

  const handleEdit = (car: Car) => {
    const encodeCar = encodeURIComponent(JSON.stringify(car));
    router.push(`/dashboard/add-car?update-car=${encodeCar}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/car/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Car deleted successfully");
      } else {
        alert("Car can't be deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleEdit, handleDelete };
}

// Export columns with the actions using the hook
export function useGridColumns() {
  const { handleEdit, handleDelete } = useGridActions();

  const columns: GridColDef[] = [
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
    { field: "endDate", headerName: "Teslim Tarihi", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "İşlemler",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <GridActions
          params={params}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return columns;
}

/*
  const handleUpdate = (appointment: Appointment) => {
    const encodedAppointment = encodeURIComponent(JSON.stringify(appointment));
    router.push(`/randevu?appointmentToBeUpdated=${encodedAppointment}`);
  };
*/
