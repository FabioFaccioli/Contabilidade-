import { useState, useEffect } from 'react';
import { ApiService } from '../services/api';
import { Cobranca } from '../types';

export function useCobrancas() {
  const [cobrancas, setCobrancas] = useState<Cobranca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCobrancas = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getCobrancas();
      setCobrancas(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar cobranças');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addCobranca = async (cobranca: Omit<Cobranca, 'id' | 'created_at' | 'venda_descricao' | 'cliente_nome'>) => {
    try {
      await ApiService.addCobranca(cobranca);
      await loadCobrancas();
    } catch (err) {
      setError('Erro ao adicionar cobrança');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    loadCobrancas();
  }, []);

  return { cobrancas, loading, error, addCobranca, reloadCobrancas: loadCobrancas };
}