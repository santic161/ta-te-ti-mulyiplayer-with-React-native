import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native'
import {wp, hp, wpp, hpp, letra} from '../Functions/Porcentajes'

import Ico from '../assets/icono.png'

const Home = (props) => {
    
    const solitario = () => {
        props.navigation.navigate('Solitario')
    }
    const MultiJugador = () => {
        props.navigation.navigate('Loading', {Multijugador: true,Codigo:false,replay:false})
    }
    const Jugando_Con_Amigos = () => {
        props.navigation.navigate('JCASala')
    }

    return (
        <View style={{backgroundColor: "#171717", width: wp(100), height: hp(100)}}>
            <StatusBar/>
            <Image
                source={Ico}
                style={{
                    width: wp(57),    //No calculado
                    height: hpp(30, 1, 0),   //No calculado
                    top: hpp(10, 0, 10),
                    alignSelf: "center"
                }}
            />
            <TouchableOpacity style={styles.btn} onPress={() => solitario()}>
                {/* Tambien puede ir solo */}
                <Text style={styles.text}>Solitario</Text> 
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btn} onPress={() => MultiJugador()}>
                <Text style={styles.text}>Multijugador</Text> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => Jugando_Con_Amigos()}>
                <Text style={styles.text}>Jugar con amigos</Text> 
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    text: {
        color: '#DA0037',
        fontSize: letra(3),
        textAlign: "center",
        textAlignVertical: 'center',
    },
    btn: {
        width: wpp(50,1,20),
        height: hpp(6, 1, 15),
        justifyContent: 'center',
        backgroundColor: '#EDEDED',
        top: hpp(15,0,0),
        marginTop: wp(5),
        left: wp(25),
        borderRadius: hp(2)
    }
})