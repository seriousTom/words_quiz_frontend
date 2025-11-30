import {Button, Text, View, StyleSheet} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import { layout } from "../../styles/layout";

function Profile() {
    const { logout } = useContext(AuthContext);

    return <View style={[layout.container, styles.rootContainer]}>
        <View>
            <Text>Profile</Text>
        </View>
        <View>
            <Button title="Logout" onPress={logout} color="#ff3333"/>
        </View>
    </View>;
}

export default Profile;

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    logoutContainer: {
        width: '100%'
    }
});