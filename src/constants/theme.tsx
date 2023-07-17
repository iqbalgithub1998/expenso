import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('screen');
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export const COLORS = {
  primary: '#7F3DFF',
  secondary: '#EEE5FF',
  black: '#212325',
  white: '#FFFFFF',
  grey: 'grey',
  red: '#ED213A',
  lightgrey: '#c0c0c0',
  green: '#0f9b0f',
  light: '#FFF6E5',
  orange: '#f12711',
  citrus: '#F7971E',
  sulphur: '#ffff99',
  blue: '#0083B0',
  lightgreen: '#7befb2',
  //lightred: '#ff5e62',
  Food: '#E44D26',
  Travel: '#1565C0',
  Housing: '#dd1818',
  Transportation: '#605C3C',
  Entertainment: '#fdbb2d',
  Utilities: '#EB5757',
  Healthcare: '#44A08D',
  Education: '#333399',
  PersonalCare: '#F56217',
  Miscellaneous: '#3C3B3F',
  switchColor: '#F1F1FA',
  lightred: '#FFE2E4',
  bglight:'#F6F6F6',
  bordergrey:'#EEE5FF'
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
