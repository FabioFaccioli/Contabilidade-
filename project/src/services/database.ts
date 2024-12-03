declare global {
  interface Window {
    electron: {
      getClientes: () => Promise<any[]>;
      addCliente: (cliente: any) => Promise<number>;
      getVendas: () => Promise<any[]>;
      addVenda: (venda: any) => Promise<number>;
      getCobrancas: () => Promise<any[]>;
      addCobranca: (cobranca: any) => Promise<number>;
    };
  }
}

export const DatabaseService = {
  // Clientes
  async getClientes() {
    return window.electron.getClientes();
  },

  async addCliente(cliente: any) {
    return window.electron.addCliente(cliente);
  },

  // Vendas
  async getVendas() {
    return window.electron.getVendas();
  },

  async addVenda(venda: any) {
    return window.electron.addVenda(venda);
  },

  // Cobranças
  async getCobrancas() {
    return window.electron.getCobrancas();
  },

  async addCobranca(cobranca: any) {
    return window.electron.addCobranca(cobranca);
  },
};