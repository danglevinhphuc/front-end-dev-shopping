import openSocket from 'socket.io-client';
import * as Config from '../constants/Config'
var socket = openSocket(Config.SOCKET_URL);
export default socket;

export function socket_init(){
    console.log('connected to socket')
}