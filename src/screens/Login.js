import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation,
    titleText = "GADGETSIT",
    subtitleText = "Iniciar sesión",
    emailPlaceholder = "Correo",
    passwordPlaceholder = "Contraseña",
    continueButtonText = "Continuar", 
    forgotPasswordText = "¿Olvidaste tu contraseña?", 
    createAccountText = "¿No tienes cuenta? Crear cuenta",   }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
    
        navigation.navigate('');
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
            <Text style={styles.forgotPassword}>{forgotPasswordText}</Text>
            <Text style={styles.createAccount}>{createAccountText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#444',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#fff',
        marginBottom: 25,
    },
    continueButton: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 10,
    },
    continueButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    forgotPassword: {
        color: '#fff',
        marginBottom: 10,
    },
    createAccount: {
        color: '#fff',
    },
});

export default Login;
