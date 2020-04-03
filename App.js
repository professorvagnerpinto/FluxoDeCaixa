/**
 * Vídeo #36 ao #42: FluxoDeCaixa - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Exemplo de App real com Firebase (e como organizar o projeto).
 * Obs.: Para instalar as dependências do Firebase utilize o assistente da IDE, ou digite no terminal da IDE 'npm install firebase --save'.
 * by: Vagner Pinto
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/controller/Login';
import Home from './src/controller/Home';
import Usuario from "./src/controller/Usuario";
import Despesa from "./src/controller/Despesa";
import CadastroReceita from "./src/controller/Receita";
import Preload from "./src/controller/Preload";

const Stack = createStackNavigator();
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/*<Stack.Screen*/}
                {/*    name="Preload"*/}
                {/*    component={Preload}*/}
                {/*    options={ {headerShown: false} } />*/}
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerLeft: null, title: 'My Cash Flow'}} />
                <Stack.Screen
                    name="CadastroUsuario"
                    component={Usuario}
                    options={{headerLeft: null, title: 'Novo usuário'}} />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={ {headerLeft: null, title: 'Movimentações'} } />
                <Stack.Screen
                    name="CadastroDespesa"
                    component={Despesa}
                    options={ {title: 'Despesa'} } />
                <Stack.Screen
                    name="CadastroReceita"
                    component={CadastroReceita}
                    options={ {title: 'Receita'} } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;

/**
 * Versão para quem quer utilizar classe.
 */
// export default class App extends React.Component{
//
//     render(){
//         const Stack = createStackNavigator();
//         return (
//             <NavigationContainer>
//                 <Stack.Navigator>
//                     <Stack.Screen
//                         name="My Cash Flow"
//                         component={Login} />
//                     <Stack.Screen
//                         name="Feed"
//                         component={Home}
//                         options={ {headerLeft: null} } />
//                     <Stack.Screen
//                         name="Cadastar Usuário"
//                         component={Usuario} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         );
//     }
// }

