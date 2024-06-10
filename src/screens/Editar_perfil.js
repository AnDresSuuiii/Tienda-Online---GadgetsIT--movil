import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Editar_perfil = ({
  profileName = "Jose Manolo",
  profileEmail = "jose_man@gamil.com",
  firstName = "Jose",
  lastName = "Manolo",
  phone = "7082-9693",
  onEditPress
}) => {
  const [editableProfileName, setEditableProfileName] = useState(profileName);
  const [editableProfileEmail, setEditableProfileEmail] = useState(profileEmail);
  const [editableFirstName, setEditableFirstName] = useState(firstName);
  const [editableLastName, setEditableLastName] = useState(lastName);
  const [editablePhone, setEditablePhone] = useState(phone);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Ionicons name="person-circle-outline" size={64} color="white" />
        <TextInput
          style={styles.profileName}
          value={editableProfileName}
          onChangeText={setEditableProfileName}
        />
        <TextInput
          style={styles.profileEmail}
          value={editableProfileEmail}
          onChangeText={setEditableProfileEmail}
        />
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="person-outline" size={24} color="black" />
          <TextInput
            style={styles.infoText}
            value={editableFirstName}
            onChangeText={setEditableFirstName}
          />
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="person-outline" size={24} color="black" />
          <TextInput
            style={styles.infoText}
            value={editableLastName}
            onChangeText={setEditableLastName}
          />
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={24} color="black" />
          <TextInput
            style={styles.infoText}
            value={editablePhone}
            onChangeText={setEditablePhone}
          />
        </View>
      </View>
      
      <TouchableOpacity style={styles.editButton} onPress={() => onEditPress(editableProfileName, editableProfileEmail, editableFirstName, editableLastName, editablePhone)}>
        <Ionicons name="create-outline" size={24} color="black" />
        <Text style={styles.editButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center'
  },
  profileEmail: {
    color: 'white',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '100%',
    textAlign: 'center'
  },
  infoContainer: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  editButtonText: {
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Editar_perfil;
