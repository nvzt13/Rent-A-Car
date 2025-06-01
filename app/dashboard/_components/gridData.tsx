import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toggleCarAvailability } from "@/lib/redux/slice/carSlice"; // Import the action
import { useAppDispatch } from "@/lib/redux/hooks";
import React from "react";

// renderStatus fonksiyonu
function renderStatus(car: Car, onToggleStatus: (car: Car) => void) {
  const isAvailable = car.isAvailable;
  const color = isAvailable ? "success" : "error";
  const label = isAvailable ? "Aktif" : "Pasif";

  return (
    <Button
      variant="contained"
      color={color}
      size="small"
      onClick={() => onToggleStatus(car)}
      sx={{ fontWeight: "bold", textTransform: "none" }}
    >
      {label}
    </Button>
  );
}

// Car arayüzü
interface Car {
  id: string;
  name: string;
  isAvailable: boolean;
  price: number;
}

// GridActions bileşeni
function GridActions({
  params,
  onEdit,
  onDelete,
  loading,
}: {
  params: GridCellParams;
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}) {
  return (
    <>
      <IconButton onClick={() => onEdit(params.row as Car)} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : <EditIcon />}
      </IconButton>
      <IconButton onClick={() => onDelete(params.row.id)} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : <DeleteIcon />}
      </IconButton>
    </>
  );
}

// useGridActions custom hook
export function useGridActions() {
  const [loadingRowId, setLoadingRowId] = React.useState<string | null>(null);

  const handleEdit = (car: Car) => {
    const encodeCar = encodeURIComponent(JSON.stringify(car));
    window.location.href = `/dashboard/cars/form?update-car=${encodeCar}`;
  };

  const handleDelete = async (id: string) => {
    setLoadingRowId(id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/v2/cars/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert("Car deleted successfully");
      } else {
        alert("Car can't be deleted");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRowId(null);
    }
  };

  return { handleEdit, handleDelete, loadingRowId };
}

// useGridColumns custom hook
export function useGridColumns(dispatch: ReturnType<typeof useAppDispatch>) {
  const { handleEdit, handleDelete, loadingRowId } = useGridActions();

  const editCarStatus = (carId: string) => {
    dispatch(toggleCarAvailability({ carId }));
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Car Name", flex: 1, minWidth: 150 },
    {
      field: "isAvailable",
      headerName: "Durum",
      flex: 1,
      minWidth: 150,
      renderCell: (params) =>
        renderStatus(params.row as Car, (car) => editCarStatus(car.id)),
    },
    {
      field: "gear",
      headerName: "Fites",
      flex: 1,
      minWidth: 150,
    },
    { field: "price", headerName: "Fiyat (Günlük)", flex: 1, minWidth: 150 },
    { field: "carModel", headerName: "Model", flex: 1, minWidth: 50 },
    { field: "carType", headerName: "Sinif", flex: 1, minWidth: 150 },
    { field: "fuelType", headerName: "Yakit", flex: 1, minWidth: 150 },
    { field: "km", headerName: "KM", flex: 1, minWidth: 150 },
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
          loading={loadingRowId === params.row.id}
        />
      ),
    },
  ];

  return columns;
}
