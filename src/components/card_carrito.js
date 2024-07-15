// CardItem.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Constantes from '../utils/constantes';

const CardItem = ({ item, id_detalle, updateDataDetalleCarrito, updatedetail }) => {

  const ip = Constantes.IP;

  const handleDeleteDetalleCarrito = async (idDetalle) => {
    try {
      Alert.alert(
        'Confirmación',
        '¿Estás seguro de que deseas eliminar este elemento del carrito?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              const formData = new FormData();
              formData.append('idDetalle', idDetalle);
              const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/pedido.php?action=deleteDetail`, {
                method: 'POST',
                body: formData
              });
              const data = await response.json();
              if (data.status) {
                Alert.alert('Datos eliminados correctamente del carrito');
                updateDataDetalleCarrito(prevData => prevData.filter(item => item.id_detalle !== idDetalle));
              } else {
                Alert.alert('Error al eliminar del carrito', data.error);
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error al eliminar del carrito")
    }
  };

  const handleUpdateDetalleCarrito = async (idDetalle, cantidadProductoCarrito) => {
    try {
      const formData = new FormData();
      formData.append('idDetalle', idDetalle);
      formData.append('cantidadProducto', cantidadProductoCarrito);

      const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/pedido.php?action=updateDetail`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        updatedetail();
        Alert.alert('Se actualizó el detalle del producto');
      } else {
        Alert.alert('Error al editar detalle carrito', data.error);
      }
    } catch (error) {
      Alert.alert("Error en editar carrito", error.message);
    }
  };


  const handleUpdateplus = (idDetalle, cantidadProductoCarrito) => {
    let newQuantity = cantidadProductoCarrito + 1;
    handleUpdateDetalleCarrito(idDetalle, newQuantity);
  };

  const handleUpdateminus = (idDetalle, cantidadProductoCarrito) => {
    let newQuantity = Math.max(0, cantidadProductoCarrito - 1);  
    handleUpdateDetalleCarrito(idDetalle, newQuantity);
  };




  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: `${ip}/Tienda-Online---GadgetsIT/api/images/productos/${item.imagen_producto}` }}
        style={styles.imagen}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{item.nombre_producto}</Text>
        <Text style={styles.precio}>${item.precio_producto}</Text>
      </View>
      <View style={styles.cantidadContainer}>
        <TouchableOpacity style={styles.boton} onPress={() => handleUpdateminus(item.id_detalle, item.cantidad_producto)}>
          <Text style={styles.botonTexto}>-</Text>
        </TouchableOpacity>
        <Text style={styles.cantidad}>{item.cantidad_producto}</Text>
        <TouchableOpacity style={styles.boton} onPress={() => handleUpdateplus(item.id_detalle, item.cantidad_producto)}>
          <Text style={styles.botonTexto}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonEliminar} onPress={() => handleDeleteDetalleCarrito(item.id_detalle)}>
          <Text style={styles.botonTexto}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
