import {io} from 'socket.io-client'
const BASE_URL = import.meta.env.VITE_APP_BASE_URL
export const socketInit = () => {
    const options = {
        'force new connection' : true,
        reconnectionAttempt : 'Infinity',
        timeout : 10000,
        transports : ['websocket'],
    }

    return io(BASE_URL, options)
}