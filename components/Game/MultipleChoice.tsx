import {View, Text, TextInput, StyleSheet} from "react-native";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {useContext, useState, useEffect, useRef} from "react";
import {GameContext} from "../../context/GameContext";
import colors from "../../styles/colors";
import {layout} from "../../styles/layout";
import {AppText} from "../UI/AppText";
import VariantButton from "./VariantButton";

function MultipleChoice() {
    const mistakes = useRef(0);
    const {currentWord, handleCorrectGuess, logGuess} = useContext(GameContext);
    const variantStyles = [

    ];

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

    return <View>
        <View style={layout.mb15}>
            <AppText variant='bold' style={styles.wordText}>{currentWord.word}</AppText>
        </View>
        {/*<View>*/}
        {/*    {currentWord.candidates.map((candidate) => <Button key={'candidate-' + candidate.id} style="primary" onPress={() => { guessWord(candidate) } }>{candidate.translation}</Button>)}*/}
        {/*</View>*/}
        <View style={styles.variantsWrapper}>
            {currentWord.candidates.map((candidate, variantIndex) => <VariantButton key={'candidate-' + candidate.id} variantIndex={variantIndex} outerButtonStyles={[layout.fullWidth, layout.mb15]} style="light" onPress={() => { guessWord(candidate) } }>{candidate.translation}</VariantButton>)}
        </View>
    </View>;
}

export default MultipleChoice;


const styles = StyleSheet.create({
    wordText: {
        color: colors.primaryTextColor,
        fontSize: 48,
        textAlign: 'center',
    },
    variantsWrapper: {
        // borderWidth: 1,
        // borderColor: '#000',
    }
});
