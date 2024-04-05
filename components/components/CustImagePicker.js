import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormButton from './FormButton';
import { useNavigation } from '@react-navigation/native';
import { addImage, removeData } from '../../redux/Reducers/Users';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUserService, sendSMSService } from '../../Services/Services';
import { Entypo } from '@expo/vector-icons';
import CustomModal from './CustomModal';
import CustomDialogBox from './CustomDialogBox';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { argonTheme } from '../../constants';
const width = Dimensions.get('screen').width;

const CustImagePicker = () => {
  const navigation = useNavigation();
  const registerInfo = useSelector((state) => state.Allusers.registerUsers);
  const dispatch = useDispatch();
  console.log('my register', registerInfo)
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [pickedImage, setPickedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setModal] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [showMessageBody, setShowMessageBody] = useState("");


  useEffect(() => {
    checkPermissions();
  }, []);


  const backToRegistrationScreen = () => {
    navigation.navigate('Create Users')
  }
  const checkPermissions = async () => {
    const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();
    const galleryPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraPermissionResult.status !== 'granted' ||
      galleryPermissionResult.status !== 'granted'
    ) {
      Alert.alert(
        'Permissions Required',
        'Both camera and gallery permissions are required to use this feature.'
      );
      return;
    }

    setCameraPermission(cameraPermissionResult.status);
    setGalleryPermission(galleryPermissionResult.status);
  };

  const takeImageHandler = async () => {

    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (!result.canceled) {
        setPickedImage(result.assets[0]["uri"]);
        //console.log(result.assets[0]["uri"])
      }
    }
    catch (error) {
      console.log('There was an error', error)
    }
  };

  const selectImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0]["uri"]);
      console.log(result.assets[0]["uri"])
    }
  };


  const submitHandler = () => {
    console.log('submit')
    dispatch(addImage({ file: pickedImage }))

    //let post the data to our 
    console.log('usesss', registerInfo)
    const FinalArray = [...registerInfo].reverse();
    console.log('sore rtt', FinalArray);
    let varData = [];
    FinalArray.map((data, index) => {
      console.log('all data', data.file)
      varData.push(
        {
          agentname: "Admin",
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          email: data.email,
          phone: data.phone,
          date: data.dob,
          address: data.address,
          occupation: data.occupation,
          file: pickedImage,
          password: "123456",
        })
    }
    )

    console.log('my varDas', varData[0])
    console.log('not posted')
    //console.log('my arra',arrayData)
    RegisterUserService(varData[0]).then(register => {
      console.log('posted', register)
      if (register.subject === "You have successfully registered User") {
        dispatch(removeData());
        setModal((modal) => !modal);
        console.log('postDatasdffs', register)
        setShowMessage(register.subject);
        setShowMessageBody(register.body);
        sendSMSService({
          message: "Hi ," + register.data.username + "\n " + register.body + ", Your account number is " + register.data.accountnumber + "\n" + " use this accountnumber for all your transactions",
          sender_id: "Jubel Susu",
          reciepient_phone: register.data.phone
        }).then(data => {
          console.log('the meesage has been sent to user', data)
        }).catch(error => {
          console.log('this is an error', error)
        })


      }
      else {
        setModal((modal) => !modal);
        console.log('postDatasdffs', register)
        setShowMessage(register.message);
        setShowMessageBody("");
      }

      if (register) {
        setIsSubmitting(false);

      }
    }).catch(error => {
      if (error) {
        console.log('There was an error in registering user', error?.response?.data);
        setIsSubmitting(false);
      }
    })

  }
  return (
    <View style={styles.container}>
      <Text  style={{fontWeight:'bold',fontSize : 25,color : argonTheme.COLORS.BLACK}}>Click to Upload Your Photo</Text>

      <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ height: 300 }} >
        <CustomDialogBox LeftButtonText="Exit" RightButtonText="OK" modalStyle={{ padding: 10, height: setShowMessageBody ? 300 : 170 }}
          queryText={showMessage + "\n" + showMessageBody}
          leftButtonHandler={backToRegistrationScreen} rightButtonHandler={backToRegistrationScreen} addtionalStyle={{ width: width <= 360 ? 320 : 370 }} />
      </CustomModal>
      <View style={styles.buttonContainer}>


        {/* <Button
          title="Take Photo"
          onPress={takeImageHandler}
          disabled={cameraPermission !== 'granted'}
        /> */}

        <AntDesign name="camera" size={90} color={argonTheme.COLORS.PRIMARY} onPress={takeImageHandler} disabled={cameraPermission !== 'granted'} />
        <Entypo name="folder" size={94} color={argonTheme.COLORS.PRIMARY} onPress={selectImageFromGallery} disabled={galleryPermission !== 'granted'} />

        {/* <Button
          title="Select from Gallery"
          onPress={selectImageFromGallery}
          disabled={galleryPermission !== 'granted'}
        /> */}

      </View>
      <View style={styles.imagePreview}>
        {pickedImage && (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <FormButton onPress={submitHandler} disabled={!pickedImage} additionalStyle={{ left: 0, top: 30,width :width*0.85 }}
        ButtonTitle="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: width * 0.85,
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 4,
    top: 10
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },

});

export default CustImagePicker;
