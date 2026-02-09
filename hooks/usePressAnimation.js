// hooks/usePressAnimation.js
import { useRef, useState } from "react";
import { Animated } from "react-native";

export function usePressAnimation({ pressedScale = 0.96 } = {}) {
    const scale = useRef(new Animated.Value(1)).current;
    const [isPressed, setIsPressed] = useState(false);

    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: pressedScale,
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

    return {
        scale,
        isPressed,
        pressHandlers: {
            onPressIn,
            onPressOut,
        },
    };
}
