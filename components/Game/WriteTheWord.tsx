import {View, Text, TextInput, StyleSheet} from "react-native";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {useContext, useState, useEffect, useRef} from "react";
import {GameContext} from "../../context/GameContext";

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
        .map((char, index) => (revealed[index] ? char : ' '))
        .join('');


    return <View>
        <View>
            <Text>{currentWord.word}</Text>
        </View>
        <View>
            <Text>{hint}</Text>
        </View>
        <View>
            <Input textInputConfig={{value: guess, onChangeText: setGuess}}/>
        </View>
        <View>
            <Button style="primary" onPress={guessWord}>Check</Button>
        </View>
    </View>;
}

export default WriteTheWord;
