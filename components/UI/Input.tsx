import {StyleSheet, Text, TextInput, View, Animated, Easing} from "react-native";
import {layout} from "../../styles/layout";
import {useState, useRef} from 'react';
import colors from "../../styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

function Input({label, style, textInputConfig, errorText, icon}) {
    const [isFocused, setIsFocused] = useState(false);
    const borderAnim = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(borderAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease),
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(borderAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease),
        }).start();
    };

    // Interpolate border color from gray to blue
    const borderColor = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.colorDefaultActive, colors.colorPrimary],
    });

    return <View style={[style]}>
        {label && <Text>{label}</Text>}
        <View>
            <Animated.View style={[styles.inputWrapper, { borderColor }]}>
                {icon && (
                    <Ionicons name={icon} style={styles.icon} size={24} color={colors.colorDefault} />
                )}
                <TextInput
                    style={[styles.input]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...textInputConfig}
                />
            </Animated.View>
        </View>
        {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>;
}

export default Input;

const styles = StyleSheet.create({
    input: {
        borderRadius: 9999,
        paddingLeft: 48,
        paddingRight: 16,
        paddingVertical: 19,
        fontSize: 18,
        backgroundColor: "white"
    },
    inputWrapper: {
        borderRadius: 9999,
        borderWidth: 2,
    },
    // inputFocused: {
    //     borderColor: colors.colorPrimary,
    // },
    icon: {
        position: "absolute",
        left: 16,
        top: "50%",
        transform: [{ translateY: -12 }],
        zIndex: 1
    },
    errorText: {
        color: colors.colorDanger
    }
});