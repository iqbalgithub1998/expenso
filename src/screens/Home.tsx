import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, FlatList, ViewStyle,TextStyle, StyleProp, ScrollView } from 'react-native'
import React , {useContext, useState}from 'react'
import { COLORS, SIZES } from '../constants/theme'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomDropDown from '../components/CustomDropDown'
import { monthNames, timeFrame } from '../constants/Categories'
import MonthSelector from '../components/MonthPicker';
import { AuthContext } from '../navigation/AuthStackProvider';

import { AppNavigationParams } from '../navigation/AppNavigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Cards from '../components/Cards'
import CustomButton from '../components/CustomButton'



type Props = NativeStackScreenProps<AppNavigationParams,'Home'>


const tab = (activePeriod: string, item: string): ViewStyle => ({
  flex:1,
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 15,
  marginHorizontal:8,
  justifyContent: 'space-evenly',
  alignItems:'center',
  backgroundColor: activePeriod === item ? COLORS.sulphur : COLORS.white,
});

const tabText = (activeJobType:string, item: string): StyleProp<TextStyle> => ({
  fontWeight: "bold",
  textAlign:'center',
  fontSize: 18,
  color: activeJobType === item ? COLORS.citrus : COLORS.black,
});



const Home: React.FC<Props> = ({navigation}) => {

  const {logout} = useContext(AuthContext);

  const [activePeriod, setActivePeriod] = useState('Today');

  const period =  timeFrame;

  const handleSubmit = () =>{
    logout().then(() => {
      Alert.alert('Logout','Successfully Logged Out')
      navigation.navigate('Login');
    }).catch(error => {
      console.log(error);
    });
  };

  const pressHandler = () => {
    console.log('Pressed See all');
  }


  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style = {styles.topbar}>
        <View style={styles.outerCircle}>
  <TouchableOpacity onPress ={handleSubmit} style={styles.innerCircle}>
    <Image source={require('../assets/images/hero2.jpg')} style={styles.profilepic} />
  </TouchableOpacity>
</View>
        <CustomDropDown
          options = {monthNames}
          placeholder='Month'
          Style={styles.dropdownSelectorStyle}
        />
        <TouchableOpacity style = {{}} >
        <FontAwesome name="bell" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        </View>
        <Text style = {{color:COLORS.grey, fontWeight:'600', fontSize:15,textAlign:'center'}}>Account Balance</Text>
        <Text style = {styles.MoneyText}>₹ 10000</Text>
        <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <Cards
            title = 'Income'
            subtitle = '₹ 5000'
            imageSource = {require('../assets/images/Income.jpg')}
            containerStyle={{backgroundColor:COLORS.green}}
          />
           <Cards
            title = 'Expenses'
            subtitle = '₹ 3000'
            imageSource = {require('../assets/images/Expense.jpg')}
          />
        </View>
        
       </View>
      <View style={styles.bottomSection}>
        <ScrollView>
        <Text style={styles.bottomtext}>Spend Frequency</Text>
       <View>
        <Text style = {{textAlign:'center'}}>Graph/Chart</Text>
       </View>
            <View style = {styles.tabsContainer}>
            <FlatList
            data={period}
            renderItem={({ item }) => (
              <TouchableOpacity style={tab(activePeriod, item)}
                onPress = {() => {
                  setActivePeriod(item);
                }}
              >
                <Text style = {tabText(activePeriod, item)}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item=>item}
            contentContainerStyle = {{columnGap:10, paddingLeft: 20, paddingRight: 20}}
            horizontal
            showsHorizontalScrollIndicator = {false}
          />
            </View>
            <View style = {{flexDirection:'row', marginTop:5, justifyContent:'space-between', alignItems:'center', margin:5}}>
            <Text style={[styles.bottomtext,{fontSize:18}]}>Recent Transactions</Text>
            <CustomButton
              title = "See All"
              onPress = {pressHandler}
              Style = {styles.button}
              titleStyle={{color:COLORS.primary,justifyContent:'center', alignSelf:'center', fontSize:14, fontWeight:'bold'}}
            />
            </View>
               
            </ScrollView>
         </View>
        
    </View>

  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
  },
  topSection: {
    flex: 4,
    borderBottomLeftRadius:40,
    borderBottomRightRadius: 40,
    backgroundColor: COLORS.light,
// Replace with your desired styles
  },
  bottomSection: {
    flex: 6,
    backgroundColor: 'white',
    alignItems:'stretch'
    //justifyContent:'space-between'
    
  },
  topbar: {
    // borderWidth: 1,
    // borderColor: COLORS.black,
    minHeight: 50,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:10
  },

  dropdownSelectorStyle: {
    width:'56%' ,
    borderWidth:0// Adjust the spacing as needed
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
    MoneyText:{
      fontSize: 50,
      fontWeight:'bold',
      color:COLORS.black,
      textAlign:'center',
      paddingTop:5
    },
    bottomtext:{
      fontSize:25,
      fontWeight:'bold',
      padding:10,
      textAlign:'left',
      color:COLORS.black,
      paddingHorizontal:20
    },
    tabsContainer: {
      width:'100%',
      flexDirection:'row',
      marginTop: 10,
      justifyContent:'space-evenly',
      //paddingLeft: 50,
    },
    button:{
      backgroundColor: COLORS.secondary,
      borderRadius: 14,
      width:"17%",
      height:30,
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'center'
    }
    
});