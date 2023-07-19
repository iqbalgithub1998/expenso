import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Settings: React.FC<any> = ({navigation}) => {
  const handlePress = () => {
    navigation.goBack();
  };
  const handleonPress = () => {
    console.log('Will migrate to subsetting');
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
        <Text style={styles.title}>Settings</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notification')}
        style={styles.block}>
        <Text style={styles.text}>Notification</Text>
        <Ionicons
          style={styles.icon}
          name="chevron-forward-outline"
          size={25}
          color={COLORS.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Security')}
        style={styles.block}>
        <Text style={styles.text}>Security</Text>
        <Ionicons
          style={styles.icon}
          name="chevron-forward-outline"
          size={25}
          color={COLORS.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Theme')}
        style={styles.block}>
        <Text style={styles.text}>Theme</Text>
        <Ionicons
          style={styles.icon}
          name="chevron-forward-outline"
          size={25}
          color={COLORS.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Language')}
        style={styles.block}>
        <Text style={styles.text}>Language</Text>
        <Ionicons
          style={styles.icon}
          name="chevron-forward-outline"
          size={25}
          color={COLORS.black}
        />
      </TouchableOpacity>

      <View style={{marginTop: 80}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('About')}
          style={styles.block}>
          <Text style={styles.text}>About</Text>
          <Ionicons
            style={styles.icon}
            name="chevron-forward-outline"
            size={25}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Help')}
          style={styles.block}>
          <Text style={styles.text}>Help</Text>
          <Ionicons
            style={styles.icon}
            name="chevron-forward-outline"
            size={25}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

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
    minHeight: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
