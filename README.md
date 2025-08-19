<h3 align="center">SocketApi</h3>


### Events. Working after register SocketApi.init
| Name             | Type                                       |  
|------------------|--------------------------------------------|  
|`status`          |`boolean`                                   |  
|`msg`             |`any`                                       | 
|`reConnect`       |`boolean`                                   | 
|`timeOffReConnect`|`{ status: boolean, msg: string }`          | 
|`network`         |`{ isNetwork: boolean, textStatus: string }`| 
        

### Props

| Prop       | Type                                                              | 
|------------|-------------------------------------------------------------------|
|`on`             |`(name: K, cb: CommonEvents[K]) => void`                      |
|`off`            |`(name: K) => void`                                           |
|`getRequestSave` |`() => WsApi_StateProps['arrSaveReq']`                        |
|`getStatusSocket`|`() => WsApiE_StatusConnect_OR`                               |
|`close`          |`() => void`                                                  |
|`init`           |`(config: WsApi_Options_P & SocketApi_Options_P) => void `    |   
|`connect`        |`() => void `                                                 |   
|`disconnect`     |`() => void`                                                  |   
|`send`           |`(payload: object) => void`                                   |   
|`stopReConnect`  |`() => void`                                                  |   
|`socketReConnect`|`() => void`         
                                         |   

### Example
```ts
import { SocketApi } from '@classes/socket-api';


SocketApi.init({
  url: 'wss://...',
  timeReConnect: 5000,
  numberOfRepit: 5,
  isReConnectNetworkOnline: true
});

SocketApi.on('status', (status) => { console.log('onStatus', status); });
SocketApi.on('msg', (messages) => { console.log('onMessages', messages); });
SocketApi.on('reConnect', (status) => { console.log('reConnect', status); });
SocketApi.on('timeOffReConnect', (data) => { console.log('timeOffReConnect', data); });

SocketApi.connect();
```


