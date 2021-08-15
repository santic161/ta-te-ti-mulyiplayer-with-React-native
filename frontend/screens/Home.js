import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native'
import {wp, hp} from '../Functions/Porcentajes'

import Ico from '../assets/icono.png'

const Home = (props) => {

    const solitario = () => {
        props.navigation.navigate('Play')
    }
    const MultiJugador = () => {
        props.navigation.navigate('MultiJugador')
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
                    height: hp(30),   //No calculado
                    top: hp(10),
                    left: wp(21.5)
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
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: 'center',
    },
    btn: {
        width: wp(50),
        height: hp(6),
        justifyContent: 'center',
        backgroundColor: '#EDEDED',
        top: hp(15),
        marginTop: wp(5),
        left: wp(25),
        borderRadius: hp(2)
    }
})