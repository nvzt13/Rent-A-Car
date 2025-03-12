import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns as initialColumns, rows as initialRows } from '../internals/data/gridData';
import { Button, TextField, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function CustomizedDataGrid() {
  const [rows, setRows] = React.useState(initialRows); // Tablodaki satırlar
  const [editRowId, setEditRowId] = React.useState(null); // Düzenlenen satırın id'si
  const [editRowData, setEditRowData] = React.useState({}); // Düzenlenmekte olan satırın verisi
  const [isAdding, setIsAdding] = React.useState(false); // Araba ekleme modunu takip eder
  const [newCarData, setNewCarData] = React.useState({ id: '', name: '', price: '', model: '', fuelType: '', km: '', image: '' }); // Yeni araba bilgileri

  // Düzenleme işlemi başlatılıyor
  const handleEdit = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    setEditRowId(id);
    setEditRowData({ ...rowToEdit });
  };

  // Değer güncellenirken çağrılan fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRowData({
      ...editRowData,
      [name]: value,
    });
  };

  // Düzenleme işlemini kaydet
  const handleSave = () => {
    const updatedRows = rows.map((row) => (row.id === editRowId ? editRowData : row));
    setRows(updatedRows);
    setEditRowId(null);
  };

  // Silme işlemi
  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // Düzenlenmiş columns yapısı
  const updatedColumns = [
    ...initialColumns,
    {
      field: 'actions',
      headerName: 'Aksiyonlar',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div>
          {editRowId === params.row.id ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Kaydet
            </Button>
          ) : (
            <IconButton
              color="primary"
              onClick={() => handleEdit(params.row.id)}
              style={{ marginRight: '5px' }}
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={updatedColumns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        
      />
    </div>
  );
}