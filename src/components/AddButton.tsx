import React, { useEffect, useRef } from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";

import { TabParamList } from '../navigation/TabsNavigator';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from "../constants/theme";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppNavigationParams } from "../navigation/AppNavigation";


interface AddButtonProps {
  opened: boolean;
  toggleOpened: () => void;
  navigation: any;
  
}

const AddButton: React.FC<AddButtonProps> = ({ opened, toggleOpened ,navigation}) => {
  const animation = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.spring(animation, {
      toValue: opened ? 1 : 0,
      friction: 4, // Adjust the friction value as per your requirement
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
             <TouchableOpacity
             onPress={() =>{
              navigation.navigate("Income");
              toggleOpened();
            }}
            activeOpacity={0.7}
            >
            <Image
              source={require("../assets/images/IncomeButton.jpg")}
              resizeMode="cover"
              style={styles.itemIcon}
            />
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
            onPress={() =>{ 
              navigation.navigate("Transfer");
              toggleOpened()}}
              activeOpacity={0.7}
            >
            <Image
              source={require("../assets/images/TransactionButton.jpg")}
              resizeMode="contain"
              style={styles.itemIcon}
            />
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
             <TouchableOpacity
           onPress={() => {
           navigation.navigate("Expense") ;
           toggleOpened()}}
           activeOpacity={0.7}
            >
            <Image
              source={require("../assets/images/ExpenseButton.jpg")}
              resizeMode="contain"
              style={styles.itemIcon}
            />
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={toggleOpened} style={styles.addButton}>
          <Animated.View
            style={[
              styles.addButtonInner,
              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "45deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <AntDesign name="pluscircle" size={60} color={COLORS.primary} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    height: 0,
  },
  box: {
    position: "relative",
    width: 60,
    height: 60,
    marginTop: -30,
  },
  addButton: {
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'transparent',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addButtonIcon: {
    width: 40,
    height: 40,
    tintColor: COLORS.white,
  },
  item: {
    position: "absolute",
    top: 5,
    left: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  itemIcon: {
    width: 60,
    height: 60,
    borderRadius:30,
   // tintColor: COLORS.white,
    
  },
});

export default AddButton;
