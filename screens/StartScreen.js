import { 
    StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function StartScreen() {
    // 1
    const navigation = useNavigation();
    
    // 2
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace('Login');
            })
            .catch((error) => alert(error.message));
    };

    // 3
    const handleStart = () => {
        navigation.navigate('Home');
    }

    // #
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/images/bg1.jpeg')} 
                resizeMode="cover" 
                style={styles.bgImage}
            >
                <Text style={styles.caption}>Персональні нотатки</Text>
                <KeyboardAvoidingView style={styles.startPanel}>
                    <Text style={styles.email}>
                        Hi, {auth.currentUser?.email}!
                    </Text>
                    <View style={styles.buttonPanel}>
                        <TouchableOpacity
                            onPress={handleStart}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Розпочати</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSignOut}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Завершити</Text>
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
    startPanel: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },    
    buttonPanel: {
        width: '50%',
        marginTop: 30
    },
    button: {
        backgroundColor: 'bisque',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'teal',
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
    },
    email: {
        color: 'gold',
        fontSize: 16,
        marginTop: -100
    }
});