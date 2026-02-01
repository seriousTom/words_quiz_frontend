import {AppText} from "../UI/AppText";
import {StyleSheet, Text} from "react-native";
import colors from "../../styles/colors";
import {WORD_DISPLAY_LIST} from "../../constants/wordDisplay";

function WordDisplay({word, display}) {
    console.log('word:');
    console.log(word);
    switch (display) {
        case WORD_DISPLAY_LIST.WORD:
            return <AppText variant='bold' style={styles.wordText}>{word.word}</AppText>;
        default:
            return <Text>Flash card: {word.word}</Text>
    }

}

export default WordDisplay;

const styles = StyleSheet.create({
    wordText: {
        color: '#0f172a',
        fontSize: 48,
        textAlign: 'center',
    }
});
