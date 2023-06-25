import React, {Ref, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {COLORS} from '../../constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Modal} from 'react-native-paper';

interface FunctionProps {
  expenseNav: () => void;
  incomeNav: () => void;
  transferNav: () => void;
}

const FloatingButton: React.ForwardRefRenderFunction<
  TouchableOpacity,
  FunctionProps
> = ({expenseNav, incomeNav, transferNav}, ref) => {
  const [icon_1] = useState(new Animated.Value(20));
  const [icon_2] = useState(new Animated.Value(20));
  const [icon_3] = useState(new Animated.Value(20));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.parallel([
      Animated.timing(icon_1, {
        toValue: 110,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(icon_2, {
        toValue: 90,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(icon_3, {
        toValue: 110,
        duration: 350,
        useNativeDriver: false,
      }),
    ]).start();
    rotatePlusButton();
  };

  const popOut = () => {
    setPop(false);
    Animated.parallel([
      Animated.timing(icon_1, {
        toValue: 20,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(icon_2, {
        toValue: 20,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(icon_3, {
        toValue: 20,
        duration: 350,
        useNativeDriver: false,
      }),
    ]).start();
    rotatePlusButton();
  };

  const AddTransactions = (to: string) => {
    popOut();
    if (to == 'expense') {
      expenseNav();
    }
    if (to == 'income') {
      incomeNav();
    }
    if (to == 'transfer') {
      transferNav();
    }
  };

  const rotatePlusButton = () => {
    const toValue = pop ? 0 : 1;
    Animated.timing(rotateAnim, {
      toValue,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const plusButtonStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  return (
    <View>
      <Animated.View style={[styles.circle, {bottom: icon_1}]}>
        <TouchableOpacity onPress={() => AddTransactions('expense')}>
          <Image
            style={styles.image}
            source={require('../../assets/images/ExpenseButton.jpg')}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {bottom: icon_2, right: icon_2}]}>
        <TouchableOpacity onPress={() => AddTransactions('income')}>
          <Image
            style={styles.image}
            source={require('../../assets/images/IncomeButton.jpg')}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {right: icon_3}]}>
        <TouchableOpacity onPress={() => AddTransactions('transfer')}>
          <Image
            style={styles.image}
            source={require('../../assets/images/TransactionButton.jpg')}
          />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        ref={ref}
        activeOpacity={0.8}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
        style={[styles.circle, styles.plusButton]}>
        <Animated.View style={[styles.plusButton, plusButtonStyle]}>
          <AntDesign name="pluscircle" size={60} color={COLORS.citrus} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default React.forwardRef(FloatingButton);

const styles = StyleSheet.create({
  circle: {
    backgroundColor: COLORS.white,
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
  },
  plusButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 80,
    resizeMode: 'contain',
    width: 60,
    height: 60,
  },
});
