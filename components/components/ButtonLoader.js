import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Dimensions } from "react-native";

const ButtonLoader = ({ color }) => {
    return (<View >
        <ActivityIndicator style={styles.loaderStyle} color={color} /></View>
    )
}


export default ButtonLoader;
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    loaderStyle: {
        transform: [{ scaleX: 2 }, { scaleY: 2 }],
        left: width > 360 ? 150 : -5
    }
})
