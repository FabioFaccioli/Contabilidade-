import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total de Clientes</Typography>
          <Typography variant="h4">0</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Vendas do Mês</Typography>
          <Typography variant="h4">R$ 0,00</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Cobranças Pendentes</Typography>
          <Typography variant="h4">0</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}