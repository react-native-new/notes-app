import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

export default function LoginScreen() {
    // Hooks:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Navigation:
    const navigation = useNavigation();

    // OnCreate:
    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace('Start');
            }
        })
    }, []);

    // SignUp:
    const handleSignUp = () => {
        console.log('signUp -> Start');
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log('signUp -> Response');
                const user = userCredentials.user;
                console.log('Registered in with: ', user.email);
            })
            .catch((error) => alert(error.message));
    };

    // SignIn:
    const handleSignIn = () => {
        console.log('signIn -> Start');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log('signIn -> Response');
                const user = userCredentials.user;
                console.log('Logged in with: ', user.email);
            })
            .catch((error) => alert(error.message));
    };

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/images/bg1.jpeg')} 
                resizeMode="cover" 
                style={styles.bgImage}
            >
                <Text style={styles.caption}>Персональні нотатки</Text>
                <KeyboardAvoidingView style={styles.loginPanel}>
                    <View style={styles.inputPanel}>
                        <TextInput
                            placeholder='Введіть свій E-Mail ...'
                            style={styles.inputField}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            placeholder='Введіть свій Пароль ...'
                            style={styles.inputField}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.buttonPanel}>
                        <TouchableOpacity
                            onPress={handleSignIn}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Вхід</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Реєстрація</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    caption: {
        textAlign: 'center',
        color: 'lightgreen',
        fontSize: 24,
        marginTop: 35
    },
    loginPanel: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    inputPanel: {
        width: '70%',
        marginTop: -100
    },
    inputField: {
        backgroundColor: 'lavenderblush',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 7
    },
    buttonPanel: {
        width: '50%',
        marginTop: 20
    },
    button: {
        backgroundColor: 'lightgreen',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 1
    },
    buttonOutline: {
        backgroundColor: 'lightskyblue',
        marginTop: 7,
        borderColor: 'navy',
        borderWidth: 1
    },
    buttonText: {
        color: 'red',
        fontSize: 14
    },
    buttonOutlineText: {
        color: 'navy',
        fontSize: 14
    }
});
