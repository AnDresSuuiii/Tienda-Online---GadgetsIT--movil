import React, { useState } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, View, Text, ScrollView, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProductoDetalle = ({ navigation }) => {
    const [inputText, setInputText] = useState('');

    const handleIconPress = () => {
        navigation.navigate("Carrito");
    };


    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <SafeAreaView style={styles.container}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                </SafeAreaView>
            </TouchableOpacity>

            <View style={styles.productImageContainer}>
                <Image source={require("../../assets/images/Image.png")} style={styles.productImage} />
            </View>

            <ScrollView style={styles.productDetailsContainer} contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.productTitle}>Apple Watch</Text>
                <Text style={styles.productSubtitle}>Series 5 SE</Text>

                <Text style={styles.productDescription}>
                    El Apple Watch más fuerte y equipado desafía los límites una vez más. Ahora con el flamante S9 SiP,
                    una forma nueva y mágica de usar tu reloj sin siquiera tocar la pantalla, la más brillante de Apple
                    hasta este momento. Además, ahora puedes elegir combinaciones de cajas y correas neutras en carbono.
                </Text>

                <TouchableOpacity style={styles.cartButton} onPress={handleIconPress}>
                    <Ionicons name="cart" size={24} color="#333" />
                    <Text style={styles.cartButtonText}>Añadir al carrito</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <Text style={styles.reviewsTitle}>Sobre este artículo</Text>
                <Text style={styles.productDescription}>
                    El Apple Watch más fuerte y equipado desafía los límites una vez más. Ahora con el flamante S9 SiP,
                    una forma nueva y mágica de usar tu reloj sin siquiera tocar la pantalla, la más brillante de Apple
                    hasta este momento. Además, ahora puedes elegir combinaciones de cajas y correas neutras en carbono.
                </Text>

                <Text style={styles.reviewsTitle}>Opiniones</Text>
                <View style={styles.reviewContainer}>
                    <Text style={styles.reviewAuthor}>Robert Downey Jr.</Text>
                    <Ionicons name="heart-outline" size={16} color="white" />
                    <Text style={styles.reviewText}>
                        Me encantó la calidad del producto, y el precio súper bueno, lo único que no me gustó fue el precio un poco elevado...
                    </Text>
                </View>
                <View style={styles.reviewContainer}>
                    <Text style={styles.reviewAuthor}>Robert Downey Jr.</Text>
                    <Ionicons name="heart-outline" size={16} color="white" />
                    <Text style={styles.reviewText}>
                        Me encantó la calidad del producto, y el precio súper bueno, lo único que no me gustó fue el precio un poco elevado...
                    </Text>
                </View>

                <Text style={styles.inputTitle}>Escribe tu opinión</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe tu opinión aquí..."
                    placeholderTextColor="#888"
                    value={inputText}
                    onChangeText={setInputText}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#151515",
        flex: 1
    },
    backButton: {
        marginTop: 30,
        marginLeft: 20,
    },
    container: {
        flexDirection: "row",
    },
    productImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: -20,
        zIndex: 1
    },
    productImage: {
        height: 300,
        width: 300,
        resizeMode: "contain",
    },
    productDetailsContainer: {
        backgroundColor: "#333",
        flex: 1,
        marginTop: -55,
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        paddingHorizontal: 20,
        zIndex: 0
    },
    scrollViewContent: {
        paddingVertical: 20,
    },
    productTitle: {
        fontSize: 28,
        color: "white",
        fontWeight: "bold",
    },
    productSubtitle: {
        fontSize: 18,
        color: "white",
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        color: "white",
        marginBottom: 20,
    },
    reviewsTitle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
    },
    reviewContainer: {
        backgroundColor: "#444",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    reviewAuthor: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
    reviewText: {
        fontSize: 14,
        color: "white",
        marginTop: 4,
    },
    divider: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    inputTitle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#555",
        color: "white",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    cartButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 8,
        paddingVertical: 10,
        marginBottom: 20,
    },
    cartButtonText: {
        fontSize: 16,
        color: "#333",
        marginLeft: 10,
    },

});

export default ProductoDetalle;
