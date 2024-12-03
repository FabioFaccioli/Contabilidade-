const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const Database = require('better-sqlite3');

let mainWindow;
const db = new Database(path.join(app.getPath('userData'), 'contabilidade.db'));

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Inicialização do banco de dados
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf_cnpj TEXT UNIQUE NOT NULL,
    email TEXT,
    telefone TEXT,
    endereco TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER,
    valor DECIMAL(10,2) NOT NULL,
    data_venda DATE NOT NULL,
    status TEXT NOT NULL,
    descricao TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
  );

  CREATE TABLE IF NOT EXISTS cobrancas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venda_id INTEGER,
    valor DECIMAL(10,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    status TEXT NOT NULL,
    data_pagamento DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venda_id) REFERENCES vendas(id)
  );
`);

// IPC Handlers para Clientes
ipcMain.handle('get-clientes', async () => {
  const clientes = db.prepare('SELECT * FROM clientes ORDER BY nome').all();
  return clientes;
});

ipcMain.handle('add-cliente', async (event, cliente) => {
  const stmt = db.prepare(`
    INSERT INTO clientes (nome, cpf_cnpj, email, telefone, endereco)
    VALUES (@nome, @cpf_cnpj, @email, @telefone, @endereco)
  `);
  const result = stmt.run(cliente);
  return result.lastInsertRowid;
});

// IPC Handlers para Vendas
ipcMain.handle('get-vendas', async () => {
  const vendas = db.prepare(`
    SELECT v.*, c.nome as cliente_nome 
    FROM vendas v 
    LEFT JOIN clientes c ON v.cliente_id = c.id 
    ORDER BY v.data_venda DESC
  `).all();
  return vendas;
});

ipcMain.handle('add-venda', async (event, venda) => {
  const stmt = db.prepare(`
    INSERT INTO vendas (cliente_id, valor, data_venda, status, descricao)
    VALUES (@cliente_id, @valor, @data_venda, @status, @descricao)
  `);
  const result = stmt.run(venda);
  return result.lastInsertRowid;
});

// IPC Handlers para Cobranças
ipcMain.handle('get-cobrancas', async () => {
  const cobrancas = db.prepare(`
    SELECT c.*, v.descricao as venda_descricao, cl.nome as cliente_nome
    FROM cobrancas c
    LEFT JOIN vendas v ON c.venda_id = v.id
    LEFT JOIN clientes cl ON v.cliente_id = cl.id
    ORDER BY c.data_vencimento
  `).all();
  return cobrancas;
});

ipcMain.handle('add-cobranca', async (event, cobranca) => {
  const stmt = db.prepare(`
    INSERT INTO cobrancas (venda_id, valor, data_vencimento, status)
    VALUES (@venda_id, @valor, @data_vencimento, @status)
  `);
  const result = stmt.run(cobranca);
  return result.lastInsertRowid;
});