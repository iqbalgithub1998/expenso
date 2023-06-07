import React from 'react';
import { TextInput, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface CustomNumberInputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  Style?: TextStyle | TextStyle[];
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  placeholder,
  placeholderTextColor,
  Style,
  // Additional props as needed
}) => {
  return (
    <TextInput
      style={Style}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      maxLength={10000}
      underlineColorAndroid="transparent"
      cursorColor="transparent"
      keyboardType="numeric"
    />
  );
};

export default CustomNumberInput;
