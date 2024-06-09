import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import WelcomeScreen from "../screens/WelcomeScreen";
import Marca from "../screens/Marca";
import Categoria from "../screens/Categoria";
import Productos from "../screens/Productos"; 
import ProductoDetalle from "../screens/Poroducto_detalle"; 

import Carrito from "../screens/Carrito"; 
import Login from "../screens/Login"; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const RecipeListTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Marca") {
            iconName = "home-outline";
          } else if (route.name === "Categoria") {
            iconName = "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black',
        },
      })}
    >
      <Tab.Screen 
        name="Marca" 
        component={Marca} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Categoria" 
        component={Categoria} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeListTab" component={RecipeListTabNavigator} />
        <Stack.Screen name="Marca" component={Marca} />
        <Stack.Screen name="Categoria" component={Categoria} />
        <Stack.Screen name="Productos" component={Productos} />
        <Stack.Screen name="ProductoDetalle" component={ProductoDetalle} />
        <Stack.Screen name="Carrito" component={Carrito} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});