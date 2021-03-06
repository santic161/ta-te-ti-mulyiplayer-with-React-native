import React, { useEffect, useState } from 'react'
import { View, Pressable, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import { wp, hp, wpp, hpp, letra } from '../Functions/Porcentajes'
import socket  from '../Functions/SocketIo'

import Circle from '../assets/circle.png'
import Cruz from '../assets/Cruz.png'



const Solitario = (props) => {

    const [state, setState] = useState({
        Img:[   
                0,0,0,
                0,0,0,
                0,0,0
            ],
        })
    const [Jugada, setJugada] = useState({        
        Cruz: true
    })
    const [ganador, setGanador] = useState({
        ganador: ""
    })
    const posib = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    const move = (btn) => {
        if(state.Img[btn] != 1 && state.Img[btn] != 2){
            let random = Math.floor((Math.random() * (8 - 0 + 1)));
            let alguienGano = false
            if(Jugada.Cruz == true){
                state.Img[btn] = 1;
                posib.forEach(posibilidad => {
                    if(state.Img[posibilidad[0]] == 1 && state.Img[posibilidad[1]] == 1 && state.Img[posibilidad[2]] == 1){
                        setGanador({ganador: "las cruces"})
                        alguienGano = true
                    }
                });
            }
            if(!alguienGano){
                while(state.Img[random] != 0){
                    random = Math.floor((Math.random() * (8 - 0 + 1)));
                }
                state.Img[random] = 2
            }
            posib.forEach(posibilidad => {
                if(state.Img[posibilidad[0]] == 2 && state.Img[posibilidad[1]] == 2 && state.Img[posibilidad[2]] == 2){
                    setGanador({ganador: "los circulos"})
                    alguienGano = true
                }
            });
            if(!state.Img.includes(0) && alguienGano == false){
                setGanador({ganador: "Empate"})
            }
            setState({Img: state.Img})
            setJugada({Cruz: true})
        }
    }

    const PlayAgain = () => {
        setState({Img: [0,0,0,0,0,0,0,0,0]});
        setGanador({ganador: ""})
    }
    return (
        <View style={styles.app}>
            {
                ganador.ganador.length > 0 &&
                    <Text style={styles.textoGanador}>{ganador.ganador != "Empate"?`Ganaron ${ganador.ganador}`:"Empate"}</Text>
            }
            <View style={[{ marginTop: ganador.ganador.length > 0? Dimensions.get('window').height < 650? wp(-15):wp(-25):0},styles.container]}>
                <View>
                    <Pressable onPress={() => move(0)} disabled={ganador.ganador.length>0?true:false}>
                        <View style={[{ borderTopWidth: 0, borderLeftWidth: 0 }, styles.boxs]}>
                            <Image source={state.Img[0] == 1 ? Cruz : state.Img[0] == 2 ? Circle : null }  style={styles.image} resizeMode="contain" resizeMethod="resize" />
                        </View>            
                    </Pressable>
                    <Pressable onPress={() => move(3)} disabled={ganador.ganador.length>0?true:false}>
                        <View style={[ {borderLeftWidth: 0}, styles.boxs]}>
                            <Image source={state.Img[3] == 1 ? Cruz : state.Img[3] == 2 ? Circle : null } style={styles.image} resizeMode="contain" resizeMethod="resize" />
                        </View>            
                    </Pressable>
                    <Pressable onPress={() => move(6)} disabled={ganador.ganador.length>0?true:false}>
                        <View style={[{ borderLeftWidth: 0, borderBottomWidth: 0}, styles.boxs]}>
                            <Image source={state.Img[6] == 1 ? Cruz : state.Img[6] == 2 ? Circle : null } style={styles.image} resizeMode="contain" resizeMethod="resize" />
                        </View>            
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={() => move(1)} disabled={ganador.ganador.length>0?true:false}>
                        <View style={[{ borderTopWidth: 0}, styles.boxs]}>
                            <Image source={state.Img[1] == 1 ? Cruz : state.Img[1] == 2 ? Circle : null } style={styles.image} resizeMode="contain" resizeMethod="resize" />
                        </View>            
                    </Pressable>
                    <Pressable onPress={() => move(4)} disabled={ganador.ganador.length>0?true:false}>
                        <View style={styles.boxs}>
                            <Image source={state.Img[4] == 1 ? Cruz : state.Img[4] == 2 ? Circle : null } style={styles.image} resizeMode="contain" resizeMethod="resize" />
                        </View>            
                    </Pressable>
                    <Pressable onPress={() => move(7)} disabled={ganador.ganador.length>0?true:false}>
                        <View style={[{ borderBottomWidth: 0},styles.boxs]}>
                            <Image source={state.Img[7] == 1 ? Cruz : state.Img[7] == 2 ? Circle : null } style={styles.image} resizeMode="contain" resizeMethod="resize" />
                        </View>            
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={() => move(2)} disabled={ganador.ganador.length>0?true:false}>
                        <View style={[{borderTopWidth: 0, borderRightWidth: 0},styles.boxs]}>
                            <Image source={state.Img[2] == 1 ? Cruz : state.Img[2] == 2 ? Circle : null } style={styles.image} resizeMode="contain" resizeMethod="resize" />
                        </View>            
                    </Pressable>
                    <Pressable onPress={() => move(5)} disabled={ganador.ganador.length>0?true:false}>
                        <View style={[{borderRightWidth: 0},styles.boxs]}>
                            <Image source={state.Img[5] == 1 ? Cruz : state.Img[5] == 2 ? Circle : null } style={styles.image} resizeMode="contain" resizeMethod="resize" />
                        </View>            
                    </Pressable>
                    <Pressable onPress={() => move(8)} disabled={ganador.ganador.length>0?true:false}>
                        <View style={[{borderBottomWidth: 0, borderRightWidth: 0,},styles.boxs]}>
                            <Image source={state.Img[8] == 1 ? Cruz : state.Img[8] == 2 ? Circle : null } style={styles.image} resizeMode="contain" resizeMethod="resize" />
                        </View>            
                    </Pressable>
                </View>
            </View>
            {
                ganador.ganador.length > 0 &&
                <View style={{flexDirection: Dimensions.get('window').height < 650? "row" : "column", justifyContent: "space-around", top: Dimensions.get('window').height < 650? 0 : -40}}>
                    <TouchableOpacity style={[styles.btn_PlayAgain, { marginTop: Dimensions.get('window').height < 650? wp(-20):wp(-15)}]} onPress={() => PlayAgain()}>
                        <Text style={{flex: 1, color: "#FD2828", textAlign: "center", textAlignVertical: "center", fontWeight: "bold", fontSize: 18}}>Jugar de nuevo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn_PlayAgain, { marginTop: Dimensions.get('window').height < 650? wp(-20):30}]} onPress={() => props.navigation.navigate('Home')}>
                        <Text style={{flex: 1, color: "#FD2828", textAlign: "center", textAlignVertical: "center", fontWeight: "bold", fontSize: 18}}>Abandonar</Text>
                    </TouchableOpacity>
                </View>
                
            }
        </View>
    )
}

export default Solitario

const styles = StyleSheet.create({
    boxs: {
        width: wpp(30,1,30),
        height: hpp(18,1,25),
        borderColor: "#FD2828",
        borderWidth: 3,
        
    },
    container: {
        backgroundColor: "#171717", 
        height: "100%", 
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "row",
        zIndex: 1,
    },
    image: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center"
    },
    textoGanador: {
        color: "#EDEDED",
        textAlign: "center",
        fontSize: letra(4.5),
        fontWeight: "bold",
        top: wpp(4,1,25),
        zIndex: 50
    },
    app:{
        backgroundColor: "#171717", 
        height: "100%", 
        width: "100%", 
    },
    btn_PlayAgain: {
        backgroundColor: "#EDEDED",
        zIndex: 100, 
        alignSelf: "center",
        borderRadius: 50,
        height: 40,
        width: wpp(60,0,20),
    }
})