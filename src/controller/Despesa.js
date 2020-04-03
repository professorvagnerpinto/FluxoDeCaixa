/**
 * Vídeo #36 ao #42: FluxoDeCaixa - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Exemplo de App real com Firebase (e como organizar o projeto).
 * Obs.: Para instalar as dependências do Firebase utilize o assistente da IDE, ou digite no terminal da IDE 'npm install firebase --save'.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import Service from "../service/Service";

export default class Despesa extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            categoria:'',
            sub_categoria:'',
            valor:''
        };

        //pega os dados de data (quando vem de Home)
        if(typeof this.props.route.params === "undefined"){
            console.log('indefinido');
        }else{
            let s = this.state;
            s.categoria = this.props.route.params.data.categoria;
            s.sub_categoria = this.props.route.params.data.sub_categoria;
            s.valor = this.props.route.params.data.valor;
            this.setState(s);
        }

        //faz o bind do comportamemto com o componente
        this.insert = this.insert.bind(this);
        this.limparForm = this.limparForm.bind(this);

        //verifica se o usuário ainda está autenticado na sessão
        Service.addAuthListener((user) => {
            if(!user){
                this.props.navigation.navigate('Login');
            }
        });

        //adiciona um listener para o nó saldo
        Service.addSaldoListener( (dataSnapshot) => {
            this.saldo = parseFloat(dataSnapshot.val());
        });
    }

    insert(){
        let despesa = {
            tipo:'D',
            categoria:this.state.categoria,
            sub_categoria:this.state.sub_categoria,
            valor:-Math.abs(parseFloat(this.state.valor.replace(',','.')))
        };
        Service.insertMovimento(despesa)
            .then( () => {
                this.limparForm();
                let novoSaldo = this.saldo + despesa.valor;
                Service.updateSaldo(novoSaldo)
                    .then( () => {
                        alert('Despesa salva.');
                    })
                    .catch( (error) => {
                        alert(error.message);
                    })
            })
            .catch( (error) => {
                alert(error.message);
            });
    }

    limparForm() {
        this.textInputCategoria.clear();
        this.textInputsub_categoria.clear();
        this.textInputValor.clear();
        let s = this.state;
        s.categoria = '';
        s.sub_categoria = '';
        s.valor = '';
        this.setState(s);
    }

    render(){
        return (
            <View style={styles.divMain}>
                <Text>Categoria:</Text>
                <TextInput autoFocus={true} ref={input => { this.textInputCategoria = input }} value={this.state.categoria} style={styles.input} onChangeText={(categoria)=>this.setState({categoria})} />
                <Text>Tipo:</Text>
                <TextInput ref={input => { this.textInputsub_categoria = input }} value={this.state.sub_categoria} style={styles.input} onChangeText={(sub_categoria)=>this.setState({sub_categoria})} />
                <Text>Valor:</Text>
                <TextInput
                    ref={input => { this.textInputValor = input }}
                    value={this.state.valor.replace('-R$', '')}
                    style={styles.input}
                    onChangeText={(valor)=>this.setState({valor})}
                    keyboardType="numeric" />
                <TouchableOpacity style={styles.button} onPress={this.insert}>
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    divMain:{
        flex:1,
        margin:10
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
        padding:10,
        margin:10
    },
    textButton:{
        fontSize:16,
        color:'#ffffff'
    },
});
