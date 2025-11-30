import { Button, View } from "react-native";
import Input from "../../components/UI/Input";
import { layout } from "../../styles/layout";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { notifySuccess, notifyError } from "../../utils/toast";

function Register() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const submitLogin = async () => {
        setLoading(true);
        setErrors({});
        try {
            await login(email, password);
            notifySuccess('Login successful.');
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
            <Input label="Email" textInputConfig={{ placeholder: 'Email', onChangeText: setEmail }} errorText={errors.email?.[0]} />
            <Input label="Password" textInputConfig={{ placeholder: 'Password', onChangeText: setPassword, secureTextEntry: true }} errorText={errors.password?.[0]} style={layout.mb10}/>
            <Button title={loading ? 'Loading...' : 'Submit'} onPress={submitLogin} disabled={loading} />
        </View>
    );
}

export default Register;
