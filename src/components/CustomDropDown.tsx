import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList} from 'react-native'
import React, { useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

interface CustomDropdownProps {
    options: string[];
    placeholder: string;
}

const CustomDropDown:React.FC<CustomDropdownProps> = ({options,placeholder}) => {

    const [selectedCategory, setSelectedCategory] = useState(placeholder);
    const [isClicked, setIsCLicked] = useState(false);
    const [data, setData] = useState(options);


    const onSearch = (txt:string) => {
        if (txt !== ''){
            let tempData = data.filter(item =>{
                return item.toLowerCase().indexOf(txt.toLowerCase()) >-1;
            });
            setData(tempData);
        }
        else{
           setData(options)
        }
    } 

  return (
    <View style={{marginVertical:10}}>
        <View style = {styles.dropdownselector}>
        <Text style={{fontSize:18, paddingLeft:5}}>{selectedCategory}</Text>
      <TouchableOpacity 
        onPress = {()=>{setIsCLicked(!isClicked);}}
        //style = {styles.dropdownselector}
        >
        {isClicked ?(
            <Ionicons name="chevron-down-outline" size ={30} color={COLORS.grey}/>
            ):
            (
            <Ionicons name="chevron-up-outline" size ={30} color={COLORS.grey}/>
            )}
      </TouchableOpacity>
      </View>
      {isClicked? (<View style = {styles.dropdownArea}>
        <TextInput
         placeholder='Search'
         style = {styles.search}
         onChangeText={txt => {
            onSearch(txt);
         }}
        />
        <FlatList
          data = {data}
          renderItem = {({item,index}) => {
            return(
                <TouchableOpacity style ={styles.categoryItem} onPress = {() => {
                    setSelectedCategory(item);
                    onSearch('');
                    setIsCLicked(false);
                    }}>
                        <Text style = {styles.dropdownText}>{item}</Text>
                </TouchableOpacity>
            )
          }}
        />
      </View>
      ):null}
    </View>
  )
}

export default CustomDropDown

const styles = StyleSheet.create({
    dropdownselector:{
        width:'100%',
        minHeight:60,
        borderRadius:15,
        borderWidth:1,
        borderColor: COLORS.lightgrey,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    dropdownArea:{
        width:'95%',
        height:300,
        borderRadius:10,
        //marginTop:5,
        backgroundColor: COLORS.white,
        elevation: 5,
        alignSelf:'center',
        zIndex:50
    
    },
    search:{
        width: "90%",
        height: 50,
        borderWidth:0.5,
        borderColor: COLORS.lightgrey,
        borderRadius:10, 
        alignSelf: 'center',
        marginTop:20,
        paddingLeft:15
    },
    categoryItem: {
        width: "85%",
        height: 50,
        borderBottomWidth: 0.2,
        borderBottomColor: COLORS.grey,
        alignSelf:'center',
        justifyContent:'center'
    },
     dropdownText:{
        fontSize: 15,
        fontWeight:'700',
        
    }
})