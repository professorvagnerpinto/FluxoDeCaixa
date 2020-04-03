/**
 *  Classe utilizada para encapsular os serviços do Firebase.
 *  by: Vagner Pinto
 */

import firebase from './FirebaseConnetion';

class Service {

    user = {};

    signOut() {
        firebase.auth().signOut();
    }

    //escuta o serviço de autenticação para saber o estado atual do usuário
    addAuthListener(callback){
        firebase.auth().onAuthStateChanged(callback);
    }

    signIn(email, senha) {
        return firebase.auth().signInWithEmailAndPassword(email, senha);
    }

    setUser(user) {
        this.user = user;
    }

    getUser(){
        return this.user;
    }

    getUserInfo() {
        return firebase.database().ref('users').child(this.user.uid).once('value');
    }

    signUp(email, senha) {
        return firebase.auth().createUserWithEmailAndPassword(email, senha);
    }

    setUserInfo(user, userInfo) {
        return firebase.database().ref('users').child(user.uid).set(userInfo);
    }

    insertMovimento(despesa) {
        return firebase.database().ref('movimentos').child(this.user.uid).push().set(despesa);
    }

    addMovimentosListener(callback) {
        firebase.database().ref('movimentos').child(this.user.uid).on('value', callback);
    }

    updateSaldo(saldo) {
        return firebase.database().ref('users').child(this.getUser().uid).child("saldo").set(saldo);
    }

    addSaldoListener(callback) {
        firebase.database().ref('users').child(this.getUser().uid).child('saldo').on('value', callback);
    }
}

export default new Service();
