import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import OrderCard from '../components/card_historial';
import * as Constantes from '../utils/constantes';

const Historial = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinishedOrders();
  }, []);

  const fetchFinishedOrders = async () => {
    try {
      const response = await fetch(`${Constantes.IP}/Tienda-Online---GadgetsIT/api/services/public/pedido.php?action=getFinishedOrders`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setOrders(data.dataset);
      } else {
        Alert.alert('Error', 'No se pudieron cargar los pedidos finalizados');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de pedidos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderCard
                key={index}
                price={order.total_pagado}
                date={order.fecha}
                productName={order.nombre_producto}
                productImage={order.imagen_producto}
                quantity={order.cantidad_producto}
              />
            ))
          ) : (
            <Text style={styles.noOrdersText}>No hay pedidos finalizados.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  noOrdersText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Historial;
