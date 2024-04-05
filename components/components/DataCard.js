import { View, Text, StyleSheet } from "react-native";
import { Ionicons, Feather, Entypo } from "@expo/vector-icons";
import Colors from "../../util/Color";
import { useNavigation } from "@react-navigation/native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HorizontalLine } from './HorizontalLine';
import { argonTheme } from "../../constants";

const DataCard = ({ firstname, phone, username, lastname, accountnumber, id, customer, activity }) => {
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const width = Dimensions.get('window').width;

    console.log('device width ',width)
    const navigateToTransactionDetail = () => {
        if (customer) {
            navigation.navigate('ViewSingleUser', {
                data_id: id
            });
        }




        // navigation.navigate('HomeScreen', { screen: 'Active' });
    }
    return (
        <><Pressable style={({ pressed }) => [pressed ? styles.buttonPress : null]} onPress={navigateToTransactionDetail}>
            <View style={styles.flatlistContainer}>
                <View style={styles.flatListActivity}>
                    <Entypo name='user' size={90} color={argonTheme.COLORS.GRADIENT_START} style={{ textAlign: 'center', verticalAlign: "middle" }} />
                    {/* <Image source={{ uri: user.file }} style={styles.imageStyle} /> */}

                </View>
                {/* <View style={styles.flatListTextContainer}>
    <Text style={styles.flatlistText} >
        {accountnumber}
    </Text>
  
</View> */}
                <View style={styles.flatListTextContainer}>
                    <Text style={styles.flatlistText}  numberOfLines={1}>
                        {firstname} {lastname}
                    </Text>

                    <View style={{ flex: 1, flexDirection: 'row', alignItem: 'flex-end',top : 40,justifyContent :'center',left: width >= 360 ? 30 : 18 }}>
                    <Text style={{fontSize : 20,top : -8 ,padding : 5,color : 'black'}}>{accountnumber}</Text>
                        <Text style={{fontSize : 20,top : -8 ,padding : 5,color : 'black'}}>{username}</Text>
                    
                    </View>
                </View>



                {/* <View>
    <Pressable android_ripple={{ color: Colors.primaryColor100 }} style={({ pressed }) => [styles.view, pressed ? styles.buttonPress : null]} onPress={navigateToTransactionDetail} ><Text style={styles.viewText}> <Feather name='eye' size={25} color={Colors.primaryColor800} /> </Text></Pressable>
</View> */}
            </View>
            <HorizontalLine />
        </Pressable></>
    )
}

export default DataCard;

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    flatlistContainer: {
        position: 'relative',
        zIndex: 999,
        flex: 1,
        borderColor: argonTheme.COLORS.BORDER_COLOR,
        borderWidth: 2,
        height: 110,
        textShadowColor: 'rgba(25,11,123,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        //borderRadius: 1,
        flexDirection: 'row',
        shadowColor: 'blue',
        //padding: 1,
        backgroundColor: argonTheme.COLORS.SECONDARY,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        elevation: 12,
        borderRadius: 10,
        // marginRight: 30,
        marginBottom: 5,
        width: width > 360 ? width * 0.9 : width / 3,
        left: 16,


    },
    flatlistText: {
        margin: 2,
        color: argonTheme.COLORS.GRADIENT_START,
        fontSize: 22,
        fontWeight: 'bold',
        top: 30,
        left: 20,
        


    },

    card: {
        flex: 1,
        // minHeight: 450,
        //marginTop: 30,
        //marginBottom: 30,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 15,
        shadowColor: 'blue',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        paddingBottom: 2,
        elevation: 0.1,
        top: 0,
        height: 30

    },
    flatListTextContainer: {
        paddingBottom: 1,
        marginHorizontal: 2
    },
    flatListActivity: {
        marginTop: 3,
        marginLeft: 5,
        backgroundColor: 'white',
        height: 100,
        width: 100,
        borderRadius: 10
    },
    date: {
        color: Colors.primaryColor400,
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 12
    },
    viewText: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        top: 2,
        color: Colors.primaryColor800

    },
    buttonPress: {
        opacity: 0.9
    }
})