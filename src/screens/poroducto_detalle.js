import React, {useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, View, Text, ScrollView, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import Search from "../components/Search";
import BrandCard from "../components/cards_productos";
import * as Constantes from '../utils/constantes';


const ProductoDetalle = ({ route, navigation }) => {
    const [inputText, setInputText] = useState('');
    const { idProducto } = route.params;
    const [producto, setProducto] = useState([]);

    useEffect(() => {
        if (!idProducto) {
            console.error('idProducto no se pasó correctamente a Producto');
            return;
        }
        obtenerProducto();
    }, [idProducto]);

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

    const agregarAlCarrito = async () => {
        try {
            const formData = new FormData();
            formData.append('idProducto', idProducto);
            formData.append('cantidadProducto', 1); 
    
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
    

    const handleIconPress = () => {
        navigation.navigate("Carrito");
    };


    const handleBackPress = () => {
        navigation.goBack();
    };

    if (!producto) {
        return (
            <View style={styles.center}>
                <Text style={styles.loading}>Cargando...</Text>
            </View>
        );
    }

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

                {/* Aquí pueden ir más detalles como opiniones y demás */}
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

const styles = StyleSheet.create({

    root: {
        backgroundColor: "#151515",
        flex: 1
    },
    backButton: {
        marginTop: 30,
        marginLeft: 20,
    },
    container: {
        flexDirection: "row",
    },
    productImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: -20,
        zIndex: 1
    },
    productImage: {
        height: 300,
        width: 300,
        resizeMode: "contain",
    },
    productDetailsContainer: {
        backgroundColor: "#333",
        flex: 1,
        marginTop: -55,
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        paddingHorizontal: 20,
        zIndex: 0
    },
    scrollViewContent: {
        paddingVertical: 20,
    },
    productTitle: {
        fontSize: 28,
        color: "white",
        fontWeight: "bold",
        paddingTop: 60,
    },
    productSubtitle: {
        fontSize: 24,
        color: "white",
        marginBottom: 10,
        paddingTop: 10,
    },
    productDescription: {
        fontSize: 16,
        color: "white",
        marginBottom: 20,
        paddingTop: 10,
    },
    reviewsTitle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
    },
    reviewContainer: {
        backgroundColor: "#444",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    reviewAuthor: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
    reviewText: {
        fontSize: 14,
        color: "white",
        marginTop: 4,
    },
    divider: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    inputTitle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#555",
        color: "white",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    cartButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 8,
        paddingVertical: 10,
        marginBottom: 20,
    },
    cartButtonText: {
        fontSize: 16,
        color: "#333",
        marginLeft: 10,
    },

});

export default ProductoDetalle;
