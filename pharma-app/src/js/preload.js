const { contextBridge, ipcRenderer } = require('electron')
//Exemplo de como expor uma API segura para o processo de renderização (seu JavaScript front-end).
// Por enquanto, não precisamos de nada aqui, mas é um bom lugar para APIs futuras.

contextBridge.exposeInMainWorld('electronAPI', {
// Você pode adicionar funções aqui que seu JS de front-end pode chamar
  // Ex: sendMessage: (message) => ipcRenderer.send('send-message', message)
  // Expondo a URL da API para o código de renderização de forma segura
  getApiBaseUrl: () => process.env.API_BASE_URL // Acessa a variável de ambiente do processo principal
}) 