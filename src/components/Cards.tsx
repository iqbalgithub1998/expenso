import { StyleSheet, Text, View, ViewStyle,TextStyle, Image, ImageSourcePropType,ImageStyle } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';


interface CardProps {
title: string;
subtitle: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  imageSource: ImageSourcePropType;
  imageStyle?: ImageStyle;
}

const Cards:React.FC<CardProps> = ({title, subtitle,containerStyle,titleStyle,subtitleStyle,imageSource, imageStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
        <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
            <Image
                source={imageSource} 
                style={[styles.image, imageStyle]}
            />
        <View style = {{paddingLeft:10}} >
        <Text style={[styles.title, titleStyle]}>{title}</Text>
         <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
        </View>
        </View>
    </View>
  )
}

export default Cards

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"50%",
        backgroundColor: COLORS.red,
        borderRadius: 26,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal:10,
        marginTop: 20
    },
    title:{
        fontSize: 16,
        color:COLORS.white,
        fontWeight:'800',

    },
    subtitle:{
        fontSize: 25,
        color:COLORS.white,
        fontWeight:'bold',
    },
    image: {
        width: 50,
        height: 50,
        //marginBottom: 8,
        borderRadius: 18,
      },
})

