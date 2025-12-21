import {Text, View} from "react-native";
import {wordsApi} from "../../api/wordsApi";
import {use, useEffect, useState, useContext} from "react";
import {GAME_MODES} from "../../constants/gameMode";
import WriteTheWord from "../../components/Game/WriteTheWord";
import {GameContext} from "../../context/GameContext";

function Game({route}) {
    const {numberOfWords, gameMode} = route.params;
    const {words, currentWord, usedWords, isLoading, fetchWords, getNextWord, handleCorrectGuess} = useContext(GameContext);

    useEffect(() => {
        fetchWords(numberOfWords);
    }, []);

    useEffect(() => {
        if (!words.length) return;
        getNextWord();
    }, [words]);

    let gameModeComponent = null;

    switch (gameMode) {
        case GAME_MODES.WRITE:
            gameModeComponent = <WriteTheWord word={currentWord} onCorrectGuess={(guessesNumber) => {
                handleCorrectGuess(guessesNumber);
            }}/>;
    }

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (words.length === 0) {
        return <Text>Game over!!!</Text>;
    }

    if (!currentWord) {
        return <Text>No current word</Text>;
    }

    return <View>
        {gameModeComponent}
    </View>;
}

export default Game;
