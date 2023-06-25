import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserInterface as UserType} from '../interface/User.interface';

export const CheckAuth = (): Promise<Partial<UserType>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDataValue = await AsyncStorage.getItem('ExpensoUserData');
      if (!!userDataValue) {
        resolve(JSON.parse(userDataValue));
      }
      reject(false);
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
};

export const setDataToAsyncStorage = async (
  userData: Partial<UserType>,
  key: string,
) => {
  await AsyncStorage.setItem(key, JSON.stringify(userData));
};

export const getDataFromAsyncStorage = async (key: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (!!data) {
        resolve(JSON.parse(data));
      }
      reject(false);
    } catch (error) {
      reject(false);
    }
  });
};

export const deleteAsyncStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};
