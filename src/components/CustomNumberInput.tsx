import React from 'react';
import { TextInput, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface CustomNumberInputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  Style?: TextStyle | TextStyle[];
  onChangeText?: (text: string) => void;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  placeholder,
  placeholderTextColor,
  Style,
  onChangeText,
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
      onChangeText={onChangeText}
      
    />
  );
};

export default CustomNumberInput;
