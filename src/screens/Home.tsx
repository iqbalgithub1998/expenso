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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

import {AppNavigationParams} from '../navigation/AppNavigation';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Cards from '../components/Cards';
import CustomButton from '../components/CustomButton';
import LineChart from '../components/LineChart';
import TabContainer from '../components/TabContainer';
import {ExpenseValue, LentValue} from '../Api/Fetch';
import {TransactionItemProps} from '../interface/User.interface';
import {useFocusEffect} from '@react-navigation/native';
import {getUserId} from '../utils/UserID';

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
  // const {userInfo} = route.params ?? {};
  // const [userName, setUserName] = useState('');
  const {logout} = useContext(AuthContext);

  // const [activePeriod, setActivePeriod] = useState('Today');

  // const period = timeFrame;

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [transaction, setTransaction] = useState<TransactionItemProps[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      //console.log('transaction run');
      fetchTransactions();
    }, []),
  );

  const fetchTransactions = async () => {
    const userId = await getUserId();
    const snapshot = await firestore()
      .collection('Transaction')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      expense: doc.data().expense,
      description: doc.data().description,
      deadline: doc.data().deadline,
      type: doc.data().type,
      category: doc.data().category,
      method: doc.data().transactionType,
      createdAt: firestore.Timestamp.fromMillis(
        Math.floor((doc.data().createdAt.seconds * 1000) / 60000) * 60000,
      ),
    }));
    setTransaction(data);
  };
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
    navigation.navigate('Transaction');
  };

  const presstoDetail = (item: TransactionItemProps) => {
    return () => {
      navigation.navigate('Details', {item});
    };
  };

  const renderTransactionItem = ({item}: {item: TransactionItemProps}) => {
    let iconComponent = null;
    let expenseColor = COLORS.black;
    let expenseSign = '';

    const IconSize = 30;

    if (item.category === 'Food') {
      iconComponent = (
        <Ionicons
          name="md-fast-food-sharp"
          size={IconSize}
          color={COLORS.Food}
        />
      );
    } else if (item.category === 'Travel') {
      iconComponent = (
        <Ionicons
          name="md-car-sport-sharp"
          size={IconSize}
          color={COLORS.Travel}
        />
      );
    } else if (item.category === 'Housing') {
      iconComponent = (
        <Ionicons name="md-business" size={IconSize} color={COLORS.Housing} />
      );
    } else if (item.category === 'Transportation') {
      iconComponent = (
        <FontAwesome5
          name="truck-loading"
          size={IconSize}
          color={COLORS.Transportation}
        />
      );
    } else if (item.category === 'Entertainment') {
      iconComponent = (
        <MaterialIcons
          name="sports-esports"
          size={IconSize}
          color={COLORS.Entertainment}
        />
      );
    } else if (item.category === 'Utilities') {
      iconComponent = (
        <Ionicons name="build" size={IconSize} color={COLORS.Utilities} />
      );
    } else if (item.category === 'Healthcare') {
      iconComponent = (
        <FontAwesome5
          name="hospital-user"
          size={IconSize}
          color={COLORS.Healthcare}
        />
      );
    } else if (item.category === 'Education') {
      iconComponent = (
        <Ionicons
          name="md-school-sharp"
          size={IconSize}
          color={COLORS.Education}
        />
      );
    } else if (item.category === 'Personal Care') {
      iconComponent = (
        <MaterialCommunityIcons
          name="lotion"
          size={IconSize}
          color={COLORS.PersonalCare}
        />
      );
    } else if (item.category === 'Miscellaneous') {
      iconComponent = (
        <FontAwesome5
          name="random"
          size={IconSize}
          color={COLORS.Miscellaneous}
        />
      );
    }

    if (item.type === 'Lent') {
      expenseColor = COLORS.green;
      expenseSign = '+';
    } else if (item.type === 'Borrowed') {
      expenseColor = COLORS.red;
      expenseSign = '-';
    }

    return (
      <TouchableOpacity onPress={presstoDetail(item)}>
        <View style={styles.list}>
          <StatusBar
            backgroundColor={COLORS.white}
            // barStyle= 'light-content'
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {iconComponent}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingLeft: 10,
              }}>
              <Text style={styles.title}>{item.category}</Text>
              <Text>{item.description}</Text>
              {/* <Text>{item.method}</Text> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Text style={[styles.expense, {color: expenseColor}]}>
              {' '}
              {expenseSign} ₹{item.expense}
            </Text>
            <Text style={{fontSize: 10, fontWeight: '700'}}>
              {item.createdAt
                ? item.createdAt.toDate().toLocaleDateString([], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''}
            </Text>
          </View>
          {/* Render other transaction details */}
        </View>
      </TouchableOpacity>
    );
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
          <Text style={styles.bottomtext}>Spend Frequency</Text>
          {/* <View>
            {/* <Text style = {{textAlign:'center'}}>Graph/Chart</Text> 
            <LineChart />
          </View>
           */}

          <FlatList
            ListHeaderComponent={
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
            }
            data={transaction}
            keyExtractor={item => item.id}
            renderItem={renderTransactionItem}
          />
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
  list: {
    minHeight: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightgrey,
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    //elevation:3
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  expense: {
    fontSize: 22,
    fontWeight: 'bold',
    right: 5,
  },
});
