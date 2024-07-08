import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView, Alert } from "react-native";
import Header from "../components/Header";
import Search from "../components/Search";
import BrandCard from "../components/cards_productos";
import * as Constantes from '../utils/constantes';

const Productos = ({ route, navigation }) => {
    const { idMarca, idCategoria } = route.params;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductos(idMarca, idCategoria);
    }, [idMarca, idCategoria]);

    const obtenerProductos = async (idMarca, idCategoria) => {
        const ip = Constantes.IP;
        try {
            let url = `${ip}/Tienda-Online---GadgetsIT/api/services/public/producto.php?action=readProductos`;
            if (idMarca) url += `&idMarca=${idMarca}`;
            if (idCategoria) url += `&idCategoria=${idCategoria}`;

            const response = await fetch(url);
            const data = await response.json();
            if (data.status) {
                setProductos(data.dataset);
            } else {
                Alert.alert("Error", "No se encontraron productos");
            }
        } catch (error) {
            console.error('Error desde Catch:', error);
            Alert.alert("Error", "Ocurrió un error al conectar con el servidor");
        }
    };

    const handleCardPress = (idProducto) => {
        navigation.navigate("ProductoDetalle", { idProducto });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText="Hola, Andrés" headerIcon="shopping-cart" onIconPress={() => navigation.navigate("Carrito")} />
            <Search icon="search" placeholder="Apple Watch, Macbook Pro, ..." />
            <Text style={styles.title}>Productos</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {productos.map((producto) => (
                    <BrandCard
                        key={producto.id}
                        brandName={producto.nombre}
                        brandLogo={{ uri: `${Constantes.IP}/images/productos/${producto.imagen}` }}
                        onPress={() => handleCardPress(producto.id)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151515",
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        color: "white",
        fontSize: 22,
        letterSpacing: 0.5,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});

export default Productos;
