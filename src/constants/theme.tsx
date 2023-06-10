import {Dimensions, NativeModules, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const {width, height} = Dimensions.get('screen');

export const COLORS = {
  primary: '#7F3DFF',
  secondary: '#EEE5FF',
  black: '#212325',
  white: '#FFFFFF',
  grey: 'grey',
  red: '#ED213A',
  lightgrey: '#c0c0c0',
  gray: '#606E86',
  transparentGray: '#0000ffff ',
};

export const SIZES = {
  h1: 22,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,

  width,
  height,
  STATUSBAR_HEIGHT,
};
