import React from 'react';
import { View, StyleSheet } from 'react-native';
import { argonTheme } from '../../constants';

export const HorizontalLine = ({mystyles}) => {
  return <View style={[styles.line,mystyles]}></View>;
};

const styles = StyleSheet.create({
  line: {
    borderColor: argonTheme.COLORS.MUTED,
    borderBottomWidth: 1.3,
    marginVertical: 10, 
    marginHorizontal:19,
    shadowColor: 'blue',
    //padding: 1,
    // shadowOffset: { width: 5, height: 8 },
    // shadowRadius: 26,
    // shadowOpacity: 1.25,
    elevation: 2,
  },
});


