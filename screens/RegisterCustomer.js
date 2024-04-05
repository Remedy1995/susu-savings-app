import {
  View, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, Pressable, KeyboardAvoidingView, useWindowDimensions,
  Button, Platform
} from "react-native";
import ErrorText from "../components/components/ErrorText";
import { addUsers } from "../redux/Reducers/Users";
import PageLoader from "../components/components/PageLoader";
import DateFormat from "../util/helpers/DateFormat";
import Title from "../components/components/Title";
import CardTitle from "../components/components/CardTitle";
import FormButton from "../components/components/FormButton";
import CustomDialogBox from "../components/components/CustomDialogBox";
import CustomModal from "../components/components/CustomModal";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";
import { ObjectPropHasAllValues } from '../util/validators/validate';
import { SendOtpService } from "../Services/Services";
// import DateTimePicker from '@react-native-community/datetimepicker';
import {
  HandleFieldsFirstName,
  HandleFieldsLastName,
  HandleFieldsPhoneNumber,
  HandleFieldsAddress,
  HandleFieldsUserName,
  HandleFieldsEmail,
  HandleFieldsOccupation,
  HandleFieldsDob
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


const RegisterScreen = () => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.Allusers.registerUsers);
  // console.log('all created', allUsers)
  const [showModal, setModal] = useState(false);
  console.log('recently added data', allUsers);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    dob: "",
    username: "",
    email: "",
    occupation: "",
    isTouched: "",
    hasError: "",
    isTouched0 : "",
    hasError0 :"",
    isTouched1: "",
    hasError1: "",
    isTouched2: "",
    hasError2: "",
    isTouched3: "",
    hasError3: "",
    isTouched4: "",
    hasError4: "",
    isTouched5: "",
    hasError5: "",
    isTouched6: "",
    hasError6: ""
  })

  const [date, setDate] = useState(new Date(Date.now()));
  const [showPicker, setShowPicker] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const formatDate = DateFormat(date);
  const toggleDatePicker = () => {
    setShowPicker((state) => !state)
  }
  const onChange = (event, value) => {
    setDate(value);
    if (date) {
      setShowPicker(false)
    }

    if (Platform.OS === 'android') {
      console.log('eei')
    }
  };


  const submitHandler = () => {
    if (!ObjectPropHasAllValues(formData)) {
      setIsSubmitting(false);
      console.log('does not have all values')
    }
    else {
      console.log('has all values')
      formData.dateOfBirth = formatDate;
      console.log('you have clicked the form button', formData.dateOfBirth);
      // send the data to our redux store
      delete formData.hasError;
      delete formData.isTouched;
      delete formData.isTouched1;
      delete formData.isTouched2;
      delete formData.isTouched3;
      delete formData.isTouched4;
      delete formData.isTouched5;
      delete formData.isTouched6;
      delete formData.hasError1;
      delete formData.hasError2;
      delete formData.hasError3;
      delete formData.hasError4;
      delete formData.hasError5;
      delete formData.hasError6;
      delete formData.hasError0;
      delete formData.isTouched0;
      formData.password = "123456";
      //let confirm whether phone number is valid by sending otp
      SendOtpService({
        phone: formData.phone,
        sender_id: "Jubel Susu"
      }).then((response) => {
        console.log('my otp has been sent', response.data.message)
        if (response.data.message === 'Invalid phone number') {
          setModal((modal) => !modal);
          setShowMessage(response.data.message)
        }
        else {
          //

          console.log('moved')
          //push our formData to our redux store and navigate user to verifyphone  number
          console.log(formData)
          dispatch(addUsers(formData));

            if (ObjectPropHasAllValues(formData)){
              navigation.navigate('VerificationPhone',
              {
                phoneNumber: formData.phone
              }
            )
            }
        
        }


      }).catch((error) => {
        console.log('my error', error)
        //setShowMessage('Incorrect Phone number input try again')
      })



      //     const postData = dispatch(addUsers(formData));
      //     RegisterUserService(postData).then((register) => {
      //         setModal((modal)=>!modal);
      //         console.log('postData', register)
      //         setShowMessage(register.message);

      //         if (register) {
      //             setIsSubmitting(false);

      //         }
      //     }).catch(error => {
      //         if (error) {
      //             console.log('There was an error in registering user', error?.response?.data.error);
      //             setIsSubmitting(false);
      //         }
      //     })
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
         <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ paddingBottom: 500 }} >
                    <CustomDialogBox LeftButtonText="Cancel" RightButtonText="OK"
                        queryText={showMessage}
                        leftButtonHandler={() => setModal(!showModal)} rightButtonHandler={() => setModal(!showModal)} addtionalStyle={{ width: width < 360 ? width*0.9 : width*0.9 }} />
                </CustomModal>
      <ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: argonTheme.COLORS.WHITE, margin: 10, top: height * 0.07, padding: 75,borderRadius : 10 }}>
        <Text size={20} color={argonTheme.COLORS.PRIMARY} bold>Create User Account</Text>
        <View style={{ flexDirection: 'row', top: 10 }}>
          <View style={{ margin: 5 }}>
            <Input style={{ width: width * 0.45 }} textConfigs={{
              onChangeText: HandleFieldsFirstName.bind(this, setFormData),
              value: formData.firstname
            }}
              borderless
              placeholderText='First Name'
              iconName='info-with-circle'
              iconFamily={'Entypo'} />
            {formData.isTouched && formData.hasError && formData.firstname &&
              (<ErrorText> Incorrect First Name entered </ErrorText>)}
          </View>
          <View style={{ margin: 5 }}>
            <Input style={{ width: width * 0.45 }} textConfigs={{
              onChangeText: HandleFieldsLastName.bind(this, setFormData),
              value: formData.lastname
            }}

              borderless
              placeholderText='Last Name'
              iconName='info-with-circle'
              iconFamily={'Entypo'}
            />
            {formData.isTouched1 && formData.hasError1 && formData.lastname &&
              (<ErrorText> Incorrect last Name entered </ErrorText>)}

          </View>
        </View>


        <View style={{ flexDirection: 'row', top: 10 }}>
          <View style={{ margin: 5 }}>
            <Input style={{ width: width * 0.45 }} textConfigs={{
              onChangeText: HandleFieldsUserName.bind(this, setFormData),
              value: formData.username
            }}
              borderless
              placeholderText='User Name'
              iconName='info-with-circle'
              iconFamily={'Entypo'} />
            {formData.isTouched4 && formData.hasError4 && formData.username &&
              (<ErrorText> Incorrect username entered </ErrorText>)}
          </View>
          <View style={{ margin: 5 }}>
            <Input style={{ width: width * 0.45 }} textConfigs={{
              onChangeText: HandleFieldsEmail.bind(this, setFormData),
              value: formData.email
            }}

              borderless
              placeholderText='Email Address'
              iconName='ic_mail_24px'
              iconFamily={'ArgonExtra'}
            />
            {formData.isTouched5 && formData.hasError5 && formData.email &&
              (<ErrorText> Incorrect Email entered </ErrorText>)}

          </View>
        </View>


        <View style={{ flexDirection: 'row', top: 10 }}>
          <View style={{ margin: 5 }}>
            <Input style={{ width: width * 0.45 }} textConfigs={{
              onChangeText: HandleFieldsOccupation.bind(this, setFormData),
              value: formData.occupation
            }}
              borderless
              placeholderText='Occupation'
              iconName='info-with-circle'
              iconFamily={'Entypo'} />
            {formData.isTouched6 && formData.hasError6 && formData.occupation &&
              (<ErrorText> Incorrect occupation entered </ErrorText>)}
          </View>
          <View style={{ margin: 5 }}>
            <Input style={{ width: width * 0.45 }} textConfigs={{
              onChangeText: HandleFieldsPhoneNumber.bind(this, setFormData),
              value: formData.phone,
              keyboardType: 'numeric', maxLength: 10
            }}

              borderless
              placeholderText='Phone'
              iconName='phone'
              iconFamily={'Feather'}
            />
            {formData.isTouched2 && formData.hasError2 && formData.phone &&
              (<ErrorText> Incorrect Phone number entered </ErrorText>)}
          </View>
        </View>


        <View style={{ flexDirection: 'row', top: 10 }}>
          <View style={{ margin: 5 }}>
            <Input style={{ width: width * 0.45 }} textConfigs={{
              onChangeText: HandleFieldsAddress.bind(this, setFormData),
              value: formData.address
            }}
              borderless
              placeholderText='Address'
              iconName='location'
              iconFamily={'Entypo'} />

            {formData.isTouched3 && formData.hasError3 && formData.address &&
              (<ErrorText> Incorrect Address entered </ErrorText>)}
          </View>
          <View style={{ margin: 5 }}>
            <Input style={{ width: width * 0.45 }} textConfigs={{
              onChangeText: HandleFieldsDob.bind(this, setFormData),
              value: formData.dob,
            }}

              borderless
              placeholderText='Date Of Birth'
              iconName='info-with-circle'
              iconFamily={'Entypo'}
            />
            {/* {formData.isTouched2 && formData.hasError2 && formData.phone &&
        (<ErrorText> Incorrect Phone number entered </ErrorText>)} */}
          </View>
        </View>

        {/* {showPicker &&
        (<DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
        />)} */}
        {/* ios code for button */}
        {/* {showPicker && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
            <TouchableOpacity onPress={toggleDatePicker}>
                <Text style={{
                    backgroundColor: "#BBBFCA",
                    width: 100, borderRadius: 20,
                    paddingLeft: 25,
                    fontWeight : 'bold',
                    marginVertical: 20, padding: 15, fontSize: 16
                }}>Cancel</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={confirmDate}>
                <Text style={{
                    backgroundColor: Colors.primaryColor800,
                    width: 100, borderRadius: 20,
                    color: Colors.primaryColor400,
                    fontWeight : 'bold',
                    paddingLeft: 25,
                    marginVertical: 20, padding: 15, fontSize: 16
                }}>Confirm</Text>
                </TouchableOpacity>
           
        </View>)
    } */}

        {/* <Pressable onPress={toggleDatePicker}>
        <Input placeholder="Date" label="Date Of Birth" editable={false}
          onPressIn={toggleDatePicker} textConfigs={{
            value: formatDate,
            onChangeText: setDate
          }}
        />
      </Pressable> */}
        <FormButton  additionalStyle={{ width : width* 0.92,marginTop : 20}}  onPress={submitHandler} disabled={Boolean(formData.hasError) ||
          Boolean(formData.hasError1) || Boolean(formData.hasError2) || Boolean(formData.hasError3) || formData.firstname === '' || formData.username === '' ||
          formData.lastname === '' || formData.address === '' || formData.email === '' || formData.phone === '' || formData.occupation === ''} submitting={isSubmitting}
          ButtonTitle="Submit" />

      </View>
      </ScrollView>
    </KeyboardAvoidingView>


  );
}


const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.98,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    //top : -30,
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

export default RegisterScreen;
