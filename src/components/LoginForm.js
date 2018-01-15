import React from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';
import {Input, Button, Card, CardSection, Spinner} from "./common";


class LoginForm extends React.Component {

    state = {email: '', password: '', error: '', loading: false}

    onButtonPress() {

        const {email, password} = this.state;

        this.setState({error: '', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this))
            });

    }

    onLoginFail() {
        this.setState({
            error: 'Authentication Failed.',
            loading:false
        })
    }

    onLoginSuccess() {
        this.setState({
            error: '',
            email: '',
            password: '',
            loading: false
        });
    }

    renderButton() {

        if (this.state.loading) {
            return (
                <Spinner size="small"/>
            )
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        )


    }

    render() {

        return (
            <Card>

                <CardSection>
                    <Input
                        placeholder="user@email.com"
                        label="Email"
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                    />
                </CardSection>


                <CardSection>
                    <Input
                        label="Password"
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        secureTextEntry
                    />

                </CardSection>

                <Text style={style.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>

        )

    };

}

const style = {

    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }

}

export {LoginForm};