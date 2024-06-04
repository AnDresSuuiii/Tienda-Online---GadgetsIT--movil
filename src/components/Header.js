import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ headerText, headerIcon, onIconPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{headerText}</Text>
            <TouchableOpacity onPress={onIconPress}>
                <FontAwesome name={headerIcon} size={24} color="#fff" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
    },
    headerText: {
        flex: 1,
        fontSize: 19,
        marginTop: 32,
        color: "#fff", // Cambia el color del texto a blanco
    },
    icon: {
        marginTop: 32,
    },
});

export default Header;
