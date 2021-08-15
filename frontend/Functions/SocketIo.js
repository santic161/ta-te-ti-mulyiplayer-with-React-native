//Config Socket IO
if (!window.location) {
    window.navigator.userAgent = "ReactNative";
}

import io from "socket.io-client/dist/socket.io";

const socket = io("http://192.168.1.43:3000", {
    transports: ["websocket"], 
});


export default socket;