import {Button, StyleSheet, Text, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {layout} from "../../styles/layout";

function Home() {
    const navigation = useNavigation();

    return <View style={layout.centeredContainer}>
        <View style={layout.mb10}>
            <Button title="Login" onPress={() => {
                navigation.navigate('Login');
            }}></Button>
        </View>
        <View style={layout.mb10}>
            <Button title="Register" onPress={() => {
                navigation.navigate('Register');
            }}></Button>
        </View>
    </View>
}

export default Home;
