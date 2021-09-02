import React, { useEffect, useState }from 'react'
import { View, Text } from 'react-native'
import  { wp, hp, hpp } from '../Functions/Porcentajes'
import socket from '../Functions/SocketIo'

const Loading = (props) => {

    useEffect(() => {
        socket.on('Multijugador', data => {
            props.navigation.navigate('MultiJugador', data)
        })
        if(props.route.params.Codigo) {

            socket.emit('CreateRoom', {Codigo: props.route.params.Codigo, isAdmin: true})
        }
        if(props.route.params.Multijugador){
            socket.emit('Multijugador');
        }
        return () => {
            console.log(`Unmounted`)
        }
    }, [])
    //Hacer visible cierto texto, Pasado unos segundos mostrar y borrar otro
    if(props.route.params.Codigo){
        return (
            <View style={{height: '100%', backgroundColor: '#171717'}}>
                <Text style={{
                    flex: .96, 
                    color: "#EDEDED", 
                    fontSize: wp(5), 
                    textAlignVertical: "center", 
                    textAlign: "center"
                }}>
                    Buscando a tu amigo...
                </Text>
                <Text style={{ 
                    color: "#EDEDED", 
                    fontSize: wp(5), 
                    textAlign: "center",
                    top: hpp(-35,1,0)
                }}>El Codigo de la sala es: {props.route.params.Codigo}</Text>
            </View>
        )
    }else if (props.route.params.Multijugador){

        return (
        <View style={{height: '100%', backgroundColor: '#171717'}}>
            <Text style={{
                flex: .96, 
                color: "#EDEDED", 
                fontSize: wp(5), 
                textAlignVertical: "center", 
                textAlign: "center"
            }}>
                Esperando a un rival...
            </Text>
        </View>
        )
    }
}

export default Loading
