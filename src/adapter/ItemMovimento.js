/**
 * Vídeo #36 ao #42: FluxoDeCaixa - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Exemplo de App real com Firebase (e como organizar o projeto).
 * Obs.: Para instalar as dependências do Firebase utilize o assistente da IDE, ou digite no terminal da IDE 'npm install firebase --save'.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class Login extends React.Component{
    constructor(props) {
        super(props);

        let bg ='#ff8be0'; //padrão é rosa
        if(this.props.data.tipo === 'R'){
            bg = '#77ccff'; //receita é azul
        }

        this.state={
            key:'',
            bg: bg
        };

        //faz o bind do comportamemto com o componente
        this.clickItem = this.clickItem.bind(this);
    }

    clickItem(data, roteador){
        if(data.tipo === 'D'){
            roteador.navigate('CadastroDespesa', {
                data:data
            });
        }else if(data.tipo === 'R'){
            roteador.navigate('CadastroReceita', {
                data:data
            });
        }

    }

    render(){
        return(
            <TouchableOpacity style={[styles.container, {backgroundColor:this.state.bg}]} onPress={ () => {this.clickItem(this.props.data, this.props.roteador)}}>
                <Text style={styles.textCategoria}>{this.props.data.categoria}</Text>
                <View style={styles.divInternal}>
                    <Text style={styles.textSubCategoria}>{this.props.data.sub_categoria}</Text>
                    <Text style={styles.textValor}>{this.props.data.valor}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

//estilos
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        height:50,
        marginLeft:5,
        marginRight:5,
        marginBottom:4,
        padding:5,
        borderRadius:5
    },
    divInternal:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    textCategoria:{
        textAlign: 'left',
        textAlignVertical:'center'
    },
    textSubCategoria:{
        textAlign: 'left',
        textAlignVertical:'center'
    },
    textValor:{
        textAlign:'right',
        textAlignVertical:'center'
    }
});
