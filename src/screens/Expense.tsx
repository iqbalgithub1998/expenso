import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomDropDown from '../components/CustomDropDown';
import {Categories} from '../constants/Categories';
import {savingsTypes} from '../constants/Categories';
import CustomTextInput from '../components/CustomTextInput';
import AddAttachment from '../components/AddAttachment';
import RepeatTransaction from '../components/RepeatTransaction';
import DateSelect from '../components/Date';
import {uploadCustomData} from '../Api/FireBaseInsertion';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import SuccessModal from '../components/SuccessModal';

const Expense: React.FC<any> = ({navigation}) => {
  // const height = useHeaderHeight()
  const [expenseValue, setExpenseValue] = useState<number | undefined>(
    undefined,
  );
  const [categoryValue, setCategoryValue] = useState('');
  const [transactionTypeValue, setTransactionTypeValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (
      expenseValue &&
      categoryValue &&
      transactionTypeValue &&
      // descriptionValue &&  -----Add this when We need description to be there
      dateValue
    ) {
      console.log('Expense:', expenseValue);
      console.log('Category:', categoryValue);
      console.log('Transaction Type:', transactionTypeValue);
      console.log('Description:', descriptionValue);
      console.log('Date:', dateValue);

      const typeValue = 'Borrowed';

      const currentUser = auth().currentUser;
      let userId = '';

      if (currentUser) {
        userId = currentUser.uid || '';
      } else {
        try {
          await GoogleSignin.hasPlayServices();
          const currentUser = await GoogleSignin.getCurrentUser();
          //console.log(currentUser);
          userId = currentUser?.user.id || '';
          console.log('woring 0');
        } catch (error) {
          console.log('Google Sign-In error:', error);
          return 'google sign error';
        }
      }
      console.log('woring 1');
      await uploadCustomData(
        userId,
        expenseValue,
        categoryValue,
        transactionTypeValue,
        descriptionValue,
        dateValue,
        typeValue,
      );
      console.log('woring 2');
      console.log('Expense data uploaded successfully');
      Alert.alert('Data uploaded succesfuly');
      //setShowModal(true);
      navigation.navigate('InitialHome');
    } else {
      Alert.alert('Fill the fields');
    }
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.red} barStyle="light-content" />
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
          <Text style={styles.expense}>Expenses</Text>
        </View>
        <View style={{marginTop: '5%', paddingLeft: 5}}>
          <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 16}}>
            How Much ?
          </Text>
          <View style={styles.textInput}>
            <Text
              style={{fontSize: 65, color: COLORS.white, fontWeight: 'bold'}}>
              ₹{' '}
            </Text>
            <CustomNumberInput
              Style={styles.input}
              placeholder="0"
              placeholderTextColor="white"
              onChangeText={value => {
                const parsedValue = parseFloat(value);
                setExpenseValue(isNaN(parsedValue) ? 0 : parsedValue);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={{flex: 1, marginHorizontal: 10, marginTop: 20}}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            behavior="padding"
            style={{flex: 1}}
            enabled>
            <CustomDropDown
              options={Categories}
              placeholder="Category"
              onSelectValue={value => setCategoryValue(value)}
            />
            <CustomDropDown
              options={savingsTypes}
              placeholder="Transaction Type"
              onSelectValue={value => setTransactionTypeValue(value)}
            />
            <CustomTextInput
              placeholder="Description"
              placeholderTextColor="grey"
              onChangeText={value => setDescriptionValue(value)}
            />
            {/* <AddAttachment
                title="Add Attachment"
                onPress={handleAttachment}
              />  */}
            <DateSelect
              placeholder="Select date"
              onSelectDate={value => setDateValue(value)}
            />
            {/* <DatePick/> */}
            {/* <RepeatTransaction title="Repeat" subTitle="Repeat Transaction" /> */}
          </KeyboardAvoidingView>

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

export default Expense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.red,
    paddingTop: SIZES.STATUSBAR_HEIGHT,
  },
  topSection: {
    height: SIZES.height * 0.3,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    // Replace with your desired styles
  },
  bottomSection: {
    backgroundColor: COLORS.white,
    height: SIZES.height * 0.7 - SIZES.STATUSBAR_HEIGHT,
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
    fontSize: 65,
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
    // minHeight: 60,
    // backgroundColor: COLORS.primary,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginBottom: 5,
    // borderRadius: 15,
    elevation: 8,
    // marginTop:6,
    // zIndex:0
    // width: SIZES.width - 30,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 15,
  },
  ButtonText: {
    fontWeight: '500',
    fontSize: 22,
    color: COLORS.white,
  },
});
