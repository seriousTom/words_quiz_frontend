import {Text, View} from "react-native";
import {wordsApi} from "../../api/wordsApi";
import {use, useEffect, useState, useContext, useMemo} from "react";
import {GAME_MODES} from "../../constants/gameMode";
import WriteTheWord from "../../components/Game/WriteTheWord";
import {GameContext} from "../../context/GameContext";
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

function Game({route}) {
    const navigation = useNavigation();
    const {numberOfWords, gameMode} = route.params;
    const {
        words,
        currentWord,
        isLoading,
        isFinishing,
        fetchWords,
        fetchNextWordsWithLogs,
        getNextWord,
        handleCorrectGuess,
        finishGame
    } = useContext(GameContext);

    //fetch words when the game is loaded first
    useEffect(() => {
        fetchNextWordsWithLogs(numberOfWords);
    }, []);

    const isGameOver = useMemo(() => {
        return (
            !isLoading &&
            words.length === 0 &&
            numberOfWords !== null
        );
    }, [isLoading, words, numberOfWords]);

    useEffect(() => {
        if (!isLoading && words.length === 0 && numberOfWords === null) {
            console.log('fetching more words...');
            fetchNextWordsWithLogs(numberOfWords);
        }
    }, [words, isLoading, numberOfWords, fetchWords]);

    useEffect(() => {
        if (isGameOver) {
            finishGame();
        }
    }, [isGameOver]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (isGameOver) return;
            e.preventDefault();
            Alert.alert(
                'Leave game?',
                'Do you really want to finish?',
                [
                    {text: 'Stay', style: 'cancel'},
                    {
                        text: 'Leave',
                        style: 'destructive',
                        onPress: async () => {
                            await finishGame();
                            navigation.dispatch(e.data.action);
                        },
                    },
                ]
            );
        });
        return unsubscribe;
    }, [navigation, isGameOver, finishGame]);

    if (isLoading) {
        console.log('loading');
        return <Text>Loading game...</Text>;
    }

    if (isFinishing) return <Text>Finishing game...</Text>;

    if (isGameOver) {
        return <Text>Game over!!!</Text>;
    }


    if (!currentWord) {
        console.log('No word');
        return <Text>Loading word...</Text>;
    }

    let gameModeComponent = null;

    switch (gameMode) {
        case GAME_MODES.WRITE:
            gameModeComponent = <WriteTheWord/>;
    }

    return <View>
        {gameModeComponent}
    </View>;
}

export default Game;
