import { StyleSheet, Text, TextInput, View,TouchableOpacity, Image, Pressable, ActivityIndicator} from 'react-native';
import { COLORS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext, useState } from 'react';
import { Checkbox } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import { AppNavigationParams } from '../navigation/AppNavigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik, useFormikContext } from 'formik';
 import * as Yup from 'yup';
 import { AuthContext } from '../navigation/AuthStackProvider';
import { signIn } from '../utils/GoogleSignIn'

type Props = NativeStackScreenProps<AppNavigationParams,'HomeTab'>

const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your name'),
    email: Yup.string().email('Invalid email').required('Please enter your Email'),
    password: Yup.string()
    .min(8)
    .required('Please Enter Password')
    .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Must be 8 digits and combination of Uppercase, Lowercase, number and specialsymbols"
    ),
    confirmPassword: Yup.string()
        .min(8)
        .oneOf([Yup.ref('password')], "Passwords not matching")
        .required('Confirm your Password')
        
  });

const SignUp:React.FC<Props> = ({navigation}) => {


    const handleGoogleSignIn = async () => {
        //await signIn(navigation);
        const userInfo = await signIn(navigation);
        navigation.navigate('HomeTab', { userInfo });
      };
    
    //const navigation = useNavigation();
    const [showPass, setShowPass] = useState(true);
    const [isChecked,setIsChecked] = useState(false);
    const [isLoading,setIsLoading]  = useState(false);

    const {register} = useContext(AuthContext);

    const initialValues = {
        name: '',
        email: '',
        password:'',
        confirmPassword:''
    }
    const handlePress = () =>{
        navigation.goBack();
    }
   

  return (
   <Formik initialValues={initialValues}
    validationSchema={SignupSchema}
    onSubmit={ async (values, {resetForm}) =>{
        {
        console.log('Form submitted');
        console.log('Form values:', values);
        // register(values.name, values.email, values.password)
        // navigation.navigate("Login")
        try {
            setIsLoading(true);
  
            await register(values.name,values.email, values.password);
            resetForm({values: initialValues})
            navigation.navigate("HomeTab");
          } catch (error) {
            console.log("SignUp error:", error);
          }finally {
            setIsLoading(false); // Set loading state back to false
          }
        }
    }
         
        }
   >
    {({values,errors,touched,handleChange,isValid,setFieldTouched ,handleSubmit})=>(

    
    <View style = {{flex:1, backgroundColor:COLORS.white}}>

{isLoading ? (
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={100} color="#0000ff" /> 
            </View>// Replace with your loader component or indicator
          ) : (

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
            <Text style={styles.signUp}>Create Account</Text>
          </View>
            <Text style = {{fontSize:16, color:COLORS.grey,textAlign:'center'}}>Manage your expenses starting from today !!</Text>
            </View>
            <View style={{ marginBottom: 15 }}>
                {/* <Text style = {styles.inputTitle}>
                    NAME
                </Text> */}
            <View style = {styles.inputBox}>
                <TextInput
                    placeholder='Name'
                    placeholderTextColor ='grey'
                    style = {styles.inputText}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={()=> setFieldTouched('name')}
                />
            </View>
            {touched.name && errors.name &&(
                    <Text style = {styles.errorText}>{errors.name}</Text>
                )}
            </View>
            <View style={{ marginBottom: 15 }}>
            <View style = {styles.inputBox}>
                <TextInput
                    placeholder='Email Address'
                    placeholderTextColor ='grey'
                    keyboardType='email-address'
                    style = {styles.inputText}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={()=> setFieldTouched('email')}
                    
                />
            </View>
            {touched.email && errors.email &&(
                    <Text style = {styles.errorText}>{errors.email}</Text>
                )}
            </View>
            <View style={{ marginBottom: 15 }}>
            <View style = {styles.inputBox}>
                <TextInput
                    placeholder='Password'
                    placeholderTextColor ='grey'
                    secureTextEntry = {showPass}
                    style = {styles.inputText}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={()=> setFieldTouched('password')}
                />
                <TouchableOpacity
                    onPress = {()=>setShowPass((prevState)=> !prevState)}
                    style ={{
                        position:'absolute',
                        right:12
                    }}
                >
                    {
                        showPass == true ?(
                            <Ionicons name="eye-off" size={25} color={COLORS.grey} /> 
                        ):(
                            <Ionicons name="eye" size={25} color={COLORS.black} />
                        )
                    }
                </TouchableOpacity>
            </View>
            {touched.password && errors.password &&(
                    <Text style = {styles.errorText}>{errors.password}</Text>
                )}
            </View>

            <View style={{ marginBottom: 15 }}>
            <View style = {styles.inputBox}>
                <TextInput
                    placeholder='Confirm Password'
                    placeholderTextColor ='grey'
                    secureTextEntry = {showPass}
                    style = {styles.inputText}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={()=> setFieldTouched('confirmPassword')}
                />
            </View>
            {touched.confirmPassword && errors.confirmPassword &&(
                    <Text style = {styles.errorText}>{errors.confirmPassword}</Text>
                )}
            </View>

        <View style = {{
            flexDirection:'row',
            marginVertical:6,
            marginTop:8,
            justifyContent:'space-evenly',
            alignItems:'center'
            }}>
            <Checkbox
                status = {isChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setIsChecked(!isChecked);
                  }}
                color = {isChecked ?COLORS.primary: undefined}
            />
         <Text style={{fontSize:11, paddingLeft:4}}>By Signing up you agree to the </Text>
         <Pressable  onPress={() =>console.log("Terms and conditions")}>
            <Text   style = {{
                                fontSize: 11,
                                color: COLORS.primary,
                                marginLeft:8
                            }}
            >
            Terms of Service and Privacy Policy
            </Text>
         </Pressable>
         
        </View>
        
        <CustomButton
          title="Sign Up"
          onPress={handleSubmit}
          Style={[styles.button, {backgroundColor : isValid ? COLORS.primary: COLORS.grey}]}
          titleStyle={styles.ButtonText}
          disabled = {!isValid}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                            <View
                                style={{
                                    flex: 1,
                                    height: 1,
                                    backgroundColor: COLORS.grey,
                                    marginHorizontal: 10
                                }}
                            />
                            <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                            <View
                                style={{
                                    flex: 1,
                                    height: 1,
                                    backgroundColor: COLORS.grey,
                                    marginHorizontal: 10
                                }}
                            />
                        </View>
            
            <View style = {{
                flexDirection:'row',
                justifyContent:'center',
                elevation:8
            }}>
                <TouchableOpacity 
                onPress={handleGoogleSignIn}
                style = {styles.googleLogin}>
                    <Image
                        source = {require("../assets/images/google.png")}
                        style={{
                            height:36,
                            width:36,
                            marginRight: 8
                        }}
                        resizeMode='contain'
                    />
                    <Text style = {{
                        fontSize:15,
                        fontWeight:'600',
                        color:COLORS.black
                    }}> Sign Up with Google</Text>
                </TouchableOpacity>
            </View>

            <View
            style = {{
                flexDirection:'row',
                justifyContent:'center',
                marginVertical: 20,
                
            }}
            >
                <Text style= {{fontSize:16, color:COLORS.black}}> Already Have an account ?</Text>
                <Pressable
                    onPress={handlePress}
                >
                        <Text
                            style = {{
                                fontSize: 16,
                                color: COLORS.primary,
                                fontWeight: "bold",
                                marginLeft: 6,
                                textDecorationLine: "underline"
                            }}
                        >
                            Login
                        </Text>
                </Pressable>
            </View>
        </View>
          )}
    </View>
    )}
    </Formik>
   
  )
}

export default SignUp

const styles = StyleSheet.create({
    signUp:{
        fontSize:25,
        fontWeight:'bold',
        marginVertical:12,
        color: COLORS.black
    },
    inputBox:{
        width:'100%',
        height: 58,
        borderColor:COLORS.grey,
        borderWidth:1,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:18
    },
    inputText:{
        textAlign:'left',
        width:'100%',
        paddingLeft:12,
        fontSize:15
    },
    inputTitle:{
        fontSize: 16,
        fontWeight: 500,
        marginVertical: 8,
        color: COLORS.black,
        paddingLeft:10
    },
    button: {
        width:'100%',
        minHeight: 60,
        //backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 15,
        elevation:8,
        marginTop:6
      },
      ButtonText: {
        fontWeight: '500',
        fontSize: 22,
        color: COLORS.white,
      },
      googleLogin:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        borderWidth:1,
        borderColor:COLORS.grey,
        borderRadius:10,
        marginRight: 4,
      },
      errorText:{
        fontSize: 10,
        color:'red',
        paddingLeft:10,
        paddingTop:2
      }
})