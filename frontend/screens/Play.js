import React, { useEffect, useState } from 'react'
import { View, Pressable, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { wp, hp } from '../Functions/Porcentajes'
import socket  from '../Functions/SocketIo'

import Circle from '../assets/circle.png'
import Cruz from '../assets/Cruz.png'



const Play = (props) => {

    const [state, setState] = useState({
        Img:[   
                0,0,0,
                0,0,0,
                0,0,0
            ],
        })
    const [Jugada, setJugada] = useState({        
        Cruz: false
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
            socket.emit('Move', btn);
            if(Jugada.Cruz == true){
                state.Img[btn] = 1
                posib.forEach(posibilidad => {
                    if(state.Img[posibilidad[0]] == 1 && state.Img[posibilidad[1]] == 1 && state.Img[posibilidad[2]] == 1){
                        setGanador({ganador: "las cruces"})
                    }
                });
            }
            else if(Jugada.Cruz == false){
                state.Img[btn] = 2
                posib.forEach(posibilidad => {
                    if(state.Img[posibilidad[0]] == 2 && state.Img[posibilidad[1]] == 2 && state.Img[posibilidad[2]] == 2){
                        setGanador({ganador: "los circulos"})
                    }
                });
            }
            if(!state.Img.includes(0)){
                setGanador({ganador: "Empate"})
            }
            setState({Img: state.Img})
            setJugada({Cruz: !Jugada.Cruz})
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
            {/* //-34 */}
            <View style={[{ marginTop: ganador.ganador.length>0?-94:0 },styles.container]}>
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
                <View>
                    <TouchableOpacity style={styles.btn_PlayAgain} onPress={() => PlayAgain()}>
                        <Text style={{flex: 1, color: "#FD2828", textAlign: "center", textAlignVertical: "center", fontWeight: "bold", fontSize: 18}}>Jugar de nuevo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn_PlayAgain,{marginTop: 20}]} onPress={() => props.navigation.navigate('Home')}>
                        <Text style={{flex: 1, color: "#FD2828", textAlign: "center", textAlignVertical: "center", fontWeight: "bold", fontSize: 18}}>Abandonar</Text>
                    </TouchableOpacity>
                </View>
                
            }
        </View>
    )
}

export default Play

const styles = StyleSheet.create({
    boxs: {
        width: 120,
        height: 120,
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
        height: 120,
        alignSelf: "center",
        alignItems: "center"
    },
    textoGanador: {
        color: "#EDEDED",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        top: 40,
        zIndex: 50
    },
    app:{
        backgroundColor: "#171717", 
        height: "100%", 
        width: "100%", 
    },
    btn_PlayAgain: {
        marginTop: -125,
        backgroundColor: "#EDEDED",
        zIndex: 100, 
        alignSelf: "center",
        borderRadius: 50,
        height: 40,
        width: 200,
    }
})