import {Pressable, Text, View, Animated, StyleSheet} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useRef, useState} from "react";
import colors from "../../styles/colors";
import {usePressAnimation} from "../../hooks/usePressAnimation";

function Button({children, onPress, style = null, outerButtonClass = null, outerPressableClass = null, outerPressedClass = null, outerTextClass = null, outerButtonStyles = [], options = {}}) {
    const {scale, isPressed, pressHandlers} = usePressAnimation();

    let buttonClass = styles.button;
    let pressableClass = null;
    let pressedClass = null;
    let textClass = null;

    switch (style) {
        case "primary":
            pressableClass = styles.buttonPrimary;
            pressedClass = styles.buttonPrimaryActive;
            textClass = styles.buttonPrimaryText;
            break;
        case "default":
            pressableClass = styles.buttonDefault;
            pressedClass = styles.buttonDefaultActive;
            textClass = styles.buttonDefaultText;
            break;
        case "light":
            pressableClass = styles.buttonLight;
            pressedClass = styles.buttonDefaultActive;
            textClass = styles.buttonDefaultText;
            break;
        default:
            pressableClass = outerPressableClass;
            pressedClass = outerPressedClass;
            textClass = outerTextClass;
    }

    if(outerButtonClass) {
        buttonClass = outerButtonClass;
    }

    return (
        <Pressable onPress={onPress} {...pressHandlers}>
            <Animated.View
                style={[
                    buttonClass,
                    pressableClass,
                    isPressed && pressedClass,
                    ...outerButtonStyles,
                    {transform: [{scale}]},
                ]}
            >
                <Text style={[styles.buttonText, textClass]}>{children}</Text>

                {options?.icon && (
                    <View style={styles.buttonIcon}>
                        <Ionicons name={options.icon} size={24} color="white"/>
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
            {scale: 0.95}
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
    },
    buttonLight: {
        backgroundColor: colors.lightColor,
        borderWidth: 1,
        borderColor: colors.colorLightBorder
    },
    buttonLightText: {
        color: colors.darkTextColor
    },
});
