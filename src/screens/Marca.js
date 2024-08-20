import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView, Alert, ActivityIndicator, View } from "react-native";
import Header from "../components/Header";
import Search from "../components/Search";
import BrandCard from "../components/cards";
import * as Constantes from '../utils/constantes';

const Marca = ({ navigation }) => {
    const ip = Constantes.IP;
    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

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
                Alert.alert('Error', 'No se pudieron cargar las marcas');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const handleCardPress = (idMarca) => {
        navigation.navigate("Productos", { idMarca });
    };

    const filteredMarcas = marcas.filter(marca =>
        marca.nombre_marca.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                headerText="Hola, Bienvenido" 
                headerIcon="shopping-cart" 
                onIconPress={() => navigation.navigate("Carrito")} 
            />
            <Search 
                icon="search" 
                placeholder="Apple Watch, Macbook Pro, ..." 
                value={searchTerm}
                onChangeText={setSearchTerm}
                onClear={() => setSearchTerm('')}
            />
            <Text style={styles.title}>Marcas</Text>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.loadingText}>Cargando marcas...</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    {filteredMarcas.length > 0 ? (
                        filteredMarcas.map(marca => (
                            <BrandCard
                                key={marca.id_marca}
                                brandName={marca.nombre_marca}
                                brandLogo={{ uri: `${ip}${'/Tienda-Online---GadgetsIT/api/images/marcas/'}${marca.imagen_marca}` }}
                                onPress={() => handleCardPress(marca.id_marca)}
                            />
                        ))
                    ) : (
                        <Text style={styles.noResultsText}>No se encontraron marcas.</Text>
                    )}
                </ScrollView>
            )}
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
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: "#fff",
        marginTop: 8,
        fontSize: 16,
    },
    noResultsText: {
        color: "#fff",
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
    },
});

export default Marca;
