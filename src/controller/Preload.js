/**
 * Vídeo #36 ao #42: FluxoDeCaixa - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Exemplo de App real com Firebase (e como organizar o projeto).
 * Obs.: Para instalar as dependências do Firebase utilize o assistente da IDE, ou digite no terminal da IDE 'npm install firebase --save'.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Text, TextInput, Image} from 'react-native';
import Service from '../service/Service';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={};

        //verifica se o usuário já está logado
        Service.addAuthListener( (user) => {
            if(user){
                this.props.navigation.navigate('Home');
            }else{
                this.props.navigation.navigate('Login');
            }
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.divHeader}>
                    <Image style={styles.image} source={require('../../assets/images/cash-receiving-256.png')} />
                </View>
                <View style={styles.divBody}>
                    <Text style={styles.textMyCash}>My Cash Flow</Text>
                    <Text>by Vagner Pinto</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    },
    divHeader:{
        flex:1,
        alignItems:'center',
        marginTop:100
    },
    divBody:{
        flex:2,
        alignItems:'center'
    },
    image:{
        width:120,
        height:120
    },
    textMyCash:{
        fontSize:36
    }
});
