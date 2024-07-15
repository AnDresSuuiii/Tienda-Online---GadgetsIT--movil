import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView, Alert } from "react-native";
import Header from "../components/Header";
import Search from "../components/Search";
import BrandCard from "../components/cards"; 
import * as Constantes from '../utils/constantes';

const Marca = ({ navigation }) => {
    const ip = Constantes.IP;
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        getMarcas();
    }, []);

    const getMarcas = async () => {
        try {
            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/marca.php?action=readAll`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                setMarcas(data.dataset);
            } else {
                console.error('Error al obtener marcas:', data.error);
                Alert.alert('Error', 'No se pudieron cargar las marcas');
            }
        } catch (error) {
            console.error('Error desde Catch:', error);
            Alert.alert('Error', 'Ocurrió un error al conectar con el servidor');
        }
    };

    const handleCardPress = (idMarca) => {
        navigation.navigate("Productos", { idMarca });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText="Hola, Andrés" headerIcon="shopping-cart" onIconPress={() => navigation.navigate("Carrito")} />
            <Search icon="search" placeholder="Apple Watch, Macbook Pro, ..." />
            <Text style={styles.title}>Marcas</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {marcas.map(marca => (
                    <BrandCard
                        key={marca.id_marca} // Usa un identificador único
                        brandName={marca.nombre_marca}
                        brandLogo={{ uri: `${ip}${'/Tienda-Online---GadgetsIT/api/images/marcas/'}${marca.imagen_marca}` }}
                        onPress={() => handleCardPress(marca.id_marca)}
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

export default Marca;
