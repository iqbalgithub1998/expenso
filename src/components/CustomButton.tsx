import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/theme';

interface CustomButtonProps {
  isLoading?: boolean;
  title: string;
  onPress: () => void;
  titleStyle?: TextStyle | TextStyle[];
  Style?: ViewStyle | TextStyle[];
  disabled?: boolean;
  backgroundColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  isLoading,
  title,
  onPress,
  Style,
  titleStyle,
  disabled,
  backgroundColor,
}) => {
  console.log('custom button');
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      style={[
        Style,
        {
          backgroundColor:
            disabled != undefined && disabled
              ? COLORS.lightgrey
              : backgroundColor,
        },
        styles.default,
      ]}
      onPress={onPress}>
      {isLoading ? <ActivityIndicator size={30} color="green" /> : null}
      <Text style={[titleStyle, isLoading ? {marginLeft: 5} : {}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
