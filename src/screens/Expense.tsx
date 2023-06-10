import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppNavigationParams} from '../navigation/AppNavigation';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomDropDown from '../components/CustomDropDown';
import {Categories} from '../constants/Categories';
import {savingsTypes} from '../constants/Categories';
import CustomTextInput from '../components/CustomTextInput';
import CustomModal from '../components/CustomModal';

type Props = NativeStackScreenProps<AppNavigationParams, 'Login'>;

const Expense: React.FC<Props> = ({navigation}) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handlePress = () => {
    navigation.goBack();
  };

  const openCategoryModal = () => {
    setIsModal(prevState => !prevState);
  };

  const handleSubmit = () => {
    console.log('Will continue forward');
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.red} />
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
          <View style={{marginTop: 40, paddingLeft: 10}}>
            <Text
              style={{color: COLORS.white, fontWeight: '600', fontSize: 16}}>
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
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              justifyContent: 'flex-end',
              marginVertical: 22,
            }}>
            <View style={{flex: 1}}>
              {/* <CustomDropDown options={Categories} placeholder="Category" /> */}

              {/* <CustomDropDown
              options={savingsTypes}
              placeholder="Transaction Type"
            />
            <CustomTextInput
              placeholder="Description"
              placeholderTextColor="grey"
            /> */}

              <Pressable onPress={openCategoryModal}>
                <Text style={styles.dropdown}></Text>
              </Pressable>
            </View>
            <CustomButton
              title="Continue"
              onPress={handleSubmit}
              Style={styles.button}
              titleStyle={styles.ButtonText}
            />
          </View>
        </View>
      </View>
      {isModal ? (
        <CustomModal
          title="CATEGORY"
          isModal={isModal}
          closeModal={openCategoryModal}>
          <View style={{width: '100%', height: '100%'}}>
            <Text>Hello</Text>
          </View>
        </CustomModal>
      ) : null}
    </>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.red,
  },
  dropdown: {
    borderColor: COLORS.gray,
    borderRadius: 15,
    borderWidth: 1,
    height: 60,
    width: '100%',
  },
  topSection: {
    flex: 3,
    marginHorizontal: 15,
    // Replace with your desired styles
  },
  bottomSection: {
    flex: 7,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  expense: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.white,
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: 70,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    width: '100%',
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
    marginBottom: 5,
    borderRadius: 15,
    elevation: 8,
    marginTop: 6,
    zIndex: 0,
  },
  ButtonText: {
    fontWeight: '500',
    fontSize: 22,
    color: COLORS.white,
  },
});
