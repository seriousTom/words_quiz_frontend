import { Button, View } from "react-native";
import Input from "../../components/UI/Input";
import { layout } from "../../styles/layout";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { notifySuccess, notifyError } from "../../utils/toast";

function Register() {
    const { register } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const submitRegister = async () => {
        setLoading(true);
        setErrors({});
        try {
            await register(name, email, password, confirmPassword);
            notifySuccess('Registration successful.');
            // MainScreens will automatically render Drawer since userToken exists
        } catch (e) {
            if (e.response?.status === 422) {
                notifyError('Form contains errors.');
                setErrors(e.response.data.errors);
            } else {
                notifyError('Something went wrong.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={layout.container}>
            <Input label="Name" textInputConfig={{ placeholder: 'Name', onChangeText: setName }} errorText={errors.name?.[0]} />
            <Input label="Email" textInputConfig={{ placeholder: 'Email', onChangeText: setEmail }} errorText={errors.email?.[0]} />
            <Input label="Password" textInputConfig={{ placeholder: 'Password', onChangeText: setPassword, secureTextEntry: true }} errorText={errors.password?.[0]} />
            <Input label="Confirm password" textInputConfig={{ placeholder: 'Confirm password', onChangeText: setConfirmPassword, secureTextEntry: true }} errorText={errors.password_confirmation?.[0]} style={layout.mb10}/>
            <Button title={loading ? 'Loading...' : 'Submit'} onPress={submitRegister} disabled={loading} />
        </View>
    );
}

export default Register;
