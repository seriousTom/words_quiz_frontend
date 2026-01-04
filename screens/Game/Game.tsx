import {Text, View} from "react-native";
import {wordsApi} from "../../api/wordsApi";
import {use, useEffect, useState, useContext, useMemo} from "react";
import {GAME_MODES} from "../../constants/gameMode";
import WriteTheWord from "../../components/Game/WriteTheWord";
import {GameContext} from "../../context/GameContext";
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import MultipleChoice from "../../components/Game/MultipleChoice";
import {layout} from "../../styles/layout";

const language = 'es';

const GAME_COMPONENTS = {
    [GAME_MODES.WRITE]: [WriteTheWord],
    [GAME_MODES.MULTIPLE_CHOICE]: [MultipleChoice],
    [GAME_MODES.MIXED]: [WriteTheWord, MultipleChoice],
};

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

    //choose random component when the current word changes for the mixed mode
    const mixedModeComponent = useMemo(() => {
        if (gameMode !== GAME_MODES.MIXED) return null;

        const components = GAME_COMPONENTS[GAME_MODES.MIXED];
        return components[Math.floor(Math.random() * components.length)];
    }, [currentWord, gameMode]);

    const GameModeComponent =
        gameMode === GAME_MODES.MIXED
            ? mixedModeComponent
            : GAME_COMPONENTS[gameMode][0];

    //fetch words when the game is loaded first
    useEffect(() => {
        fetchNextWordsWithLogs(language, gameMode, numberOfWords);
    }, []);

    const isGameOver = useMemo(() => {
        return (
            !isLoading &&
            words.length === 0 &&
            numberOfWords !== null
        );
    }, [isLoading, words, numberOfWords]);

    useEffect(() => {
        //if endless game mode is chosen and need to fetch more words
        if (!isLoading && words.length === 0 && numberOfWords === null) {
            console.log('fetching more words...');
            fetchNextWordsWithLogs(language, gameMode, numberOfWords);
        }
    }, [words, isLoading, numberOfWords, fetchWords]);

    useEffect(() => {
        if (isGameOver) {
            finishGame();
        }
    }, [isGameOver]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // navigation.dispatch(e.data.action);
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
                            console.log('starting to finish game');
                            await finishGame();
                            console.log('game fininished. navigating...');
                            navigation.dispatch(e.data.action);
                        },
                    },
                ]
            );
        });
        return unsubscribe;
    }, [navigation, isGameOver, finishGame]);

    if (isFinishing) return <Text>Finishing game...</Text>;

    if (isGameOver) {
        return <Text>Game over!!!</Text>;
    }

    if (isLoading) {
        console.log('loading');
        return <Text>Loading game...</Text>;
    }

    if (!GameModeComponent) {
        return <Text>Loading mode...</Text>;
    }

    if (!currentWord) {
        console.log('No word');
        return <Text>Loading word...</Text>;
    }

    return <View style={layout.container}>
        <GameModeComponent />
    </View>;
}

export default Game;
