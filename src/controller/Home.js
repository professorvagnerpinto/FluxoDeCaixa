/**
 * Vídeo #36 ao #42: FluxoDeCaixa - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Exemplo de App real com Firebase (e como organizar o projeto).
 * Obs.: Para instalar as dependências do Firebase utilize o assistente da IDE, ou digite no terminal da IDE 'npm install firebase --save'.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Text, BackHandler, TouchableOpacity, FlatList} from 'react-native';

import Service from "../service/Service";
import ItemMovimento from "../adapter/ItemMovimento";

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            nome:this.props.route.params.nome,
            movimentos:[],
            saldo:''
        };

        Service.addAuthListener( (user) => {
            if(user){
                //busca os movimentos do usuário logado na sessão
                Service.addMovimentosListener( (dataSnapshot) => {
                    let s = this.state;
                    s.movimentos = [];
                    dataSnapshot.forEach((child)=>{
                        s.movimentos.push({
                            key:child.key,
                            tipo:child.val().tipo,
                            categoria:child.val().categoria,
                            sub_categoria:child.val().sub_categoria,
                            valor:parseFloat(child.val().valor).toFixed(2).replace('.',',')
                        });
                    });
                    this.setState(s);
                });
                //busca o saldo atual
                Service.addSaldoListener((dataSnapshot) => {
                    let s = this.state;
                    s.saldo = dataSnapshot.val().toFixed(2).replace('.',',');
                    this.setState(s);
                });
            }else{
                this.props.navigation.navigate('Login');
            }
        });
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

    render(){
        return (
            <View style={styles.divMain}>
                <View style={styles.divHeader}>
                    <Text>Olá, {this.state.nome}</Text>
                    <Text style={styles.textSaldo}>Saldo: {this.state.saldo}</Text>
                </View>
                <View style={styles.divButtons}>
                    <TouchableOpacity style={styles.buttonDespesa} onPress={ () => {this.props.navigation.navigate('CadastroDespesa')}}>
                        <Text style={styles.textButton}>+ Despesa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonReceita} onPress={ () => {this.props.navigation.navigate('CadastroReceita')}}>
                        <Text style={styles.textButton}>+ Receita</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={this.state.movimentos}
                    renderItem={ ({item}) => <ItemMovimento data={item} roteador={this.props.navigation}/> }
                />

            </View>
        );
    }
}

//estilo para o container
function getStyle(tipo) {
    if(tipo === 'R'){ //se é receita
        return {
            flex:1,
            flexDirection:'column',
            height:50,
            marginLeft:5,
            marginRight:5,
            marginBottom:4,
            padding:5,
            backgroundColor:'#77ccff', //pinta azul
            borderRadius: 5
        }
    }else{ //se é despesa
        return {
            flex:1,
            flexDirection:'column',
            height:50,
            marginLeft:5,
            marginRight:5,
            marginBottom:4,
            padding:5,
            backgroundColor:'#ff8be0', //pinta rosa
            borderRadius: 5
        }
    }
}

const styles = StyleSheet.create({
    divMain:{
        flex:1,
        margin:10
    },
    divHeader:{
        flex:0,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-around'
    },
    divButtons:{
        flex:0,
        flexDirection:'row',
        justifyContent:'center',
        padding:10
    },
    divList:{
        alignItems:'center'
    },
    divItem:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    buttonDespesa: {
        width:120,
        height:40,
        alignItems: "center",
        backgroundColor: "#FF63B8",
        padding:10,
        margin:10
    },
    buttonReceita: {
        width:120,
        height:40,
        alignItems: "center",
        backgroundColor: "#63B8FF",
        padding:10,
        margin:10
    },
    flatList:{
        flex:1
    },
    textSaldo:{
        fontSize: 24,
        fontWeight:'bold',
        marginTop:10
    },
    textButton:{
        fontSize:16,
        color:'#ffffff'
    },
    textItem:{
        fontSize:16
    }
});
