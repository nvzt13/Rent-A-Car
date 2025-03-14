import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns as initialColumns } from '../internals/data/gridData';
import { Button, TextField, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '@/lib/hooks';


export default function CustomizedDataGrid() {

const cars = useAppSelector((state) => state.cars.cars);
console.log(cars)
  
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={cars}
        columns={initialColumns}
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