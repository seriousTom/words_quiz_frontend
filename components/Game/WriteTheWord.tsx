import {View, Text, TextInput} from "react-native";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {useState} from "react";

function WriteTheWord({word, onCorrectGuess}) {
    const [guessesCount, setGuessesCount] = useState(0);
    const [guess, setGuess] = useState('');

    const guessWord = () => {
        if (!guess) {
            return;
        }

        const match = word.translations.find((translation) => {
            return translation.translation.toLowerCase() == guess.toLowerCase();
        });

        if (!match) {
            setGuessesCount(guessesCount + 1);
            return;
        }

        setGuess('');
        onCorrectGuess(guessesCount);
    };

    return <View>
        <View>
            <Text>{word.word}</Text>
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
