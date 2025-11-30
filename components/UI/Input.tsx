import {StyleSheet, Text, TextInput, View} from "react-native";

function Input({label, style, textInputConfig, errorText}) {
    return <View style={[style]}>
        <Text>{label}</Text>
        <TextInput style={styles.input} {...textInputConfig}/>
        {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>;
}

export default Input;

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white"
    },
    errorText: {
        color: '#ff3333'
    }
});