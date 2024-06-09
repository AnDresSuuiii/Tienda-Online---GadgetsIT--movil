import React from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import Search from "../components/Search";
import BrandCard from "../components/cards_productos";

const Productos = ({ navigation }) => {
    const headerText = "Hola, Andres";
    const headerIcon = "shopping-cart";
    const searchIcon = "search";
    const searchPlaceholder = "Apple Watch, Macbook Pro, ...";

    const handleIconPress = () => {
        navigation.navigate("Carrito");
    };

    
    const handleCardPress = () => {
        navigation.navigate("ProductoDetalle"); // Use "Productos" instead of "productos"
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText={headerText} headerIcon={headerIcon} onIconPress={handleIconPress} />
            <Search icon={searchIcon} placeholder={searchPlaceholder} />
            <Text style={styles.title}>Porductos</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                <BrandCard brandName="HUAWEI" brandLogo={require('../../assets/images/ps.png')} onPress={handleCardPress} />
                <BrandCard brandName="COOLER MASTER" brandLogo={require('../../assets/images/Image.png')} onPress={handleCardPress} />
                <BrandCard brandName="COOLER MASTER" brandLogo={require('../../assets/images/ps.png')} onPress={handleCardPress} />
                <BrandCard brandName="COOLER MASTER" brandLogo={require('../../assets/images/Image.png')} onPress={handleCardPress} />
                <BrandCard brandName="COOLER MASTER" brandLogo={require('../../assets/images/ps.png')} onPress={handleCardPress} />
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