import React from 'react';
import {View} from 'react-native';
import firebase from 'firebase';

import {LoginForm} from './src/components/LoginForm';
import {Header, Button, Spinner} from './src/components/common';
import {CardSection} from "./src/components/common/CardSection";


export default class App extends React.Component {

    state = {loggedIn: null};

    componentWillMount() {

        firebase.initializeApp({
            apiKey: "AIzaSyC_efZoqxLcVN5JIXS6Jkzv-cCGGpsOHIA",
            authDomain: "auth-ecf1a.firebaseapp.com",
            databaseURL: "https://auth-ecf1a.firebaseio.com",
            projectId: "auth-ecf1a",
            storageBucket: "auth-ecf1a.appspot.com",
            messagingSenderId: "969809015505"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }
        });

    }

    renderContent() {


        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
                    </CardSection>
                );
            case false:
                return <LoginForm/>;
            default:
                return <Spinner size="large"/>

        }

    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/>

                {this.renderContent()}

            </View>
        );
    }
}

