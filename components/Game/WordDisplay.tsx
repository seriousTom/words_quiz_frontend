import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    ActivityIndicator,
} from 'react-native';
import { AppText } from '../UI/AppText';
import { WORD_DISPLAY_LIST } from '../../constants/wordDisplay';

function WordDisplay({ word, display }) {
    const imageUri =
        Array.isArray(word?.images) && word.images.length > 0
            ? word.images[0]
            : null;

    const shouldRenderText =
        display === WORD_DISPLAY_LIST.WORD || !imageUri;

    const [aspectRatio, setAspectRatio] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (shouldRenderText) return;

        setLoading(true);

        Image.getSize(
            imageUri,
            (width, height) => {
                setAspectRatio(width / height);
                setLoading(false);
            },
            (error) => {
                console.warn('Failed to get image size:', error);
                setLoading(false);
            }
        );
    }, [imageUri, shouldRenderText]);

    if (shouldRenderText) {
        return (
            <AppText variant="bold" style={styles.wordText}>
                {word.word}
            </AppText>
        );
    }

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator />}
            {aspectRatio && (
                <Image
                    source={{ uri: imageUri }}
                    style={[styles.image, { aspectRatio }]}
                    resizeMode="contain"
                />
            )}
        </View>
    );
}

export default WordDisplay;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    wordText: {
        color: '#0f172a',
        fontSize: 48,
        textAlign: 'center',
    },
    image: {
        width: 200, // fixed width
        backgroundColor: '#eee',
    },
});
