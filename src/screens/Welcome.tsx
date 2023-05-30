import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, Image, Pressable} from 'react-native';
import { COLORS } from '../constants/theme';
import CustomButton from '../components/CustomButton';


const Welcome:React.FC = () => {

    const onSignUpPress = () =>{
        console.log("Pressed Signup");
      };

      const onLoginPress = () => {
        console.log('login Press');
      };

  return (
    <View style = {{
        flex:1,
        backgroundColor:"#B98EFF"
    }}
    >
        <View style = {{flex:1}}>
        <View>
                    <Image
                        source={require("../assets/images/hero1.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/images/hero3.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/images/hero3.jpg")}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/images/hero2.jpg")}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>
                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: '800',
                        color: COLORS.white
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: '800',
                        color: COLORS.white
                    }}>Started</Text>
                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4,
                            fontWeight:'600'
                        }}>Scrutunize your Spendings</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            fontWeight:'600'
                        }}>Start saving</Text>
                    </View>

                    <CustomButton
          title="Sign Up"
          onPress={onSignUpPress}
          Style={styles.button}
          titleStyle={styles.ButtonText}
        />
        <CustomButton
          title="Login"
          onPress={onLoginPress}
          Style={[styles.button, styles.loginButton]}
          titleStyle={[styles.ButtonText, styles.loginText]}
        />

                </View>
        </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    button: {
        width:'100%',
        minHeight: 60,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 15,
        elevation:8
        
      },
      ButtonText: {
        fontWeight: '500',
        fontSize: 22,
        color: COLORS.white,
      },
      loginButton: {
        backgroundColor: COLORS.secondary,
      },
      loginText: {
        color: COLORS.primary,
      },
})