const { app, BrowserWindow } = require('electron') // Importa módulos do Electron
const path = require('path') // Módulo Node.js para lidar com caminhos de arquivos


require('dotenv').config({ path: path.join(__dirname, '.env')})



function createWindow() {
  // Cria uma nova janela do navegador (que será a janela do seu app)
  const mainWindow = new BrowserWindow({
    width: 1024, // Largura padrão
    height: 768, // Altura padrão
    minWidth: 800, // Largura mínima
    minHeight: 600, // Altura mínima
      webPreferences: {
      preload: path.join(__dirname, 'src', 'js', 'preload.js'), // Caminho ajustado
      contextIsolation: true,
      nodeIntegration: false
    }
    }
  )
}
 // Carrega o arquivo HTML do seu front-end (sua página de login)
// Certifique-se de que 'src/index.html' seja o caminho correto para seu HTML

mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'))

app.whenReady().then(() => {
  createWindow(); // Chama a função para criar a janela principal

app.on('activate', () => {
 // No macOS, é comum recriar uma janela no app quando o ícone do dock é clicado e não há outras janelas abertas.
  if (BrowserWindow.getAllWindows().length === 0){
    createWindow()
  }
})
})

// Fecha o aplicativo quando todas as janelas forem fechadas, exceto no macOS.
// No macOS, os aplicativos geralmente permanecem ativos até que o usuário saia explicitamente.

app.on ('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})
