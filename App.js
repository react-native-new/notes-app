import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import StartScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>              
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#0d0d0d'
                },
                headerTitleStyle: {
                    color: 'bisque',
                    fontSize: 16,
                    fontStyle: 'italic'
                }
            }}> 
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />           
                <Stack.Screen options={{headerShown: false}} name="Start" component={StartScreen} />
                <Stack.Screen options={{headerShown: true}} name="Home" component={HomeScreen} />
                <Stack.Screen options={{headerShown: true}} name="Add" component={AddScreen} />
            </Stack.Navigator>        
        </NavigationContainer>  
    );
}
