import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import WelcomeScreen from "../screens/WelcomeScreen";
import Marca from "../screens/Marca";
import Categoria from "../screens/categoria";
import Productos from "../screens/productos";
import ProductoDetalle from "../screens/poroducto_detalle";
import Carrito from "../screens/Carrito";
import Login from "../screens/Login";
import Crear_cuenta from "../screens/Crear_cuenta";
import Recuperacion_correo from "../screens/Recuperacion_correo";
import Recuperacion_codigo from "../screens/Recuperacion_codigo";
import Recuperacion_contraseña from "../screens/Recuperacion_contraseña";
import Editar_perfil from "../screens/Editar_perfil";
import Historial from "../screens/Historial";

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
                    } else if (route.name === "Perfil") {
                        iconName = "person-outline";
                    } else if (route.name === "Historial") {
                        iconName = "clipboard-outline";
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
            <Tab.Screen
                name="Perfil"
                component={Editar_perfil}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Historial"
                component={Historial}
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
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Crear_cuenta" component={Crear_cuenta} />
                <Stack.Screen name="Recuperacion_correo" component={Recuperacion_correo} />
                <Stack.Screen name="Recuperacion_codigo" component={Recuperacion_codigo} />
                <Stack.Screen name="Recuperacion_contraseña" component={Recuperacion_contraseña} />
                <Stack.Screen name="Marca" component={Marca} />
                <Stack.Screen name="Categoria" component={Categoria} />
                <Stack.Screen name="Productos" component={Productos} />
                <Stack.Screen name="ProductoDetalle" component={ProductoDetalle} />
                <Stack.Screen name="Carrito" component={Carrito} />
                <Stack.Screen name="Editar_perfil" component={Editar_perfil} />
                <Stack.Screen name="Historial" component={Historial} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({});
