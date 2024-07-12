import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import Search from '../components/Search';
import BrandCard from '../components/cards'; // Ensure this import is correctly pointing to your BrandCard component
import * as Constantes from '../utils/constantes';

const Categoria = ({ navigation }) => {
    const ip = Constantes.IP;
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = async () => {
        try {
            const response = await fetch(`${ip}/Tienda-Online---GadgetsIT/api/services/public/categoria.php?action=readAll`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                setCategorias(data.dataset);
            } else {
                console.error('Error al obtener categorías:', data.error);
                Alert.alert('Error', 'No se pudieron cargar las categorías');
            }
        } catch (error) {
            console.error('Error desde Catch:', error);
            Alert.alert('Error', 'Ocurrió un error al conectar con el servidor');
        }
    };

    const handleCardPress = (idCategoria) => {
        navigation.navigate("Productos", { idCategoria });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText="Hola, Andrés" headerIcon="shopping-cart" onIconPress={() => navigation.navigate("Carrito")} />
            <Search icon="search" placeholder="Apple Watch, Macbook Pro, ..." />
            <Text style={styles.title}>Categorías</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {categorias.map(categoria => (
                    <BrandCard
                        key={categoria.id_categoria} // Usa un identificador único
                        brandName={categoria.nombre_categoria}
                        brandLogo={{ uri: `${ip}${'/Tienda-Online---GadgetsIT/api/images/categorias/'}${categoria.imagen_categoria}` }}
                        onPress={() => handleCardPress(categoria.id_categoria)}
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

export default Categoria;
