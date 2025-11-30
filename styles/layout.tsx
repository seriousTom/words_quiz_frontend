import {StyleSheet} from "react-native";

const baseContainer = {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 30,
};

export const layout = StyleSheet.create({
    container: baseContainer,
    centeredContainer: {
        ...baseContainer,
        justifyContent: "center",
    },
    mb10: {
        marginBottom: 10,
    },
    mb15: {
        marginBottom: 15,
    }
});
