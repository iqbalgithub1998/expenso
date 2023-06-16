import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
//import firebase  from '@react-native-firebase/app';
import TabContainer from '../components/TabContainer'
import DateSelect from '../components/Date'
import { COLORS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { monthNames } from '../constants/Categories';
import CustomDropDown from '../components/CustomDropDown';
import CustomButton from '../components/CustomButton';


interface TransactionItemProps {
  id: string;
  expense: number;
  description: string;
  deadline: string;
  type: string;
  category: string;
  //createdAt: FirebaseFirestoreTypes.Timestamp;
}

const Transaction = () => {

  const [transaction, setTransaction] = useState<TransactionItemProps[]>([]);

  useEffect(() => {
      const fetchTransactions = async () => {
        const snapshot = await firestore().collection('Transaction').orderBy('createdAt', 'asc').get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          expense: doc.data().expense,
          description: doc.data().description,
          deadline: doc.data().deadline,
          type: doc.data().type,
          category: doc.data().category,
          //createdAt: firestore.Timestamp.fromMillis(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1000000), 
        }));
        setTransaction(data)
      }
      fetchTransactions();
  }, [])

  const renderTransactionItem = ({ item }: { item: TransactionItemProps }) => {


    let iconComponent = null;
    let expenseColor = COLORS.black;
    let expenseSign = '';

    if (item.category === 'Food') {
      iconComponent = <Ionicons name="md-fast-food-sharp" size={40} color={COLORS.Food} />;
    } else if (item.category === 'Travel') {
      iconComponent = <Ionicons name="md-car-sport-sharp" size={40} color={COLORS.Travel} />;
    } else if (item.category === 'Housing') {
      iconComponent = <Ionicons name="md-business" size={40} color={COLORS.Housing} />;
    } else if (item.category === 'Transportation') {
      iconComponent = <FontAwesome5 name="truck-loading" size={35} color={COLORS.Transportation} />;
    } else if (item.category === 'Entertainment') {
      iconComponent = <MaterialIcons name="sports-esports" size={40} color={COLORS.Entertainment} />;
    } else if (item.category === 'Utilities') {
      iconComponent = <Ionicons name="build" size={40} color={COLORS.Utilities} />;
    } else if (item.category === 'Healthcare') {
      iconComponent = <FontAwesome5 name="hospital-user" size={40} color={COLORS.Healthcare} />;
    } else if (item.category === 'Education') {
      iconComponent = <Ionicons name="md-school-sharp" size={40} color={COLORS.Education} />;
    } else if (item.category === 'Personal Care') {
      iconComponent = <MaterialCommunityIcons name="lotion" size={40} color={COLORS.PersonalCare} />;
    } else if (item.category === 'Miscellaneous') {
      iconComponent = <FontAwesome5 name="random" size={40} color={COLORS.Miscellaneous} />;
    }

  if (item.type === 'Lent'){
      expenseColor = COLORS.green;
      expenseSign = '+'
  }else if(item.type === 'Borrowed'){
    expenseColor = COLORS.red;
    expenseSign = '-'
  }


    return (
      <TouchableOpacity onPress = {() => console.log("Will navigate to details")}>
      <View style = {styles.list}>
                  <StatusBar
                    backgroundColor={COLORS.white}
                    // barStyle= 'light-content'
                  />
                  <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                   
                    {iconComponent}
        <View style = {{flexDirection:'column', justifyContent:'space-between', alignItems:'flex-start', paddingLeft:10}}>
        <Text style = {styles.title}>{item.category}</Text>
        <Text>{item.description}</Text>
        </View>
        </View>
        <View style = {{flexDirection:'column', justifyContent:'space-evenly', alignItems:'center'}}>
        
        <Text style = {[styles.expense,{color: expenseColor}]}> {expenseSign} ₹{item.expense}</Text>
        {/* <Text style={{ fontSize: 15, fontWeight: '700' }}>{item.createdAt ? item.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</Text> */}
        </View>
        {/* Render other transaction details */}
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <TabContainer>
    <View style = {styles.container}>

    <View style = {styles.topbar}>
    
        <CustomDropDown
          options = {monthNames}
          placeholder='Month'
          Style={styles.dropdownSelectorStyle}
          onSelectValue={() => console.log('month selected')}
        />
        
        <TouchableOpacity style = {styles.filter} onPress = {()=> console.log("Will open Filter")} >
              <Ionicons name = 'md-filter-sharp' size={30}/>
        </TouchableOpacity>
        </View>
          <View style = {{flexDirection:'row'}}>
          <CustomButton 
          title='See your Financial report'
          onPress={()=>console.log("Report !1")}
          Style={styles.button}
          titleStyle={styles.ButtonText}
          backgroundColor={COLORS.secondary}
        />
          </View>

          
      
    
      <FlatList
        ListHeaderComponent={<Text style = {styles.Heading}>Today</Text>}
        data={transaction}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
      
      />
    </View>
    </TabContainer>
  )
}

export default Transaction

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:COLORS.white,
    flexDirection: 'column',
    //justifyContent:'center',
   // alignItems:'center'
  },
  list: {
    minHeight:70,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    borderWidth:1,
    borderColor: COLORS.lightgrey,
    paddingVertical:10,
    marginVertical:10,
    paddingHorizontal:15,
    marginHorizontal:15,
    borderRadius:12,
    backgroundColor:COLORS.white,
    //opacity:0.8
  },
  image:{
    height:60,
    width: 60,
    resizeMode:'contain',
    borderRadius: 15,
   marginLeft:10,
   marginRight:15
  },
  title: {
    fontSize:20,
     fontWeight:'bold',
     color:COLORS.black
  },
  expense: {
    fontSize:22,
     fontWeight:'bold',
     right:5
      
  },
  topbar: {
    minHeight: 50,
  margin: 3,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', // Align items at opposite ends
  paddingHorizontal: 10,
  width: '100%',
  },

  dropdownSelectorStyle: {
    width:'50%' ,
    borderWidth:0,
    right:70// Adjust the spacing as needed
  },
    outerCircle: {
      height: 44,
      width: 44,
      borderRadius: 22,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2, // Adjust the value to increase or decrease the gap
    },
    button: {
      width:'90%',
     // minHeight: 60,
     // backgroundColor: COLORS.primary,

     // marginBottom: 5,
     // borderRadius: 15,
     //elevation:8,
     // marginTop:6,
     // zIndex:0
    // width: SIZES.width - 30,
     minHeight: 60,
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 5,
     marginHorizontal:20,
     borderRadius: 10,
   },
   ButtonText: {
     fontWeight: '500',
     fontSize: 18,
     color: COLORS.primary,
   },
   filter: {
    borderWidth:1, borderRadius:10, height: 40, width:40, justifyContent:'center', alignItems:'center', marginRight:10
   },
    Heading:{
     marginVertical: 10,
     fontSize:20,
     textAlign:'left',
     fontWeight: 'bold',
     color:COLORS.black,
     marginLeft:15
   }
})