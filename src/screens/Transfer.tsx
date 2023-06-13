import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert} from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppNavigationParams } from '../navigation/AppNavigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomTextInput from '../components/CustomTextInput';
import DateSelect from '../components/Date';
//import DatePicker from '../components/DatePicker';


type Props = NativeStackScreenProps<AppNavigationParams,'Login'>

const Transfer:React.FC<Props>  = ({navigation}) => {

    const handlePress = () =>{
        navigation.goBack();
    }

      const [fromValue, setFromValue] = useState('');
      const [toValue, setToValue] = useState('');
      
      const [expenseValue, setExpenseValue] = useState('');
      const [senderValue, setSenderValue] = useState('');
      const [receiverValue, setReceiverValue] = useState('');
      //const [transactionTypeValue, setTransactionTypeValue] = useState('');
      const [descriptionValue, setDescriptionValue] = useState('');
      const [dateValue, setDateValue] = useState('');

      const handleSwitch = () => {
        const tempValue = fromValue;
        setFromValue(toValue);
        setToValue(tempValue);
      };

      const handleSubmit = () => {
        if(
          expenseValue &&
          senderValue &&
      receiverValue &&
      // descriptionValue &&  -----Add this when We need description to be there
      dateValue
        ){
          console.log('Expense:', expenseValue);
          console.log('From:', senderValue);
          console.log('To:', receiverValue);
          console.log('Description:', descriptionValue);
          console.log('Date:', dateValue);
          navigation.navigate('HomeTab');
        }else{
          Alert.alert("Fill the fields")
        }
       
      };

      const handleTextChange1st = (value:string) => {
        // Perform the first operation
        setFromValue(value);
      
        // Perform the second operation
        setSenderValue(value);
      };

      const handleTextChange2nd = (value:string) => {
        // Perform the first operation
        setToValue(value);
      
        // Perform the second operation
        setReceiverValue(value);
      };

    return (
        <View style={styles.container}>
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
            <Text style={styles.expense}>Transfer</Text>
          </View>
           <View style = {{marginTop:"45%", paddingLeft:10}}>
           <Text style = {{color:COLORS.white, fontWeight:"600", fontSize:16}}>How Much ?</Text>
           <View style = {styles.textInput}>
            <Text style= {{fontSize:75, color:COLORS.white, fontWeight:'bold'}}>₹ </Text>
          <CustomNumberInput
            Style={styles.input}
            placeholder= "0"
            placeholderTextColor="white"
            onChangeText={(value) => setExpenseValue(value)}
          />
           </View>
           
           </View>
          </View>
          <View style={styles.bottomSection}>
          <View style = {{flex:1, marginHorizontal:20,marginVertical:20}}>
          <View style={{ flex: 1,  justifyContent:'space-evenly' }}> 

              <View style={{ flexDirection: 'row', width: '50%', borderRadius: 15 }}>
                <CustomTextInput
                  value={fromValue}
                  onChangeText={handleTextChange1st}
                  placeholder='From'
                  placeholderTextColor='grey'
                  Style={styles.toFrom}
        
                />
                <View style={styles.imageContainer}>
                  <TouchableOpacity activeOpacity= {1} onPress = {handleSwitch}>
                  <Image
                    source={require('../assets/images/Transfer.jpg')}
                    style={styles.image}
                  />
                  </TouchableOpacity>
                </View>
                <CustomTextInput
                  value={toValue}
                  onChangeText={handleTextChange2nd}
                  placeholder='To'
                  placeholderTextColor='grey'
                  Style={styles.toFrom}
                />
              </View>

            
                   <CustomTextInput
                   placeholder='Description'
                   placeholderTextColor = 'grey'
                   onChangeText={(value) => setDescriptionValue(value)}
                  />
               {/* <AddAttachment
                title="Add Attachment"
                onPress={handleAttachment}
              />  */}
              <DateSelect placeholder='Select date'
                  onSelectDate={(value) => setDateValue(value)}
              />
              {/* <DatePick/> */}
             </View>

             
            <CustomButton
              title="Continue"
              onPress={handleSubmit}
              Style={styles.button}
              titleStyle={styles.ButtonText}

            />

        </View>
          </View>
        </View>
      );
    };

export default Transfer

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: COLORS.blue,
    },
    topSection: {
      flex: 5,
      marginVertical:22,
      marginHorizontal: 20
 // Replace with your desired styles
    },
    bottomSection: {
      flex: 5,
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
        minHeight: 60,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 15,
        elevation:8,
        marginTop:6,
        zIndex:0
      },
      ButtonText: {
        fontWeight: '500',
        fontSize: 22,
        color: COLORS.white,
      },
      toFrom: {
        flex: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        fontSize: 19,
        textAlign:'center'
      },
      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      imageContainer: {
        position: 'absolute',
        top: 5,
        right:-25,
        alignSelf: 'center',
        zIndex: 1,
        
      },
      image: {
        width: 50,
        height: 50,
        borderRadius:24,
       justifyContent:'center',
       borderWidth:2,
       borderColor:COLORS.primary
      },
      
  });