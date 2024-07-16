import path from 'path'
import { app, ipcMain, dialog } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import {mkdirSync, existsSync, writeFileSync, readFileSync} from "fs";

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

const directory = path.join(app.getPath('userData'), 'storage');

function file(key: string): string {
  const file = path.join(directory, `${key}.json`);
  if (!existsSync(file)) {
    writeFileSync(file, null, {flag: 'wx'})
  }
  return file;
}

export function readFile(key: string): any {
  const filePath = file(key);
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error}`);
    return { entries: [] };
  }
}

function writeFile(key: string, data) {
  return writeFileSync(file(key), JSON.stringify(data))
}

function storage(): void {
  if (!existsSync(directory)) {
    mkdirSync(directory);
  }
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 400,
    maxWidth: 400,
    minWidth: 400,
    height: 600,
    maxHeight: 600,
    minHeight: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.webContents.send('entries', { entries: readFile('entries') });
  });

  storage()

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

