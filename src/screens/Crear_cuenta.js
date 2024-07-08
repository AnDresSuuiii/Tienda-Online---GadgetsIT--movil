import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';

const Crear_cuenta = ({
    navigation,
    titleText = "GADGETSIT",
    subtitleText = "Crear cuenta",
    firstNamePlaceholder = "Nombre",
    lastNamePlaceholder = "Apellido",
    emailPlaceholder = "Correo",
    phonePlaceholder = "Teléfono",
    passwordPlaceholder = "Contraseña",
    confirmpasswordPlaceholder = "Confirmar contraseña",
    addressPlaceholder = "Dirección",
    duiPlaceholder = "DUI",
    birthdayPlaceholder = "Fecha de Nacimiento",
    continueButtonText = "Registrarse",
}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [dui, setDui] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const ip = Constantes.IP;

    const handleRegister = async () => {
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);

        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !address || !dui) {
            Alert.alert("Por favor, complete todos los campos");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nombreCliente', firstName);
            formData.append('apellidoCliente', lastName);
            formData.append('correoCliente', email);
            formData.append('direccionCliente', address);
            formData.append('duiCliente', dui);
            formData.append('nacimientoCliente', `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`);
            formData.append('telefonoCliente', phone);
            formData.append('claveCliente', password);
            formData.append('confirmarClave', confirmPassword);

            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/cliente.php?action=signUpMovil`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert("Registro exitoso");
                navigation.navigate('Login');
            } else {
                Alert.alert("Error", data.error);
            }
        } catch (error) {
            console.error("Error al registrar", error);
            Alert.alert("Error", "Ocurrió un error al registrar");
        }
    };

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthday(selectedDate);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{titleText}</Text>
                <Text style={styles.subtitle}>{subtitleText}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={firstNamePlaceholder}
                    placeholderTextColor="#ccc"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder={lastNamePlaceholder}
                    placeholderTextColor="#ccc"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder={emailPlaceholder}
                    placeholderTextColor="#ccc"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder={phonePlaceholder}
                    placeholderTextColor="#ccc"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    style={styles.input}
                    placeholder={addressPlaceholder}
                    placeholderTextColor="#ccc"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder={duiPlaceholder}
                    placeholderTextColor="#ccc"
                    value={dui}
                    onChangeText={setDui}
                />
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                    <Text style={{ color: '#fff' }}>{birthday.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={birthday}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
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
                    placeholder={confirmpasswordPlaceholder}
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={styles.continueButton} onPress={handleRegister}>
                    <Text style={styles.continueButtonText}>{continueButtonText}</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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

export default Crear_cuenta;
