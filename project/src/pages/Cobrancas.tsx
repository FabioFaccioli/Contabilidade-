import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useCobrancas } from '../hooks/useCobrancas';

export default function Cobrancas() {
  const { cobrancas, loading, error, addCobranca } = useCobrancas();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    venda_id: '',
    valor: '',
    data_vencimento: '',
    status: 'Pendente',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCobranca(formData);
      handleClose();
      setFormData({
        venda_id: '',
        valor: '',
        data_vencimento: '',
        status: 'Pendente',
      });
    } catch (err) {
      console.error('Erro ao salvar cobrança:', err);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Cobranças</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Nova Cobrança
        </Button>
      </Grid>
      
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Venda</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Vencimento</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Data Pagamento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cobrancas.map((cobranca) => (
                <TableRow key={cobranca.id}>
                  <TableCell>{cobranca.cliente_nome}</TableCell>
                  <TableCell>{cobranca.venda_descricao}</TableCell>
                  <TableCell>R$ {cobranca.valor}</TableCell>
                  <TableCell>{new Date(cobranca.data_vencimento).toLocaleDateString()}</TableCell>
                  <TableCell>{cobranca.status}</TableCell>
                  <TableCell>
                    {cobranca.data_pagamento 
                      ? new Date(cobranca.data_pagamento).toLocaleDateString()
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Nova Cobrança</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Venda ID"
                  name="venda_id"
                  value={formData.venda_id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Valor"
                  name="valor"
                  type="number"
                  value={formData.valor}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Data de Vencimento"
                  name="data_vencimento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.data_vencimento}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
}