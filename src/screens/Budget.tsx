import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TabContainer from '../components/TabContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Budget = () => {
  const [viewMode, setViewMode] = useState('Chart');
  return (
    <TabContainer>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Financial Transactions</Text>
          <Text style={styles.subheader}>Summary</Text>
        </View>
        <View style={styles.calenderview}>
          <TouchableOpacity
            onPress={() => console.log('Will open month calender')}>
            <Ionicons name={'md-calendar'} size={35} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={{marginLeft: 10}}>
            <Text style={[styles.calenderText, {color: COLORS.primary}]}>
              23 June, 2023
            </Text>
            <Text style={styles.calenderText}>10% more than last month </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View>
            <Text>Categories</Text>
            <Text> 10 Total</Text>
          </View>

          <View style={styles.graphs}>
            <TouchableOpacity
              style={[
                styles.outergraph,
                {
                  backgroundColor:
                    viewMode == 'Chart' ? COLORS.primary : COLORS.white,
                  borderBottomLeftRadius: 12,
                  borderTopLeftRadius: 12,
                },
              ]}
              onPress={() => setViewMode('Chart')}>
              <FontAwesome5
                name="chart-line"
                size={22}
                color={viewMode == 'Chart' ? COLORS.white : COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.outergraph,
                {
                  backgroundColor:
                    viewMode == 'Pie' ? COLORS.primary : COLORS.white,
                  borderBottomRightRadius: 12,
                  borderTopRightRadius: 12,
                },
              ]}
              onPress={() => setViewMode('Pie')}>
              <AntDesign
                name="piechart"
                size={22}
                color={viewMode == 'Pie' ? COLORS.white : COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* //container view ends */}
      </View>
    </TabContainer>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  header: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  subheader: {
    color: COLORS.grey,
    fontSize: 15,
    fontWeight: '600',
  },
  calenderview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  calenderText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.grey,
  },
  graphs: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightgrey,
    borderRadius: 13,
    //justifyContent: 'space-between',
  },
  outergraph: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    weight: 42,
    //resizeMode: 'contain',
    //backgroundColor: COLORS.Food,
    //borderRadius: 20,
    paddingHorizontal: 10,
  },
});
