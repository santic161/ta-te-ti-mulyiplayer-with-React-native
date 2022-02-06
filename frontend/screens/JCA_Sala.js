import React, { useEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import { wp, hp } from '../Functions/Porcentajes'
import socket from '../Functions/SocketIo'



const JCA_Sala = (props) => {
    const [Codigo, setCodigo] = useState({
        code: "000000"
    })
    useEffect(() => {
        socket.on(`CreateRoom`, data => {
            props.navigation.navigate(`Play_OnlineCA`, {isAdmin: data.isAdmin})
        })
        return () => {
            console.log(`Unmounted`)
        }
    }, [])
    

    const ingresar = () => {
        if(Codigo.code.length == "6" && !Codigo.code.includes("-")){
            socket.emit('CreateRoom', {Codigo: Codigo.code, isAdmin: false })    //String
        }
        else{
            // Cambiar a animacion
            Alert.alert("Error", "Codigo invalido")
        }
    }

    const crearSala = () => {
        let MatchCode = Math.floor(100000 + Math.random() * 900000)     //6 Cifras
        console.log(MatchCode)
        props.navigation.navigate('Loading', {Codigo: MatchCode})
    }
    const JugarEnUnCelular = () => {
        props.navigation.navigate('Play')
    }
    return (
        <KeyboardAvoidingView 
            style={{
                flex: 1,
                backgroundColor: "#171717"
            }}
            enabled
            behavior="height" //6
            keyboardVerticalOffset={hp(-10)}
        >
            <ScrollView contentContainerStyle={{backgroundColor: "#111", alignItems: "center", flex: 1, justifyContent: "center",}}>
                <TextInput 
                    required
                    placeholder="Codigo de la sala:" 
                    placeholderTextColor="#DA0037" 
                    style={{
                        // flex:1,
                        color: "#DA0037",
                        backgroundColor: "#EDEDED",
                        height: hp(6),
                        width: wp(60),
                        paddingLeft: wp(1.7),
                        fontSize: 17,
                        borderRadius: hp(2)
                    }} 
                    keyboardType="number-pad"
                    maxLength={6}
                    minLength={6}
                    onSubmitEditing={() => ingresar()}
                    onChangeText={texto => setCodigo({code: texto})}
                />
                <TouchableOpacity 
                    onPress={() => crearSala()} 
                    style={{
                        backgroundColor: "#EDEDED",
                        height: hp(5),
                        width: wp(60),
                        marginTop: hp(4),
                        borderRadius: hp(2)
                }}>
                    <Text style={{
                        flex:1,
                        color: "#DA0037", 
                        textAlign: "center", 
                        textAlignVertical: "center", 
                        fontSize: 21
                    }}>Crear Sala</Text>
                </TouchableOpacity>


                <TouchableOpacity 
                    onPress={() => ingresar()}
                    style={{
                        backgroundColor: "#EDEDED",
                        height: hp(5),
                        width: wp(60),
                        marginTop: hp(4),
                        borderRadius: hp(2)
                }}>
                    <Text style={{
                        flex:1,
                        color: "#DA0037", 
                        textAlign: "center", 
                        textAlignVertical: "center", 
                        fontSize: 21
                    }}>Ingresar</Text>
                </TouchableOpacity>



                <TouchableOpacity 
                    onPress={() => JugarEnUnCelular()} 
                    style={{
                        backgroundColor: "#EDEDED",
                        height: hp(5),
                        width: wp(60),
                        marginTop: hp(4),
                        borderRadius: hp(2)
                }}>
                    <Text style={{
                        flex:1,
                        color: "#DA0037", 
                        textAlign: "center", 
                        textAlignVertical: "center", 
                        fontSize: 21
                    }}>Jugar en un celular</Text>
                </TouchableOpacity>              
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default JCA_Sala