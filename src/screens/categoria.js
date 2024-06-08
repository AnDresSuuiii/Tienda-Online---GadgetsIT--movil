import React from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import Search from "../components/Search";
import BrandCard from "../components/cards";

const Categoria = ({ navigation }) => {
    const headerText = "Hola, Andres";
    const headerIcon = "shopping-cart";
    const searchIcon = "search";
    const searchPlaceholder = "Apple Watch, Macbook Pro, ...";

    const handleIconPress = () => {
        console.log("Carrito de compras presionado");
    };

    const handleCardPress = () => {
        navigation.navigate("productos");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText={headerText} headerIcon={headerIcon} onIconPress={handleIconPress} />
            <Search icon={searchIcon} placeholder={searchPlaceholder} />
            <Text style={styles.title}>Categorías</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                <BrandCard brandName="HUAWEI" brandLogo={require('../../assets/images/cool.png')} onPress={handleCardPress} />
                <BrandCard brandName="COOLER MASTER" brandLogo={require('../../assets/images/hua.png')} onPress={handleCardPress} />
                <BrandCard brandName="COOLER MASTER" brandLogo={require('../../assets/images/cool.png')} onPress={handleCardPress} />
                <BrandCard brandName="COOLER MASTER" brandLogo={require('../../assets/images/cool.png')} onPress={handleCardPress} />
                <BrandCard brandName="COOLER MASTER" brandLogo={require('../../assets/images/cool.png')} onPress={handleCardPress} />
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
