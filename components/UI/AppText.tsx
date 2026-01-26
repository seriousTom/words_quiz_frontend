import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

type FontVariant = 'regular' | 'bold';

const FONT_MAP: Record<FontVariant, string> = {
    regular: 'Lexend-Regular',
    bold: 'Lexend-Bold',
};

type AppTextProps = TextProps & {
    variant?: 'regular' | 'bold';
};

export function AppText({variant = 'regular', style, ...props}: AppTextProps) {
    return (
        <Text
            {...props}
            style={[
                {fontFamily: FONT_MAP[variant]},
                style,
            ]}
        />
    );
}
