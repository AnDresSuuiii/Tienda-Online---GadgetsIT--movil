import React from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Poroducto_detalle = ({ navigation }) => {
    const headerText = "Hola, Andres";
    const headerIcon = "shopping-cart";
    const searchIcon = "search";
    const searchPlaceholder = "Apple Watch, Macbook Pro, ...";

    const handleIconPress = () => {
        console.log("Carrito de compras presionado");
    };

    const handleBackPress = () => {
        navigation.goBack(); // Cambia esto si necesitas un comportamiento específico al presionar el icono de regreso
    };

    return (
        <View style={{ backgroundColor: "#151515", flex: 1 }}>
             <TouchableOpacity onPress={handleBackPress} >
             <SafeAreaView style={styles.container}>
                <Ionicons name="chevron-back" size={28} color="white" />
               
            </SafeAreaView>
             </TouchableOpacity>
            

            <View style={{ backgroundColor: "#333", flex: 1, marginTop: 290, borderTopLeftRadius: 56, borderTopRightRadius: 56, alignItems: "center" }}>


                <View style={{ height: 300, width: 300, position: "absolute", top: -210 }}>
                    <Image source={require("../../assets/images/Image.png")} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 20,
        top: 30
    },
    icon: {
        marginRight: 8, // Espacio entre el icono y el contenido
    },
});

export default Poroducto_detalle;