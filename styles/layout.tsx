import {StyleSheet} from "react-native";

const colorDefaultBorder = '#6c757d';
const colorDefaultText = '#212529';
const colorDefaultActive = '#e2e6ea';

const darkTextColor = '#0f172a';

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
    label: {
        fontWeight: 700,
    },
    button: {
        borderRadius: 9999,
        paddingHorizontal: 20,
        paddingVertical: 19,
        alignSelf: 'flex-start',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Lexend-Bold',
        // fontWeight: 700
    },
    buttonIcon: {
        position: 'absolute',
        right: 20
    },
    buttonActive: {
        transform: [
            { scale: 0.95 }
        ]
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
    },
    buttonBlock: {
        width: '100%'
    }
});
