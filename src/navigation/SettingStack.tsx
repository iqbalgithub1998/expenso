import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../screens/Settings';
import Notification from '../screens/Notification';
import Security from '../screens/Security';
import About from '../screens/About';
import Help from '../screens/Help';
import Theme from '../screens/Theme';
import Language from '../screens/Language';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Initial" component={Settings} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Theme" component={Theme} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
};

export default SettingStack;
