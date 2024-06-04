import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/spla.png")} style={styles.image} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Siguiente
        </Text>
      </TouchableOpacity>
    </View>
    
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  button: {
    backgroundColor: "#ffffff",
    zIndex: 1,
    position: 'absolute',
    bottom: 80,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 18,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,  // Añade sombra en Android
    shadowColor: '#000',  // Añade sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',  // Asegura que el texto esté siempre centrado
  }
});
