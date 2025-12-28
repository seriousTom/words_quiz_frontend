import {createContext, useRef, useState, useMemo} from "react";
import {wordsApi} from "../api/wordsApi";
import {Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GameContext = createContext(null);

export const GameProvider = ({children}) => {
    const [words, setWords] = useState([]);
    // const [currentWord, setCurrentWord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const guessesLogs = useRef({});
    const currentWord = useMemo(() => {
        console.log('get next word memo');
        if (!words.length) return null;
        return words[Math.floor(Math.random() * words.length)];
    }, [words]);

    const fetchWords = async (numberOfWords) => {
        setIsLoading(true);
        const {data: {data}} = await wordsApi.list('es', numberOfWords);
        setWords(data);
        setIsLoading(false);
    };

    //unused for now
    const getNextWord = () => {
        console.log('get next word function');
        const word = words.length > 0 ? words[Math.floor(Math.random() * words.length)] : null;
        // setCurrentWord(word);
    };

    const handleCorrectGuess = () => {
        //remove one word from loaded words after correct guess
        setWords(prevWords => {
                return prevWords.filter(prevWord => prevWord.word.toLowerCase() != currentWord.word.toLowerCase())
            }
        );
    };

    const finishGame = async () => {
        setIsLoading(true);
        const guessesLog = await AsyncStorage.getItem('guesses_logs')
        await wordsApi.logGuesses('es', JSON.parse(guessesLog));
        setIsLoading(false);
    };

    const logGuess = async (language, wordId, mistakes) => {
        const logs = guessesLogs.current;

        if (!logs[language]) {
            logs[language] = {};
        }

        if(!logs[language][wordId]) {
            logs[language][wordId] = {
                language: language,
                word_id: wordId,
                mistakes: 0,
                times_shown: 0,
                last_shown: null,
            }
        }

        logs[language][wordId].mistakes += mistakes;
        logs[language][wordId].times_shown += 1;
        logs[language][wordId].last_shown = new Date().toISOString();

        await AsyncStorage.setItem('guesses_logs', JSON.stringify(logs));
    };

    return <GameContext.Provider value={{words, currentWord, isLoading, fetchWords, getNextWord, handleCorrectGuess, logGuess, finishGame}}>{children}</GameContext.Provider>;
};