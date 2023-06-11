import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  ListRenderItem,
  Button,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES} from '../constants/theme';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type datatype = {
  key: string;
  title: string;
  description: string;
  image: any;
};
const bgs = ['#A5BBFF', '#DDBEFE', '#B98EFF'];

const DATA: datatype[] = [
  {
    key: 'onboard1',
    title: 'Gain total control of your money',
    description: 'Become your own money manager and make every cent count',
    image: require('../assets/images/ob1.png'),
  },
  {
    key: 'onboard2',
    title: 'Know where your money goes',
    description:
      'Track your transaction easily, with categories and financial report',
    image: require('../assets/images/Onboarding2.png'),
  },
  {
    key: 'onboard3',
    title: 'Planning ahead',
    description: 'Setup your budget for each category so you in control',
    image: require('../assets/images/Onboarding3.png'),
  },
];

const Indicator: React.FC<any> = ({scrollX}) => {
  return (
    <View style={{position: 'absolute', bottom: 170, flexDirection: 'row'}}>
      {DATA.map((item: datatype, i: number) => {
        const inputRange = [
          (i - 1) * SIZES.width,
          i * SIZES.width,
          (i + 1) * SIZES.width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 0.9, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={[styles.indicator, opacity, {transform: [{scale}]}]}
          />
        );
      })}
    </View>
  );
};

const Backdrop: React.FC<any> = ({scrollX}) => {
  const bg = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * SIZES.width),
    outputRange: bgs.map(bg => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: bg,
        },
      ]}></Animated.View>
  );
};

const Square: React.FC<any> = ({scrollX}) => {
  return (
    <Animated.View
      style={{
        width: SIZES.height,
        height: SIZES.height,
        backgroundColor: COLORS.white,
        borderRadius: 86,
        position: 'absolute',
        top: -SIZES.height * 0.65,
        left: -SIZES.height * 0.35,
        transform: [
          {
            rotate: '35deg',
          },
        ],
      }}
    />
  );
};

const Introduction: React.FC<any> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.white : COLORS.white,
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<datatype>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (flatListRef.current) {
  //       const nextIndex = (currentIndex + 1) % DATA.length;
  //       flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
  //       setCurrentIndex(nextIndex);
  //     }
  //   }, 4000); // Change the interval duration as needed

  //   return () => clearInterval(interval);
  // }, [currentIndex]);

  const onSignUpPress = () => {
    // console.log('sign up press');
    navigation.navigate('SignUp');
  };

  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  const renderItem: ListRenderItem<datatype> = ({item}) => {
    return (
      <View style={{width: SIZES.width, alignItems: 'center', padding: 20}}>
        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <Image
            source={item.image}
            style={{
              width: SIZES.width / 1.2,
              height: SIZES.width / 1.2,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flex: 0.2}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 32,
              marginBottom: 10,
              color: COLORS.white,
              textAlign: 'center',
              marginHorizontal: 10,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontWeight: '300',
              marginHorizontal: 10,
              textAlign: 'center',
              fontSize: 20,
              color: COLORS.white,
            }}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        ref={flatListRef}
        data={DATA}
        keyExtractor={item => item.key}
        contentContainerStyle={{paddingBottom: 50}}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
      <Indicator scrollX={scrollX} />
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
