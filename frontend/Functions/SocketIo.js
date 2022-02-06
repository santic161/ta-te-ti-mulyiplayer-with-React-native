//Config Socket IO
if (!window.location) {
    window.navigator.userAgent = "ReactNative";
}

import io from "socket.io-client/dist/socket.io";

//Localhost
const socket = io("http://localhost:3000", {
    transports: ["websocket"], 
});


export default socket;