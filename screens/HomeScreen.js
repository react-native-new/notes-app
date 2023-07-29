import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <ImageBackground 
            source={require('../assets/images/bg1.jpeg')} 
            resizeMode="cover" 
            style={styles.bgImage}
        >
            <Text style={styles.caption}>Персональні нотатки</Text>
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
        fontSize: 21,
        marginTop: 35
    }
});