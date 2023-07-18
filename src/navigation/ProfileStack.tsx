import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import Account from '../screens/Account';
import Export from '../screens/Export';
import SettingStack from './SettingStack';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Initial" component={Profile} />
      <Stack.Screen name="Settings" component={SettingStack} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Export" component={Export} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
