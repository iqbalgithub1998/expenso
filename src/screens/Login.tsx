import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { COLORS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
//import CheckBox from '@react-native-community/checkbox';
import { Checkbox } from 'react-native-paper';
import CustomButton from '../components/CustomButton';


const Login: React.FC = () => {

  const onSignUpPress = () => {
    console.log("Login pressed");
  }

  const [showPass, setShowPass] = useState(false);

  return (

    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={styles.signUp}>Sign In</Text>
          <Text style={{ fontSize: 16, color: COLORS.grey }}> Hi Welcome Back ! 👋</Text>
        </View>
        <View style={{ marginBottom: 22, marginTop: 10 }}>
          <View style={styles.inputBox}>
            <TextInput
              placeholder='Email Address'
              placeholderTextColor='grey'
              keyboardType='email-address'
              style={styles.inputText}
            />
          </View>
        </View>

        <View style={{ marginBottom: 35 }}>
          <View style={styles.inputBox}>
            <TextInput
              placeholder='Password'
              placeholderTextColor='grey'
              secureTextEntry={showPass}
              style={styles.inputText}
            />
            <TouchableOpacity
              onPress={() => setShowPass(!showPass)}
              style={{
                position: 'absolute',
                right: 12
              }}
            >
              {
                showPass == true ? (
                  <Ionicons name="eye-off" size={25} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={25} color={COLORS.black} />
                )
              }
            </TouchableOpacity>
          </View>
        </View>

        <CustomButton
          title="LOGIN"
          onPress={onSignUpPress}
          Style={styles.button}
          titleStyle={styles.ButtonText}
        />
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Pressable onPress={() => console.log("Forgot password")}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.primary }}>Forgot Password ?</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,

          }}
        >
          <Text style={{ fontSize: 14, color: COLORS.grey }}> Do not have an account yet ?</Text>
          <Pressable
            onPress={() => console.log("Will go to SignUp")}
          >
            <Text
              style={{
                fontSize: 14,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",

              }}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  signUp: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
    //textAlign:'center'
  },
  inputBox: {
    width: '100%',
    height: 65,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLedt: 22
  },
  inputText: {
    textAlign: 'left',
    width: '100%',
    paddingLeft: 12
  },
  button: {
    width: '100%',
    minHeight: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 15,
    elevation: 8
  },
  ButtonText: {
    fontWeight: '500',
    fontSize: 22,
    color: COLORS.white,
  },
})