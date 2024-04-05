import { Animated, Dimensions, Easing } from "react-native";
import RequestedWithdrawals from "../screens/RequestedWithdrawals";
import VerificationMomo from "../screens/VerificationMomo";
import ViewSingleActivity from "../screens/ViewSingleActivity";
import VerificationPhone from "../screens/VerificationPhone";
import UploadImage from "../screens/UploadImage";
import CustImagePicker from "../components/components/CustImagePicker";
import ViewSingleUser from "../screens/ViewSingleUser";
// header for screens
import { Header, Icon } from "../components";
import { argonTheme, tabs } from "../constants";
import Articles from "../screens/Articles";
import Withdrawal from "../screens/Withdrawal";
import UserDeposit from "../screens/UserDeposit";
import Auth from "../screens/Auth";
import { Block } from "galio-framework";
import Activity from "../screens/Activity";
import Users from "../screens/Users";
// drawer
import { CustomDrawerContent, CustomerDrawerContent } from "./Menu";
import CustomerHome from "../screens/CustomerHome";
import Elements from "../screens/Elements";
// screens
import Home from "../screens/Home";
import Deposit from "../screens/Deposit";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import React from "react";
import Register from "../screens/Register";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/Settings";
import RegisterScreen from "../screens/RegisterCustomer";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      {/* <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      /> */}
    </Stack.Navigator>
  );
}



function RequestedWithdrawalStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Requested"
        component={RequestedWithdrawals}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="RequestedWithdrawals" navigation={navigation} scene={scene} />
          ),
          //cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      {/* <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      /> */}
    </Stack.Navigator>
  );
}



function WithdrawalStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Withdrawal"
        component={Withdrawal}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Withdrawal" navigation={navigation} scene={scene} />
          ),
          //cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      {/* <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      /> */}
    </Stack.Navigator>
  );
}



function ArticlesStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      {/* <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      /> */}
    </Stack.Navigator>
  );
}



function UserStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Users"
        component={Users}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Users" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      {/* <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      /> */}
    </Stack.Navigator>
  );
}



function RegisterUserStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Create Users"
        component={RegisterScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Create User" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      {/* <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      /> */}
    </Stack.Navigator>
  );
}



function ActivityStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Activity"
        component={Activity}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Activity" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      {/* <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      /> */}
    </Stack.Navigator>
  );
}
function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Profile" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      {/* <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      /> */}
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: argonTheme.COLORS.PRIMARY },
        }}
      />
      <Stack.Screen
        name="VerificationPhone"
        component={VerificationPhone}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />

<Stack.Screen
        name="UploadImage"
        component={UploadImage}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />

      
<Stack.Screen
        name="ViewSingleUser"
        component={ViewSingleUser}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      

            
<Stack.Screen
        name="ViewSingleActivity"
        component={ViewSingleActivity}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}




function CustomerHomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={CustomerHome}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: argonTheme.COLORS.PRIMARY },
        }}
      />
      <Stack.Screen
        name="VerificationPhone"
        component={VerificationPhone}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />

<Stack.Screen
        name="Verification"
        component={VerificationMomo}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />

<Stack.Screen
        name="UploadImage"
        component={UploadImage}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />

      
<Stack.Screen
        name="ViewSingleUser"
        component={ViewSingleUser}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      

            
<Stack.Screen
        name="ViewSingleActivity"
        component={ViewSingleActivity}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Auth}
        option={{
          headerTransparent: true,
        }}
      />
        {/* <Stack.Screen name="VerificationPhone" component={VerificationPhone} /> */}
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="CustomerApp" component={CustomerAppStack} />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
   
      <Drawer.Screen
        name="Deposit"
        component={Deposit}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Withdrawals"
        component={WithdrawalStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Create Users"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />


      <Drawer.Screen
        name="Users"
        component={UserStack}
        options={{
          headerShown: false,
        }}
      />


      <Drawer.Screen
        name="Activity"
        component={ActivityStack}
        options={{
          headerShown: false,
        }}
      />
         <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    
      {/* <Drawer.Screen
        name="Elements"
        component={ElementsStack}
        options={{
          headerShown: false,
        }}
      /> */}


      {/* <Drawer.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          headerShown: false,
        }}
      /> */}

    </Drawer.Navigator>
  );
}



function CustomerAppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomerDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={CustomerHomeStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Deposit"
        component={UserDeposit}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Withdrawals"
        component={WithdrawalStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Requested"
        component={RequestedWithdrawalStack}
        options={{
          headerShown: false,
        }}
      />
       <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="Users"
        component={UserStack}
        options={{
          headerShown: false,
        }}
      /> */}


      <Drawer.Screen
        name="Activity"
        component={ActivityStack}
        options={{
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="Elements"
        component={ElementsStack}
        options={{
          headerShown: false,
        }}
      /> */}

      {/* 
      <Drawer.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          headerShown: false,
        }}
      /> */}

    </Drawer.Navigator>
  );
}