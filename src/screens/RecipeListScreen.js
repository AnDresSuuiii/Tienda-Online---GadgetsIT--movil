import React from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import Search from "../components/Search";

const RecipeListScreen = () => {
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
            <View>
                
            </View>
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
});

export default RecipeListScreen;
