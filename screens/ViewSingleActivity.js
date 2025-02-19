import React from "react";
import { AllTransactionHooks } from "../Hooks/Hooks";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function ViewSingleActivity({route}) {
  const {AllTransactions} = AllTransactionHooks();
  console.log(route.params.data_id)
  const filterSpecificTransaction = AllTransactions && AllTransactions[0]?.filter((activity) => activity._id === route.params.data_id);

  return (
    
    <Block flex style={styles.profile}>
       {
          filterSpecificTransaction.length > 0 ?  filterSpecificTransaction?.slice(0, 1)?.map((activity) => (
            

            
      <ImageBackground
        source={Images.ProfileBackground}
        style={styles.profileContainer}
        imageStyle={styles.profileBackground}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width, marginTop: '25%' }}
        >
         
              <Block flex key={activity.id}>
                <Block flex style={styles.profileCard}>
                  <Block middle style={styles.avatarContainer}>
                    <Image
                      source={{ uri: activity.file }}
                      style={styles.avatar}
                    />
                  </Block>
                  <Block style={styles.info}>
                    <Block
                      middle
                      row
                      space="evenly"
                      style={{ marginTop: 20, paddingBottom: 24 }}
                    >
                      {/* <Button
                        medium
                        style={{ backgroundColor: argonTheme.COLORS.INFO,left : 10 }}
                      >
                        TRANSACTION
                      </Button> */}
                      <Button
                        
                        style={{
                          backgroundColor: argonTheme.COLORS.DEFAULT,
                        }}
                      >
                      {activity.transactiondetails?.split(' ')[1]==='deposited'?'deposits'.toUpperCase() : 'withdrawals'.toUpperCase()}
                      </Button>
                    </Block>
                    <Block row space="evenly">
                      <Block middle>
                        <Text
                          bold
                          size={18}
                          color="#525F7F"
                          style={{ marginBottom: 4,color : argonTheme.COLORS.PRIMARY }}
                        >
                         {activity.amount}
                        </Text>
                        <Text size={12} color={argonTheme.COLORS.TEXT}>
                          Amount
                        </Text>
                      </Block>
                      <Block middle>
                        <Text
                          bold
                          color="#525F7F"
                          size={18}
                          style={{ marginBottom: 4,color :argonTheme.COLORS.PRIMARY}}
                        >
                          {activity.accountnumber}
                        </Text>
                        <Text size={12} >
                          Account Number
                        </Text>
                      </Block>
                      <Block middle>
                        <Text
                          bold
                          color="#525F7F"
                          size={18}
                          style={{ marginBottom: 4 }}
                        >
                          {/* {new Date(activity.date).toLocaleDateString('en-US', {day :'numeric' ,month : 'long',year :'numeric'})} */}
                        </Text>
                        {/* <Text size={18} color={argonTheme.COLORS.TEXT}>
                          Date
                        </Text> */}
                      </Block>
                    </Block>
                  </Block>
                  <Block flex>
                    <Block middle style={styles.nameInfo}>
                      <Text size={18} color="#32325D" style={{color : argonTheme.COLORS.PRIMARY,lineHeight :25}} center>
                        {activity.transactiondetails} 
                      </Text>
                     
                      <Text size={20} color="#32325D" style={{ marginTop: 8,fontWeight :'bold',textTransform:'lowercase' }}>
                        {activity.email}
                      </Text>
                      <Text size={17} color="#32325D" style={{ marginTop: 8,fontWeight :'bold',textTransform:'lowercase' }}>
                        {activity.phone}
                      </Text>
                      <Text size={20} color="#32325D" style={{ marginTop: 8,fontWeight :'bold',textTransform:'lowercase' }}>
                        {activity.address}
                      </Text>
                    </Block>
                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block middle>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{ textAlign: 'center' }}
                      >
                        {activity.description}
                      </Text>
                      {/* <Button
                        color="transparent"
                        textStyle={{
                          color: '#233DD2',
                          fontWeight: '500',
                          fontSize: 16,
                        }}
                      >
                        Show more
                      </Button> */}
                    </Block>
                    <Block
                      row
                      space="between"
                      style={{ paddingBottom: 20, justifyContent: 'flex-end' }}
                    >
                      {/* <Text bold size={16} color="#525F7F">
                        Album
                      </Text> */}
                      {/* <Button
                        small
                        color="transparent"
                        textStyle={{
                          color: '#5E72E4',
                          fontSize: 12,
                        }}
                      >
                        View all
                      </Button> */}
                    </Block>
                    <Block
                      style={{ paddingBottom: -HeaderHeight * 2 }}
                    >
                      <Block
                        row
                        space="between"
                        style={{ flexWrap: 'wrap' }}
                      >
                        {/* {activity.albumImages.map((img, imgIndex) => (
                          <Image
                            source={{ uri: img }}
                            key={`viewed-${imgIndex}`}
                            resizeMode="cover"
                            style={styles.thumb}
                          />
                        ))} */}
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
         
        </ScrollView>
      </ImageBackground>
         )) : "Loading"}
    </Block>
  );



  
}



const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35,
    color :argonTheme.COLORS.PRIMARY
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default ViewSingleActivity;
