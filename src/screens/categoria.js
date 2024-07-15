import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header'; // Importa el componente Header
import Search from '../components/Search'; // Importa el componente Search
import BrandCard from '../components/cards'; // Asegúrate de que esta importación apunta correctamente a tu componente BrandCard
import * as Constantes from '../utils/constantes'; // Importa constantes personalizadas

const Categoria = ({ navigation }) => {
    const ip = Constantes.IP; // Dirección IP almacenada en constantes
    const [categorias, setCategorias] = useState([]); // Estado para almacenar categorías

    useEffect(() => {
        getCategorias(); // Llama a getCategorias al montar el componente
    }, []);

    const getCategorias = async () => { // Función para obtener categorías desde la API
        try {
            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/categoria.php?action=readAll`, {
                method: 'GET'
            });
            const data = await response.json(); // Convierte la respuesta en JSON
            if (data.status) {
                setCategorias(data.dataset); // Actualiza el estado de categorías
            } else {
                console.error('Error al obtener categorías:', data.error);
                Alert.alert('Error', 'No se pudieron cargar las categorías'); // Muestra una alerta si hay un error
            }
        } catch (error) {
            console.error('Error desde Catch:', error); // Captura y muestra errores de conexión
            Alert.alert('Error', 'Ocurrió un error al conectar con el servidor');
        }
    };

    const handleCardPress = (idCategoria) => { // Función para manejar el evento de presionar una tarjeta
        navigation.navigate("Productos", { idCategoria }); // Navega a la pantalla de Productos con el id de la categoría
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText="Hola, Andrés" headerIcon="shopping-cart" onIconPress={() => navigation.navigate("Carrito")} />
            <Search icon="search" placeholder="Apple Watch, Macbook Pro, ..." />
            <Text style={styles.title}>Categorías</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {categorias.map(categoria => (
                    <BrandCard
                        key={categoria.id_categoria} // Usa un identificador único para cada tarjeta
                        brandName={categoria.nombre_categoria}
                        brandLogo={{ uri: `${ip}${'/Tienda-Online---GadgetsIT/api/images/categorias/'}${categoria.imagen_categoria}` }}
                        onPress={() => handleCardPress(categoria.id_categoria)} // Maneja el evento de presionar con la función
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({ // Estilos para los componentes de React Native
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

export default Categoria; // Exporta el componente Categoria
