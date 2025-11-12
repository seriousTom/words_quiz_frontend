import {StyleSheet, Text, TextInput, View} from "react-native";

function Input({label, style, textInputConfig}) {
    return <View style={[style]}>
        <Text>{label}</Text>
        <TextInput style={styles.input} {...textInputConfig}/>
    </View>;
}

export default Input;

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white"
    }
});