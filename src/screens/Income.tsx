import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, StatusBar} from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppNavigationParams } from '../navigation/AppNavigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomDropDown from '../components/CustomDropDown';
import { Categories } from '../constants/Categories';
import { savingsTypes } from '../constants/Categories';
import CustomTextInput from '../components/CustomTextInput';
import AddAttachment from '../components/AddAttachment';
import RepeatTransaction from '../components/RepeatTransaction';
import DateSelect from '../components/Date';
import firestore  from '@react-native-firebase/firestore';
import { uploadCustomData } from '../Api/FireBaseInsertion';


type Props = NativeStackScreenProps<AppNavigationParams,'Login'>

const Income:React.FC<Props>  = ({navigation}) => {


const [expenseValue, setExpenseValue] = useState<number | undefined>(undefined);
const [categoryValue, setCategoryValue] = useState('');
const [transactionTypeValue, setTransactionTypeValue] = useState('');
const [descriptionValue, setDescriptionValue] = useState('');
const [dateValue, setDateValue] = useState('');

    const handlePress = () =>{
        navigation.goBack();
    }

    const handleSubmit = async () => {
      if(
        expenseValue &&
    categoryValue &&
    transactionTypeValue &&
    // descriptionValue &&  -----Add this when We need description to be there
    dateValue
      ){
        console.log('Expense:', expenseValue);
        console.log('Category:', categoryValue);
        console.log('Transaction Type:', transactionTypeValue);
        console.log('Description:', descriptionValue);
        console.log('Date:', dateValue);

        // const incomeData = {
        //   expense: expenseValue,
        //   category: categoryValue,
        //   transactionType: transactionTypeValue,
        //   description: descriptionValue,
        //   deadline: dateValue,
        //   createdAt: firestore.FieldValue.serverTimestamp(),
        // };
        const typeValue = 'Lent'

        await uploadCustomData(
          expenseValue,
          categoryValue,
          transactionTypeValue,
          descriptionValue,
          dateValue,
          typeValue
        );


        navigation.navigate('HomeTab');
      }else{
        Alert.alert("Fill the fields")
      }
     
    };



    // const handleAttachment = () => {
    //   console.log("Will add attachment");
    // }


    return (
        <View style={styles.container}>
          <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle= 'light-content'
                  />
          <View style={styles.topSection}>
          <View style={{flexDirection:'row',alignItems:'center', justifyContent:"space-evenly", marginBottom:15}}>
            <TouchableOpacity
              onPress={handlePress}
              style={{
                position: 'absolute',
                left: -2
              }}
            >
            <Ionicons name="ios-arrow-back-outline" size={45} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.expense}>Income</Text>
          </View>
           <View style = {{marginTop:"5%", paddingLeft:10}}>
           <Text style = {{color:COLORS.white, fontWeight:"600", fontSize:16}}>How Much ?</Text>
           <View style = {styles.textInput}>
            <Text style= {{fontSize:75, color:COLORS.white, fontWeight:'bold'}}>₹ </Text>
          <CustomNumberInput
            Style={styles.input}
            placeholder= "0"
            placeholderTextColor="white"
            onChangeText={(value) => {
              const parsedValue = parseFloat(value);
              setExpenseValue(isNaN(parsedValue) ? undefined : parsedValue);
            }}
          />
           </View>
           
           </View>
          </View>
          <View style={styles.bottomSection}>
          <View style = {{flex:1, marginHorizontal:20,marginVertical:20}}>
          <View style={{ flex: 1,  justifyContent:'space-evenly' }}> 
              <CustomDropDown
                options={Categories}
                placeholder='Category'
                onSelectValue={(value) => setCategoryValue(value)}
              />
              <CustomDropDown
                options={savingsTypes}
                placeholder='Transaction Type'
                onSelectValue={(value) => setTransactionTypeValue(value)}

              />
              <CustomTextInput
                placeholder='Description'
                placeholderTextColor='grey'
                onChangeText={(value) => setDescriptionValue(value)}
              />
              {/* <AddAttachment
                      title="Add Attachment"
                      onPress={handleAttachment}
                    />  */}
              <DateSelect placeholder='Select date'
                onSelectDate={(value) => setDateValue(value)}
              />
              <RepeatTransaction
              title='Repeat'
              subTitle='Repeat Transaction'
            />
             </View>

             
             <CustomButton
              title="Continue"
              onPress={handleSubmit}
              // Style={styles.button}
              // titleStyle={styles.ButtonText}
              Style={[styles.button]}
              titleStyle={[styles.ButtonText]}
              backgroundColor={COLORS.primary} />

            
            
        </View>
          </View>
        </View>
      );
    };

export default Income

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: COLORS.green,
      flexBasis: '100%'
    },
    topSection: {
      flex: 3,
      marginVertical:22,
      marginHorizontal: 20
 // Replace with your desired styles
    },
    bottomSection: {
      flex: 7,
      backgroundColor: 'white',
      borderTopLeftRadius:40,
      borderTopRightRadius: 40,
      //justifyContent:'space-between'
      
    },
    expense:{
        fontSize:25,
        fontWeight:'bold',
        marginVertical:12,
        color: COLORS.white
    },
    input:{
        backgroundColor: 'transparent',
        fontSize: 75,
        fontWeight:'bold',
        color: 'white',
    },
    textInput:{
        //marginTop: 1,
        width: SIZES.width/1.4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'flex-start'
    },
    button: {
      width:'100%',
     // minHeight: 60,
     // backgroundColor: COLORS.primary,
     // justifyContent: 'center',
     // alignItems: 'center',
     // marginBottom: 5,
     // borderRadius: 15,
     elevation:8,
     // marginTop:6,
     // zIndex:0
    // width: SIZES.width - 30,
     minHeight: 60,
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 5,
     borderRadius: 15,
   },
   ButtonText: {
     fontWeight: '500',
     fontSize: 22,
     color: COLORS.white,
   },
      
  });