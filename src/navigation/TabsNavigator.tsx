import { StyleSheet, Text, View, Image } from 'react-native'
import { BottomTabNavigationProp, createBottomTabNavigator, RouteProp } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { COLORS } from '../constants/theme';
import Transaction from '../screens/Transaction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddButton from '../components/AddButton';
import { useTabMenu } from '../context/TabContext';
import Profile from '../screens/Profile';
import Budget from '../screens/Budget';

import { useNavigation } from '@react-navigation/native';


 export type TabParamList = {
    Home: undefined;
    Transaction: undefined;
    Add: undefined;
    Budget: undefined;
    Profile: undefined;


  };

  type TabsNavigatorProps = {
    navigation: BottomTabNavigationProp<TabParamList, keyof TabParamList>;
    route: RouteProp<TabParamList, keyof TabParamList>;
  };

// type TabScreenProps<T extends keyof TabParamList> = {
//     navigation: BottomTabNavigationProp<TabParamList, T>;
//     route: RouteProp<TabParamList, T>;
//   };

const Tab = createBottomTabNavigator<TabParamList>();



const TabsNavigator:React.FC<TabsNavigatorProps> = () => {

  const navigation = useNavigation();


  const {opened, toggleOpened} = useTabMenu();
  return (
    <Tab.Navigator 
    initialRouteName='Home'
      screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarStyle: styles.tabBar
        }}>
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Ionicons name="md-home" size={30} color={focused ? COLORS.primary : COLORS.grey}/>
            </View>
          )
        }}
        listeners={{
          tabPress: e => opened && e.preventDefault(),
        }}
       />
      <Tab.Screen 
      name="Transaction"
       component={Transaction}
       options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.tabIconContainer}>
            <FontAwesome5 name="money-bill-wave-alt" size={30} color={focused ? COLORS.primary : COLORS.grey}/>
          </View>
        )
      }}
      listeners={{
        tabPress: e => opened && e.preventDefault(),
      }}
        />
     <Tab.Screen
      name = "Add"
      component = {Home} 
      options = {{
          tabBarItemStyle:{
            height:0,
          },
          tabBarButton: () => {
            return <AddButton opened={opened} toggleOpened={toggleOpened} navigation={navigation} />;
          }
      }}  
    
    /> 
    
      <Tab.Screen
       name="Budget"
        component={Budget}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
               <FontAwesome5 name="chart-pie" size={30} color={focused ? COLORS.primary : COLORS.grey}/>
            </View>
          )
        }}
        listeners={{
          tabPress: e => opened && e.preventDefault(),
        }}
        />
      <Tab.Screen
       name="Profile" 
       component={Profile}
       options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.tabIconContainer}>
           <Ionicons name="person-circle-sharp" size={35} color={focused ? COLORS.primary : COLORS.grey}/>
            
          </View>
        )
      }}

      listeners={{
        tabPress: e => opened && e.preventDefault(),
      }}
       />
    </Tab.Navigator>
    
  )
}

export default TabsNavigator

const styles = StyleSheet.create({
  tabBar:{
    padding: 0,
    height:60,
    borderRadius:20,
    backgroundColor:COLORS.white,
    borderTopColor:'transparent',
    shadowColor: COLORS.black,
    shadowOffset:{
      height:6,
      width:0,
    },
    shadowOpacity:0.3,
    shadowRadius:3,
    elevation:4
  },
  tabIcon:{
    height:40, 
    width:40
  },
  tabIconContainer: {
    position: "absolute",
    top: 12,
    alignItems: "center",
    justifyContent: "center",
  },
})