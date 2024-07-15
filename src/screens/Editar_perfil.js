import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Constantes from '../utils/constantes';

const Editar_perfil = () => {
  const ip = Constantes.IP;
  const [user, setUser] = useState({});

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dui, setDui] = useState('');
  const [direccion, setDireccion] = useState('');
  const [nacimiento, setNacimiento] = useState('');

  useEffect(() => {
    handlegetUser();
  }, []);

  useEffect(() => {
    if (user) {
      setNombre(user.nombre_cliente);
      setApellido(user.apellido_cliente);
      setEmail(user.correo_cliente);
      setTelefono(user.telefono_cliente);
      setDui(user.dui_cliente);
      setDireccion(user.direccion_cliente);
      setNacimiento(user.nacimiento_cliente);
    }
  }, [user]);

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

  const handleUpdate = async () => {
    if (!nombre || !apellido || !email || !telefono || !direccion || !dui || !nacimiento) {
      Alert.alert("Por favor, complete todos los campos");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombreCliente', nombre);
      formData.append('apellidoCliente', apellido);
      formData.append('correoCliente', email);
      formData.append('direccionCliente', direccion);
      formData.append('duiCliente', dui);
      formData.append('nacimientoCliente', nacimiento);
      formData.append('telefonoCliente', telefono);

      const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/cliente.php?action=editProfile`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert("Datos actualizados con exito");
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      console.error("Error al actualizar", error);
      Alert.alert("Error", "Ocurrió un error al actualizar");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/GADGETSIT.png')}
          style={styles.profileImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <TextInput
            id="nombre"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Primer nombre"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Apellido"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Teléfono"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="card-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            value={dui}
            onChangeText={setDui}
            placeholder="DUI"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="home-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
            placeholder="Dirección"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="calendar-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            value={nacimiento}
            onChangeText={setNacimiento}
            placeholder="Fecha de nacimiento"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleUpdate}>
        <Ionicons name="create-outline" size={24} color="#000" />
        <Text style={styles.editButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileImage: {
    width: '100%', // Cambiar el ancho al 100% para asegurarse de que se vea la imagen completa
    height: 200, // Aumentar la altura para hacer la imagen más visible
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: -30,
    width: '100%', // Asegurarse de que el contenedor ocupe todo el ancho disponible
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    color: '#E0E0E0',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    marginVertical: 5,
  },
  infoContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  editButtonText: {
    marginLeft: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E32800',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
  },
  logoutButtonText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Editar_perfil;
