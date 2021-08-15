import { Dimensions } from "react-native"
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

export const wp = (porcentaje) => {
    return porcentaje*width/100
}
export const hp = (porcentaje) => {
    return porcentaje*height/100
}