import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';

const Details: React.FC<any> = ({navigation, route}) => {
  const {item} = route.params;

  let bgColor = COLORS.white;
  if (item.type === 'Lent') {
    bgColor = COLORS.green;
  } else if (item.type === 'Borrowed') {
    bgColor = COLORS.red;
  }

  const handlePress = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    console.log('WIll Edit');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />
      <View style={[styles.topSection, {backgroundColor: bgColor}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginBottom: 15,
            marginHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={handlePress}
            style={{
              position: 'absolute',
              left: -2,
            }}>
            <Ionicons
              name="ios-arrow-back-outline"
              size={45}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Detailed Transaction</Text>
        </View>
        <View style={styles.transaction}>
          <Text style={styles.transactiontext}>₹ {item.expense}</Text>

          <Text
            style={[
              styles.transactiontext,
              {fontSize: 15, paddingVertical: 10},
            ]}>
            {item.createdAt
              ? item.createdAt.toDate().toLocaleString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : ''}
          </Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.textHeader}>Type</Text>
            <Text style={styles.textContent}>{item.type}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.textHeader}>Category</Text>
            <Text style={styles.textContent}>{item.category}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.textHeader}>Method</Text>
            <Text style={styles.textContent}>{item.method}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: COLORS.grey, fontSize: 35, fontWeight: 'bold'}}>
            - - - - - - - - - - - - - - -
          </Text>
        </View>
        <View style={styles.settleTransactionContainer}>
          <Text style={styles.settleTransactionText}>
            Settle your transaction by:
          </Text>
          <Text style={styles.deadlineText}>{item.deadline}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.settleTransactionText}>Description:</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>

        <CustomButton
          title="EDIT"
          onPress={handleSubmit}
          Style={styles.button}
          titleStyle={styles.ButtonText}
          backgroundColor={COLORS.primary}
        />
      </View>
    </View>
  );
};
export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    marginTop: SIZES.STATUSBAR_HEIGHT,
    //flexBasis: '100%',
  },
  topSection: {
    height: SIZES.height * 0.35,
    width: '100%',
    //marginHorizontal: 10,
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  bottomSection: {
    backgroundColor: COLORS.white,
    height: SIZES.height * 0.65 - SIZES.STATUSBAR_HEIGHT,

    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,

    //justifyContent:'space-between'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  transaction: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  transactiontext: {
    fontSize: 70,
    fontWeight: '800',
    color: COLORS.white,
  },
  card: {
    width: '98%',
    minHeight: 80,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.grey,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    //zIndex: 0,
    //top: -40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: '92%', // Position the card container at the middle of the screen
    transform: [{translateY: -30}], // Adjust translateY to move the card container up
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textHeader: {
    color: COLORS.grey,
    fontSize: 14,
  },
  textContent: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  button: {
    width: '100%',
    // minHeight: 60,
    // backgroundColor: COLORS.primary,
    // justifyContent: 'center',
    //alignItems: 'center',
    // marginBottom: 5,
    // borderRadius: 15,
    elevation: 8,
    //marginTop: 20,
    // zIndex:0
    // width: SIZES.width - 30,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 15,
    alignSelf: 'center',
    bottom: -15,
  },
  ButtonText: {
    fontWeight: '500',
    fontSize: 22,
    color: COLORS.white,
  },
  dottedLineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  dottedLine: {
    color: COLORS.grey,
    fontSize: 20,
    fontWeight: 'bold',
  },
  settleTransactionContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10, // Adjust the marginBottom as needed
  },
  settleTransactionText: {
    color: COLORS.grey,
    fontSize: 16,
    fontWeight: '600',
  },
  deadlineText: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5, // Adjust the marginLeft as needed
  },
  descriptionContainer: {
    marginBottom: 10, // Adjust the marginBottom as needed
  },
  descriptionText: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5, // Adjust the marginTop as needed
  },
});

{
  /* <Text>Title: {item.category}</Text>
<Text>Description: {item.description}</Text>
<Text>Expense: {item.expense}</Text>
<Text>Settle by : {item.deadline}</Text>
<Text>
  Deal done at :
  {item.createdAt
    ? item.createdAt.toDate().toLocaleDateString([], {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''}
</Text> */
}
