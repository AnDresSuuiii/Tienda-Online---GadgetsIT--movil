import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView, Alert } from "react-native";
import Header from "../components/Header";  // Componente para el encabezado
import Search from "../components/Search";  // Componente para la búsqueda
import BrandCard from "../components/cards_productos";  // Componente para tarjetas de productos
import * as Constantes from '../utils/constantes';  // Constantes para configuraciones

const Productos = ({ route, navigation }) => {
    const { idMarca, idCategoria } = route.params;  // Parámetros pasados a la pantalla
    const [productos, setProductos] = useState([]);  // Estado para almacenar los productos

    useEffect(() => {
        if (!idMarca && !idCategoria) {  // Verifica si los parámetros necesarios están presentes
            console.error('idMarca o idCategoria no se pasaron correctamente a Productos');
            return;
        }
        obtenerProductos();  // Llama a la función para obtener productos
    }, [idMarca, idCategoria]);

    const obtenerProductos = async () => {
        const ip = Constantes.IP;
        let url = '';
        let formData = new FormData();

        if (idMarca) {  // Configura la URL y los datos para filtrar por marca
            url = `${ip}/Tienda-Online---GadgetsIT/api/services/public/producto.php?action=readProductosMarca`;
            formData.append('idMarca', idMarca);
        } else if (idCategoria) {  // Configura la URL y los datos para filtrar por categoría
            url = `${ip}/Tienda-Online---GadgetsIT/api/services/public/producto.php?action=readProductosCategoria`;
            formData.append('idCategoria', idCategoria);
        } 

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const textResponse = await response.text();  // Obtiene respuesta en formato texto
            console.log('Respuesta del servidor:', textResponse);

            const cleanResponse = textResponse.replace(/^[^{[]*/, '');  // Limpia la respuesta para asegurar un JSON válido
            const data = JSON.parse(cleanResponse);  // Parsea la respuesta a objeto JSON

            if (data.status) {
                setProductos(data.dataset);  // Actualiza el estado con los productos obtenidos
            } else {
                Alert.alert("Error", data.error || "No se encontraron productos para los filtros seleccionados");
            }
        } catch (error) {
            console.error('Error desde Catch:', error);
            Alert.alert("Error", "Ocurrió un error al conectar con el servidor");
        }
    };

    const handleCardPress = (idProducto) => {
        navigation.navigate("ProductoDetalle", { idProducto });  // Navega a los detalles del producto seleccionado
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText="Hola, Andrés" headerIcon="shopping-cart" onIconPress={() => navigation.navigate("Carrito")} />
            <Search icon="search" placeholder="Apple Watch, Macbook Pro, ..." />
            <Text style={styles.title}>Productos</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {productos.map((producto) => (
                    <BrandCard
                        key={producto.id_producto}  // Clave única para cada producto
                        brandName={producto.nombre_producto}
                        brandLogo={{ uri: `${Constantes.IP}/Tienda-Online---GadgetsIT/api/images/productos/${producto.imagen_producto}` }}
                        onPress={() => handleCardPress(producto.id_producto)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({  // Estilos para los componentes utilizados
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

export default Productos;  // Exportación del componente para su uso en otros lugares de la aplicación
