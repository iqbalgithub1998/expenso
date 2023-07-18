import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper';

const Theme: React.FC<any> = ({navigation}) => {
  const [englishChecked, setEnglishChecked] = useState(false);
  const [hindiChecked, setHindiChecked] = useState(false);
  const [urduChecked, setUrduChecked] = useState(false);

  const handlePress = () => {
    navigation.goBack();
  };

  const handleonPress = (checkboxName: string) => {
    switch (checkboxName) {
      case 'light':
        setEnglishChecked(true);
        setHindiChecked(false);
        setUrduChecked(false);
        break;
      case 'dark':
        setEnglishChecked(false);
        setHindiChecked(true);
        setUrduChecked(false);
        break;
      case 'deviceTheme':
        setEnglishChecked(false);
        setHindiChecked(false);
        setUrduChecked(true);
        break;
      default:
        break;
    }
    console.log('Will change Language');
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
        <Text style={styles.title}>Language</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleonPress('light')}
        style={styles.block}>
        <Text style={styles.text}>English</Text>
        <Checkbox
          status={englishChecked ? 'checked' : 'unchecked'}
          onPress={() => handleonPress('light')}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleonPress('dark')}
        style={styles.block}>
        <Text style={styles.text}>हिन्दी</Text>
        <Checkbox
          status={hindiChecked ? 'checked' : 'unchecked'}
          onPress={() => handleonPress('dark')}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleonPress('deviceTheme')}
        style={styles.block}>
        <Text style={styles.text}>اردو</Text>
        <Checkbox
          status={urduChecked ? 'checked' : 'unchecked'}
          onPress={() => handleonPress('deviceTheme')}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Theme;

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
});
