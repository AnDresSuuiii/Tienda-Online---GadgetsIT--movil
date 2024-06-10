import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Recuperacion_contraseña = ({
    navigation,
    titleText = "GADGETSIT",
    subtitleText = "Recuperar cuenta",
    passwordPlaceholder = "Nueva contraseña",
    continueButtonText = "Enviar",
}) => {
    const [email, setEmail] = useState('');

    const handleRecover = () => {
        // Lógica para recuperar la cuenta
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{titleText}</Text>
            <Text style={styles.subtitle}>{subtitleText}</Text>
            <TextInput
                style={styles.input}
                placeholder={passwordPlaceholder}
                placeholderTextColor="#777"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleRecover}>
                <Text style={styles.continueButtonText}>{continueButtonText}</Text>
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
        color: '#fff',
        fontSize: 36,
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
        backgroundColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 15,
        color: '#fff',
        marginBottom: 20,
        fontSize: 16,
    },
    continueButton: {
        backgroundColor: '#fff',
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
