import {
  View, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, Pressable, KeyboardAvoidingView, useWindowDimensions,
  Button, Platform
} from "react-native";
import ErrorText from "../components/components/ErrorText";
import PageLoader from "../components/components/PageLoader";
import DateFormat from "../util/helpers/DateFormat";
import Title from "../components/components/Title";
import CardTitle from "../components/components/CardTitle";
import FormButton from "../components/components/FormButton";
import CustomDialogBox from "../components/components/CustomDialogBox";
import CustomModal from "../components/components/CustomModal";
import { ActivityIndicator } from "react-native";
import { GenerateRandomName } from "../util/helpers/GenerateRandomName";
import { Alert } from "react-native";
import {
  HandleFieldsCustomerName,
  HandleFieldsMomoNumber,
  HandleFieldsAccountNumber,
  HandleFieldsAmount
} from "../util/validators/HandleFieldsValidators";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Colors from "../util/Color";
// import Card from "../components/TopCard";
// import StringContainsNumber from '../util/validators/validate'
// import PageGradient from "../components/components/PageGradient";
import { useEffect, useState } from "react";
import { Input, Icon } from "../components";
import { makeDeposits, clearDeposits } from "../redux/Reducers/Deposit";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountBalance, updateAdminBalance } from "../redux/Reducers/Accounts";
import { MakeDepositService, MomoPaymentService, VerifyTransactionService } from "../Services/Services";
import { Dimensions } from "react-native";
import { UserNameHooks } from "../Hooks/Hooks";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
import { Block, theme, Text } from "galio-framework";
import { argonTheme } from "../constants";
import { Images } from "../constants";

