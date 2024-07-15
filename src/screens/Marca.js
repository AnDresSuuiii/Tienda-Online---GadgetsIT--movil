import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView, Alert } from "react-native";
import Header from "../components/Header"; // Componente personalizado para el encabezado
import Search from "../components/Search"; // Componente personalizado para la búsqueda
import BrandCard from "../components/cards"; // Componente personalizado para las tarjetas de marcas
import * as Constantes from '../utils/constantes'; // Constantes, típicamente para configuraciones globales como la dirección IP

const Marca = ({ navigation }) => {
    const ip = Constantes.IP; // Dirección IP del servidor
    const [marcas, setMarcas] = useState([]); // Estado para almacenar las marcas obtenidas de la API

    // Efecto para cargar las marcas al montar el componente
    useEffect(() => {
        getMarcas();
    }, []);

    // Función para obtener marcas desde el servidor
    const getMarcas = async () => {
        try {
            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/marca.php?action=readAll`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                setMarcas(data.dataset); // Actualiza el estado de marcas si la petición es exitosa
            } else {
                console.error('Error al obtener marcas:', data.error);
                Alert.alert('Error', 'No se pudieron cargar las marcas');
            }
        } catch (error) {
            console.error('Error desde Catch:', error);
            Alert.alert('Error', 'Ocurrió un error al conectar con el servidor');
        }
    };

    // Función para manejar la selección de una marca
    const handleCardPress = (idMarca) => {
        navigation.navigate("Productos", { idMarca }); // Navega a la pantalla de productos asociados a la marca
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText="Hola, Andrés" headerIcon="shopping-cart" onIconPress={() => navigation.navigate("Carrito")} />
            <Search icon="search" placeholder="Apple Watch, Macbook Pro, ..." />
            <Text style={styles.title}>Marcas</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {marcas.map(marca => (
                    <BrandCard
                        key={marca.id_marca} // Asegura que cada tarjeta tenga una clave única
                        brandName={marca.nombre_marca}
                        brandLogo={{ uri: `${ip}${'/Tienda-Online---GadgetsIT/api/images/marcas/'}${marca.imagen_marca}` }}
                        onPress={() => handleCardPress(marca.id_marca)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

// Estilos para los componentes usados en Marca
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

export default Marca; // Exporta el componente para su uso en otros lugares de la aplicación
