import {createContext, useRef, useState, useMemo} from "react";
import {wordsApi} from "../api/wordsApi";
import {Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GameContext = createContext(null);

export const GameProvider = ({children}) => {
    const [words, setWords] = useState([]);
    // const [currentWord, setCurrentWord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinishing, setIsFinishing] = useState(false);
    const guessesLogs = useRef({});
    const currentWord = useMemo(() => {
        console.log('get next word memo');
        if (!words.length) return null;
        return words[Math.floor(Math.random() * words.length)];
    }, [words]);

    const fetchWords = async (numberOfWords) => {
        // setIsLoading(true);
        const {data: {data}} = await wordsApi.list('es', numberOfWords);
        setWords(data);
        // setIsLoading(false);
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
        setIsFinishing(true);
        const guessesLog = await AsyncStorage.getItem('guesses_logs')
        await wordsApi.logGuesses('es', JSON.parse(guessesLog));
        await AsyncStorage.removeItem('guesses_logs');
        guessesLogs.current = {};
        setIsFinishing(false);
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

    const fetchNextWordsWithLogs = async (numberOfWords) => {
        setIsLoading(true);

        // Flush local logs first
        const logs = await AsyncStorage.getItem('guesses_logs');
        if (logs) {
            await wordsApi.logGuesses('es', JSON.parse(logs));
            await AsyncStorage.removeItem('guesses_logs'); // clear local logs
            guessesLogs.current = {};
        }

        // Fetch next batch
        await fetchWords(numberOfWords);
        setIsLoading(false);
    };

    return <GameContext.Provider value={{words, currentWord, isLoading, fetchWords, fetchNextWordsWithLogs, getNextWord, handleCorrectGuess, logGuess, finishGame, isFinishing, setIsFinishing}}>{children}</GameContext.Provider>;
};