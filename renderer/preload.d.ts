import { IpcHandler } from '../main/preload.js'

declare global {
  interface Window {
    MyAPI: IpcHandler
  }
}
