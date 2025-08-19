
import { NetworkInformationAbstract, type WatcherCB } from './types/types.abscruct';

const defaultState = {
  isNetworkStatus: window.navigator.onLine,
  listCloseSignals: [] as AbortController[],
  isWatcher: false
}



export class NetworkInformationPC extends NetworkInformationAbstract{
  
  
  protected watchers = (cb: WatcherCB) => {
    const { connection } = (window as any)?.navigator;

    if(connection){
      const watcher = (status) => { cb(!["none", "unknown"].includes(status), status) }
      const networkWatcher = () => { watcher(connection?.effectiveType) }
      const controller = new AbortController();
      networkWatcher()
      defaultState.listCloseSignals.push(controller);
      connection?.addEventListener("change", networkWatcher, {signal: controller.signal});
    }
  }
  //TODO: Реализовать удаление события
  getControls = () => ({
    system: 'pc' as const,
    addWatchers: this.watchers,
    removeWatchers: () => {
      const { listCloseSignals } = defaultState;
      const controller = listCloseSignals[listCloseSignals.length - 1];
      if(listCloseSignals.length){
        controller?.abort();
      }
    }
  })

}
