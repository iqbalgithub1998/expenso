import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Transaction from '../screens/Transaction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Budget from '../screens/Budget';
import Profile from '../screens/Profile';
import HomeStack from './HomeStack';
import TransactionStack from './TransactionStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const AppTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const getTabVisibility = (route: any) => {
    const focusRoute = getFocusedRouteNameFromRoute(route);
    if (
      focusRoute === 'Expense' ||
      focusRoute === 'Income' ||
      focusRoute === 'Transfer' ||
      focusRoute === 'Details'
    ) {
      return 'none';
    }
    return 'flex';
  };

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
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabVisibility(route),
            ...styles.tabBar,
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Ionicons
                name="md-home"
                size={28}
                color={focused ? COLORS.primary : COLORS.grey}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabVisibility(route),
            ...styles.tabBar,
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <FontAwesome5
                name="people-arrows"
                size={28}
                color={focused ? COLORS.primary : COLORS.grey}
              />
            </View>
          ),
        })}
      />
      {/* <Tab.Screen
        name="Transaction"
        component={TransactionStack}
        options={
          {
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

export default AppTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    padding: 0,
    height: 60,
    backgroundColor: COLORS.secondary,
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
