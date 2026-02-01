import {View, Text, TextInput, StyleSheet} from "react-native";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {useContext, useState, useEffect, useRef} from "react";
import {GameContext} from "../../context/GameContext";
import {layout} from "../../styles/layout";
import colors from "../../styles/colors";
import {AppText} from "../UI/AppText";
import Ionicons from "@expo/vector-icons/Ionicons";
import WordDisplay from "./WordDisplay";

function WriteTheWord({wordDisplayType}) {
    const mistakes = useRef(0);
    const [guess, setGuess] = useState('');
    const {currentWord, handleCorrectGuess, logGuess} = useContext(GameContext);
    const [revealed, setRevealed] = useState([]);

    useEffect(() => {
        const length = currentWord.translations[0].translation.length;
        setRevealed(Array(length).fill(false));
    }, [currentWord]);

    const revealRandomLetter = () => {
        const hiddenIndexes = revealed
            .map((isVisible, index) => (!isVisible ? index : null))
            .filter(index => index !== null);

        if (!hiddenIndexes.length) return;

        const randomIndex =
            hiddenIndexes[Math.floor(Math.random() * hiddenIndexes.length)];

        setRevealed(prev =>
            prev.map((val, idx) => (idx === randomIndex ? true : val))
        );
    };


    const guessWord = () => {
        if (!guess) {
            return;
        }

        const match = currentWord.translations.find((translation) => {
            return translation.translation.toLowerCase() == guess.toLowerCase();
        });

        if (!match) {
            mistakes.current += 1;
            revealRandomLetter();
            return;
        }

        //todo: make choosable language in start game screen
        logGuess('es', currentWord.id, mistakes.current);
        setGuess('');
        handleCorrectGuess();
        mistakes.current = 0;
    };

    const translation = currentWord.translations[0].translation;

    const hint = translation
        .split('')
        .map((char, index) => (revealed[index] ? char : '-'))
        .join('');


    return <View>
        <View style={layout.mb15}>
            <WordDisplay display={wordDisplayType} word={currentWord}/>
            {/*<AppText variant='bold' style={styles.wordText}>{currentWord.word}</AppText>*/}
        </View>
        <View style={[layout.mb20, styles.taskContainer]}>
            <Ionicons name='language-outline' size={24} color={colors.colorPrimary} /><AppText variant='bold' style={styles.taskText}>TRANSLATE TO SPANISH</AppText>
        </View>
        <View style={[styles.hintContainer, layout.mb20]}>
            {translation.split('').map((char, index) => {
                return <View style={[styles.hintLetterWrapper, revealed[index] ? styles.hintLetterRevealed : styles.hintLetterHidden]} key={'hint-' + index}><AppText variant='bold' style={styles.hintLetter}>{revealed[index] ? char : ' '}</AppText></View>;
            })}
        </View>
        {/*<View>*/}
        {/*    <Text>{hint}</Text>*/}
        {/*</View>*/}
        <View>
            <Input style={[layout.mb20]} textInputConfig={{placeholder: 'Type translation...', value: guess, onChangeText: setGuess}} icon='pencil-sharp' />
        </View>
        <View>
            <Button style="primary" outerButtonStyles={[layout.fullWidth]} onPress={guessWord} options={{icon: 'checkmark-circle-outline'}}>GUESS</Button>
        </View>
    </View>;
}

export default WriteTheWord;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    wordText: {
        color: '#0f172a',
        fontSize: 48,
        textAlign: 'center',
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    taskText: {
        fontSize: 14,
        color: colors.colorDefaultBorder
    },
    hintContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    hintLetterWrapper: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: '50%',
        width: 36,
        height: 36,
        paddingVertical: 0,
        marginHorizontal: 5,
        marginBottom: 3
    },
    hintLetterHidden: {
        borderStyle: 'dashed',
        backgroundColor: '#fff',
        borderColor: colors.colorDefaultActive
    },
    hintLetterRevealed: {
        borderStyle: 'solid',
        backgroundColor: colors.colorInfo,
        borderColor: colors.colorPrimaryActive
    },
    hintLetter: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.colorPrimaryActive,
    }
});
