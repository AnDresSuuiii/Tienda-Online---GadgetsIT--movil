import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderCard = ({ price, date, productName, productImage, quantity, onDetailPress }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.productName}>{date}</Text>
      </View>
      <View style={styles.cardBody}>
        <Ionicons name="cart-outline" size={24} color="white" />
        <Text style={styles.price}>${price}</Text>
        <TouchableOpacity 
          style={styles.detailButton} 
          onPress={() => setShowDetails(!showDetails)}
        >
          <Ionicons name={showDetails ? "chevron-up-outline" : "chevron-down-outline"} size={16} color="black" />
          <Text style={styles.detailButtonText}>{showDetails ? 'Ocultar detalles' : 'Ver detalle'}</Text>
        </TouchableOpacity>
      </View>
      {showDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Producto: {productName}</Text>
          <Text style={styles.detailText}>Cantidad: {quantity}</Text>
          <Text style={styles.detailText}>Precio total: ${price}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  detailButtonText: {
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailsContainer: {
    marginTop: 10,
    backgroundColor: '#2c2c2c',
    padding: 10,
    borderRadius: 8,
  },
  detailText: {
    color: 'white',
    fontSize: 14,
  },
});

export default OrderCard;
