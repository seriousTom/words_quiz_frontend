import { Pressable, Text, View, Animated, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import {usePressAnimation} from "../../hooks/usePressAnimation";

function VariantButton({ children, variantIndex, onPress, style, outerButtonStyles = [], options = {} }) {
    const { scale, isPressed, pressHandlers } = usePressAnimation();

    const variant = variants[variantIndex];
    const vStyles = variantStyles[variant];

    return (
        <Pressable onPress={onPress} {...pressHandlers}>
            <Animated.View
                style={[
                    vStyles.variantButton,
                    styles.button,
                    isPressed && vStyles.variantButtonActive,
                    ...outerButtonStyles,
                    { transform: [{ scale }] },
                ]}
            >
                <View style={[styles.variantCircle, vStyles.variantCircle, isPressed && vStyles.variantCircleActive]}>
                    <Text style={[styles.variantCircleText, vStyles.variantCircleText, isPressed && vStyles.variantCircleTextActive]}>{variants[variantIndex]}</Text>
                </View>
                <Text style={[styles.buttonText, styles.buttonText, isPressed && vStyles.variantButtonTextActive]}>{children}</Text>
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