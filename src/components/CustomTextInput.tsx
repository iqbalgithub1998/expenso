import { StyleSheet, Text, View, TextInput, TextInputProps, TextStyle} from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';

interface CustomTextInputProps  {
    placeholder: string;
    placeholderTextColor?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;  
    Style?: TextStyle | TextStyle[];
}


const CustomTextInput: React.FC<CustomTextInputProps>  = ({
    placeholder,
    placeholderTextColor,
    value,
    onChangeText,
    onBlur,
    Style,
   
        }) => {
  return (
    <View style = {styles.search} >
      <TextInput
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              style={Style}
              value={value}
              onChangeText={onChangeText}
              onBlur={onBlur}
            /> 
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    search:{
        width:'100%',
        minHeight:60,
        borderRadius:15,
        borderWidth:1,
        borderColor: COLORS.lightgrey,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
})