import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppNavigationParams } from '../navigation/AppNavigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';


 const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

type Props = NativeStackScreenProps<AppNavigationParams,'Login'>

const ForgotPassword :React.FC<Props> = ({navigation}) => {

    const handlePress = () =>{
        navigation.navigate("Confirmation");
    }

  return (
    <Formik
        initialValues={{
            email: ''
        }}
        validationSchema={loginSchema}
        onSubmit={handlePress}
    >
        {({values,errors,touched,handleChange,isValid,setFieldTouched ,handleSubmit})=>(

    <View style = {{flex:1, backgroundColor:COLORS.white}}>
        <View style = {{flex:1, marginHorizontal:20}}>
            <View style = {{marginVertical:22}}>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:"space-evenly", marginBottom:15}}>
                <TouchableOpacity
                  onPress={handlePress}
                  style={{
                    position: 'absolute',
                    left: -2
                  }}
                >
                <Ionicons name="ios-arrow-back-outline" size={45} color={COLORS.black} />
                </TouchableOpacity>
                <Text style = {styles.header}> Forgot Password</Text>  
            </View>
               <View style = {{paddingVertical:40}}>
               <Text style = {styles.text}>Do not worry.</Text>
                    <Text style = {styles.text2}>Enter your email and we'll send you a link to reset your password</Text>
               </View>
                  <View style = {{marginBottom:15, marginTop:25}}>
                  <View style={styles.inputBox}>
                        <TextInput
                        placeholder='Email Address'
                        placeholderTextColor='grey'
                        keyboardType='email-address'
                        style={styles.inputText}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={()=> setFieldTouched('email')}
                        />
                    </View>
                    {touched.email && errors.email &&(
                                <Text style = {styles.errorText}>{errors.email}</Text>
                            )}
                            </View>
                  <View>
                  <CustomButton
                    title="Continue"
                    onPress={handleSubmit}
                    Style={[styles.button, {backgroundColor : isValid ? COLORS.primary: COLORS.grey}]}
                    titleStyle={styles.ButtonText}
                    disabled = {!isValid}
        />
                  </View>

            </View>
            </View>
            </View>
        )}
            </Formik>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    header:{
        fontSize:25,
        fontWeight:'bold',
        marginVertical:12,
        color: COLORS.black
    },
    text:{
        fontSize:30,
        fontWeight:'500',
        color:COLORS.black,
        marginBottom:8
    },
    text2:{
        
        fontSize:25,
        fontWeight:'500',
        color:COLORS.black
    },
    inputBox:{
        width:'100%',
        height: 58,
        borderColor:COLORS.grey,
        borderWidth:1,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:15,
        marginBottom:15
    },
    inputText:{
        textAlign:'left',
        width:'100%',
        paddingLeft:12,
        fontSize:15
    },
    button: {
        width: '100%',
        minHeight: 60,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 15,
        elevation: 8,
        
      },
      ButtonText: {
        fontWeight: '500',
        fontSize: 22,
        color: COLORS.white,
      },
      errorText:{
        fontSize: 10,
        color:'red',
        paddingLeft:10,
        paddingTop:2
      }
})