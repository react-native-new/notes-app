import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, 
    TouchableOpacity, Keyboard, TextInput
} from 'react-native';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function AddScreen() {
    // 1
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const navigation = useNavigation();

    // 2
    const handleAdd = async () => {
        const queryCollection = collection(db, 'notes');
        await addDoc(queryCollection, {
            title: title,
            note: note
        }).then((newDoc) => {
            console.log('newDoc added with ID: ', newDoc.id);
            setTitle('');
            setNote('');
            // ->
            Keyboard.dismiss();
            alert('Нотатка успішно збережена');
            navigation.replace('Home');
        }).catch((error) => {
            alert(error.message);
        });        
    }

    // #
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/images/bg1.jpeg')} 
                resizeMode="cover" 
                style={styles.bgImage}
            >
                <KeyboardAvoidingView style={styles.addPanel}>                    
                    <View style={styles.inputPanel}>
                        <TextInput
                            placeholder='Введіть заголовок нотатки'
                            style={styles.inputField}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                            multiline
                            numberOfLines={4}
                        />
                        <TextInput
                            placeholder='Введіть текст нотатки'
                            style={styles.inputField}
                            value={note}
                            onChangeText={(text) => setNote(text)}
                            multiline
                            numberOfLines={10}
                        />
                    </View>
                    <View style={styles.buttonPanel}>                        
                        <TouchableOpacity
                            onPress={handleAdd}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Зберегти нотатку</Text>                            
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
    addPanel: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },    
    buttonPanel: {
        width: '50%',
        marginTop: 15
    },
    button: {
        backgroundColor: 'lightgreen',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'teal',
        borderWidth: 1
    },    
    buttonText: {
        color: 'red',
        fontSize: 14
    },    
    inputPanel: {
        width: '80%',
        marginTop: 20
    },
    inputField: {
        backgroundColor: 'lavenderblush',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
});
