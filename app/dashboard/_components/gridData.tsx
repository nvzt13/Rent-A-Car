import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress"; // Import loading icon
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import Chip from '@mui/material/Chip';

// Render status for boolean value
function renderStatus(isAvailable: boolean) {
  const color = isAvailable ? 'success' : 'error';  // Use 'success' for true (Aktif) and 'error' for false (Pasif)
  return (
    <Chip 
      label={isAvailable ? 'Aktif' : 'Pasif'} 
      color={color} 
      size="small" 
      sx={{ fontWeight: 'bold' }} // Text styling
    />
  );
}

interface Car {
  id: string;
  name: string;
  isAvailable: boolean; // Update to boolean
  price: number;
}

function GridActions({
  params,
  onEdit,
  onDelete,
  loading,
}: {
  params: GridCellParams;
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
  loading: boolean; // Add loading state for individual rows
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

export function useGridActions() {
  const router = useRouter();
  const [loadingRowId, setLoadingRowId] = React.useState<string | null>(null); // Track the ID of the loading row

  const handleEdit = (car: Car) => {
    const encodeCar = encodeURIComponent(JSON.stringify(car));
    router.push(`/dashboard/add-car?update-car=${encodeCar}`);
  };

  const handleDelete = async (id: string) => {
    setLoadingRowId(id); // Set the loading row ID
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/v1/car/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
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
      setLoadingRowId(null); // Reset loading state after the action is completed
    }
  };

  return { handleEdit, handleDelete, loadingRowId };
}

export function useGridColumns() {
  const { handleEdit, handleDelete, loadingRowId } = useGridActions();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Car Name", flex: 1, minWidth: 150 },
    {
      field: "isAvailable",
      headerName: "Durum",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => renderStatus(params.row.isAvailable), // Use renderStatus here with boolean value
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
          loading={loadingRowId === params.row.id} // Only show the loading icon for the current row
        />
      ),
    },
  ];

  return columns;
}
