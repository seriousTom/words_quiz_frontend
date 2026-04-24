import {Pressable, StyleSheet, View} from "react-native";
import colors from "../../styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {AppText} from "../UI/AppText";

function CategorySelectionButton({children, onPress, isSelected = false, iconName, outerButtonStyle = []}) {
    return <Pressable onPress={onPress} style={({pressed}) => [styles.categoryButton, outerButtonStyle, pressed && styles.buttonPressed, isSelected && styles.selected]}>
        <View style={styles.firstBlock}>
            <View>
                <View style={[styles.iconBlock, isSelected && {backgroundColor: colors.colorPrimary+'33'}]}>
                    <Ionicons name={iconName} size={18} color={isSelected ? colors.colorPrimaryActive : colors.colorDefaultText}/>
                </View>
            </View>
            <View style={styles.textBlock}>
                <AppText style={[styles.categoryButtonText, isSelected && styles.selectedText]} variant='bold'>{children}</AppText>
                <AppText style={[styles.wordsText, isSelected && styles.selectedText]} variant='bold'>158 text</AppText>
            </View>
        </View>
        <View>
            <View style={[styles.checkWrapper, isSelected && {borderColor: colors.colorPrimary}]}>
                {isSelected && <Ionicons name="checkmark-outline" size={18} color={colors.colorPrimaryActive}/>}
            </View>
        </View>
    </Pressable>;
}

const styles = StyleSheet.create({
    categoryButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 90,
        borderWidth: 1,
        borderRadius: 48,
        borderColor: colors.colorLightBorder,
    },
    firstBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    iconBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.colorDefault,
        width: 48,
        height: 48,
        borderRadius: '50%'
    },
    textBlock: {
        marginLeft: 15
    },
    categoryButtonText: {
        color: colors.darkTextColor,
        fontSize: 16,
        textAlign: 'center'
    },
    wordsText: {
        fontSize: 12,
        color: colors.secondaryText
    },
    checkWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: colors.secondaryBorder,
        borderRadius: '50%',
        marginRight: 15

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

export default CategorySelectionButton;