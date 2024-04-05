import { View, Text, StyleSheet, FlatList, ImageBackground, Image } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Title from "../components/Title";
// import PageGradient from "../components/PageGradient";
// import Card from "../components/TopCard";
// import FlatListHeader from "../components/FlatListHeader";
// import RenderFlatList from "../components/RenderFlatList";
// import { data } from "../data";
import Colors from "../util/Color";
import PageLoader from "../components/components/PageLoader";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "../components";
import { Dimensions } from "react-native";
import { HandleFieldsSearchAccountNumber } from "../util/validators/HandleFieldsValidators";
// import MiddleCard from "../components/MiddleCard";
import ActivityRenderFlatList from "../components/components/ActivityRenderFlatList";
import { AllTransactionHooks, UserNameHooks } from "../Hooks/Hooks";
import { useEffect } from "react";


const RequestedWithdrawals = () => {


  const { fetchSpecificUserData } = UserNameHooks();
  const authenticated = useSelector((state) => state.Allusers.authenticated);
  console.log('specific username hook', fetchSpecificUserData[0]?.accountnumber)
  const [searchActivity, setSearchActivity] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    isTouched: "",
    hasError: "",
    accountnumber: ""
  })
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const { AllTransactions } = AllTransactionHooks();

  console.log('auth user type', authenticated[0]?.role)


  useEffect(() => {
    if (authenticated[0]?.role === 'customer') {
      console.log('hello activity')
      const customerInfo = AllTransactions && AllTransactions[0]?.filter((data) => data?.accountnumber === fetchSpecificUserData[0]?.accountnumber);
      console.log('my wwwwww', customerInfo);
      setSearchActivity(customerInfo);
    }
    else {
      setSearchActivity(AllTransactions[0]);

      setShowLoader(true)
      //console.log('searched', formData.accountnumber);
      //console.log(AllTransactions);
      const searchAccount = AllTransactions && AllTransactions[0]?.filter((data) => data?.accountnumber === formData?.accountnumber);
      //console.log('hi', searchAccount);


      if (AllTransactions.length > 0) {
        setShowLoader(false);
      }
      return formData.accountnumber?.trim()?.length !== 0 ? setSearchActivity(searchAccount) : setSearchActivity(AllTransactions[0]);
    }
  }, [formData.accountnumber, AllTransactions[0]])









  //console.log('mine all transactions', AllTransactions);
  return (
    <>
      {/* <ImageBackground imageStyle={styles.imageStyle} resizeMode='cover'
                style={styles.rootScreen}>
                <Image
                    source={require('../assets/fin.jpg')}
                    style={{ height: 620, width: 500, borderRadius: 0, marginTop: 0 }} />

            </ImageBackground> */}

      {/* <Card style={styles.card}>  */}
      {/* <Title style={styles.title}>All Transactions</Title> */}
      {/* <MiddleCard style={styles.middleCard} > */}


      <Input success={false} style={[styles.inputFormStyle,
      {
        paddingHorizontal: 16,
        width: width > 360 ? 350 : width * 0.9, top: 30, left: 20
      }
      ]} textConfigs={{
        onChangeText: HandleFieldsSearchAccountNumber.bind(this, setFormData),
        value: formData.accountnumber
      }}
        borderless
        placeholderText='Search Account Number here'
        iconName='search'
        iconFamily={'ArgonFamily'}
      />
      {formData.isTouched && formData.hasError && formData.accountnumber &&
        (<ErrorText additionalStyle={{ top: -20 }}   > Incorrect Account number entered </ErrorText>)}


      {showLoader ? <PageLoader PageStyle={{
        marginLeft: width * 0.45,
        marginTop: height * 0.25
      }} /> : formData.accountnumber !== '' && searchActivity?.length === 0 ? (<Text style={{ textAlign: 'center' }}> No search results found</Text>) : (<FlatList data={searchActivity?.filter((data) => !data.transactiondetails.split(' ').includes('deposited'))} renderItem={(item) => ActivityRenderFlatList(item)} keyExtractor={(item) => item._id} style={{ marginTop: 30 }} />)}

    {searchActivity?.length < 1? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',top :height *-0.4 }}><Text style={{fontSize : 20}}>No Requested Withdrawals</Text></View>:null}
    </>
  )
}

export default RequestedWithdrawals;
const styles = StyleSheet.create({
  description: {
    color: 'black',
    marginTop: 12,
  },
  flatListheaderStyle: {
    marginHorizontal: 5,
    maxWidth: 370,
    marginLeft: 20,
    marginTop: 15,
    borderColor: Colors.primaryColor400,
    borderWidth: 2
  },
  middleCardStyle: {
    marginTop: 20,
    width: 370,
    marginLeft: 5,
  },
  card: {
    flex: 1,
    minHeight: 450,
    marginTop: 100,
    marginBottom: -100,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 15,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    paddingBottom: 2,
  },
  middleCard: {
    marginLeft: 0,
    flex: 1,
    top: 40
  },
  title: {
    marginTop: 5,
    margin: 8,
    marginLeft: 10
  },
  inputFormStyle: {
    borderWidth: 2,
    marginVertical: 5,
    maxHeight: 150,
    position: 'relative',
    zIndex: 1,
  }
})