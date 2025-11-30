import {Button, StyleSheet, Text, TextInput, View} from "react-native";

function SubmitButton({label, style, textInputConfig, errorText}) {
    return <Button title="Register" onPress={submitRegister} />;
}

export default SubmitButton;
