import { layout } from "../../styles/layout";
import { Pressable, Text, View, Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";

function Button({ children, onPress, style, styles = [], options = {} }) {
    const scale = useRef(new Animated.Value(1)).current;
    const [isPressed, setIsPressed] = useState(false);

    let pressableClass = null;
    let pressedClass = null;
    let textClass = null;

    switch (style) {
        case "primary":
            pressableClass = layout.buttonPrimary;
            pressedClass = layout.buttonPrimaryActive; // for color feedback
            textClass = layout.buttonPrimaryText;
            break;
        case "default":
            pressableClass = layout.buttonDefault;
            pressedClass = layout.buttonDefaultActive; // for color feedback
            textClass = layout.buttonDefaultText;
            break;
    }

    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
        setIsPressed(true);
    };

    const onPressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        setIsPressed(false);
    };

    return (
        <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View
                style={[
                    layout.button,
                    pressableClass,
                    isPressed && pressedClass,
                    ...styles,
                    { transform: [{ scale }] },
                ]}
            >
                <Text style={[layout.buttonText, textClass]}>{children}</Text>

                {options?.icon && (
                    <View style={layout.buttonIcon}>
                        <Ionicons name={options.icon} size={24} color="white" />
                    </View>
                )}
            </Animated.View>
        </Pressable>
    );
}

export default Button;
