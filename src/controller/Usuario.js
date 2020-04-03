/**
 * Vídeo #36 ao #42: FluxoDeCaixa - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Exemplo de App real com Firebase (e como organizar o projeto).
 * Obs.: Para instalar as dependências do Firebase utilize o assistente da IDE, ou digite no terminal da IDE 'npm install firebase --save'.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, BackHandler} from 'react-native';

import Service from '../service/Service';

export default class Usuario extends React.Component{

    constructor(props){
        super(props);
        this.state={
            nome:'',
            senha:'',
            confirmaSenha:''
        };

        //assegura que não tenha usuário logado no App
        Service.signOut();

        //faz o bind do comportamemto com o componente
        this.cadastrar = this.cadastrar.bind(this);

    }

    /*
        Os três métodos abaixo servem para retirar a função back do dispositivo
     */
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    onBackButtonPressed() {
        return true;
    }

    cadastrar(){
        if(this.state.nome == '' || this.state.senha.isEmpty == '' || this.state.confirmaSenha == ''){
            alert('Preencha todos os campos');
        }else{
            if(this.state.senha == this.state.confirmaSenha){
                Service.signUp(this.state.email, this.state.senha)
                    .then( () => {
                        Service.addAuthListener( (user) => {
                            if(user){
                                Service.setUser(user);
                                Service.setUserInfo(user, {nome:this.state.nome, email:this.state.email})
                                    .then( () => {
                                            this.props.navigation.navigate('Home', {
                                                nome:this.state.nome
                                            });
                                        })
                                    .catch( (error) => {
                                        console.log('Entrou no error de setUserInfo, em Usuario');
                                        alert(error.message);
                                    });
                            }
                        });
                    })
                    .catch( (error) => {
                        switch (error.code) {
                            case 'auth/weak-password':
                                alert('Sua senha deve conter o mínimo de 6 caracteres.');
                                break;
                            case 'auth/email-already-in-use':
                                alert('Email já cadastrado.');
                                break;
                            default:
                                console.log('Entrou no error de signUp, em Usuario');
                                alert('Erro! Verefique sua internet e tente novamente. Ou contate o suporte técnico.');
                        }
                    });
            }else{
                alert('Senhas diferentes.');
            }
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Nome completo:</Text>
                <TextInput style={styles.input} onChangeText={(nome)=>this.setState({nome})} />
                <Text>Email:</Text>
                <TextInput style={styles.input} onChangeText={(email)=>this.setState({email})} />
                <Text>Senha:</Text>
                <TextInput secureTextEntry={true} style={styles.input} onChangeText={(senha)=>{this.setState({senha})}} />
                <Text>Confirmar senha:</Text>
                <TextInput secureTextEntry={true} style={styles.input} onChangeText={(confirmaSenha)=>{this.setState({confirmaSenha})}} />
                <TouchableOpacity style={styles.button} onPress={this.cadastrar}>
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        flex:1
    },
    input:{
        height:40,
        borderWidth:1,
        borderColor:'#63B8FF',
        marginBottom:10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#FF63B8",
        padding:10
    },
    textButton:{
        fontSize:16,
        color:'#ffffff'
    }
});
