// Carrito.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import CardItem from '../components/card_carrito';

const productos = [
    { id: '1', nombre: 'iPhone 14', precio: 180.00, imagen: require('../../assets/images/ps.png') },
    { id: '2', nombre: 'Series 9', precio: 200.00, imagen: require('../../assets/images/Image.png') },
    { id: '3', nombre: 'iPhone 11', precio: 350.00, imagen: require('../../assets/images/Image.png') },
    { id: '4', nombre: 'Series 9', precio: 200.00, imagen: require('../../assets/images/ps.png') },
];

const Carrito = () => {
    const [cantidades, setCantidades] = useState(productos.reduce((acc, producto) => {
        acc[producto.id] = 1;
        return acc;
    }, {}));

    const incrementar = (id) => {
        setCantidades({
            ...cantidades,
            [id]: cantidades[id] + 1,
        });
    };

    const decrementar = (id) => {
        setCantidades({
            ...cantidades,
            [id]: cantidades[id] > 1 ? cantidades[id] - 1 : 1,
        });
    };

    const total = productos.reduce((suma, producto) => suma + producto.precio * cantidades[producto.id], 0);

    return (
        <View style={styles.contenedor}>
            <Text style={styles.title}>Mi carriro</Text>

            <FlatList
                data={productos}
                renderItem={({ item }) => (
                    <CardItem
                        item={item}
                        cantidad={cantidades[item.id]}
                        incrementar={incrementar}
                        decrementar={decrementar}
                    />
                )}
                keyExtractor={(item) => item.id}
                ListFooterComponent={
                    <View style={styles.footer}>
                        <Text style={styles.total}>TOTAL: ${total.toFixed(2)}</Text>
                        <TouchableOpacity style={styles.botonFinalizar}>
                            <Text style={styles.botonFinalizarTexto}>Finalizar pedido</Text>
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
        top:20,
        marginBottom:50
    },
});

export default Carrito;
