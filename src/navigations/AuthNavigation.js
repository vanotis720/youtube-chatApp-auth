
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from '../screen/SigninScreen';
import SignupScreen from '../screen/SignupScreen';

const Stack = createNativeStackNavigator();


export default function AuthNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SigninScreen"
                component={SigninScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

