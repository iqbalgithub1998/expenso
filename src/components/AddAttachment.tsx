import { StyleSheet, Text, View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../constants/theme';

interface AddAttachmentProps {
    title : string,
    onPress:()=> void,
    titleStyle?:TextStyle | TextStyle[],
    Style?:ViewStyle | TextStyle[],
}

const AddAttachment:React.FC<AddAttachmentProps> = ({title,onPress,Style,titleStyle}) => {
  return (
        <TouchableOpacity style={Style} onPress={onPress}>
            <View style={styles.buttonContainer}>
                <Feather name="paperclip" size ={30} color={COLORS.grey}/>
                <Text style={styles.buttonText}>{title}</Text>
             <View />
      </View>
        </TouchableOpacity>
  )
}

export default AddAttachment

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 14,
        borderColor: COLORS.lightgrey,
        minHeight:60,
        //marginTop:10,
      },
      buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.grey,
        marginRight: 10,
        paddingLeft:5
      },
    //   dottedBorder: {
    //     flex: 1,
    //     height: 2,
    //     borderStyle: 'dotted',
    //     borderWidth: 1,
    //     borderRadius: 1,
    //     borderColor: 'black',
    //   },
})