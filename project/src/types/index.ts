export interface Cliente {
  id: number;
  nome: string;
  cpf_cnpj: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  created_at: string;
}

export interface Venda {
  id: number;
  cliente_id: number;
  cliente_nome?: string;
  valor: number;
  data_venda: string;
  status: string;
  descricao?: string;
  created_at: string;
}

export interface Cobranca {
  id: number;
  venda_id: number;
  venda_descricao?: string;
  cliente_nome?: string;
  valor: number;
  data_vencimento: string;
  status: string;
  data_pagamento?: string;
  created_at: string;
}