import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    title:string,
    onPress:()=> void,
    titleStyle?:TextStyle | TextStyle[],
    Style?:ViewStyle | TextStyle[],
    disabled?:boolean
}

const CustomButton:React.FC<CustomButtonProps> = ({title,onPress,Style,titleStyle, disabled}) => {
  return (
    <TouchableOpacity style={Style} onPress={onPress}>
        <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})