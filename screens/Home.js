import React from 'react';
import { Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { useState } from 'react';
import { UpdateAdminBalanceHooks } from '../Hooks/Hooks';
import Card from '../components/components/TopCard';
import CardTitle from '../components/components/CardTitle';
import { Image } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { HorizontalLine } from '../components/components/HorizontalLine';
import { UserNameHooks } from '../Hooks/Hooks';
// import { Card } from '../components';
import articles from '../constants/articles';
import { argonTheme } from '../constants';
import { Button } from 'galio-framework';
const { width, height } = Dimensions.get('screen');
import { useDispatch, useSelector } from 'react-redux';
import { AllTransactionHooks } from '../Hooks/Hooks';



function Home({ navigation }) {

  const { getUserName, fetchSpecificUserData } = UserNameHooks();
  const { AllTransactions } = AllTransactionHooks();


  const AllDepositsMade = AllTransactions && AllTransactions[0]?.filter((data) => data?.transactiondetails?.split(' ').includes('deposited')).map((data) => data?.amount);
  console.log('All Deposits that has been made', AllDepositsMade);

  const AllWithdrawalsMade = AllTransactions && AllTransactions[0]?.filter((data) => !data?.transactiondetails?.split(' ').includes('deposited')).map((data) => data?.amount);
  console.log('all withdrawals', AllWithdrawalsMade);

  const sumOfAllDepositsMade = AllDepositsMade?.reduce((a, b) => a + b, 0);
  const sumOfAllWithdrawalsMade = AllWithdrawalsMade?.reduce((a, b) => a + b, 0);
  console.log('all sum Deposits', sumOfAllDepositsMade);
  console.log('all withdrawals made', sumOfAllWithdrawalsMade);

  //checking currentBalance 
  const currentBalance = sumOfAllDepositsMade - sumOfAllWithdrawalsMade;

  console.log('current', currentBalance?.toLocaleString())

  const { currentAdminBalance } = UpdateAdminBalanceHooks();

  console.log('my ccc', currentAdminBalance)

  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const [showModal, setModal] = useState(false);

  console.log('device height and width', width, height)

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ flexGrow: 1, left: 20 }}>
          <Text size={30} style={{ top: 50, fontWeight: 'bold', color: 'white' }} > Hi {
            fetchSpecificUserData && getUserName?.length > 0 ? getUserName + "!" : "Loading"}</Text>
          <Text size={20} style={{ top: 50, fontWeight: 'normal', opacity: 0.6, color: argonTheme.COLORS.SECONDARY,left:10 }} >Welcome</Text>
        </View>
        <View style={{ flexGrow: 1 }}>
          <Card style={{ flexDirection: 'row', height: 70 }}>
            <Image
              source={{ uri: 'https://itexus.com/wp-content/uploads/2020/08/digital-wallet-1.jpg' }}
              style={styles.avatar}
            />
            <Text style={{ top: 30, fontWeight: 'bold' }} color={argonTheme.COLORS.PRIMARY} size={19}  >E-Wallet</Text>

          </Card>
        </View>
      </View>

      <View style={{flexDirection :'row'}}>

      <View style={{ flexDirection: 'column', left: 20 }}>
        <Text size={20} style={{ top: 50, fontWeight: 'normal', opacity: 0.6, color: argonTheme.COLORS.SECONDARY }} >Current Balance</Text>
        <Text size={35} style={{ top: 60, fontWeight: 'bold', color: 'white', left: -20 }} >  {isNaN(currentAdminBalance) ? "Loading..." : "GHC" + currentAdminBalance}</Text>
      </View>
     
      </View>

     

     
      <View style={{ top: width > 360 ? height * 0.09 : height * 0.09 }}>
        <View style={{ flexDirection: 'row', top: -35, left: width > 360 ? -6 : -10 }}>
          <Pressable style={({ pressed }) => [pressed ? styles.buttonPress : null]} onPress={() => navigation.navigate('Deposit')}>
            <Card style={{ width: width > 360 ? width * 0.45 : width * 0.45, flexDirection: 'column', paddingHorizontal: 0, borderRadius: 10, borderColor: argonTheme.COLORS.PLACEHOLDER, borderWidth: 1, left: 0, height: 120 }}>
              <MaterialCommunityIcons name="bank-transfer" size={35} color="white" style={{ backgroundColor: argonTheme.COLORS.PRIMARY, padding: 10, margin: 10, borderRadius: 10, top: 10, textAlign: 'center' }} />
              <Text style={{ top: 0, textAlign: 'center', padding: 8 }} size={RFValue(19)} color={argonTheme.COLORS.PRIMARY}>Savings</Text>
            </Card>
          </Pressable>
          <Pressable style={({ pressed }) => [pressed ? styles.buttonPress : null]} onPress={() => navigation.navigate('Withdrawal')}>
            <Card style={{ width: width > 360 ? width * 0.45 : width * 0.45, flexDirection: 'column', paddingHorizontal: 0, borderRadius: 10, borderColor: argonTheme.COLORS.PLACEHOLDER, borderWidth: 1, left: -30, height: 120 }}>
              <AntDesign name="retweet" size={35} color="white" style={{ backgroundColor: argonTheme.COLORS.PRIMARY, padding: 10, margin: 10, borderRadius: 10, top: 10, textAlign: 'center' }} />
              <Text  style={{ top: 0, textAlign: 'center', padding: 8 }} size={RFValue(19)} color={argonTheme.COLORS.PRIMARY}>Withdrawal</Text>
            </Card>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', top: -70, left: width > 360 ?-6 : -10 }} onPress={() => navigation.navigate('Activity')}>
          <Pressable style={({ pressed }) => [pressed ? styles.buttonPress : null]} >
            <Card style={{ width: width > 360 ? width * 0.45 : width * 0.45, flexDirection: 'column', paddingHorizontal: 0, borderRadius: 10, borderColor: argonTheme.COLORS.PLACEHOLDER, borderWidth: 1, left: 0, height: 120 }}>
              <FontAwesome name="money" size={35} color="white" style={{ backgroundColor: argonTheme.COLORS.PRIMARY, padding: 10, margin: 10, borderRadius: 10, top: 10, textAlign: 'center' }} />
              <Text  style={{ top: 0, textAlign: 'center', padding: 8 }} size={RFValue(19)} color={argonTheme.COLORS.PRIMARY}>Loans</Text>
            </Card>
          </Pressable>

          <Pressable style={({ pressed }) => [pressed ? styles.buttonPress : null]} onPress={() => navigation.navigate('Activity')}>
            <Card style={{ width: width > 360 ? width * 0.45 : width * 0.45, flexDirection: 'column', paddingHorizontal: 0, borderRadius: 10, borderColor: argonTheme.COLORS.PLACEHOLDER, borderWidth: 1, left: -30, height: 120 }}>
              <Feather name="activity" size={35} color="white" style={{ backgroundColor: argonTheme.COLORS.PRIMARY, padding: 10, margin: 10, borderRadius: 10, top: 10, textAlign: 'center' }} />
              <Text  style={{ top: 0, textAlign: 'center', padding: 8 }} size={RFValue(19)} color={argonTheme.COLORS.PRIMARY}>Transactions</Text>
            </Card>
          </Pressable>
        </View>
        
      </View>

    </View>
  )
}



const styles = StyleSheet.create({
  home: {
    width: width,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 0,
    alignSelf: 'flex-start',
    margin: 10
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  buttonPress: {
    opacity: 0.5
}
});

export default Home;
