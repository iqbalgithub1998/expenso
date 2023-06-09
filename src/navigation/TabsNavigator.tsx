import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {COLORS} from '../constants/theme';
import Transaction from '../screens/Transaction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Profile from '../screens/Profile';
import Budget from '../screens/Budget';

import {useNavigation, useRoute} from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Transaction: undefined;
  Add: undefined;
  Budget: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabsNavigator: React.FC<any> = () => {
  const navigation = useNavigation();

  // const {opened, toggleOpened} = useTabMenu();
  const route = useRoute();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Ionicons
                name="md-home"
                size={28}
                color={focused ? COLORS.primary : COLORS.grey}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <FontAwesome5
                name="people-arrows"
                size={28}
                color={focused ? COLORS.primary : COLORS.grey}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Add"
        component={Home}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarButton: () => {
            return (
              <AddButton
                opened={opened}
                toggleOpened={toggleOpened}
                navigation={navigation}
                currentRoute={route.name}
              />
            );
          },
        }}
      /> */}

      <Tab.Screen
        name="Budget"
        component={Budget}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <FontAwesome5
                name="chart-pie"
                size={28}
                color={focused ? COLORS.primary : COLORS.grey}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Ionicons
                name="person-circle-sharp"
                size={32}
                color={focused ? COLORS.primary : COLORS.grey}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;

const styles = StyleSheet.create({
  tabBar: {
    padding: 0,
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderTopColor: 'transparent',
    shadowColor: COLORS.black,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  tabIcon: {
    height: 40,
    width: 40,
  },
  tabIconContainer: {
    position: 'absolute',
    top: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
