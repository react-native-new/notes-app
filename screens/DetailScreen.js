import React, { useState } from 'react';
import { 
    StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, 
    TouchableOpacity, Keyboard, TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function DetailScreen({route}) {
    // 1
    const navigation = useNavigation();
    const [noteText, setNoteText] = useState(route.params.item.note);
    const [noteTitle, setNoteTitle] = useState(route.params.item.title);

    // 2
    const handleUpdate = async () => {
        console.log('updateNote -> Start');
        const targetNote = doc(db, 'notes', route.params.item.id);
        await updateDoc(targetNote, {
            title: noteTitle,
            note: noteText
        }).then(() => {
            console.log(`targetNote with ID: ${targetNote.id} \nhas been updated successfully!`);
            Keyboard.dismiss();
            alert('Нотатка успішно оновлена');
            navigation.replace('Home');
        }).catch((error) => {
            alert('Помилка редагування нотатки: ', error.message);
        });
    };

    // 3
    const handleDelete = async () => {
        console.log('deleteNote -> Start');
        let yes = confirm(`Ви підтверджуєте видалення нотатки: \n<${noteTitle}>?`);
        if (yes) {
            const targetNote = doc(db, 'notes', route.params.item.id);
            await deleteDoc(targetNote)
                .then(() => {
                    console.log(`targetNote with ID: ${route.params.item.id} \nhas been deleted successfully!`);
                    Keyboard.dismiss();
                    alert('Нотатка успішно видалена');
                    navigation.replace('Home');
                }).catch((error) => {
                    alert('Помилка видалення нотатки: ', error.message);
                });
        } else {
            alert(`Видалення нотатки: <${noteTitle}> - відмінено!`);
        }
    };

    // #
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/images/bg1.jpeg')} 
                resizeMode="cover" 
                style={styles.bgImage}
            >
                <KeyboardAvoidingView style={styles.editPanel}>                    
                    <View style={styles.inputPanel}>
                        <TextInput
                            placeholder='Введіть заголовок нотатки'
                            style={styles.inputField}
                            value={noteTitle}
                            onChangeText={(text) => setNoteTitle(text)}
                            multiline
                            numberOfLines={4}
                        />
                        <TextInput
                            placeholder='Введіть текст нотатки'
                            style={styles.inputField}
                            value={noteText}
                            onChangeText={(text) => setNoteText(text)}
                            multiline
                            numberOfLines={10}
                        />
                    </View>
                    <View style={styles.buttonPanel}>                        
                        <TouchableOpacity
                            onPress={handleUpdate}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Оновити нотатку</Text>                            
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleDelete}
                            style={[styles.button, styles.deleteButton]}
                        >
                            <Text style={styles.deleteButtonText}>Видалити нотатку</Text>
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
    editPanel: {
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
    deleteButton: {
        backgroundColor: 'lightskyblue',
        marginTop: 7
    },
    buttonText: {
        color: 'red',
        fontSize: 14
    },    
    deleteButtonText: {
        color: 'purple',
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