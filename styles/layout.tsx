import {StyleSheet} from "react-native";
import colors from "./colors";

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
        alignItems: "center",
        borderColor: '#000',
        borderWidth: 1,
        // flexDirection: 'column'
    },
    mh5: {
        marginHorizontal: 5,
    },
    mb5: {
        marginBottom: 5,
    },
    mb10: {
        marginBottom: 10,
    },
    mb15: {
        marginBottom: 15,
    },
    mb20: {
        marginBottom: 20,
    },
    label: {
        fontWeight: 700,
    },
    fullWidth: {
        width: '100%'
    }
});
