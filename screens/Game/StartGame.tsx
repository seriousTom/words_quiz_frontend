import {Text, View, Pressable, StyleSheet, ScrollView} from "react-native";
import {useState} from "react";
import {layout} from "../../styles/layout";
import Button from "../../components/UI/Button";
import {GameMode, GAME_MODES, GAME_MODE_LABELS} from "../../constants/gameMode";
import {WORD_DISPLAY_LABELS, WORD_DISPLAY_LIST, WordDisplay} from "../../constants/wordDisplay";
import {AppText} from "../../components/UI/AppText";
import colors from "../../styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import RoundConfigButton from "../../components/Game/RoundConfigButton";

function StartGame({navigation}) {

    // const wordsOptions = [3, 25, 50, 100];
    const wordsOptions = [3, 25, 100];

    const [numberOfWords, setNumberOfWords] = useState<number | null>(null);
    const [wordDisplay, setWordDisplay] = useState<WordDisplay>(WORD_DISPLAY_LIST.WORD);
    const [gameMode, setGameMode] = useState<GameMode>(GAME_MODES.WRITE);

    const startGame = () => {
        console.log('starting...');
        navigation.navigate('Game', {
            numberOfWords,
            gameMode,
            wordDisplay
        });
    };

    return <View style={layout.container}>
        <ScrollView>
            <View>
                <View style={[layout.mb15, styles.configurationLabelWrapper]}>
                    <Ionicons name='game-controller-outline' size={18} color={colors.colorPrimary} style={layout.mr5}/>
                    <AppText style={[styles.configurationLabel]} variant='bold'>Game mode</AppText>
                </View>
                <View style={styles.roundConfigWrapper}>
                    {Object.entries(GAME_MODE_LABELS).map(([mode, labelData]) =>
                        (<RoundConfigButton onPress={() => { setGameMode(mode as GameMode); }} key={'game-mode-' + mode} iconName={labelData.icon} isSelected={mode == gameMode}>{labelData.label}</RoundConfigButton>))}

                </View>
            </View>
            <View>
                <View style={[layout.mb15, styles.configurationLabelWrapper]}>
                    <Ionicons name='eye-outline' size={18} color={colors.colorPrimary} style={layout.mr5}/>
                    <AppText style={[styles.configurationLabel]} variant='bold'>Word display</AppText>
                </View>
                <View style={styles.roundConfigWrapper}>
                    {Object.entries(WORD_DISPLAY_LABELS).map(([wDisplay, wLabelData]) =>
                        (<RoundConfigButton
                            key={'word-display-' + wDisplay}
                            iconName={wLabelData.icon}
                            isSelected={wDisplay == wordDisplay}
                            onPress={() => {
                                setWordDisplay(wDisplay as WordDisplay);
                            }}>{wLabelData.label}</RoundConfigButton>))}
                </View>
            </View>
            <View>
                <View style={[layout.mb15, styles.configurationLabelWrapper]}>
                    <Ionicons name='add-outline' size={18} color={colors.colorPrimary} style={layout.mr5}/>
                    <AppText style={[styles.configurationLabel]} variant='bold'>Number of words</AppText>
                </View>
                <View style={[styles.selectionsContainer, layout.mb10]}>
                    {wordsOptions.map(value =>
                        (<Button key={'words-number-' + value} onPress={() => {
                            setNumberOfWords(value);
                        }} outerButtonClass={styles.wordsSelectionMainButton} outerPressableClass={[styles.wordsSelectionButton, numberOfWords == value && styles.wordsSelectionSelected]} outerTextClass={[styles.wordsSelectionButtonText, numberOfWords == value && styles.wordsSelectionButtonTextSelected]}>{value}</Button>))}
                    <Button onPress={() => {
                        setNumberOfWords(null);
                    }} outerButtonClass={styles.wordsSelectionMainButton} outerPressableClass={[styles.wordsSelectionButton, numberOfWords == null && styles.wordsSelectionSelected]}>
                        <Ionicons name='infinite-outline' size={20} color={numberOfWords == null ? colors.colorPrimary : colors.colorDefaultText} style={layout.mr5}/>
                    </Button>
                </View>
            </View>
            <View style={styles.selectionWrapper}>
                <Button style='primary' onPress={startGame}>Start game</Button>
            </View>
        </ScrollView>
    </View>;
}

export default StartGame;

const styles = StyleSheet.create({
    selectionsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.colorDefault,
        borderRadius: 9999,
        paddingVertical: 5
    },
    selectionWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    configurationLabelWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    configurationLabel: {
        fontSize: 16,
    },
    roundConfigWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    wordsSelectionMainButton: {
        borderRadius: 9999,
        paddingHorizontal: 0,
        paddingVertical: 12,
        alignSelf: 'flex-start',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 3
    },
    wordsSelectionButton: {
        width: 85,
        backgroundColor: colors.colorDefault,
    },
    wordsSelectionSelected: {
        backgroundColor: colors.lightColor,
    },
    wordsSelectionButtonText: {
        fontSize: 14,
        color: colors.colorDefaultText
    },
    wordsSelectionButtonTextSelected: {
        color: colors.primaryTextColor
    }
});