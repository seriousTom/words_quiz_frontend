import { layout } from "../../styles/layout";
import { Pressable, Text, View, Animated, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import colors from "../../styles/colors";

function Button({ children, onPress, style, outerStyles = [], options = {} }) {
    const scale = useRef(new Animated.Value(1)).current;
    const [isPressed, setIsPressed] = useState(false);

    let pressableClass = null;
    let pressedClass = null;
    let textClass = null;

    switch (style) {
        case "primary":
            pressableClass = styles.buttonPrimary;
            pressedClass = styles.buttonPrimaryActive; // for color feedback
            textClass = styles.buttonPrimaryText;
            break;
        case "default":
            pressableClass = styles.buttonDefault;
            pressedClass = styles.buttonDefaultActive; // for color feedback
            textClass = styles.buttonDefaultText;
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
                    styles.button,
                    pressableClass,
                    isPressed && pressedClass,
                    ...outerStyles,
                    { transform: [{ scale }] },
                ]}
            >
                <Text style={[styles.buttonText, textClass]}>{children}</Text>

                {options?.icon && (
                    <View style={styles.buttonIcon}>
                        <Ionicons name={options.icon} size={24} color="white" />
                    </View>
                )}
            </Animated.View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 9999,
        paddingHorizontal: 20,
        paddingVertical: 19,
        alignSelf: 'flex-start',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Lexend-Bold',
        // fontWeight: 700
    },
    buttonIcon: {
        position: 'absolute',
        right: 20
    },
    buttonActive: {
        transform: [
            { scale: 0.95 }
        ]
    },
    buttonDefault: {
        // backgroundColor: colorPrimary,
        borderWidth: 1,
        borderColor: colors.colorDefaultBorder
    },
    buttonDefaultActive: {
        backgroundColor: colors.colorDefaultActive
    },
    buttonDefaultText: {
        color: colors.colorDefaultText
    },
    buttonPrimary: {
        backgroundColor: colors.colorPrimary,

    },
    buttonPrimaryActive: {
        backgroundColor: colors.colorPrimaryActive
    },
    buttonPrimaryText: {
        color: colors.colorPrimaryText
    }
});
