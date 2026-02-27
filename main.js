// main.js
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 创建一个函数来加载你的页面
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // 这里指定预加载脚本的位置，我们稍后会创建它
            preload: path.join(__dirname, 'preload.js'),
            // 出于安全考虑，默认保持上下文隔离开启
            contextIsolation: true,
            // 不要启用 nodeIntegration
            nodeIntegration: false
        }
    })

    // 加载 index.html 文件
    win.loadFile('index.html')
}

// 当 Electron 完成初始化并准备好创建浏览器窗口时，调用此方法
app.whenReady().then(() => {
    createWindow()

    // macOS 应用通常即使在没有打开任何窗口的情况下也会继续运行
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭时，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})