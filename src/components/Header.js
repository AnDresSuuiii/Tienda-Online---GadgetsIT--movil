import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ headerText, headerIcon, onIconPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{headerText}</Text>
            <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
                <FontAwesome name={headerIcon} size={24} color="#fff" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Para que el texto esté a la izquierda y el ícono a la derecha
        paddingVertical: 16,
        paddingHorizontal: 20, // Agregar un poco de padding horizontal
        backgroundColor: "#1c1c1c", // Fondo del header más oscuro
    },
    headerText: {
        fontSize: 20, // Tamaño del texto un poco más grande para mejor visibilidad
        color: "#fff",
        fontWeight: "600", // Fuente más gruesa para un look más fuerte
    },
    iconContainer: {
        padding: 8, // Agregar padding alrededor del ícono para hacerlo más táctil
    },
    icon: {
        marginRight: 5, // Pequeño margen a la derecha del ícono
    },
});

export default Header;
