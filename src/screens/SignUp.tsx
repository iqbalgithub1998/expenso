import { StyleSheet, Text, TextInput, View,TouchableOpacity, Image, Pressable} from 'react-native';
import { COLORS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { Checkbox } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';
import { AppNavigationParams } from '../navigation/AppNavigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppNavigationParams,'Login'>

const SignUp:React.FC<Props> = ({navigation}) => {
    
    //const navigation = useNavigation();
    const [showPass, setShowPass] = useState(false);
    const [isChecked,setIsChecked] = useState(false);

    const onSignUpPress = () => {
        console.log('sign up press');
      };

    const handlePress = () =>{
        navigation.navigate("Login");
    }
   

  return (
    <View style = {{flex:1, backgroundColor:COLORS.white}}>
        <View style = {{flex:1, marginHorizontal:22}}>
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
            
            <View style={{ marginBottom: 18 }}>
                {/* <Text style = {styles.inputTitle}>
                    NAME
                </Text> */}
            <View style = {styles.inputBox}>
                <TextInput
                    placeholder='Name'
                    placeholderTextColor ='grey'
                    style = {styles.inputText}
                />
            </View>
            </View>
            <View style={{ marginBottom: 18 }}>
            <View style = {styles.inputBox}>
                <TextInput
                    placeholder='Email Address'
                    placeholderTextColor ='grey'
                    keyboardType='email-address'
                    style = {styles.inputText}
                />
            </View>
            </View>
            <View style={{ marginBottom: 18 }}>
            <View style = {styles.inputBox}>
                <TextInput
                    placeholder='Password'
                    placeholderTextColor ='grey'
                    secureTextEntry = {showPass}
                    style = {styles.inputText}
                />
                <TouchableOpacity
                    onPress = {()=>setShowPass(!showPass)}
                    style ={{
                        position:'absolute',
                        right:12
                    }}
                >
                    {
                        showPass == true ?(
                            <Ionicons name="eye-off" size={25} color={COLORS.black} /> 
                        ):(
                            <Ionicons name="eye" size={25} color={COLORS.black} />
                        )
                    }
                </TouchableOpacity>
            </View>
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
          onPress={onSignUpPress}
          Style={styles.button}
          titleStyle={styles.ButtonText}
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
                onPress={()=>console.log("Google SIGNUP Pressed")}
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
    </View>
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
        height: 65,
        borderColor:COLORS.grey,
        borderWidth:1,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center',
        paddingLedt:22
    },
    inputText:{
        textAlign:'left',
        width:'100%',
        paddingLeft:12
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
        backgroundColor: COLORS.primary,
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
        

      }
})