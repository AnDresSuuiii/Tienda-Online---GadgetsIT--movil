import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Recuperacion_correo = ({
    navigation,
    titleText = "GADGETSIT",
    subtitleText = "Recuperar cuenta",
    emailPlaceholder = "Correo",
    continueButtonText = "Enviar",
}) => {
    const [email, setEmail] = useState('');

    const sendGridAPIKey = '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'; // Reemplaza con tu API Key de SendGrid

    const generateCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const sendCodeToEmail = async (email, code) => {
        const url = 'https://api.sendgrid.com/v3/mail/send';

        const emailData = {
            personalizations: [
                {
                    to: [{ email: email }],
                    subject: 'Código de recuperación de contraseña',
                },
            ],
            from: { email: 'ari.fortest@gmail.com' }, // Reemplaza con tu dirección de correo
            content: [{ type: 'text/plain', value: `Tu código de verificación es: ${code}` }],
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sendGridAPIKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                Alert.alert("Código enviado", `Se ha enviado un código de recuperación al correo: ${email} ${code}`);
            } else {
                const errorText = await response.text();
                console.error("Error enviando el correo:", errorText);
                Alert.alert("Error", "No se pudo enviar el correo. Inténtalo nuevamente.");
            }
        } catch (error) {
            console.error("Error enviando el correo:", error);
            Alert.alert("Error", "No se pudo enviar el correo. Inténtalo nuevamente.");
        }
    };

    const handleRecover = () => {
        if (email) {
            const code = generateCode();
            sendCodeToEmail(email, code);
            navigation.navigate('Recuperacion_codigo', { verificationCode: code, email: email });
        } else {
            Alert.alert("Campo vacío", "Por favor, ingresa tu correo electrónico.");
        }
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

export default Recuperacion_correo;
