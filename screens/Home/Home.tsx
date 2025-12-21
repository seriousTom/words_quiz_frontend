import {Button, Text, View} from "react-native";

function Home({navigation}) {
    return <View>
        <Button title="Start game" onPress={() => {
            navigation.navigate('GameFlow');
        }}></Button>
    </View>;
}

export default Home;