import { ReactNode, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Easing} from 'react-native'
import { useTabMenu } from '../context/TabContext';
import { COLORS } from '../constants/theme';


interface TabContainerProps {
    children: ReactNode;
}

const TabContainer:React.FC<TabContainerProps> = ({children}) => {

   const {opened} = useTabMenu(); 
   
   const animation = useRef(new Animated.Value(0)).current;

   useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      easing: opened ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);


  return (
    <View style = {styles.container}>
     {children}
     {opened && (
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ["transparent", COLORS.primary],
              }),
            },
          ]}
        />
      )}
    </View>
  )
}

export default TabContainer

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        opacity: 0.09,
      },
})