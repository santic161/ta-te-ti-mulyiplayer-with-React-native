import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from './screens/Home';
import Solitario from './screens/Solitario';
import MultiJugador from './screens/Multijugador';
import Jugar_Con_Amigos from './screens/JCA';
import Jugar_Con_Amigos_Sala from './screens/JCA_Sala'
import Play from './screens/Play'


const { Navigator, Screen } = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} options={
          {
            title: "",
            headerStyle: {
              backgroundColor: '#171717',
              elevation: 0, // Quita la sombra en Android
              shadowOpacity: 0, // Quita la sombra en IOS
            },
              
          }}/>
          <Screen name="Solitario" component={Solitario} options={{title: "", headerStyle: {backgroundColor: "#444", color: "#FFF"}}}/>
          <Screen name="MultiJugador" component={MultiJugador} options={{title: ""}}/>
          <Screen name="JCA" component={Jugar_Con_Amigos} options={{title: ""}}/>
          <Screen name="JCASala" component={Jugar_Con_Amigos_Sala} options={{title: ""}}/>
          <Screen name="Play" component={Play} options={{title: "", headerStyle: {backgroundColor: "#444"}, headerTintColor: "#EEE"}}/>
          
      </Navigator>
    </NavigationContainer>
  );
}
export default App;