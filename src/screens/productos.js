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
        if (!idMarca && !idCategoria) {
            console.error('idMarca o idCategoria no se pasaron correctamente a Productos');
            return;
        }
        obtenerProductos();
    }, [idMarca, idCategoria]);

    const obtenerProductos = async () => {
        const ip = Constantes.IP;
        let url = '';
        let formData = new FormData();

        if (idMarca) {
            url = `${ip}/Tienda-Online---GadgetsIT/api/services/public/producto.php?action=readProductosMarca`;
            formData.append('idMarca', idMarca);
        } else if (idCategoria) {
            url = `${ip}/Tienda-Online---GadgetsIT/api/services/public/producto.php?action=readProductosCategoria`;
            formData.append('idCategoria', idCategoria);
        } 

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const textResponse = await response.text();
            console.log('Respuesta del servidor:', textResponse);

            const cleanResponse = textResponse.replace(/^[^{[]*/, '');
            const data = JSON.parse(cleanResponse);

            if (data.status) {
                setProductos(data.dataset);
            } else {
                Alert.alert("Error", data.error || "No se encontraron productos para los filtros seleccionados");
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
                        key={producto.id_producto}
                        brandName={producto.nombre_producto}
                        brandLogo={{ uri: `${Constantes.IP}/Tienda-Online---GadgetsIT/api/images/productos/${producto.imagen_producto}` }}
                        onPress={() => handleCardPress(producto.id_producto)}
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


