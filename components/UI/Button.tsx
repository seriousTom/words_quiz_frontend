import {layout} from "../../styles/layout";
import {Pressable, Text, View} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

function Button({children, onPress, style, styles = [], options = {}}) {
    let pressableClass = null;
    let pressedClass = null;
    let textClass = null;
    switch (style) {
        case 'primary':
            pressableClass = layout.buttonPrimary;
            pressedClass = layout.buttonPrimaryActive;
            textClass = layout.buttonPrimaryText;
            break;
        case 'default':
            pressableClass = layout.buttonDefault;
            pressedClass = layout.buttonDefaultActive;
            textClass = layout.buttonDefaultText;
            break;
    }

    return <Pressable
        style={({pressed}) => {
            return [layout.button, pressableClass, pressed && pressedClass, pressed && layout.buttonActive, ...styles];
        }}
        onPress={onPress}
    >
        <Text style={[layout.buttonText, textClass]}>{children}</Text>
        {options?.icon && <View style={layout.buttonIcon}><Ionicons name={options.icon} size={24} color="white" /></View>}
    </Pressable>;
}

export default Button;
