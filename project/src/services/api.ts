import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
});

export const ApiService = {
  // Clientes
  async getClientes() {
    const response = await api.get('/clientes');
    return response.data;
  },

  async addCliente(cliente: any) {
    const response = await api.post('/clientes', cliente);
    return response.data;
  },

  // Vendas
  async getVendas() {
    const response = await api.get('/vendas');
    return response.data;
  },

  async addVenda(venda: any) {
    const response = await api.post('/vendas', venda);
    return response.data;
  },

  // Cobranças
  async getCobrancas() {
    const response = await api.get('/cobrancas');
    return response.data;
  },

  async addCobranca(cobranca: any) {
    const response = await api.post('/cobrancas', cobranca);
    return response.data;
  },
};