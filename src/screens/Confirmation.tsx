import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';
import { SIZES } from '../constants/theme';
import CustomButton from '../components/CustomButton';
import { AppNavigationParams } from '../navigation/AppNavigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppNavigationParams,'Login'>


const Confirmation :React.FC<Props> = ({navigation}) => {

    const handleSubmit = () =>{
        navigation.navigate("Login")
    }



  return (
    <View style = {{flex:1, backgroundColor:COLORS.white}}>
        <View style = {{flex:1, marginHorizontal:20}}>
            <View style = {{marginVertical:22}}>
                <Image
                    source= {require('../assets/images/Onboarding4.png')}
                    style={styles.image}
                    resizeMode= 'contain'
                />

                <Text style = {styles.text1}>Your email is on the way</Text>
                <Text style = {styles.text2}>Details regarding the changing of Password have been sent to your mail ID test@test.com</Text>
                <View style={{ bottom:-240}}>
                <CustomButton
                    title="Back to Login"
                    onPress={handleSubmit}
                    Style={styles.button}
                    titleStyle={styles.ButtonText}
                     />
                </View>
                
        
                
            </View>
    </View>
    </View>
  )
}

export default Confirmation

const styles = StyleSheet.create({
    image: {
        width: SIZES.width/1.2,
        height: SIZES.height / 2.5,
    },
    text1:{
        fontSize:25,
        fontWeight:'800',
        textAlign:'center',
        color: COLORS.black
    },
    text2:{
        marginTop:20,
        fontSize:14,
        fontWeight:'700',
        textAlign:'center',
        color: COLORS.black
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
})