import { Text, StyleSheet, Pressable } from "react-native";
import ButtonLoader from "./ButtonLoader";
import Colors from "../../util/Color";

import { argonTheme } from "../../constants";
import { Dimensions } from 'react-native';


const FormButton = ({ onPress, disabled, additionalStyle, ButtonTitle, submitting, textStyle, loaderColor }) => {


    return (<Pressable style={(pressed) => pressed && [styles.button, { ...additionalStyle }, disabled ? styles.pressed : null]} onPress={onPress} disabled={disabled}>
        <Text style={[styles.buttonText, textStyle]}> {submitting ? <ButtonLoader color={loaderColor} /> : ButtonTitle}</Text></Pressable>)
}


export default FormButton;
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    button: {
        backgroundColor: argonTheme.COLORS.PRIMARY,
        width: width > 360 ? width * 0.78 : width * 0.79,
        padding: 15,
        marginTop: 1,
        borderRadius: 4
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: Colors.primaryColor400,
        fontWeight: 'bold'
    },
    pressed: {
        opacity: 0.5
    }
})