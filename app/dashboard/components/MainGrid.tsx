import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedDataGrid from './CustomizedDataGrid';

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, margin: '0 auto' }}>
      <Grid container spacing={2} columns={12}>
        {/* Sol içerik: Veri tablosu */}
        <Grid item xs={12} lg={9}>
          <CustomizedDataGrid />
        </Grid>

        {/* Sağ içerik: Ülkeler Grafiği */}
        <Grid item xs={12} lg={3}>
          <Stack spacing={2} sx={{ height: '100%', justifyContent: 'flex-start' }}>
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
