import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Constantes from '../utils/constantes'; // Importación de constantes generales
import { useFocusEffect } from '@react-navigation/native'; // Importación para manejar el enfoque de la pantalla

const Login = ({
    navigation,
    titleText = "GADGETSIT",
    subtitleText = "Iniciar sesión",
    emailPlaceholder = "Correo",
    passwordPlaceholder = "Contraseña",
    continueButtonText = "Continuar",
    forgotPasswordText = "¿Olvidaste tu contraseña?",
    createAccountText = "¿No tienes cuenta? Crear cuenta"
}) => {
    const [email, setEmail] = useState(''); // Estado para el correo electrónico
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const ip = Constantes.IP; // Dirección IP de la API

    // Efecto que se activa al enfocar la pantalla
    useFocusEffect(
        React.useCallback(() => {
            validarSesion(); // Función para validar la sesión
        }, [])
    );

    // Función para validar si hay una sesión activa
    const validarSesion = async () => {
        try {
            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status === 1) {
                navigation.navigate('RecipeListTab'); // Navega a la lista de recetas si hay sesión
                console.log("Se ingresa con la sesión activa")
            } else {
                console.log("No hay sesión activa")
                return
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    }

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('correo', email);
            formData.append('clave', password);

            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/cliente.php?action=logIn`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                navigation.navigate('RecipeListTab'); // Navega a la lista de recetas si el inicio es exitoso
            } else {
                Alert.alert('Error de sesión', data.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };

    // Función para navegar a la pantalla de creación de cuenta
    const createAccount = () => {
        navigation.navigate('Crear_cuenta');
    };

    // Función para navegar a la pantalla de recuperación de contraseña
    const recoverPassword = () => {
        navigation.navigate('Recuperacion_correo');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{titleText}</Text>
            <Text style={styles.subtitle}>{subtitleText}</Text>
            <TextInput
                style={styles.input}
                placeholder={emailPlaceholder}
                placeholderTextColor="#777"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder={passwordPlaceholder}
                placeholderTextColor="#777"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
                <Text style={styles.continueButtonText}>{continueButtonText}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={recoverPassword}>
                <Text style={styles.forgotPassword}>{forgotPasswordText}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={createAccount}>
                <Text style={styles.createAccount}>{createAccountText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#ffff',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        color: '#ffff',
        fontSize: 20,
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 15,
        color: '#fff',
        marginBottom: 20,
        fontSize: 16,
    },
    continueButton: {
        backgroundColor: '#ffff',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 15,
    },
    continueButtonText: {
        color: '#1e1e1e',
        fontWeight: 'bold',
        fontSize: 18,
    },
    forgotPassword: {
        color: '#fff',
        marginBottom: 15,
        textDecorationLine: 'underline',
    },
    createAccount: {
        color: '#fff',
        textDecorationLine: 'underline',
    },
});

export default Login;
