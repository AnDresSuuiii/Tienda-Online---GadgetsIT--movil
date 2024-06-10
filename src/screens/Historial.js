import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import OrderCard from '../components/card_historial'; 

const Historial = () => {
  const orders = [
    { date: '20/08/23', price: '820.00' },
    { date: '20/08/23', price: '820.00' },
    { date: '20/08/23', price: '820.00' },
    { date: '20/08/23', price: '820.00' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de pedidos</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {orders.map((order, index) => (
          <OrderCard
            key={index}
            price={order.price}
            date={order.date}
            onDetailPress={() => console.log(`Detail for ${order.productName}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
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
});

export default Historial;
