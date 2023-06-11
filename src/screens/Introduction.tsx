import {StatusBar, StyleSheet, View, useColorScheme} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants/theme';
import CustomButton from '../components/CustomButton';

import IntroFlatList from '../components/IntroFlatList';

const Introduction: React.FC<any> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.white : COLORS.white,
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  //   return (
  //     <View style={{width: SIZES.width, alignItems: 'center', padding: 20}}>
  //       <View style={{flex: 0.6, justifyContent: 'center'}}>
  //         <Image
  //           source={item.image}
  //           style={{
  //             width: SIZES.width / 1.2,
  //             height: SIZES.width / 1.2,
  //             resizeMode: 'contain',
  //           }}
  //         />
  //       </View>
  //       <View style={{flex: 0.2}}>
  //         <Text
  //           style={{
  //             fontWeight: 'bold',
  //             fontSize: 32,
  //             marginBottom: 10,
  //             color: COLORS.white,
  //             textAlign: 'center',
  //             marginHorizontal: 10,
  //           }}>
  //           {item.title}
  //         </Text>
  //         <Text
  //           style={{
  //             fontWeight: '300',
  //             marginHorizontal: 10,
  //             textAlign: 'center',
  //             fontSize: 20,
  //             color: COLORS.white,
  //           }}>
  //           {item.description}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <IntroFlatList />
      <View style={{position: 'absolute', bottom: 20}}>
        <CustomButton
          title="Sign Up"
          onPress={onSignUpPress}
          Style={styles.button}
          titleStyle={styles.ButtonText}
          backgroundColor={COLORS.primary}
        />
        <CustomButton
          title="Login"
          onPress={onLoginPress}
          Style={[styles.button, styles.loginButton]}
          titleStyle={[styles.ButtonText, styles.loginText]}
          backgroundColor={COLORS.secondary}
        />
      </View>
    </View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  button: {
    width: SIZES.width - 30,
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  loginButton: {
    backgroundColor: COLORS.secondary,
  },
  loginText: {
    color: COLORS.primary,
  },
});
