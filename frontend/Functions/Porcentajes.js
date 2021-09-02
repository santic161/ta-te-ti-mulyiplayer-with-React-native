import { Dimensions } from "react-native"
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

export const wp = (porcentaje) => {
    return porcentaje*width/100
}

export const hp = (porcentaje) => {
    return porcentaje*height/100
}
export const wpp = (porcentaje,signo,restar) => {
    if(signo == 1){
        if(height < 650){
            return porcentaje*width/100 + 25 - restar
        }else{
            return porcentaje*width/100
        }
    }
    if(signo == 0){
        if(height < 650){
            return porcentaje*width/100 - 25 - restar
        }else{
            return porcentaje*width/100
        }
    }
}

export const hpp = (porcentaje, signo, restar) => {
    if(signo == 1){
        if(height < 650){
            return porcentaje*height/100 + 25 - restar
        }
    }
    if(signo == 0){
        if(height < 650){
            return porcentaje*height/100 - 25 - restar
        }
    }
    return porcentaje*height/100

}

export const letra = (porcentaje) => {
    if(height < 650){
        return porcentaje*height/100 + 3 
    } 
    return porcentaje*height/100 
}