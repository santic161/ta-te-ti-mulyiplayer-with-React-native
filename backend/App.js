const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
let codigosPartidas = [];
let multijugadorArray = [];
let partida = false;
let Cpartida = "";
let seg = 0;

io.on('connection', socket => {
    socket.on("CreateRoom", (data) => {
        if (codigosPartidas == 0) {
            console.log(`Sala creada, Codigo: ${data.Codigo}`)
            codigosPartidas.push({ codigo: data.Codigo, socket:socket});
        } else {
            for (let i = 0; i < codigosPartidas.length; i++){
                if (codigosPartidas[i].codigo == data.Codigo) {
                    partida = true;
                    Cpartida = i;
                }
            }
            if (partida == false) {
                codigosPartidas.push({ codigo: data.codigo, socket: socket });
            } else if (partida == true && Cpartida >=0) {
                let random = Math.floor(Math.random() * (1 - 2)) + 2;
                socket.data.enemy = codigosPartidas[Cpartida].socket;
                socket.data.codigo = data.Codigo;
                codigosPartidas[Cpartida].socket.data.enemy = socket;
                codigosPartidas[Cpartida].socket.data.codigo = data.Codigo;
                // socket.emit("CreateRoom", data.isAdmin);
                codigosPartidas[Cpartida].socket.emit("CreateRoom", data.isAdmin);
                if (random == 1) {
                    socket.data.signo = "X";
                    socket.emit('Signo', true);
                    codigosPartidas[Cpartida].socket.data.signo = "O"
                    codigosPartidas[Cpartida].socket.emit('Signo', false);
                } else if(random == 2){
                    socket.data.signo = "O";
                    socket.emit('Signo', false);
                    codigosPartidas[Cpartida].socket.data.signo = "X"
                    codigosPartidas[Cpartida].socket.emit('Signo', true);
                }
                codigosPartidas.splice(Cpartida, 1);
            }
        }
    });

    socket.on('Multijugador', () => {
        if (multijugadorArray.length <= 1) {    //si el array es menor a 2 lugares..........
            multijugadorArray.push(socket); //Agrega a un socket.........
            if (multijugadorArray.length == 2) { // cuando se llena.............
                let random = Math.floor(Math.random() * (1 - 2)) + 2; // Numero random para identificar quien es X o O
                multijugadorArray[0].data.enemy = multijugadorArray[1];
                multijugadorArray[1].data.enemy = multijugadorArray[0];
                multijugadorArray[0].data.enemy.emit('Multijugador')
                multijugadorArray[1].data.enemy.emit('Multijugador')
                if (random == 1) {
                    multijugadorArray[1].data.signo = "X";
                    multijugadorArray[1].emit("Signomulti", true);
                    multijugadorArray[0].data.signo = "O";
                    multijugadorArray[0].emit("Signomulti", false);
                } else if (random == 2) {
                    multijugadorArray[1].data.signo = "O";
                    multijugadorArray[1].emit("Signomulti", false);
                    multijugadorArray[0].data.signo = "X";
                    multijugadorArray[0].emit("Signomulti", true);
                }
                multijugadorArray.splice(0, multijugadorArray.length); // Se elimina el array
            }
        }
    })

    socket.on('socketDesconectado', ()=>{
        socket.data.enemy.emit('socketDesconectado');
    })

    socket.on('EmitMove', data=>{
        socket.data.enemy.emit('EmitMove', data);
    })
    socket.on('PlayAgain', () => {
        socket.data.v = true;
        function detenerse() {
            clearInterval(cronometro);
        }
        if(seg < 60 && socket.data.enemy.data.v == false) {
            cronometro = setInterval(
                function () {
                    seg++
                    console.log(seg);
                    if (seg == 60) {
                        detenerse()
                    }
                }, 1000
            )
        }
        
        if (socket.data.enemy.data.v == true && seg < 60) {
            console.log('UNIDOS A LA PARTIDA');
            let random = Math.floor(Math.random() * (1 - 2)) + 2;
            socket.emit('Multijugador');
            socket.data.enemy.emit('Multijugador');
            if (random == 1) {
                socket.data.signo = "X";
                socket.emit("Signomulti", true);
                socket.data.enemy.data.signo = "O";
                socket.data.enemy.emit("Signomulti", false);
            } else if (random == 2) {
                socket.data.signo = "O";
                socket.emit("Signomulti", false);
                socket.data.enemy.data.signo = "X";
                socket.data.enemy.emit("Signomulti", true);
            }
        } else if (seg >= 60) {
            socket.emit('Abandonar')
        }
    })
})

    
server.listen(3000, () => { 
    console.log('Servidor andando perfectamente');
})