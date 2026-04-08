import {Pressable, StyleSheet} from "react-native";
import colors from "../../styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {AppText} from "../UI/AppText";

function RoundConfigButton({children, onPress, isSelected = false, iconName}) {
    return <Pressable onPress={onPress} style={({pressed}) => [styles.roundConfigButton, pressed && styles.buttonPressed, isSelected && styles.selected]}>
        <Ionicons name={iconName} size={18} color={isSelected ? colors.colorPrimary : colors.colorDefaultText}/>
        <AppText style={[styles.roundConfigButtonText, isSelected && styles.selectedText]} variant='bold'>{children}</AppText>
    </Pressable>;
}

const styles = StyleSheet.create({
    roundConfigButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 90,
        borderWidth: 1,
        borderRadius: 48,
        borderColor: colors.colorLightBorder,
    },
    roundConfigButtonText: {
        color: colors.colorDefaultText,
        fontSize: 12,
        textAlign: 'center'
    },
    buttonPressed: {
        borderColor: colors.colorPrimary
    },
    selected: {
        borderColor: colors.colorPrimary,
        borderWidth: 2,
        backgroundColor: colors.colorPrimary+'08'
    },
    selectedText: {
        color: colors.colorPrimary
    }
});

export default RoundConfigButton;