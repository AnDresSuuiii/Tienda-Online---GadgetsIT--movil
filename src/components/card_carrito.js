// CardItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CardItem = ({ item, cantidad, incrementar, decrementar }) => (
  <View style={styles.itemContainer}>

    
    <Image source={item.imagen} style={styles.imagen} />
    <View style={styles.infoContainer}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>
    </View>
    <View style={styles.cantidadContainer}>
      <TouchableOpacity style={styles.boton} onPress={() => decrementar(item.id)}>
        <Text style={styles.botonTexto}>-</Text>
      </TouchableOpacity>
      <Text style={styles.cantidad}>{cantidad}</Text>
      <TouchableOpacity style={styles.boton} onPress={() => incrementar(item.id)}>
        <Text style={styles.botonTexto}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonEliminar}>
        <Text style={styles.botonTexto}>🗑️</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#2c2c2c',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    color: '#ffffff',
    fontSize: 16,
  },
  precio: {
    color: '#888888',
    fontSize: 14,
  },
  cantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#444444',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  botonTexto: {
    color: '#ffffff',
  },
  cantidad: {
    color: '#ffffff',
  },
  botonEliminar: {
    backgroundColor: '#ff5555',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default CardItem;
