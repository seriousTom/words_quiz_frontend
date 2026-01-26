import { layout } from "../../styles/layout";
import { Pressable, Text, View, Animated, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import colors from "../../styles/colors";

function VariantButton({ children, variantIndex, onPress, style, outerButtonStyles = [], options = {} }) {
    const scale = useRef(new Animated.Value(1)).current;
    const [isPressed, setIsPressed] = useState(false);

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
                    variantStyles[variants[variantIndex]].variantButton,
                    styles.button,
                    isPressed && variantStyles[variants[variantIndex]].variantButtonActive,
                    ...outerButtonStyles,
                    { transform: [{ scale }] },
                ]}
            >
                <View style={[styles.variantCircle, variantStyles[variants[variantIndex]].variantCircle, isPressed && variantStyles[variants[variantIndex]].variantCircleActive]}>
                    <Text style={[styles.variantCircleText, variantStyles[variants[variantIndex]].variantCircleText, isPressed && variantStyles[variants[variantIndex]].variantCircleTextActive]}>{variants[variantIndex]}</Text>
                </View>
                <Text style={[styles.buttonText, styles.buttonText, isPressed && variantStyles[variants[variantIndex]].variantButtonTextActive]}>{children}</Text>
            </Animated.View>
        </Pressable>
    );
}

export default VariantButton;

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: colors.lightColor,
        paddingHorizontal: 20,
        paddingVertical: 19,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 3
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Lexend-Bold',
        color: colors.darkTextColor
    },
    buttonActive: {
        transform: [
            { scale: 0.95 }
        ]
    },
    variantCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        // borderWidth: 1,
        borderRadius: '50%',
        marginRight: 15
    },
    variantCircleText: {
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
    }
});

const variants = ['A', 'B', 'C', 'D'];

const variantStyles = {
    A: StyleSheet.create({
        variantButton: {
            borderColor: colors.multipleChoice.variantAColor
        },
        variantCircle: {
            backgroundColor: colors.multipleChoice.variantAColor
        },
        variantCircleText: {
            color: colors.multipleChoice.variantAColorDark
        },
        variantButtonActive: {
            backgroundColor: colors.multipleChoice.variantAColor,
            borderColor: colors.multipleChoice.variantAColorDark
        },
        variantButtonTextActive: {
            color: colors.multipleChoice.variantAColorDark
        },
        variantCircleActive: {
            backgroundColor: colors.multipleChoice.variantAColorDark
        },
        variantCircleTextActive: {
            color: colors.lightColor
        }
    }),
    B: StyleSheet.create({
        variantButton: {
            borderColor: colors.multipleChoice.variantBColor
        },
        variantCircle: {
            backgroundColor: colors.multipleChoice.variantBColor
        },
        variantCircleText: {
            color: colors.multipleChoice.variantBColorDark
        },
        variantButtonActive: {
            backgroundColor: colors.multipleChoice.variantBColor,
            borderColor: colors.multipleChoice.variantBColorDark
        },
        variantButtonTextActive: {
            color: colors.multipleChoice.variantBColorDark
        },
        variantCircleActive: {
            backgroundColor: colors.multipleChoice.variantBColorDark
        },
        variantCircleTextActive: {
            color: colors.lightColor
        }
    }),
    C: StyleSheet.create({
        variantButton: {
            borderColor: colors.multipleChoice.variantCColor
        },
        variantCircle: {
            backgroundColor: colors.multipleChoice.variantCColor
        },
        variantCircleText: {
            color: colors.multipleChoice.variantCColorDark
        },
        variantButtonActive: {
            backgroundColor: colors.multipleChoice.variantCColor,
            borderColor: colors.multipleChoice.variantCColorDark
        },
        variantButtonTextActive: {
            color: colors.multipleChoice.variantCColorDark
        },
        variantCircleActive: {
            backgroundColor: colors.multipleChoice.variantCColorDark
        },
        variantCircleTextActive: {
            color: colors.lightColor
        }
    }),
    D: StyleSheet.create({
        variantButton: {
            borderColor: colors.multipleChoice.variantDColor
        },
        variantCircle: {
            backgroundColor: colors.multipleChoice.variantDColor
        },
        variantCircleText: {
            color: colors.multipleChoice.variantDColorDark
        },
        variantButtonActive: {
            backgroundColor: colors.multipleChoice.variantDColor,
            borderColor: colors.multipleChoice.variantDColorDark
        },
        variantButtonTextActive: {
            color: colors.multipleChoice.variantDColorDark
        },
        variantCircleActive: {
            backgroundColor: colors.multipleChoice.variantDColorDark
        },
        variantCircleTextActive: {
            color: colors.lightColor
        }
    })
};