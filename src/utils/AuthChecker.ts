import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInterface as UserType } from "../interface/User.interface";

export const CheckAuth = (): Promise<Partial<UserType>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDataValue = await AsyncStorage.getItem('ExpensoUserData');
            if (!!userDataValue) {
                return resolve(JSON.parse(userDataValue));
            }
            return reject(false);
        } catch (error) {
            return reject(false);
        }
    });
};

export const setUserDataToAsyncStorage = async (userData: Partial<UserType>,key:string) => {
    await AsyncStorage.setItem(key, JSON.stringify(userData));
};

export const getDataFromAsyncStorage = async (key:string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem(key);
            if (!!data) {
                return resolve(JSON.parse(data));
            }
            return reject(false);
        } catch (error) {
            return reject(false);
        }
    });
};

export const clearAsyncStorage = async () => {
   await AsyncStorage.clear();
};