import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';

export default function HomeScreen() {
    // 1
    let buff = [];
    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);    

    // 2
    const fetchNotes = async () => {        
        const queryCollection = collection(db, 'notes');
        const querySnapshot = await getDocs(queryCollection);
        // ->       
        querySnapshot.forEach((doc) => {
            const {note, title} = doc.data();
            buff.push({note, title, id: doc.id});
        });
    };
    
    // 3
    useEffect(() => {        
        fetchNotes().then(() => {
            setNotes(buff);
        });
    }, []);

    // 4
    const handleGoToAdd = () => {
        navigation.navigate('Add');        
    };

    // 5
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/images/bg1.jpeg')} 
                resizeMode="cover" 
                style={styles.bgImage}
            >
                <KeyboardAvoidingView style={styles.homePanel}>                    
                    <View style={styles.buttonPanel}>                        
                        <TouchableOpacity
                            onPress={handleGoToAdd}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Додати нотатку</Text>                            
                        </TouchableOpacity>
                    </View>
                    <View style={styles.notesList}>
                        <FlashList
                            data={notes}
                            numColumns={2}                                
                            estimatedItemSize={100}
                            style={styles.flashList}                               
                            renderItem={({item}) => (
                                <View style={styles.noteView}>
                                    <Text style={styles.noteTitle}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.noteContent}>
                                        {item.note}
                                    </Text>
                                </View>
                            )}
                        />
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
    homePanel: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },    
    buttonPanel: {
        width: '50%',
        marginTop: 15
    },
    button: {
        backgroundColor: 'bisque',
        padding: 7,
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
    buttonOutlineText: {
        color: 'navy',
        fontSize: 14
    },
    notesList: {
        flex: 1,
        padding: 15,
        width: '100%'
    },
    noteView: {
        flex: 1,
        backgroundColor: 'bisque',
        margin: 5,
        padding: 5,
        borderRadius: 5,        
        alignItems: 'center',
        boxShadow: '0px 2px 5px gold'
    },
    noteTitle: {
        color: 'purple',
        fontSize: 15,
        fontWeight: 'bold'
    },
    noteContent: {
        color: 'navy',
        paddingBottom: 5
    },
});
