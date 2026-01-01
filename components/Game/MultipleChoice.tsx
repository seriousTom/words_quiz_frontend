import {View, Text, TextInput, StyleSheet} from "react-native";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {useContext, useState, useEffect, useRef} from "react";
import {GameContext} from "../../context/GameContext";

function MultipleChoice() {
    const mistakes = useRef(0);
    const {currentWord, handleCorrectGuess, logGuess} = useContext(GameContext);

    const guessWord = (guess) => {
        if (guess.id != currentWord.correct.id) {
            mistakes.current += 1;
            return;
        }

        //todo: make choosable language in start game screen
        logGuess('es', currentWord.id, mistakes.current);
        handleCorrectGuess();
        mistakes.current = 0;
    };
console.log(currentWord);
    //todo: remove
    // if(!currentWord) {
    //     return <Text>No word</Text>;
    // }

    return <View>
        <View>
            <Text>{currentWord.word}</Text>
        </View>
        {currentWord.candidates.map((candidate) => <Button key={'candidate-' + candidate.id} style="primary" onPress={() => { guessWord(candidate) } }>{candidate.translation}</Button>)}
    </View>;
}

export default MultipleChoice;
