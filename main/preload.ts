import { contextBridge, ipcRenderer } from 'electron';

interface MyAPI {
    subscribeForEntries: (callback: (args: { entries: any[] }) => void) => void;
}

contextBridge.exposeInMainWorld('myAPI', {
    subscribeForEntries: (callback: (args: { entries: any[] }) => void) => {
        ipcRenderer.on('entries', (event, args) => callback(args));
    }
} as MyAPI);