let resetProcess;
const UserDeposit = () => {



  const { fetchSpecificUserData } = UserNameHooks();
  const navigation = useNavigation();
  const [showModal, setModal] = useState(false);
  const [reference, setReference] = useState("");
  const data = useSelector((state) => state.AllDeposits.deposits);
  let phoneSetter = fetchSpecificUserData[0]?.phone.trim();
   //phoneSetter = '0552810771';
  const accountSetter = fetchSpecificUserData[0]?.accountnumber.trim();
  const dispatch = useDispatch();
  const [modalText, setModalText] = useState("");
  const [response, setResponse] = useState([]);
  const [formData, setFormData] = useState({
    customerName: fetchSpecificUserData && fetchSpecificUserData[0]?.phone.trim(),
    accountnumber: fetchSpecificUserData && fetchSpecificUserData[0]?.accountnumber.trim(),
    amount: "",
    isTouched: "",
    hasError: "",
    isTouched1: "",
    hasError1: "",
    isTouched2: "",
    hasError2: ""
  })
 const genName = GenerateRandomName(20) + '@susu.com';

  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if ( (response.includes("ongoing") && response.length > 10) || (response.includes("failed") && response.length > 10) ||
    (response.includes("abandoned") && response.length > 10)) {
      setIsSubmitting(false);
      clearInterval(resetProcess);
      Alert.alert(
        "Error",
        "Sorry Deposit was unsuccessful Please try Again",
        [
          {
            text: "Cancel"
          },
          {
            text: "OK"
          }

        ]);
        setResponse([]);
    }
    console.log('my response is ', response)

  }, [response])



  function ApproveMandate() {
    setIsSubmitting(true)
    setModal(!showModal);
    //apoad5y8pcylc3x
    const referenceObject = {
      reference: reference
    }
    resetProcess = setInterval(() => {
      VerifyTransactionService(referenceObject).then((data) => {
        console.log('this has been verified', data.data.data.status)
        setResponse((currentStatus) => [...currentStatus, data.data.data.status]);
        console.log('my arra', response)
        if (data.data.data.status === 'success') {
          setResponse([]);
          setIsSubmitting(false)
          clearInterval(resetProcess);
          RecordTransactionDB();
          console.log('the operation has succeeded')
          Alert.alert(
            "Response",
            "Your funds has been successfully credited to your account",
            [
              {
                text: "Cancel"
              },
              {
                text: "OK"
              }

            ]
          )
        }

      }).catch(error => {
        console.log('mibne error', error)
        setIsSubmitting(false)
        clearInterval(resetProcess);
        Alert.alert(
          "Error",
          "Sorry An Error Occured",
          [
            {
              text: "Cancel"
            },
            {
              text: "OK"
            }

          ]);

        
      })


    }, 5000)

  }

  function RecordTransactionDB() {
    MakeDepositService(dispatch
      (makeDeposits({
        accountnumber: accountSetter,
        amount: formData.amount.trim()
      }))).then(deposit => {
        if (deposit) {
          dispatch(updateAccountBalance({
            accountnumber: accountSetter,
            balance: deposit.new_balance.trim()
          }));


          dispatch(updateAdminBalance({
            amount: formData.amount,
            transactionType: 'deposit'
          }))
        }
      }
      ).catch(error => {
      });
  }

  const SubmitHandler = () => {
    setIsSubmitting(true);
    // console.log('my info this', formData.accountnumber, formData.customerName)
    const momoData = {
      email: genName,
      amount: formData.amount,
      phone: phoneSetter,
      provider: "mtn"
    }
    console.log('This is the data',momoData.email)
    MomoPaymentService(momoData).then((data) => {
      if (data) {

        if (data?.data?.data?.display_text === 'Please enter the one-time password sent to your phone') {
          setIsSubmitting(false);
          setModal(!showModal);
          setModalText(data?.data?.data?.display_text);
          setReference(data?.data?.data?.reference);
          navigation.navigate('Verification', {
            reference: data?.data?.data?.reference
          });
          clearInterval(resetProcess)
        }
        else if (data?.data?.data?.display_text === 'Please complete the authorisation process by inputting your PIN on your mobile device') {
          setModal(!showModal);
          setModalText(data?.data?.data?.display_text);
          setReference(data?.data?.data?.reference);
          setModal(!showModal);

        }

        else if (!data?.data?.status) {
          setModal(!showModal);
          setModalText(data?.data?.message);
          setIsSubmitting(false)
          console.log('my data', data?.data?.message)
        }

        console.log('momo payment made ', data);
        //     setModal(!showModal);
        //    setModalText(data?.message);
      }
      else {
        setModal(!showModal);
        setModalText(data?.data?.display_text);
        setIsSubmitting(false)
      }
    }).catch(error => {
      setIsSubmitting(false)
      console.log('err', error)
      setModalText(error.message)
    })

    // function RecordTransactionDB(){
    //         MakeDepositService(dispatch
    //             (makeDeposits({
    //                 accountnumber: formData.accountnumber.trim(),
    //                 amount: formData.amount.trim()
    //             }))).then(deposit => {
    //                 console.log(deposit);
    //                 if (deposit) {
    //                     dispatch(updateAccountBalance({
    //                         accountnumber: formData.accountnumber.trim(),
    //                         balance: deposit.new_balance.trim()
    //                     }));
    //                 }
    //             }
    //             ).catch(error => {
    //                 console.log('there is an error in deposits', error.message);
    //             });
    //         }
    //clear deposit after making deposits
    // dispatch(clearDeposits({
    //     accountNumber: formData.accountNumber,
    //     amount: formData.amount
    // }));


  }
  console.log(formData.hasError1)
  return (
    <Block flex middle>
      <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ paddingBottom: 500 }} >
        <CustomDialogBox  RightButtonText="OK" showCancel={true}
          queryText={modalText}
           rightButtonHandler={ApproveMandate} addtionalStyle={{ width: width <= 360 ? 320 : 370 }} />
      </CustomModal>
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
                <Text color={argonTheme.COLORS.PRIMARY} style={{ fontWeight: 'bold' }} size={19}>
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
                      onChangeText: HandleFieldsMomoNumber.bind(this, setFormData),
                      value: phoneSetter
                    }}
                      borderless
                      placeholderText='Email Address'
                      iconName='phone'
                      iconFamily={'Feather'}
                    />
                    {formData.isTouched && formData.hasError && formData.customerName &&
                      (<ErrorText> Incorrect Customer Name entered </ErrorText>)}
                  </Block>
                  <Block width={width * 0.8} style={styles.blockStyle}>
                    <Input success={true} textConfigs={{
                      onChangeText: HandleFieldsAccountNumber.bind(this, setFormData),
                      value: accountSetter
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
                    Boolean(formData.hasError1) || Boolean(formData.hasError2) || isSubmitting || !formData.amount} ButtonTitle="Deposit Money" loaderColor={argonTheme.COLORS.WHITE} submitting={isSubmitting} />

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
  blockStyle: {
    marginBottom: 15,
    marginLeft: width > 360 ? -5 : -1
  }
});

export default UserDeposit;
