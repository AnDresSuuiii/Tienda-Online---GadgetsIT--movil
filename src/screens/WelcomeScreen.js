import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/spla.png")} style={styles.image} />
      {/* Muestra una imagen de fondo que ocupa toda la pantalla */}

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}>
        {/* Botón que permite navegar a la pantalla de Login al ser presionado */}
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
    flex: 1,  // Toma todo el espacio disponible
    justifyContent: 'center',  // Centra los elementos verticalmente
    alignItems: 'center',  // Centra los elementos horizontalmente
  },
  image: {
    width: '100%',  // Ocupa el 100% del ancho de su contenedor
    height: '100%',  // Ocupa el 100% del alto de su contenedor
    position: 'absolute',  // Se posiciona de forma absoluta para ser el fondo
  },
  button: {
    backgroundColor: "#ffffff",  // Fondo blanco para el botón
    zIndex: 1,  // Asegura que el botón esté por encima de la imagen
    position: 'absolute',  // Posiciona el botón de forma absoluta
    bottom: 80,  // Posiciona el botón a 80 píxeles del borde inferior
    paddingHorizontal: 20,  // Espaciado horizontal interno
    paddingVertical: 15,  // Espaciado vertical interno
    borderRadius: 18,  // Bordes redondeados
    width: '80%',  // Ancho del 80% del contenedor
    justifyContent: 'center',  // Centra el texto verticalmente dentro del botón
    alignItems: 'center',  // Centra el texto horizontalmente dentro del botón
    elevation: 3,  // Añade sombra en Android
    shadowColor: '#000',  // Color de sombra para iOS
    shadowOffset: { width: 0, height: 2 },  // Offset de la sombra para iOS
    shadowOpacity: 0.1,  // Opacidad de la sombra para iOS
    shadowRadius: 2,  // Radio de la sombra para iOS
  },
  buttonText: {
    color: 'black',  // Color del texto
    fontSize: 20,  // Tamaño del texto
    textAlign: 'center',  // Alineación del texto al centro
  }
});
