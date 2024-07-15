import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Constantes from '../utils/constantes';

const Editar_perfil = () => {


  const ip = Constantes.IP;

  const [user, setUser] = useState([]);

  useEffect(() => {
    handlegetUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {

      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  const handlegetUser = async () => {
    try {
      const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/cliente.php?action=readProfile`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setUser(data.dataset);
      } else {
        console.error('Error al obtener usuario:', data.error);
        Alert.alert('Error', 'No se pudo cargar el usuario');
      }
    } catch (error) {
      console.error('Error desde Catch:', error);
      Alert.alert('Error', 'Ocurrió un error al conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/GADGETSIT.png')}
          style={styles.profileImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="#E0E0E0" />
          <TextInput
            style={styles.input}
            value={user.nombre_cliente}
            placeholder="Primer nombre"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="#E0E0E0" />
          <TextInput
            style={styles.input}
            value={user.apellido_cliente}
            placeholder="Apellido"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#E0E0E0" />
          <TextInput
            style={styles.input}
            value={user.correo_cliente}
            placeholder="Correo electrónico"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={24} color="#E0E0E0" />
          <TextInput
            style={styles.input}
            value={user.telefono_cliente}
            placeholder="Teléfono"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="card-outline" size={24} color="#E0E0E0" />
          <TextInput
            style={styles.input}
            value={user.dui_cliente}
            placeholder="DUI"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="home-outline" size={24} color="#E0E0E0" />
          <TextInput
            style={styles.input}
            value={user.direccion_cliente}
            placeholder="Dirección"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="calendar-outline" size={24} color="#E0E0E0" />
          <TextInput
            style={styles.input}
            value={user.nacimiento_cliente}
            placeholder="Fecha de nacimiento"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEditPress(editableProfileEmail, editableFirstName, editableLastName, editablePhone, editableDUI, editableAddress, editableBirthDate)}>
          <Ionicons name="create-outline" size={24} color="#E0E0E0" />
          <Text style={styles.editButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#E0E0E0" />
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: 100,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 0,
    width: '80%',
    paddingVertical: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#333',
    color: '#E0E0E0',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    marginVertical: 8,
    borderWidth: 0,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 20,
  },
  infoContainer: {
    width: '100%',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 25,
    padding: 15,
    marginTop: 20,
  },
  editButtonText: {
    marginLeft: 10,
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E32800',
    borderRadius: 25,
    padding: 15,
    marginTop: 20,
    marginLeft: 20,
  },
  logoutButtonText: {
    marginLeft: 10,
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Editar_perfil;
