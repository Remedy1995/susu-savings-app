import React from "react";
import { MakeDepositService } from "../Services/Services";
import { makeDeposits, clearDeposits } from "../redux/Reducers/Deposit";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountBalance, updateAdminBalance } from "../redux/Reducers/Accounts";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { useState } from "react";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { Alert } from "react-native";
import {
  HandleFieldsCustomerName,
  HandleFieldsAccountNumber,
  HandleFieldsAmount
} from "../util/validators/HandleFieldsValidators";
const { width, height } = Dimensions.get("screen");
import ErrorText from '../components/components/ErrorText';
import FormButton from '../components/components/FormButton';


function Deposit() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customerName: "jubelsusu.com",
    accountnumber: "",
    amount: "",
    isTouched: false,
    hasError: false,
    isTouched1: "",
    hasError1: "",
    isTouched2: "",
    hasError2: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { width, height } = useWindowDimensions();

  const SubmitHandler = () => {
    // setIsSubmitting(true);
    // dispatch(makeDeposits(formData))
    // setTimeout(() => {
    //     setIsSubmitting(false);
    // }, 2000)



    MakeDepositService(dispatch(makeDeposits({ accountnumber: formData.accountnumber.trim(), amount: formData.amount.trim() }))).then(deposit => {
      console.log(deposit);
   
      //clear Form after successful deposit
      setFormData((currentValue) => ({
        ...currentValue,
        accountnumber: '',
        amount: '',
        customerName: ''
      }));

      Alert.alert("Response", deposit.message, [{text: "Cancel"}, {text: "OK"}] );
      

      if (deposit) {
        dispatch(updateAccountBalance({
          accountnumber: formData.accountnumber.trim(),
          balance: deposit.new_balance.trim()
        }));

        dispatch(updateAdminBalance({
          amount: formData.amount.trim(),
          transactionType: 'deposit'
        }))
      }
    }
    ).catch(error => {

      if (error.response) {
        console.log(error.response.data)
      }
      console.log('there is an error in deposits', error.message);
    });
    //clear deposit after making deposits
    // dispatch(clearDeposits({
    //     accountNumber: formData.accountNumber,
    //     amount: formData.amount
    // }));


  }
  console.log(formData)

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Block row style={{ marginTop: theme.SIZES.BASE }}>
                <Block middle>
                  <Icon
                    name="money"
                    family="FontAwesome"
                    size={50}
                    color={argonTheme.COLORS.PRIMARY}
                    style={{ marginTop: 2, marginRight: 5 }}
                  />
                  {/* <Text style={styles.socialTextButtons}>GITHUB</Text> */}
                </Block>
              </Block>
            </Block>
            <Block flex style={{ top: 30 }}>
              <Block flex={0.12} middle>
                <Text color={argonTheme.COLORS.PRIMARY} style={{fontWeight :'bold'}} size={19}>
                  Deposit With Mobile Money
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={styles.blockStyle}>
                    <Input success={true} textConfigs={{
                      onChangeText: HandleFieldsCustomerName.bind(this, setFormData),
                      value: formData.customerName
                    }}
                      borderless
                      placeholderText='Email Address'
                      iconName='ic_mail_24px'
                      iconFamily={'ArgonExtra'}
                    />
                    {formData.isTouched && formData.hasError && formData.customerName &&
                      (<ErrorText> Incorrect Customer Name entered </ErrorText>)}
                  </Block>
                  <Block width={width * 0.8} style={styles.blockStyle}>
                    <Input success={true} textConfigs={{
                      onChangeText: HandleFieldsAccountNumber.bind(this, setFormData),
                      value: formData.accountnumber
                    }}
                      borderless
                      placeholderText='Account Number'
                      iconName='account-balance'
                      iconFamily={'MaterialIcons'}
                    />
                    {formData.isTouched1 && formData.hasError1 && formData.accountnumber &&
                      (<ErrorText> Incorrect Account Number entered </ErrorText>)}
                  </Block>
                  <Block width={width * 0.8} style={styles.blockStyle}>
                    <Input success={true} textConfigs={{
                      onChangeText: HandleFieldsAmount.bind(this, setFormData),
                      value: formData.amount,
                      keyboardType: 'numeric', maxLength: 10
                    }}
                      borderless
                      placeholderText='Amount'
                      iconName='money'
                      iconFamily={'FontAwesome'}
                    />
                    {formData.isTouched2 && formData.hasError2 && formData.amount &&
                      (<ErrorText> Incorrect Amount entered </ErrorText>)}
                  </Block>
                  
                    <FormButton onPress={SubmitHandler} disabled={
                      Boolean(formData.hasError1) || Boolean(formData.hasError2) || !formData.accountnumber || !formData.amount} ButtonTitle="Deposit Money" loaderColor={argonTheme.COLORS.PRIMARY} submitting={isSubmitting} />
           
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}


const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.8,
    marginTop: 0,
    marginLeft: 2
  }
  ,
  blockStyle :{
     marginBottom: 15,
     marginLeft  : width > 360 ? -5 : -1 
  }
});

export default Deposit;
