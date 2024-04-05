import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';

import { Input } from "galio-framework";

import Icon from './Icon';
import { argonTheme } from "../constants";

function ArInput({ shadowless, success, hasError, isTouched,placeholderText,iconName,iconFamily,
  label, style, textConfigs, placeholder, editable, onPressIn }) {

  // const { } = this.props;

  // const inputStyles = [
  //   styles.input,
  //   !shadowless && styles.shadow,
  //   success && styles.success,
  //   error && styles.error,
  //  {...styles}
  // ];

  return (
    <Input
      placeholder={placeholderText}
      placeholderTextColor={argonTheme.COLORS.MUTED}  {...textConfigs}
      style={[styles.input, hasError && isTouched ? styles.error : !hasError && isTouched ? styles.success : styles.default ,style]}
      color={argonTheme.COLORS.HEADER}
      iconContent={
        <Icon style={{margin:5}}
          size={19}
          color={argonTheme.COLORS.ICON}
          name={iconName} 
          family={iconFamily}
        />
      }
    //{...this.props}
    />
  );
}


ArInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false
};

ArInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
    height: 55,
    backgroundColor: '#FFFFFF',
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.05,
    elevation: 0.5,
  
  },
  success: {
    borderColor: argonTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: argonTheme.COLORS.INPUT_ERROR,
  },

  default: {
    borderColor: argonTheme.COLORS.BORDER,
  },
  shadow: {
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  }
});

export default ArInput;
