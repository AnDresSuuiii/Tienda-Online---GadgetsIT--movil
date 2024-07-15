import React, { useEffect, useState } from "react";
import {
  StyleSheet, SafeAreaView, TouchableOpacity, Image, View, Text, ScrollView, Alert
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";  // Componente de íconos
import Header from "../components/Header";  // Componente para el encabezado
import Search from "../components/Search";  // Componente para la búsqueda
import BrandCard from "../components/cards_productos";  // Componente de tarjetas de productos
import * as Constantes from '../utils/constantes';  // Importación de constantes

const ProductoDetalle = ({ route, navigation }) => {
    const [inputText, setInputText] = useState('');  // Estado para manejar el texto de entrada
    const { idProducto } = route.params;  // ID del producto obtenido de los parámetros de navegación
    const [producto, setProducto] = useState([]);  // Estado para almacenar los detalles del producto

    useEffect(() => {
        if (!idProducto) {
            console.error('idProducto no se pasó correctamente a Producto');
            return;
        }
        obtenerProducto();  // Función para obtener los detalles del producto
    }, [idProducto]);

    // Función para obtener los detalles del producto desde el servidor
    const obtenerProducto = async () => {
        const ip = Constantes.IP;
        let url = '';
        let formData = new FormData();

        url = `${ip}/Tienda-Online---GadgetsIT/api/services/public/producto.php?action=readOne`;
        formData.append('idProducto', idProducto);

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
                setProducto(data.dataset);
            } else {
                Alert.alert("Error", data.error || "No se encontró el producto para los filtros seleccionados");
            }
        } catch (error) {
            console.error('Error desde Catch:', error);
            Alert.alert("Error", "Ocurrió un error al conectar con el servidor");
        }
    };

    // Función para agregar el producto al carrito
    const agregarAlCarrito = async () => {
        try {
            const formData = new FormData();
            formData.append('idProducto', idProducto);
            formData.append('cantidadProducto', 1);  // Añade una cantidad fija para simplificar
    
            const response = await fetch(`${Constantes.IP}/Tienda-Online---GadgetsIT/api/services/public/pedido.php?action=createDetail`, {
                method: 'POST',
                body: formData,
            });
    
            const resultado = await response.json();
    
            if (resultado.status) {
                Alert.alert("Éxito", "Producto añadido al carrito");
            } else {
                Alert.alert("Error", resultado.error || "No se pudo añadir el producto al carrito");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo conectar al servidor");
        }
    };

    // Navegación al carrito de compras
    const handleIconPress = () => {
        navigation.navigate("Carrito");
    };

    // Función para volver a la pantalla anterior
    const handleBackPress = () => {
        navigation.goBack();
    };

    // Renderizado condicional si no hay producto
    if (!producto) {
        return (
            <View style={styles.center}>
                <Text style={styles.loading}>Cargando...</Text>
            </View>
        );
    }

    // Vista principal del componente
    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <SafeAreaView>
                    <Ionicons name="chevron-back" size={28} color="white" />
                </SafeAreaView>
            </TouchableOpacity>

            <View style={styles.productImageContainer}>
                <Image
                    source={{ uri: `${Constantes.IP}/Tienda-Online---GadgetsIT/api/images/productos/${producto.imagen_producto}` }}
                    style={styles.productImage}
                />
            </View>

            <ScrollView style={styles.productDetailsContainer} contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.productTitle}>{producto.nombre_producto}</Text>
                <Text style={styles.productSubtitle}>{"$" + producto.precio_producto}</Text>
                <Text style={styles.productDescription}>{producto.descripcion_producto}</Text>

                <TouchableOpacity style={styles.cartButton} onPress={agregarAlCarrito}>
                    <Ionicons name="cart" size={24} color="#333" />
                    <Text style={styles.cartButtonText}>Añadir al carrito</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Espacio para más detalles como opiniones */}
                <Text style={styles.reviewsTitle}>Opiniones</Text>
               
                <View style={styles.reviewContainer}>
                    <Text style={styles.reviewAuthor}>Robert Downey Jr.</Text>
                    <Ionicons name="heart-outline" size={16} color="white" />
                    <Text style={styles.reviewText}>
                        Me encantó la calidad del producto, y el precio súper bueno, lo único que no me gustó fue el precio un poco elevado...
                    </Text>
                </View>
                
            </ScrollView>
        </View>
    );
};

// Estilos para los componentes utilizados en ProductoDetalle
const styles = StyleSheet.create({
    // Definición de estilos...
});

export default ProductoDetalle;  // Exportación del componente para su uso en otros lugares
