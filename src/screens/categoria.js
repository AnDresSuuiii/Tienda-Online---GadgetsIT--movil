import React from "react";
import { StyleSheet, SafeAreaView, Text, View, ScrollView, Button } from "react-native";
import Header from "../components/Header";
import Search from "../components/Search";
import BrandCard from "../components/cards";

const huaweiLogo = require('../../assets/images/cool.png');
const coolerMasterLogo = require('../../assets/images/hua.png');
const coolerMasterLogoo = require('../../assets/images/cool.png');
const coolerMasterLogooo = require('../../assets/images/cool.png');
const coolerMasterLogoooo = require('../../assets/images/cool.png');

const Categoria = ({ navigation }) => {
    const headerText = "Hola, Andres";
    const headerIcon = "shopping-cart";
    const searchIcon = "search";
    const searchPlaceholder = "Apple Watch, Macbook Pro, ...";

    const handleIconPress = () => {
        console.log("Carrito de compras presionado");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerText={headerText} headerIcon={headerIcon} onIconPress={handleIconPress} />
            <Search icon={searchIcon} placeholder={searchPlaceholder} />
            <Text style={styles.title}>Categorías</Text>
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
