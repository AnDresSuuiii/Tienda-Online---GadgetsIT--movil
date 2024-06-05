import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const BrandCard = ({ brandName, brandLogo }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={brandLogo} style={styles.logo} />
      </View>
      <Text style={styles.text}>{brandName}</Text>
      <Text style={styles.link}>Ver producto</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    margin: 10,
    width: 280, // Ajusta el tamaño de la card según tus necesidades
  },
  imageContainer: {
    width: '100%',
    height: 180, // Altura fija para la imagen
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    color: 'gray',
    fontSize: 14,
  },
});

export default BrandCard;
