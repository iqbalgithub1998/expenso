import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../components/CustomButton';

const Account: React.FC<any> = ({navigation}) => {
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handlePress} style={styles.arrowContainer}>
          <Ionicons
            name="ios-arrow-back-outline"
            size={45}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Account</Text>
      </View>
      <ImageBackground
        source={require('../assets/images/BG.jpg')}
        style={styles.card}
        imageStyle={styles.cardBackgroundImage}
        resizeMode="cover">
        <Text style={{fontSize: 15, fontWeight: '500', color: COLORS.grey}}>
          Account Balance
        </Text>
        <Text style={styles.text}>₹ 10000</Text>
      </ImageBackground>

      <TouchableOpacity style={styles.block}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.innerbox}>
            <Entypo name="wallet" size={35} color={COLORS.primary} />
          </View>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.black}}>
            Wallet
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.black}}>
          ₹ 2000
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.block}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.innerbox}>
            <Image
              source={require('../assets/images/SBI.png')}
              style={styles.image}
            />
          </View>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.black}}>
            SBI
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.black}}>
          ₹ 5000
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.block}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.innerbox}>
            <Image
              source={require('../assets/images/HDFCBANK.png')}
              style={styles.image}
            />
          </View>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.black}}>
            HDFC
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.black}}>
          ₹ 2000
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.block}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.innerbox}>
            <Image
              source={require('../assets/images/AXISBANK.png')}
              style={styles.image}
            />
          </View>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.black}}>
            AXIS
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.black}}>
          ₹ 1000
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="+ Add new wallet"
          onPress={() => console.log('Will move ahead')}
          Style={styles.button}
          backgroundColor={COLORS.primary}
          titleStyle={styles.buttontext}
        />
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginTop: 30,
    //borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: COLORS.bordergrey,
  },
  arrowContainer: {
    left: 10,
  },
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    color: COLORS.black,
    textAlign: 'center',
    right: 15,
  },
  block: {
    marginTop: 10,
    minHeight: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  icon: {
    paddingRight: 5,
  },
  card: {
    marginTop: 10,
    //marginHorizontal: 10,
    width: '100%',
    //borderWidth: 1,
    height: 200,
    borderColor: COLORS.grey,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    //elevation: 5,
  },
  cardBackgroundImage: {
    borderRadius: 5,
  },
  innerbox: {
    //borderWidth: 1,
    borderColor: 'black',
    height: 48,
    width: 48,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  image: {resizeMode: 'contain', height: 48, width: 48, borderRadius: 10},
  button: {
    minHeight: 60,
    width: '120%',
    alignSelf: 'center',
    borderRadius: 15,
  },

  buttontext: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.white,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});
