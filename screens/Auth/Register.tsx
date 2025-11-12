import {Button, Text, TextInput, View} from "react-native";
import Input from "../../components/UI/Input";
import {layout} from "../../styles/layout";
import {useState} from "react";

function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const submitRegister = () => {
        console.log(email, password, confirmPassword);
    };

    return <View style={layout.container}>
        <Input label="Email" style={layout.mb10} textInputConfig={{
            placeholder: 'Email',
            onChangeText: (value) => {
                setEmail(value);
            },
        }} />
        <Input label="Password" style={layout.mb10} textInputConfig={{
            placeholder: 'Password',
            onChangeText: (value) => {
                setPassword(value);
            },
            secureTextEntry: true
        }} />
        <Input label="Confirm password" style={layout.mb15} textInputConfig={{
            placeholder: 'Confirm password',
            onChangeText: (value) => {
                setConfirmPassword(value);
            },
            secureTextEntry: true
        }} />
        <Button title="Register" onPress={submitRegister} />
    </View>
}

export default Register;
