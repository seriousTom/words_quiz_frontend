import {Text, View, Pressable, StyleSheet} from "react-native";
import {useState} from "react";
import {layout} from "../../styles/layout";
import Button from "../../components/UI/Button";
import {GameMode, GAME_MODES, GAME_MODE_LABELS} from "../../constants/gameMode";
import {WORD_DISPLAY_LABELS, WORD_DISPLAY_LIST, WordDisplay} from "../../constants/wordDisplay";

function StartGame({navigation}) {
    const wordsOptions = [3, 25, 50, 100];

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
        <View>
            <View style={layout.mb15}>
                <Text style={[layout.label]}>Select number of words</Text>
            </View>
            <View style={[styles.selectionsContainer, layout.mb10]}>
                {wordsOptions.map(value =>
                    (<Button key={'words-number-'+value} onPress={() => {setNumberOfWords(value);}} style={value == numberOfWords ? 'primary' : 'default'} styles={[layout.mh5]}>{value}</Button>))}
            </View>
            <View style={styles.selectionsContainer}>
                <Button onPress={() => {setNumberOfWords(null);}} style={numberOfWords === null ? 'primary' : 'default'}>Endless</Button>
            </View>
        </View>
        <View>
            <View style={layout.mb15}>
                <Text style={[layout.label]}>Select word display</Text>
            </View>
            <View style={[styles.selectionsContainer, layout.mb10]}>
                {Object.entries(WORD_DISPLAY_LABELS).map(([wDisplay, label]) =>
                    (<View style={[styles.selectionWrapper, layout.mb5]} key={'game-mode-'+wDisplay}><Button onPress={() => {setWordDisplay(wDisplay as WordDisplay);}} style={wDisplay == wordDisplay ? 'primary' : 'default'}>{label}</Button></View>))}
            </View>
        </View>
        <View>
            <View style={layout.mb15}>
                <Text style={[layout.label]}>Select game type</Text>
            </View>
            <View style={[styles.selectionsContainer, layout.mb10]}>
                {Object.entries(GAME_MODE_LABELS).map(([mode, label]) =>
                    (<View style={[styles.selectionWrapper, layout.mb5]} key={'game-mode-'+mode}><Button onPress={() => {setGameMode(mode as GameMode);}} style={mode == gameMode ? 'primary' : 'default'}>{label}</Button></View>))}
            </View>
        </View>
        <View style={styles.selectionWrapper}>
            <Button style='primary' onPress={startGame}>Start game</Button>
        </View>
    </View>;
}

export default StartGame;

const styles = StyleSheet.create({
    selectionsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selectionWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    }
});