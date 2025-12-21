import {createContext, useState} from "react";
import {wordsApi} from "../api/wordsApi";
import {Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GameContext = createContext(null);

export const GameProvider = ({children}) => {
    const [words, setWords] = useState([]);
    const [usedWords, setUsedWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const guesseslogs = {};

    const fetchWords = async (numberOfWords) => {
        setIsLoading(true);
        const {data: {data}} = await wordsApi.list('es', numberOfWords);
        setWords(data);
        setIsLoading(false);
    };

    const getNextWord = () => {
        const word = words.length > 0 ? words[Math.floor(Math.random() * words.length)] : null;
        setCurrentWord(word);
    };

    const handleCorrectGuess = () => {
        // getNextWord();
        setUsedWords([...usedWords, currentWord.word]);
        setWords(prevWords => {
                return prevWords.filter(prevWord => prevWord.word.toLowerCase() != currentWord.word.toLowerCase())
            }
        );
    };

    const logGuesss = async (wordId, guessesCount) => {
        if(guesseslogs[wordId]) {
            guesseslogs[wordId].guesses_count += guessesCount;
            guesseslogs[wordId].times_shown += 1;
        } else {
            guesseslogs[wordId] = {
                guesses_count: guessesCount,
                time_shown: 1
            }
        }

        await AsyncStorage.setItem('guesses_logs', guesseslogs);
    };

    return <GameContext.Provider value={{words, currentWord, usedWords, isLoading, fetchWords, getNextWord, handleCorrectGuess}}>{children}</GameContext.Provider>;
};