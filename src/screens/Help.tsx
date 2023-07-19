import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper';

const Help: React.FC<any> = ({navigation}) => {
  const [lightChecked, setLightChecked] = useState(false);
  const [darkChecked, setDarkChecked] = useState(false);
  const [deviceThemeChecked, setDeviceThemeChecked] = useState(false);

  const handlePress = () => {
    navigation.goBack();
  };

  const handleonPress = (checkboxName: string) => {
    switch (checkboxName) {
      case 'light':
        setLightChecked(true);
        setDarkChecked(false);
        setDeviceThemeChecked(false);
        break;
      case 'dark':
        setLightChecked(false);
        setDarkChecked(true);
        setDeviceThemeChecked(false);
        break;
      case 'deviceTheme':
        setLightChecked(false);
        setDarkChecked(false);
        setDeviceThemeChecked(true);
        break;
      default:
        break;
    }
    console.log('Will change theme');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handlePress} style={styles.arrowContainer}>
          <Ionicons
            name="ios-arrow-back-outline"
            size={45}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Help</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Will have Helpline details</Text>
      </View>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginTop: 30,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: COLORS.bordergrey,
  },
  arrowContainer: {
    left: 10,
  },
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    color: COLORS.black,
    textAlign: 'center',
    right: 15,
  },
  block: {
    marginTop: 10,
    minHeight: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    paddingLeft: 15,
  },
  icon: {
    paddingRight: 5,
  },
  card: {
    marginTop: 50,
    marginHorizontal: 10,
    width: '90%',
    borderWidth: 1,
    height: 300,
    borderColor: COLORS.grey,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
});
