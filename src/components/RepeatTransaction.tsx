import { StyleSheet, Text, View, Switch, ViewStyle, TextStyle} from 'react-native'
import {useState} from 'react'
import { COLORS } from '../constants/theme';


interface switchButtonProps{
    title: string,
    subTitle: string,
    Style?:ViewStyle | TextStyle[],
}

const RepeatTransaction:React.FC<switchButtonProps> = ({title, subTitle}) => {

const [isEnabled, setIsEnabled] = useState(false);

const toggleSwitch = () => {
    setIsEnabled(previousState =>!previousState)
}

  return (
    <View style={styles.container}>
        <View>
        <Text style = {{fontSize:18, fontWeight:'600', color:COLORS.black}}>{title}</Text>
        <Text style = {{fontSize:15, fontWeight:'500', color:COLORS.grey}}>{subTitle}</Text>
        </View>
       
        <Switch
            trackColor={{false:COLORS.grey, true:  COLORS.secondary}}
            thumbColor={!isEnabled ? COLORS.lightgrey: COLORS.primary}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        /> 
        </View>
  )
}

export default RepeatTransaction

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        minHeight:60,
        paddingHorizontal:10
    },
    
})