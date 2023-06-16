import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
  TextStyle,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/theme';

interface CustomTextInputProps {
  placeholder: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  style?: TextStyle | TextStyle[];
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  onBlur,
  style,
}) => {
  return (
    <KeyboardAvoidingView style={styles.search}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        multiline={true}
        numberOfLines={10}
        style={[style, styles.text]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        textAlignVertical="top"
      />
    </KeyboardAvoidingView>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  search: {
    marginVertical: 10,
    width: '100%',
    minHeight: 60,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.lightgrey,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '300',
    fontSize: 18,
    width: '100%',
    borderColor: 'gray',
    paddingLeft: 15,
    paddingRight: 10,
  },
});
