import {Text, View} from "react-native";
import {wordsApi} from "../../api/wordsApi";
import {use, useEffect, useState, useContext} from "react";
import {GAME_MODES} from "../../constants/gameMode";
import WriteTheWord from "../../components/Game/WriteTheWord";
import {GameContext} from "../../context/GameContext";
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

function Game({route}) {
    const navigation = useNavigation();
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const {numberOfWords, gameMode} = route.params;
    const {words, currentWord, isLoading, fetchWords, getNextWord, handleCorrectGuess, finishGame} = useContext(GameContext);

    //fetch words when the game is loaded first
    useEffect(() => {
        fetchWords(numberOfWords);
    }, []);

    useEffect(() => {
        console.log('words number changed');
    }, [words]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert(
                'Leave game?',
                'Do you really want to finish?',
                [
                    { text: 'Stay', style: 'cancel' },
                    {
                        text: 'Leave',
                        style: 'destructive',
                        onPress: () => {
                            navigation.dispatch(e.data.action);
                            finishGame();
                        },
                    },
                ]
            );
        });
        return unsubscribe;
    }, [navigation]);

    if (isLoading) {
        console.log('loading');
        return <Text>Loading...</Text>;
    }

    if (words.length === 0) {
        //null means endless mode
        if(numberOfWords == null) {
            console.log('fetch more words');
            fetchWords(numberOfWords);
            return ;
        }
        finishGame();
        return <Text>Game over!!!</Text>;
    }

    // if (!currentWord) {
    //     console.log('No word');
    //     return <Text>No current word</Text>;
    // }

    let gameModeComponent = null;

    switch (gameMode) {
        case GAME_MODES.WRITE:
            gameModeComponent = <WriteTheWord />;
    }

    return <View>
        {gameModeComponent}
    </View>;
}

export default Game;
