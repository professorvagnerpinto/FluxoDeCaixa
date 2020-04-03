/**
 * Vídeo #36 ao #42: FluxoDeCaixa - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Exemplo de App real com Firebase (e como organizar o projeto).
 * Obs.: Para instalar as dependências do Firebase utilize o assistente da IDE, ou digite no terminal da IDE 'npm install firebase --save'.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import Service from '../service/Service';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={};

        //assegura que não tenha usuário logado no App
        Service.signOut();

        //faz o bind do comportamemto com o componente
        this.logar = this.logar.bind(this);
    }

    logar(){
        Service.signIn(this.state.email, this.state.senha)
            .catch( (error) => {
                alert(error.message);
            });
        Service.addAuthListener( (user) => {
            if(user){
                Service.setUser(user);
                Service.getUserInfo()
                    .then( (ds) => {
                        this.props.navigation.navigate('Home', {
                            nome:ds.val().nome
                        });
                    })
                    .catch( (error) => {
                        alert(error.message);
                    });
            }
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.image} source={require('../../assets/images/cash-receiving-256.png')} />
                </View>
                <View style={styles.body}>
                    <Text>Email:</Text>
                    <TextInput style={styles.input} onChangeText={(email)=>this.setState({email})} />
                    <Text>Senha:</Text>
                    <TextInput secureTextEntry={true} style={styles.input} onChangeText={(senha)=>{this.setState({senha})}} />
                    <TouchableOpacity style={styles.buttonLogin} onPress={this.logar}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCadastrar} onPress={() => this.props.navigation.navigate('CadastroUsuario')}>
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        flex:1
    },
    body:{
        margin:10,
        flex:3
    },
    header:{
        margin:10,
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    image:{
        width:120,
        height:120
    },
    input:{
        height:40,
        borderWidth:1,
        borderColor:'#63B8FF',
        marginBottom:10
    },
    buttonLogin: {
        alignItems: "center",
        backgroundColor: "#FF63B8",
        padding:10,
        margin:10
    },
    textButton:{
        fontSize:16,
        color:'#ffffff'
    },
    buttonCadastrar: {
        alignItems: "center",
        backgroundColor: "#63B8FF",
        padding:10,
        margin:10
    },
});
