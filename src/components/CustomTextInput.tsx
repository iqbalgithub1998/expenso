import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

interface TextInputProps {
    title:string,
    titleStyle?:TextStyle | TextStyle[],
    Style?:ViewStyle | TextStyle[],
}

const CustomTextInput:React.FC<TextInputProps> = ({title,Style,titleStyle}) => {
    return (
      <TouchableOpacity style={Style} onPress={onPress}>
          <Text style={titleStyle}>{title}</Text>
      </TouchableOpacity>
    )
  }
  
  export default CustomButton
  
  const styles = StyleSheet.create({})
