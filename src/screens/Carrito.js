// Carrito.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import CardItem from '../components/card_carrito'; // Importar componente de tarjeta de carrito
import Constants from 'expo-constants'; // Importar constantes de Expo
import * as Constantes from '../utils/constantes'; // Importar constantes personalizadas
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect de React Navigation


const Carrito = ({navigation}) => {

    const productos = dataDetalleCarrito // Variable para almacenar detalles del carrito

    const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]); // Estado para los detalles del carrito

    const ip = Constantes.IP; // Dirección IP desde constantes

    useFocusEffect(
        React.useCallback(() => { // Efecto que se activa al enfocar la pantalla
            getDetalleCarrito(); // Función para obtener detalles del carrito
        }, [])
    );

    const getDetalleCarrito = async () => { // Función para obtener los detalles del carrito de la API
        try {
            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/pedido.php?action=readDetail`, {
                method: 'GET',
            });
            const data = await response.json(); // Obtener datos en formato JSON
            console.log(data, "Data desde getDetalleCarrito")
            if (data.status) {
                setDataDetalleCarrito(data.dataset); // Actualizar el estado con los datos obtenidos
            } else {
                console.log("No hay detalles del carrito disponibles")
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar las categorias'); // Mostrar alerta de error
        }
    };

    const finalizarPedido = async () => { // Función para finalizar el pedido
        try {
            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/pedido.php?action=finishOrder`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                Alert.alert("Se finalizó la compra correctamente")
                setDataDetalleCarrito([]); // Limpiar el carrito
                navigation.navigate("Login"); // Navegar a la pantalla de Login
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.log(error);
            //Alert.alert('Error', 'Ocurrió un error al finalizar pedido');
        }
    };

    const getotal = async () => { // Función para obtener el total (pendiente de implementar)
        
    };

    return (
        <View style={styles.contenedor}>
            <Text style={styles.title}>Mi Carrito</Text>

            <FlatList
                data={dataDetalleCarrito}
                renderItem={({ item }) => (
                    <CardItem
                        item={item}
                        updateDataDetalleCarrito={setDataDetalleCarrito}
                        updatedetail={getDetalleCarrito}
                    />
                )}
                keyExtractor={(item, index) => `item-${index}`} 
                ListFooterComponent={
                    <View style={styles.footer}>
                        <Text style={styles.total}>TOTAL: </Text>
                        <TouchableOpacity style={styles.botonFinalizar} onPress={() => finalizarPedido()}>
                            <Text style={styles.botonFinalizarTexto} >Finalizar pedido</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({ // Estilos para los componentes de React Native
    contenedor: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        padding: 10,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    total: {
        color: '#ffffff',
        fontSize: 18,
        marginBottom: 10,
    },
    botonFinalizar: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    botonFinalizarTexto: {
        color: '#000000',
        fontSize: 16,
    },
    title: {
        color: "white",
        fontSize: 25,
        letterSpacing: 0.5,
        fontWeight: 'bold',
        marginVertical: 16,
        top: 20,
        marginBottom: 50
    },
});

export default Carrito;
