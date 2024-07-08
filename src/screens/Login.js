import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Constantes from '../utils/constantes'

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const ip = Constantes.IP;

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
                // Si el inicio de sesión es exitoso
                Alert.alert('Exito', 'Inicio de sesión exitoso');
                navigation.navigate('RecipeListTab'); // Asegúrate de cambiar 'RecipeListTab' al destino correcto
            } else {
                // Si hay algún problema con el inicio de sesión
                Alert.alert('Error de sesión', data.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };

    const createAccount = () => {
        navigation.navigate('Crear_cuenta');
    };

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
