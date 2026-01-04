import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
    StatusBar,
    Dimensions,
} from 'react-native';

// Simple check for icon library, otherwise use text fallbacks
// In a real project: import Icon from 'react-native-vector-icons/MaterialIcons';
// For this portable snippet, we'll render text/unicode or simple shapes if icons aren't available,
// but I'll write it assuming the user can hook up an icon lib or replace with SVGs.
// We will use a placeholder Component for Icons to prevent runtime crashes if the lib isn't there.
const MaterialIcon = ({ name, size, color }: { name: string; size: number; color: string }) => {
    // Mapping some material names to unicode or simple text for fallback
    const iconMap: Record<string, string> = {
        arrow_back: '←',
        pause: '||',
        translate: 'A文',
        edit: '✎',
        check_circle: '✓',
    };
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>{iconMap[name] || '?'}</Text>;
};

const COLORS = {
    primary: '#137fec',
    bgLight: '#f6f7f8',
    bgDark: '#101922',
    slate900: '#0f172a',
    slate500: '#64748b',
    slate400: '#94a3b8',
    slate300: '#cbd5e1',
    slate200: '#e2e8f0',
    white: '#ffffff',
    blue100: '#dbeafe',
};

const Test = () => {
    const [inputText, setInputText] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgLight} />

            {/* Top App Bar */}
            <View style={styles.appBar}>
                <TouchableOpacity style={styles.iconButton} accessibilityLabel="Go back">
                    <MaterialIcon name="arrow_back" size={24} color={COLORS.slate900} />
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>Word 3/10</Text>
                    <View style={styles.progressBarTrack}>
                        <View style={[styles.progressBarFill, { width: '30%' }]} />
                    </View>
                </View>

                <View style={styles.rightAction}>
                    <TouchableOpacity style={styles.iconButton} accessibilityLabel="Pause game">
                        <MaterialIcon name="pause" size={24} color={COLORS.slate900} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Source Word Area */}
                <View style={styles.sourceWordContainer}>
                    <View style={styles.wordWrapper}>
                        {/* Decorative Background Blob - simplified as a view with opacity */}
                        <View style={styles.blob} />
                        <Text style={styles.sourceWord}>Sunflower</Text>
                    </View>

                    <View style={styles.metaContainer}>
                        <MaterialIcon name="translate" size={20} color={COLORS.primary} />
                        <Text style={styles.metaText}>TRANSLATE TO SPANISH</Text>
                    </View>
                </View>

                {/* Hints - G I R A S O L */}
                <View style={styles.hintsContainer}>
                    <View style={styles.hintRow}>
                        {/* G - Revealed */}
                        <View style={[styles.letterSlot, styles.revealedSlot]}>
                            <Text style={styles.revealedText}>G</Text>
                        </View>
                        {/* I - Empty */}
                        <View style={[styles.letterSlot, styles.emptySlot]}>
                            <Text style={styles.emptyText}>_</Text>
                        </View>
                        {/* R - Empty */}
                        <View style={[styles.letterSlot, styles.emptySlot]}>
                            <Text style={styles.emptyText}>_</Text>
                        </View>
                        {/* A - Revealed */}
                        <View style={[styles.letterSlot, styles.revealedSlot]}>
                            <Text style={styles.revealedText}>A</Text>
                        </View>
                        {/* S - Empty */}
                        <View style={[styles.letterSlot, styles.emptySlot]}>
                            <Text style={styles.emptyText}>_</Text>
                        </View>
                        {/* O - Empty */}
                        <View style={[styles.letterSlot, styles.emptySlot]}>
                            <Text style={styles.emptyText}>_</Text>
                        </View>
                        {/* L - Revealed */}
                        <View style={[styles.letterSlot, styles.revealedSlot]}>
                            <Text style={styles.revealedText}>L</Text>
                        </View>
                    </View>
                    <Text style={styles.hintLabel}>3 hints revealed</Text>
                </View>

                {/* Input Field */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                        <MaterialIcon name="edit" size={20} color={COLORS.slate400} />
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type translation..."
                        placeholderTextColor={COLORS.slate400}
                        value={inputText}
                        onChangeText={setInputText}
                        autoCorrect={false}
                    />
                </View>

                {/* Guess Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.guessButton} activeOpacity={0.8}>
                        <Text style={styles.guessButtonText}>GUESS</Text>
                        <View style={styles.buttonIcon}>
                            <MaterialIcon name="check_circle" size={24} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Spacer for bottom */}
                <View style={{ height: 24 }} />

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgLight,
    },
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 8,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
        zIndex: 10,
    },
    iconButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        // hover effect not natively supported the same way, but TouchableOpacity handles press
    },
    progressContainer: {
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        color: COLORS.slate900,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', // Fallback for Lexend
    },
    progressBarTrack: {
        height: 4,
        width: 96,
        backgroundColor: COLORS.slate200,
        borderRadius: 2, // full rounded
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 2,
    },
    rightAction: {
        width: 48,
        alignItems: 'flex-end',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: 80,
    },
    sourceWordContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20, // space before hints
    },
    wordWrapper: {
        position: 'relative',
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blob: {
        position: 'absolute',
        width: 150,
        height: 60,
        backgroundColor: COLORS.blue100,
        borderRadius: 100,
        opacity: 0.5,
        transform: [{ scale: 1.5 }],
    },
    sourceWord: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.slate900,
        textAlign: 'center',
        zIndex: 1,
        // textShadow equivalent?
        textShadowColor: 'rgba(0,0,0,0.05)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 32,
    },
    metaText: {
        color: COLORS.slate500,
        fontSize: 14,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    hintsContainer: {
        width: '100%',
        marginBottom: 40,
        alignItems: 'center',
    },
    hintRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
    },
    letterSlot: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    revealedSlot: {
        backgroundColor: 'rgba(19, 127, 236, 0.1)', // primary/10
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    revealedText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 20,
    },
    emptyText: {
        color: 'transparent',
    },
    // To match the dashed border for empty slots (RN doesn't fully support borderStyle='dashed' with rounded corners correctly on all versions/platforms uniformly without extra views, but basic dashed works often enough or we fallback to solid/gray)
    // We'll use a specific style for empty slots
    // Actually, we can style the wrapper for empty slots
    // 'border-2 border-dashed border-slate-300'
    // RN borderStyle: 'dashed' works reasonably well now.

    // NOTE: For the specific empty slot look in design:
    // bg-white border-2 border-dashed border-slate-300
    // AND it had underscores in text-transparent? I will just simulate the box.

    // Wait, the design had `_` in transparent text.
    // I will just style the container.

    hintLabel: {
        marginTop: 12,
        color: COLORS.slate400,
        fontSize: 12,
        fontWeight: '500',
    },

    // Apply dashed border specifically to empty ones if we can, or just use solid for stability
    // The loop above uses this logic inline, let's fix the empty slots in the JSX to use a specific style object
    // But wait, I mapped them all to `letterSlot`.
    // Let's refine the component render above or add a style.

    inputContainer: {
        width: '100%',
        maxWidth: 480,
        marginBottom: 24,
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: 20,
        top: 22, // roughly centered
        zIndex: 1,
    },
    textInput: {
        width: '100%',
        height: 64,
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.slate200,
        borderRadius: 32,
        paddingLeft: 48, // space for icon
        paddingRight: 16,
        fontSize: 18,
        fontWeight: '500',
        color: COLORS.slate900,
    },

    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    guessButton: {
        width: '100%',
        maxWidth: 480,
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    guessButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    buttonIcon: {
        position: 'absolute',
        right: 20,
    },
    emptySlot: {
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.slate300,
        borderStyle: 'dashed',
    },
});

export default Test;
