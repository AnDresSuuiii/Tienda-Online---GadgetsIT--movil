import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const Search = ({ icon, placeholder }) => {
    return (
        <View style={styles.container}>
            <FontAwesome name={icon} size={24} color="#6e6e6e" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#6e6e6e"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#232327",
        flexDirection: "row",
        paddingVertical: 12,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginVertical: 16,
        alignItems: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        color: "#fff",
        fontSize: 16,
        flex: 1,
    }
});

export default Search;
