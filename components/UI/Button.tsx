import {layout} from "../../styles/layout";
import {Pressable, Text, View} from "react-native";

function Button({children, onPress, style, styles = []}) {
    let pressableClass = null;
    let pressedClass = null;
    let textClass = null;
    switch(style) {
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
            return [layout.button, pressableClass, pressed && pressedClass, ...styles];
        }}
        onPress={onPress}>
            <Text style={textClass}>{children}</Text>
    </Pressable>;
}

export default Button;
