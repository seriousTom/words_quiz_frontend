import {View, Text, TextInput, StyleSheet} from "react-native";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {useContext, useState, useEffect, useRef} from "react";
import {GameContext} from "../../context/GameContext";
import {layout} from "../../styles/layout";

function WriteTheWord() {
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
        <View>
            <Text style={styles.wordText}>{currentWord.word}</Text>
        </View>
        <View style={styles.hintContainer}>
            {translation.split('').map((char, index) => {
                return <View style={styles.hintLetterWrapper}><Text>{revealed[index] ? char : ' '}</Text></View>;
            })}
        </View>
        <View>
            <Text>{hint}</Text>
        </View>
        <View>
            <Input style={[layout.mb20]} textInputConfig={{placeholder: 'Type translation...', value: guess, onChangeText: setGuess}} icon='pencil-sharp' />
        </View>
        <View>
            <Button style="primary" outerStyles={[layout.fullWidth]} onPress={guessWord} options={{icon: 'checkmark-circle-outline'}}>GUESS</Button>
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
        fontWeight: 'bold',
        fontSize: 48,
        textAlign: 'center',
    },
    hintContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    hintLetterWrapper: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: '50%',
        width: 36,
        height: 36,
        marginHorizontal: 5
    }
});
