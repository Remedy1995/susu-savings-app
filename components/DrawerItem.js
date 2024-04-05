import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import argonTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="shop"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Elements":
        return (
          <Icon
            name="map-big"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Articles":
        return (
          <Icon
            name="spaceship"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Profile":
        return (
          <Icon
            name="profile"
            family="AntDesign"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Deposit":
        return (
          <Icon
            name="money"
            family="MaterialIcons"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Withdrawals":
        return (
          <Icon
            name="arrowsalt"
            family="AntDesign"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );

        case "Create Users":
          return (
            <Icon
              name="person-add"
              family="Ionicons"
              size={14}
              color={focused ? "white" : argonTheme.COLORS.ERROR}
            />
          );
      case "Users":
        return (
          <Icon
            name="users"
            family="Entypo"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Activity":
        return (
          <Icon
            name="activity"
            family="Feather"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Requested":
        return (
          <Icon
            name="align-horizontal-middle"
            family="Entypo"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      // case "Getting Started":
      //   return (<Icon
      //     name="spaceship"
      //     family="ArgonExtra"
      //     size={14}
      //     color={focused ? "white" : "rgba(0,0,0,0.5)"}
      //   />);
      case "Log out":
        return <Icon />;
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
          title == "Getting Started"
            ? Linking.openURL(
              "https://demos.creative-tim.com/argon-pro-react-native/docs/"
            ).catch(err => console.ERROR("An ERROR occurred", err))
            : navigation.navigate(title)
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={focused ? true : false}
              color={focused ? "white" : "rgba(0,0,0,0.5)"}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
