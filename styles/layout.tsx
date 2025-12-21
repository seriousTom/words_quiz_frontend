import {StyleSheet} from "react-native";

const colorDefaultBorder = '#6c757d';
const colorDefaultText = '#212529';
const colorDefaultActive = '#e2e6ea';

const colorPrimaryText = '#ffffff';
const colorPrimary = '#007bff';
const colorPrimaryActive = '#0062cc';

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
    label: {
        fontWeight: 700,
    },
    button: {
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignSelf: 'flex-start',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDefault: {
        // backgroundColor: colorPrimary,
        borderWidth: 1,
        borderColor: colorDefaultBorder
    },
    buttonDefaultActive: {
        backgroundColor: colorDefaultActive
    },
    buttonDefaultText: {
        color: colorDefaultText
    },
    buttonPrimary: {
        backgroundColor: colorPrimary,

    },
    buttonPrimaryActive: {
        backgroundColor: colorPrimaryActive
    },
    buttonPrimaryText: {
        color: colorPrimaryText
    }
});
