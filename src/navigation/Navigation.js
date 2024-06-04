
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import pantalla1 from './screens/pantalla1';
import pantalla2 from './screens/pantalla2';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>


                <Tab.Screen name="perfil" component={pantalla1} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }} />

                <Tab.Screen name="comidas" component={pantalla2} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}