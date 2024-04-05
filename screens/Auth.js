import React from "react";
import { useDispatch } from "react-redux";
import FormButton from "../components/components/FormButton";
import { useState } from "react";
import { LoginUserService } from "../Services/Services";
import { KeyboardAvoidingView } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { authenticatedUser } from "../redux/Reducers/Users";
import { HandleFieldsLoginUsername, HandleFieldsUserPassword } from "../util/validators/HandleFieldsValidators";
import { View } from 'react-native';
import { Input } from "../components";
import { useSelector } from "react-redux";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, theme, Text } from "galio-framework";
import { RFValue } from 'react-native-responsive-fontsize';


const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import Home from "./Home";

function Auth({ navigation }) {




  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    isTouched: "",
    hasError: "",
    isTouched1: "",
    hasError1: ""
  })

  const Submit = () => {
    setErrorMessage("");
    setIsSubmitting(true);
    LoginUserService({
      phone: formdata.username,
      password: formdata.password
    }).then(login => {

      console.log('my login is successfull', login)
      if (login) {
        setIsSubmitting(false);
        console.log('data', login);
        if (login.data.role === 'customer') {
          dispatch(authenticatedUser({
            phone: login.data.phone, role: login.data.role,
          }));
        }
        else {
          dispatch(authenticatedUser({ phone: login.data.phone, role: login.data.role }));
        }

      }
    }).catch(error => {
      console.log('general error', error)
      if (error.response.data.error) {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error);
        setIsSubmitting(false)
      }
    });
  }

  console.log('user erorr', errorMessage)

  function AuthenticatedScreen() {
    const authenticatedData = useSelector((state) => state?.Allusers?.authenticated);
    const authenticated = useSelector((state) => state?.Allusers?.authenticated);
    const RoleData = authenticated.map((data) => data.role).find((value) => value);
    console.log('my map', RoleData)

    if (authenticated.length > 0) {
      if (RoleData === 'admin') {
        navigation.navigate("App");
      }
      else {
        navigation.navigate("CustomerApp");
      }
    }
    // return authenticated && authenticated?.length < 1 ? <AuthLogin /> : <RoleScreen />;

    // if (authenticated.length > 0) {
    //   if (authenticated.role === 'admin') {
    //     navigation.navigate("CustomerApp");
    //   }
    // }
    //   else {
    //     navigation.navigate("CustomerApp");
    //   }
    // }

  }

  AuthenticatedScreen();



  return (
    <Block flex style={styles.container}>
      <StatusBar hidden />
      <Block flex center>
        <ImageBackground
          source={Images.Onboarding}
          style={{ height, width, zIndex: 1 }}
        />
      </Block>

      <Block flex style={{top : width>360 ? height * -0.18 : height * -0.15}}>
      <Block center>
        <Image source={Images.Logo} style={styles.logo} />
      </Block>
      <Block flex space="between" style={styles.padded}>
        <Block flex space="around" style={{ zIndex: 2 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
          >
            <Block style={styles.title}>
              <Block>
                <Text bold color="white" center style={{ marginVertical: 4, fontSize: RFValue(25) }}>
                  Jubel Savings
                </Text>
              </Block>
            </Block>
            {errorMessage && (<Block>
              <Text color={'yellow'} size={20} center style={{ padding: 4 }} >
                {errorMessage}
              </Text>
            </Block>)
            }
            <View style={{ top: 5 }}>
              {formdata.isTouched && formdata.hasError && formdata.username &&
                (<ErrorText additionalStyle={{ textAlign: 'center' }} > Incorrect User Name entered </ErrorText>)}
              <Input placeholderText="Enter Username" label="Username" style={[{ borderColor: argonTheme.COLORS.GRADIENT_START, color: argonTheme.COLORS.DEFAULT, borderWidth: 1, height: 55, fontSize: RFValue(45) }, formdata.hasError &&
                formdata.isTouched && formdata.username && styles.inputFormStyle]} textConfigs={{
                  onChangeText: HandleFieldsLoginUsername.bind(this, setFormData),
                  value: formdata.username
                }} />
              {formdata.isTouched1 && formdata.hasError1 && formdata.password &&
                (<ErrorText additionalStyle={{ marginTop: 5 }} > Password must be more than 8 characters </ErrorText>)}
              <Input placeholderText="Enter Password" label="Password" style={[{ borderColor: argonTheme.COLORS.GRADIENT_START, color: argonTheme.COLORS.DEFAULT, borderWidth: 1, height: 55 }, formdata.hasError1 &&
                formdata.isTouched1 && formdata.password && styles.inputFormStyle]} textConfigs={{
                  onChangeText: HandleFieldsUserPassword.bind(this, setFormData),
                  value: formdata.password,
                  secureTextEntry: true
                }} />

            </View >

            <FormButton onPress={Submit} additionalStyle={{ top: 20, padding: 13, backgroundColor: argonTheme.COLORS.GRADIENT_START, width: width * 0.82 }} textStyle={{ color: argonTheme.COLORS.WHITE, fontSize: RFValue(18) }} disabled={Boolean(formdata.hasError) ||
              Boolean(formdata.hasError1)} ButtonTitle="Sign In" submitting={isSubmitting} loaderColor={argonTheme.COLORS.WHITE} />
          </KeyboardAvoidingView>
          
        </Block>
      </Block>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    top: -60,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 100,
    height: 100,
    zIndex: 1,
    position: 'relative',
    top: width > 360 ? -20 : -50,
    borderRadius: 130,
    margin: 20
  },
  // title: {
  //   marginTop:'-25%'
  // },
  // subTitle: {
  //   marginTop: 20
  // }
});

export default Auth;
