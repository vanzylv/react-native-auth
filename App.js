import React from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Header} from './src/components/common';
import {LoginForm} from './src/components/LoginForm'

export default class App extends React.Component {

    componentWillMount() {

        firebase.initializeApp({
            apiKey: "AIzaSyC_efZoqxLcVN5JIXS6Jkzv-cCGGpsOHIA",
            authDomain: "auth-ecf1a.firebaseapp.com",
            databaseURL: "https://auth-ecf1a.firebaseio.com",
            projectId: "auth-ecf1a",
            storageBucket: "auth-ecf1a.appspot.com",
            messagingSenderId: "969809015505"
        });

    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                <LoginForm/>
            </View>
        );
    }
}

