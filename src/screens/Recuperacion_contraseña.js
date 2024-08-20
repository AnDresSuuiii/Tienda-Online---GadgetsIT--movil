import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as Constantes from '../utils/constantes';

const Recuperacion_contraseña = ({
    navigation,
    route,
    titleText = "GADGETSIT",
    subtitleText = "Recuperar cuenta",
    passwordPlaceholder = "Nueva contraseña",
    confirmPasswordPlaceholder = "Confirmar contraseña",
    continueButtonText = "Cambiar contraseña",
}) => {
    const { email } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const ip = Constantes.IP;

    const handlePasswordChange = async () => {
        if (password.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('correo', email);
            formData.append('contrasenia_usuario', password);
            formData.append('confirmarClave', confirmPassword);

            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/admin/clientes.php?action=changePass`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert("Éxito", "Tu contraseña ha sido cambiada exitosamente.");
                navigation.navigate('Login');
            } else {
                Alert.alert("Error", data.error);
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña", error);
            Alert.alert("Error", "Ocurrió un error al cambiar la contraseña");
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>{titleText}</Text>
                <Text style={styles.subtitle}>{subtitleText}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={passwordPlaceholder}
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder={confirmPasswordPlaceholder}
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={styles.continueButton} onPress={handlePasswordChange}>
                    <Text style={styles.continueButtonText}>{continueButtonText}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
        padding: 20,
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
        marginTop: 15,
    },
    continueButtonText: {
        color: '#1e1e1e',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Recuperacion_contraseña;
