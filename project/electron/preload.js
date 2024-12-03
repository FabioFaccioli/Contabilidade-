const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getClientes: () => ipcRenderer.invoke('get-clientes'),
  addCliente: (cliente) => ipcRenderer.invoke('add-cliente', cliente),
  getVendas: () => ipcRenderer.invoke('get-vendas'),
  addVenda: (venda) => ipcRenderer.invoke('add-venda', venda),
  getCobrancas: () => ipcRenderer.invoke('get-cobrancas'),
  addCobranca: (cobranca) => ipcRenderer.invoke('add-cobranca', cobranca),
});