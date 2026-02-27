// main.js
const { app, BrowserWindow,ipcMain } = require('electron')
const path = require('path')



// 创建一个函数来加载你的页面
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height:768,
        resizable: false,
        alwaysOnTop: true,
        title:'防务桌面助手',
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    // 加载 index.html 文件
    mainWindow.loadURL('http://127.0.0.1:5173/');
}

// 当 Electron 完成初始化并准备好创建浏览器窗口时，调用此方法
app.whenReady().then(() => {
    createWindow()
})

// 除了 macOS 外，当所有窗口都被关闭时，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


let isSuspended = false          // 当前是否处于挂起状态
const NORMAL_SIZE = { width: 1024, height: 768 }
const SUSPEND_SIZE = { width: 600, height: 60 }

// 处理挂起/恢复切换
ipcMain.handle('toggle-suspend', async(event) => {
    const mainWindow = BrowserWindow.fromWebContents(event.sender)
    if (!mainWindow) return

    if (isSuspended) {
        // 恢复窗口
        mainWindow.setResizable(true)
        mainWindow.setSize(NORMAL_SIZE.width, NORMAL_SIZE.height)
        mainWindow.setResizable(false) // 恢复
        isSuspended = false
    } else {
        // 挂起窗口
        mainWindow.setResizable(true)
        mainWindow.setSize(SUSPEND_SIZE.width, SUSPEND_SIZE.height)
        mainWindow.setResizable(false) // 恢复
        isSuspended = true
    }
})