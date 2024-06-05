import React from "react";
import { StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import Header from "../components/Header";
import Search from "../components/Search";
import BrandCard from "../components/cards";

// Ejemplo de logos, reemplaza con la fuente correcta de tus imágenes
const huaweiLogo = require('../../assets/images/cool.png');

const coolerMasterLogo = require('../../assets/images/hua.png');
const coolerMasterLogoo = require('../../assets/images/cool.png');
const coolerMasterLogooo = require('../../assets/images/cool.png');
const coolerMasterLogoooo = require('../../assets/images/cool.png');


const Marca = () => {
    const headerText = "Hola, Andres";
    const headerIcon = "shopping-cart";
    const searchIcon = "search";
    const searchPlaceholder = "Apple Watch, Macbook Pro, ...";

    const handleIconPress = () => {
        // Aquí puedes manejar la acción cuando se presiona el ícono del carrito de compras
        console.log("Carrito de compras presionado");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText={headerText} headerIcon={headerIcon} onIconPress={handleIconPress} />
            <Search icon={searchIcon} placeholder={searchPlaceholder} />
            <Text style={styles.title}>Marcas</Text>

            <ScrollView contentContainerStyle={styles.cardsContainer}>
                <BrandCard brandName="HUAWEI" brandLogo={huaweiLogo} />
                <BrandCard brandName="COOLER MASTER" brandLogo={coolerMasterLogo} />
                <BrandCard brandName="COOLER MASTER" brandLogo={coolerMasterLogoo} />
                <BrandCard brandName="COOLER MASTER" brandLogo={coolerMasterLogooo} />
                <BrandCard brandName="COOLER MASTER" brandLogo={coolerMasterLogoooo} />
            </ScrollView>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151515", // Esto hace que el fondo sea negro
        paddingHorizontal: 16, // Esto añade espacio horizontal alrededor de los elementos
        paddingTop: 16, // Esto añade espacio en la parte superior
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
