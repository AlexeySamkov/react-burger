import {
  WS_CONNECT 
, WS_DISCONNECT
, WS_CONNECT_SUCCESS 
, WS_CONNECT_ERROR 
, IWsConnectAction
, IWsConnectSuccessAction
, IWsDisconnectAction
, IWsConnectErrorAction
} from '../actions/actions'


  export const WSConnectAction = (token?: string, endpoint?: string): IWsConnectAction => {    
    return {
      type: WS_CONNECT,
      payload: {
        token: token || '',
        endpoint: endpoint || ''
      }
    };
  };

  export const WSConnectSuccessAction = (): IWsConnectSuccessAction => ({
    type: WS_CONNECT_SUCCESS
  });
  
export const WSDisconnectAction = () : IWsDisconnectAction => ({
    type: WS_DISCONNECT
})

export const WSConnectErrorAction = () : IWsConnectErrorAction => ({
    type: WS_CONNECT_ERROR
})
  