import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ViewStyle,
  TextStyle,
  StyleProp,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, SIZES} from '../constants/theme';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomDropDown from '../components/CustomDropDown';
import {monthNames, timeFrame} from '../constants/Categories';
import {AuthContext} from '../navigation/AuthStackProvider';
import auth from '@react-native-firebase/auth';
//import { AuthContext } from '../navigation/AuthStackProvider';

import {AppNavigationParams} from '../navigation/AppNavigation';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Cards from '../components/Cards';
import CustomButton from '../components/CustomButton';
import LineChart from '../components/LineChart';
import TabContainer from '../components/TabContainer';
import {ExpenseValue, LentValue} from '../Api/Fetch';

type Props = NativeStackScreenProps<AppNavigationParams, 'HomeTab'>;

const tab = (activePeriod: string, item: string): ViewStyle => ({
  flex: 1,
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 15,
  marginHorizontal: 8,
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: activePeriod === item ? COLORS.sulphur : COLORS.white,
});

const tabText = (
  activeJobType: string,
  item: string,
): StyleProp<TextStyle> => ({
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 18,
  color: activeJobType === item ? COLORS.citrus : COLORS.black,
});

const Home: React.FC<Props> = ({navigation, route}) => {
  const {userInfo} = route.params ?? {};
  const [userName, setUserName] = useState('');
  const {logout} = useContext(AuthContext);

  const [activePeriod, setActivePeriod] = useState('Today');

  const period = timeFrame;

  //////For Name input from User database////////////
  useEffect(() => {
    if (userInfo) {
      const {user} = userInfo;
      const displayName = user?.givenName || '';
      setUserName(displayName);
    }
  }, [userInfo]);
  //////For Name input////////////

  //////////////////////For Cards Update will be later moved to redux////////////////////////////////////////////////////////

  // const [expenseSum, setExpenseSum] = useState<number>(0);
  // const [lentSum, setLentSum] = useState<number>(0);

  // useEffect(() => {
  //   const fetchExpenseSum = async () => {
  //     try {
  //       const snapshot = await firestore().collection('Borrowed').get();

  //       let sum = 0;
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         const expense = data?.expense;
  //         if (typeof expense === 'number') {
  //           sum += expense;
  //         }
  //       });

  //       setExpenseSum(sum);
  //     } catch (error) {
  //       console.log('Error fetching expense sum:', error);
  //     }
  //   };

  //   fetchExpenseSum();
  // }, [expenseSum] );

  // useEffect(() => {
  //   const fetchLentSum = async () => {
  //     try {
  //       const snapshot = await firestore().collection('Lent').get();

  //       let sum = 0;
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         const expense = data?.expense;
  //         if (typeof expense === 'number') {
  //           sum += expense;
  //         }
  //       });

  //       setLentSum(sum);
  //     } catch (error) {
  //       console.log('Error fetching lent sum:', error);
  //     }
  //   };

  //   fetchLentSum();
  // },[firestore().collection('Lent')]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = () => {
    logout()
      .then(() => {
        Alert.alert('Logout', 'Successfully Logged Out');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const pressHandler = () => {
    // console.log('Pressed See all');
    navigation.navigate("Transaction");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.light} />
      <TabContainer>
        <View style={styles.topSection}>
          <View style={styles.topbar}>
            <View style={styles.outerCircle}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.innerCircle}>
                <Image
                  source={require('../assets/images/hero2.jpg')}
                  style={styles.profilepic}
                />
              </TouchableOpacity>
            </View>
            <CustomDropDown
              options={monthNames}
              placeholder="Month"
              Style={styles.dropdownSelectorStyle}
              onSelectValue={() => console.log('month selected')}
            />
            <TouchableOpacity style={{}}>
              <FontAwesome name="bell" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: COLORS.grey,
              fontWeight: '600',
              fontSize: 15,
              textAlign: 'center',
            }}>
            Account Balance
          </Text>
          <Text style={styles.MoneyText}>₹ 10000</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Cards
              title="Income"
              subtitle=<LentValue />
              imageSource={require('../assets/images/Income.jpg')}
              containerStyle={{backgroundColor: COLORS.green}}
            />
            <Cards
              title="Expenses"
              subtitle=<ExpenseValue />
              imageSource={require('../assets/images/Expense.jpg')}
            />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <ScrollView>
            <Text style={styles.bottomtext}>Spend Frequency</Text>
            <View>
              {/* <Text style = {{textAlign:'center'}}>Graph/Chart</Text> */}
              <LineChart />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 5,
              }}>
              <Text style={[styles.bottomtext, {fontSize: 18}]}>
                Recent Transactions
              </Text>
              <CustomButton
                title="See All"
                onPress={pressHandler}
                Style={styles.button}
                titleStyle={{
                  color: COLORS.primary,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              />
            </View>

            <Text style={{padding: 10, fontSize: 16}}>Test</Text>
            <Text style={{padding: 10, fontSize: 16}}>Test</Text>
            <Text style={{padding: 10, fontSize: 16}}>Test</Text>
            <Text style={{padding: 10, fontSize: 16}}>Test</Text>
            <Text style={{padding: 10, fontSize: 16}}>Test</Text>
          </ScrollView>
        </View>
      </TabContainer>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    height: '100%',
  },
  topSection: {
    flex: 4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: COLORS.light,
    // Replace with your desired styles
  },
  bottomSection: {
    flex: 6,
    backgroundColor: 'white',
    alignItems: 'stretch',
    //justifyContent:'space-between'
  },
  topbar: {
    // borderWidth: 1,
    // borderColor: COLORS.black,
    minHeight: 50,
    margin: 3,
    //marginBottom:3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  dropdownSelectorStyle: {
    width: '56%',
    borderWidth: 0, // Adjust the spacing as needed
  },
  outerCircle: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2, // Adjust the value to increase or decrease the gap
  },
  innerCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilepic: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 500,
  },
  MoneyText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    paddingTop: 5,
  },
  bottomtext: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'left',
    color: COLORS.black,
    paddingHorizontal: 20,
  },
  tabsContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly',
    //paddingLeft: 50,
  },
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: 14,
    width: '17%',
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
