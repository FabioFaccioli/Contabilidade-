import { useState, useEffect } from 'react';
import { ApiService } from '../services/api';
import { Cliente } from '../types';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getClientes();
      setClientes(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addCliente = async (cliente: Omit<Cliente, 'id' | 'created_at'>) => {
    try {
      await ApiService.addCliente(cliente);
      await loadClientes();
    } catch (err) {
      setError('Erro ao adicionar cliente');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    loadClientes();
  }, []);

  return { clientes, loading, error, addCliente, reloadClientes: loadClientes };
}