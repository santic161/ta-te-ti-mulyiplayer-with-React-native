import React, { useEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native'
import { wp, hp } from '../Functions/Porcentajes'
import socket from '../Functions/SocketIo'
/* TODO
    --Arreglar keyboardAvoidView -> Not Working
*/


const JCA_Sala = (props) => {
    const [Codigo, setCodigo] = useState({
        code: "000000"
    })

    useEffect(() => {
        socket.on('JoinRoom', () => {
            props.navigation.navigate('Play')
        })
        return () => {
            console.log(`Unmounted`)
        }
    }, [])

    const ingresar = () => {
        if(Codigo.code.length == "6"){
            socket.emit('JoinRoom', {Codigo: Codigo.code, isAdmin: false })    //String
        }
        else{
            // Cambiar a animacion
            Alert.alert("Error", "Codigo invalido")
        }
    }

    const crearSala = () => {
        let MatchCode = Math.floor(100000 + Math.random() * 900000)     //6 Cifras
        console.log(MatchCode)
        socket.emit('CreateRoom', {Codigo: MatchCode, isAdmin: true})
    }

    return (
        <View style={{backgroundColor: "#171717", height: "100%"}}>
            <KeyboardAvoidingView 
                behavior="height"
                style={{
                    flex: 2,
                }}
                keyboardVerticalOffset={120} //6
            >
                <SafeAreaView style={{flex: 1}}>
                    <TextInput 
                        required
                        placeholder="Codigo de la sala:" 
                        placeholderTextColor="#DA0037" 
                        style={{
                            color: "#DA0037",
                            marginTop: hp(35),
                            left: wp(20),
                            backgroundColor: "#EDEDED",
                            height: hp(5),
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
                        onPress={() => ingresar()}
                        style={{
                            backgroundColor: "#EDEDED",
                            height: hp(5),
                            width: wp(60),
                            left: wp(20),
                            marginTop: hp(4),
                            borderRadius: hp(2)
                    }}>
                        <Text style={{
                            flex: 1,
                            color: "#DA0037", 
                            textAlign: "center", 
                            textAlignVertical: "center", 
                            fontSize: 21
                        }}>Ingresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => crearSala()} 
                        style={{
                            backgroundColor: "#EDEDED",
                            height: hp(5),
                            width: wp(60),
                            left: wp(20),
                            marginTop: hp(4),
                            borderRadius: hp(2)
                    }}>
                        <Text style={{
                            flex: 1,
                            color: "#DA0037", 
                            textAlign: "center", 
                            textAlignVertical: "center", 
                            fontSize: 21
                        }}>Crear Sala</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => crearSala()} 
                        style={{
                            backgroundColor: "#EDEDED",
                            height: hp(5),
                            width: wp(60),
                            left: wp(20),
                            marginTop: hp(4),
                            borderRadius: hp(2)
                    }}>
                        <Text style={{
                            flex: 1,
                            color: "#DA0037", 
                            textAlign: "center", 
                            textAlignVertical: "center", 
                            fontSize: 21
                        }}>Jugar en un celular</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default JCA_Sala
