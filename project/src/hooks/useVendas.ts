import { useState, useEffect } from 'react';
import { ApiService } from '../services/api';
import { Venda } from '../types';

export function useVendas() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVendas = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getVendas();
      setVendas(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar vendas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addVenda = async (venda: Omit<Venda, 'id' | 'created_at' | 'cliente_nome'>) => {
    try {
      await ApiService.addVenda(venda);
      await loadVendas();
    } catch (err) {
      setError('Erro ao adicionar venda');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    loadVendas();
  }, []);

  return { vendas, loading, error, addVenda, reloadVendas: loadVendas };
}