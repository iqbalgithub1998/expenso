import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, TextStyle, ViewStyle} from 'react-native'
import React, { useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';
import { Modal } from 'react-native';

interface CustomDropdownProps {
    options: string[];
    placeholder: string;
    Style?:ViewStyle | TextStyle[],
}

const CustomDropDown:React.FC<CustomDropdownProps> = ({options,placeholder, Style}) => {

    const [selectedCategory, setSelectedCategory] = useState(placeholder);
    //const [isClicked, setIsCLicked] = useState(false);
    const [data, setData] = useState(options);
    const [isModalVisible, setIsModalVisible] = useState(false);



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
    <View style={{marginTop:10}}>
        <View style = {[styles.dropdownselector,Style]}>
        <Text style={{fontSize:18, paddingLeft:5}}>{selectedCategory}</Text>
      <TouchableOpacity 
        onPress = {()=>{setIsModalVisible(!isModalVisible);}}
        //style = {styles.dropdownselector}
        >
        {/* {isModalVisible ?(
            <Ionicons name="chevron-down-outline" size ={30} color={COLORS.grey}/>
            ):
            (
            <Ionicons name="chevron-up-outline" size ={30} color={COLORS.grey}/>
            )} */}
             <Ionicons
        name={isModalVisible ? 'chevron-up-outline' : 'chevron-down-outline'}
        size={30}
        color={COLORS.grey}
      />
      </TouchableOpacity>
      </View>
      <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Search"
            style={styles.search}
            onChangeText={txt => onSearch(txt)}
          />
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => {
                  setSelectedCategory(item);
                  onSearch('');
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
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
        
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      
    },
    modalContent: {
      backgroundColor: COLORS.white,
      marginHorizontal: 20,
      borderRadius: 10,
      elevation: 5,
      paddingVertical: 10,
      height:400
    },
})