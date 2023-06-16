import { StyleSheet, Text, View, TextInput, TextInputProps, TextStyle,  TouchableOpacity,
    Modal,} from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';
import { useState } from "react";
  import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

import Ionicons from 'react-native-vector-icons/Ionicons'

interface CustomTextInputProps  {
    placeholder?: string;
    onSelectDate?: (text: string) => void;
}


const DateSelect: React.FC<CustomTextInputProps>  = ({onSelectDate}) => {

            const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
            const today = new Date();
            today.setDate(today.getDate() + 1);
            const startDate = getFormatedDate(today, "YYYY/MM/DD");
        
            const [selectedStartDate, setSelectedStartDate] = useState(startDate);
            const [startedDate, setStartedDate] = useState("12/12/2023");
          
            function handleChangeStartDate(propDate: string) {
              setStartedDate(propDate);
            }
          
            const handleOnPressStartDate = () => {
              setOpenStartDatePicker(!openStartDatePicker);
            };

            const handleSelectDate = () => {
              setSelectedStartDate(startedDate);
              if (onSelectDate) {
                onSelectDate(startedDate);
              }
              setOpenStartDatePicker(false);
            };


  return (
    <View style = {styles.search} >
       
                <TouchableOpacity
                  style={{width:'98%' ,flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}
                  onPress={handleOnPressStartDate}
                >
                  <Text>{selectedStartDate}</Text>
                  <Ionicons name="calendar" size={30} color={COLORS.primary} />
                </TouchableOpacity>

              <Modal
              animationType="slide"
              transparent={true}
              visible={openStartDatePicker}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker
                    mode="calendar"
                    minimumDate={startDate}
                    selected={startedDate}
                    onDateChange={handleChangeStartDate}
                    onSelectedChange={(date) => setSelectedStartDate(date)}
                    options={{
                      backgroundColor: "#080516",
                      textHeaderColor: "#469ab6",
                      textDefaultColor: "#FFFFFF",
                      selectedTextColor: "#FFF",
                      mainColor: "#469ab6",
                      textSecondaryColor: "#FFFFFF",
                      borderColor: "rgba(122, 146, 165, 0.1)",
                    }}
                  />
  
                  <TouchableOpacity onPress={handleSelectDate}>
                    <Text style={{ color: "white" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
    </View>
  )
}

export default DateSelect

const styles = StyleSheet.create({
    search:{
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
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      modalView: {
        margin: 20,
        backgroundColor: "#080516",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 35,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      inputBtn: {
        //borderWidth: 1,
        borderRadius: 4,
        //borderColor: "#222",
        height: 50,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "center",
        marginTop: 14,
      },
})