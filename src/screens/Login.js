import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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

    const handleLogin = () => {
        navigation.navigate('RecipeListTab');
    };

    const createAccount = () => {
        navigation.navigate('Crear_cuenta');
    };

    const Password = () => {
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

            <TouchableOpacity>
                <Text style={styles.forgotPassword} onPress={Password}>{forgotPasswordText}</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.createAccount} onPress={createAccount}>{createAccountText}</Text>
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
