import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Transaction from '../screens/Transaction';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator();

const TransactionStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Initial" component={Transaction} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default TransactionStack;
