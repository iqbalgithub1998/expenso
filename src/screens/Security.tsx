import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper';

const Security: React.FC<any> = ({navigation}) => {
  const [pinChecked, setPinChecked] = useState(false);
  const [fingerprintChecked, setFingerprintChecked] = useState(false);
  const [faceIDChecked, setFaceIDChecked] = useState(false);

  const handlePress = () => {
    navigation.goBack();
  };

  const handleonPress = (checkboxName: string) => {
    switch (checkboxName) {
      case 'pin':
        setPinChecked(!pinChecked);
        break;
      case 'fingerprint':
        setFingerprintChecked(!fingerprintChecked);
        break;
      case 'faceID':
        setFaceIDChecked(!faceIDChecked);
        break;
      default:
        break;
    }
    console.log('Will change security');
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
        <Text style={styles.title}>Security</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleonPress('pin')}
        style={styles.block}>
        <Text style={styles.text}>Pin</Text>
        <Checkbox
          status={pinChecked ? 'checked' : 'unchecked'}
          onPress={() => handleonPress('pin')}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleonPress('fingerprint')}
        style={styles.block}>
        <Text style={styles.text}>Finger Print</Text>
        <Checkbox
          status={fingerprintChecked ? 'checked' : 'unchecked'}
          onPress={() => handleonPress('fingerprint')}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleonPress('faceID')}
        style={styles.block}>
        <Text style={styles.text}>Face ID</Text>
        <Checkbox
          status={faceIDChecked ? 'checked' : 'unchecked'}
          onPress={() => handleonPress('faceID')}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Security;

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
