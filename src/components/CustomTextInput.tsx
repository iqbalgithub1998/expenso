import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
  TextStyle,
  KeyboardAvoidingView,
  ViewStyle,
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
  containerStyle?: ViewStyle | ViewStyle[];
  textArea?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  onBlur,
  style,
  containerStyle,
  textArea = false,
}) => {
  return (
    <KeyboardAvoidingView style={[styles.search, containerStyle]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        multiline={true}
        numberOfLines={textArea ? 10 : 1}
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
    borderWidth: 1,
    borderColor: COLORS.lightgrey,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.grey,
    fontWeight: '300',
    fontSize: 18,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 10,
  },
});
