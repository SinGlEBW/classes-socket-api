import { NetworkInformationAbstract, type WatcherCB } from './types/types.abscruct';

export type CordovaNetworkStatus = 'unknown' | 'none' | 'wifi' | '2g' | '3g' | '4g';



const defaultState = {
  isNetworkStatus: window.navigator.onLine,
  listCloseSignals: [] as {
    offline: AbortController,
    online: AbortController,
  }[],
  isWatcher: false
}


export class NetworkInformationCordova extends NetworkInformationAbstract{

  protected watchers = (cb: WatcherCB) => {
    const { connection } = (window as any)?.navigator;

    if (connection) {
      const watcher = (status: CordovaNetworkStatus) => { cb(!["none", "unknown"].includes(status), status) }
      const networkWatcher = () => { watcher(connection?.type) }
      networkWatcher();
      document.addEventListener("offline", networkWatcher, false);
      document.addEventListener("online", networkWatcher, false);

    }else{
      console.error("Нету navigator.connection");
    }

  }
  //TODO: Реализовать удаление события
  getControls = () => ({
    system: 'cordova' as const,
    addWatchers: this.watchers,
    removeWatchers: () => {
      const { listCloseSignals } = defaultState;
      const item = listCloseSignals[listCloseSignals.length - 1];
      if(listCloseSignals.length){
        item.online.abort();
        item.offline.abort();
      }
    }
  })
}