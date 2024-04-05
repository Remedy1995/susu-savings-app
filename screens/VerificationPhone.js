import {
  View, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, Pressable, KeyboardAvoidingView, useWindowDimensions,
   Platform,TextInput
} from "react-native";
import { Button } from "../components/components/Button";
import ErrorText from "../components/components/ErrorText";
import { HandleVerification } from "../util/helpers/HandleVerification";
import PageLoader from "../components/components/PageLoader";
import DateFormat from "../util/helpers/DateFormat";
import Title from "../components/components/Title";
import CardTitle from "../components/components/CardTitle";
import FormButton from "../components/components/FormButton";
import CustomDialogBox from "../components/components/CustomDialogBox";
import CustomModal from "../components/components/CustomModal";
import { SendOtpService } from "../Services/Services";
import { ActivityIndicator } from "react-native";
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
import { VerifyPhoneOtpService } from "../Services/Services";
import { useRef } from "react";
import { forwardRef } from "react";




const VerificationPhone = ({route}) => {
    const {handleInputVerification, otpDigits, inputRefs} = HandleVerification();
  const phoneNumber = route.params.phoneNumber;
    const [showModal, setModal] = useState(false);
    const navigation = useNavigation();
   // const inputRefs = useRef([]);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [modalText, setModalText] = useState("");
    const [allValues, setAllValues] = useState("");
    const [reference, setReference] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const Resend = () => {
        //verify otp codes send an otp code to the server
        const SendOtp = {
            phone: phoneNumber,
            "sender_id": "Jubel Susu"
        }


        SendOtpService(SendOtp).then(sendOtp => {
            if (sendOtp) {
                console.log('verifyii', sendOtp.data.message)
                setModal((modal) => !modal)
                setModalText(sendOtp.data.message)
            }
        }).catch((error) => {
            console.log('there was an error ', error.response.data)
            setModal((modal) => !modal)
            setModalText(error.response.data.reason)
        })
    }









    const Submit = () => {
        //verify otp codes send an otp code to the server
        const OtpObject = {
            otp_code: otpDigits.join(""),
            phone: phoneNumber.trim()
        }

        console.log('Otp digits',otpDigits.join(""))
        VerifyPhoneOtpService(OtpObject).then(verify => {
            console.log('verifyii', verify?.data)
            if (['1101', '1102', '1103', '1104', '1105', '1106'].includes(verify?.data?.code)) {
                console.log('print', verify?.data?.message)
                setModal(true)
                setModalText(verify?.data?.message)
            }
            else {
                console.log('data', verify?.data?.message)
                if (verify?.data?.message === 'Successful') {
                    navigation.navigate('UploadImage')
                }
                // setModal(true)
                // setModalText(verify?.data?.message)
            }
        }).catch(error => {
            console.log('there was an error ', error?.response?.data?.reason)
            setModal(true)
            setModalText(error?.response?.data?.reason)
        })
    }


    const InputWithForwardRef = forwardRef((props, ref) => {
        return (<View style={{ marginTop: 10, marginBottom: 10 }}>
            <TextInput ref={ref} maxLength={1} onChangeText={(text) => props.onTextChange(text, props.index)} style={styles.verificationBox} />
        </View>)
    });


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
            <View style={styles.AuthContainer}>
                <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ paddingBottom: 500 }} >
                    <CustomDialogBox LeftButtonText="Cancel" RightButtonText="OK"
                        queryText={modalText}
                        leftButtonHandler={() => setModal(!showModal)} rightButtonHandler={() => setModal(!showModal)} addtionalStyle={{ width: width < 360 ? width*0.9 : width*0.9 }} />
                </CustomModal>
                {/* <Ionicons name="arrow-back-outline" size={28} color={Colors.primaryColor100} style={{ left: 20 }} /> */}
                <View style={[styles.AuthItems, { height: height }]}>
                    <Text style={styles.Registration}></Text>
                    <View style={styles.getStartedImageWrapper}>
                        <Image source={{ uri: 'https://media.istockphoto.com/id/1246021208/vector/login-password-verification-code-push-message-or-sms-for-2fa-authentication-with-shield-icon.jpg?s=170667a&w=0&k=20&c=ihwkClm4HwoJlwI8qPsvh6IUI-Ou5vq5Ur2ODT3jsfk=' }} style={[styles.getStartedPicture, {
                            width: 150, height: 150, borderRadius: 150
                        }]} />
                    </View>
                    <Text style={styles.phoneNumber}>Verification</Text>
                    <Text style={styles.textMessage}>You will get a six-digit verification code{`\n`} that is time-limited</Text>
                    <View style={{ flexDirection: 'row' }}>
                            {otpDigits.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => (inputRefs[index] = ref)}
                                    style={styles.verificationBox}
                                    onChangeText={(text) => handleInputVerification(text, index)}
                                    value={digit}
                                    maxLength={1}
                                />
                            ))}

                        </View>
                    <Button Submit={Resend} text="Resend Otp Code?"  styles1={{ fontSize: 17, color: argonTheme.COLORS.WHITE }} style={{ backgroundColor: argonTheme.COLORS.WARNING }} />

                    <Button Submit={Submit} text="Done" styles1={{ fontSize: 17, color: 'white' }}  style={{backgroundColor : argonTheme.COLORS.GRADIENT_START}}/>

                </View>
            </View>
        </KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({
  AuthContainer: {
      flex: 1,
      top: 0
  },
  AuthItems: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

  },
  Registration: {
      fontSize: 20,
      fontWeight: 'bold',
      color: argonTheme.COLORS.BLACK,
      // top: 0,
      position: 'absolute',
      top: 60
  },

  resendCode: {
      fontSize: 15,
      fontWeight: 'bold',
      color: argonTheme.COLORS.WARNING,
      top: 20,
      margin: 10
  },
  phoneNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: argonTheme.COLORS.GRADIENT_START,
      marginTop: 20,
      marginLeft: 0,
      top: 10
  },
  textMessage: {
      fontSize: 16,
      fontWeight: 'normal',
      color: argonTheme.COLORS.BLACK,
      lineHeight: 25,
      top: 20,
      marginTop: 2,
      //margin: 20,
  },
  getStartedImageWrapper: {
      marginTop: 0
  }
  , getStartedPicture: {
      //height: 420 
  },
  verificationBox: {
      borderColor: argonTheme.COLORS.GRADIENT_START,
      borderWidth: 1,
      margin: 5,
      width: 40,
      height: 40,
      top: 20,
      borderRadius: 5,
      borderWidth: 2,
      textAlign: 'center',
      fontWeight: 'bold'
  }
})

export default VerificationPhone;
