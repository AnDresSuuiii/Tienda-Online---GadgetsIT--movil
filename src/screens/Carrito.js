// Carrito.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import CardItem from '../components/card_carrito';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';


const Carrito = ({navigation}) => {

    const productos = dataDetalleCarrito

    const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);

    const ip = Constantes.IP;

    useFocusEffect(
        React.useCallback(() => {
            getDetalleCarrito();
        }, [])
    );

    const getDetalleCarrito = async () => {
        try {
            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/pedido.php?action=readDetail`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data, "Data desde getDetalleCarrito")
            if (data.status) {
                setDataDetalleCarrito(data.dataset);
            } else {
                console.log("No hay detalles del carrito disponibles")
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar las categorias');
        }
    };

    const finalizarPedido = async () => {
        try {
            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/pedido.php?action=finishOrder`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                Alert.alert("Se finalizó la compra correctamente")
                setDataDetalleCarrito([]);
                navigation.navigate("Login");
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.log(error);
            //Alert.alert('Error', 'Ocurrió un error al finalizar pedido');
        }
    };

    const getotal = async () => {
        
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

const styles = StyleSheet.create({
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


