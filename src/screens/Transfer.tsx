import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomTextInput from '../components/CustomTextInput';
import DateSelect from '../components/Date';
import firestore from '@react-native-firebase/firestore';
import {uploadTransferData} from '../Api/FireBaseInsertion';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

const Transfer: React.FC<any> = ({navigation}) => {
  const handlePress = () => {
    navigation.goBack();
  };

  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const [expenseValue, setExpenseValue] = useState<number | undefined>(
    undefined,
  );
  const [senderValue, setSenderValue] = useState('');
  const [receiverValue, setReceiverValue] = useState('');
  //const [transactionTypeValue, setTransactionTypeValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const handleSwitch = () => {
    const tempValue = fromValue;
    setFromValue(toValue);
    setToValue(tempValue);
  };

  const handleSubmit = async () => {
    if (
      expenseValue &&
      senderValue &&
      receiverValue //&&
      // descriptionValue &&  -----Add this when We need description to be there
      //dateValue
    ) {
      console.log('Expense:', expenseValue);
      console.log('From:', senderValue);
      console.log('To:', receiverValue);
      console.log('Description:', descriptionValue);
      console.log('Date:', dateValue);

      const currentUser = auth().currentUser;
      let userId = '';

      if (currentUser) {
        userId = currentUser.uid || '';
      } else {
        try {
          await GoogleSignin.hasPlayServices();
          const currentUser = await GoogleSignin.getCurrentUser();
          console.log(currentUser);
          userId = currentUser?.user.id || '';
        } catch (error) {
          console.log('Google Sign-In error:', error);
          return error;
        }
      }

      await uploadTransferData(
        userId,
        expenseValue,
        senderValue,
        receiverValue,
        descriptionValue,
        dateValue,
      );

      console.log('data uploaded successfully');
      Toast.show({
        type: 'success',
        text1: 'Data uploaded successfully',
        position: 'top',
        visibilityTime: 3500, // Duration in milliseconds
      });
      navigation.navigate('InitialHome');
    } else {
      Alert.alert('Fill the fields');
    }
  };

  const handleTextChange1st = (value: string) => {
    // Perform the first operation
    setFromValue(value);

    // Perform the second operation
    setSenderValue(value);
  };

  const handleTextChange2nd = (value: string) => {
    // Perform the first operation
    setToValue(value);

    // Perform the second operation
    setReceiverValue(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginBottom: 15,
          }}>
          <TouchableOpacity
            onPress={handlePress}
            style={{
              position: 'absolute',
              left: -2,
            }}>
            <Ionicons
              name="ios-arrow-back-outline"
              size={45}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Text style={styles.expense}>Transfer</Text>
        </View>
        <View
          style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end'}}>
          <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 16}}>
            How Much ?
          </Text>
          <View style={styles.textInput}>
            <Text
              style={{fontSize: 75, color: COLORS.white, fontWeight: 'bold'}}>
              ₹{' '}
            </Text>
            <CustomNumberInput
              Style={styles.input}
              placeholder="0"
              placeholderTextColor="white"
              onChangeText={value => {
                const parsedValue = parseFloat(value);
                setExpenseValue(isNaN(parsedValue) ? undefined : parsedValue);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={{flex: 1, marginHorizontal: 20}}>
          <View style={{marginVertical: 10}}>
            <View
              style={{flexDirection: 'row', width: '50%', borderRadius: 15}}>
              <CustomTextInput
                value={fromValue}
                onChangeText={handleTextChange1st}
                placeholder="From"
                placeholderTextColor="grey"
                style={styles.toFrom}
                containerStyle={{minHeight: 18, borderRadius: 10}}
              />
              <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={1} onPress={handleSwitch}>
                  <Image
                    source={require('../assets/images/Transfer.jpg')}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
              <CustomTextInput
                value={toValue}
                onChangeText={handleTextChange2nd}
                placeholder="To"
                placeholderTextColor="grey"
                style={styles.toFrom}
                containerStyle={{minHeight: 18, borderRadius: 10}}
              />
            </View>

            <CustomTextInput
              placeholder="Description"
              placeholderTextColor="grey"
              onChangeText={value => setDescriptionValue(value)}
              containerStyle={{minHeight: 60, borderRadius: 15}}
              textArea={true}
            />

            <DateSelect
              placeholder="Select date"
              onSelectDate={value => setDateValue(value)}
            />
          </View>

          <CustomButton
            title="Continue"
            onPress={handleSubmit}
            // Style={styles.button}
            // titleStyle={styles.ButtonText}
            Style={[styles.button]}
            titleStyle={[styles.ButtonText]}
            backgroundColor={COLORS.primary}
          />
        </View>
      </View>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.blue,
    //flexBasis:'100%'
  },
  topSection: {
    height: SIZES.height * 0.4 - SIZES.STATUSBAR_HEIGHT,
    marginVertical: 22,
    marginHorizontal: 20,
    // Replace with your desired styles
  },
  bottomSection: {
    height: SIZES.height * 0.6,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    //justifyContent:'space-between'
  },
  expense: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.white,
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: 75,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    //marginTop: 1,
    width: SIZES.width / 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    width: '100%',
    minHeight: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 8,
    marginTop: 20,
  },
  ButtonText: {
    fontWeight: '500',
    fontSize: 22,
    color: COLORS.white,
  },
  toFrom: {
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 19,
    textAlign: 'center',
  },
  // buttonContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'blue',
  //   paddingHorizontal: 10,
  //   borderRadius: 5,
  // },
  // buttonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
  imageContainer: {
    position: 'absolute',
    top: 10,
    right: -25,
    alignSelf: 'center',
    zIndex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 24,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  //   button: {
  //     width:'100%',
  //    // minHeight: 60,
  //    // backgroundColor: COLORS.primary,
  //    // justifyContent: 'center',
  //    // alignItems: 'center',
  //    // marginBottom: 5,
  //    // borderRadius: 15,
  //    elevation:8,
  //    // marginTop:6,
  //    // zIndex:0
  //   // width: SIZES.width - 30,
  //    minHeight: 60,
  //    justifyContent: 'center',
  //    alignItems: 'center',
  //    marginBottom: 5,
  //    borderRadius: 15,
  //  },
  //  ButtonText: {
  //   fontWeight: '500',
  //   fontSize: 22,
  //   color: COLORS.white,
  // },
  loginButton: {
    backgroundColor: COLORS.primary,
  },
  loginText: {
    color: COLORS.secondary,
  },
});
