import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
//import TabContainer from '../components/TabContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {VictoryPie} from 'victory-native';
import {Categories} from '../constants/Categories';
const Budget = () => {
  const [viewMode, setViewMode] = useState('Chart');
  const [switchMode, setSwitchMode] = useState('Expense');

  ////////////////Dummy Data////////////////////
  const getRandomPercentages = () => {
    const percentages = [];
    let remainingPercentage = 100;

    for (let i = 0; i < Categories.length - 1; i++) {
      const randomPercentage = Math.floor(Math.random() * remainingPercentage);
      percentages.push(randomPercentage);
      remainingPercentage -= randomPercentage;
    }

    percentages.push(remainingPercentage);
    return percentages;
  };

  const CATCOLORS: {[key: string]: string} = {
    Food: '#E44D26',
    Travel: '#1565C0',
    Housing: '#434343',
    Transportation: '#605C3C',
    Entertainment: '#fdbb2d',
    Utilities: '#EB5757',
    Healthcare: '#44A08D',
    Education: '#333399',
    'Personal Care': '#F29492',
    Miscellaneous: '#3C3B3F',
    switchColor: '#F1F1FA',
  };
  const percentages = getRandomPercentages();
  const data = Categories.map((category, index) => ({
    x: category,
    y: percentages[index],
  }));
  const colorScale = Categories.map(category => CATCOLORS[category]);
  ////////////////Dummy Data////////////////////

  const renderChart = () => {
    return (
      <View style={styles.chart}>
        <VictoryPie
          data={data}
          colorScale={colorScale}
          innerRadius={50} // Adjust the inner radius to create a donut chart
          labels={({datum}) => `${datum.x}: ${datum.y}%`} // Custom label format
        />
      </View>
    );
  };

  return (
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

        <View style={[styles.graphs]}>
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
      <View style={styles.switch}>
        <TouchableOpacity
          style={[
            styles.switchbutton,
            {
              backgroundColor:
                switchMode == 'Expense' ? COLORS.primary : COLORS.switchColor,
            },
          ]}
          onPress={() => setSwitchMode('Expense')}>
          <Text
            style={[
              styles.switchText,
              {
                color: switchMode == 'Expense' ? COLORS.white : COLORS.black,
                borderBottomRightRadius: 12,
                borderTopRightRadius: 12,
              },
            ]}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchbutton,
            {
              backgroundColor:
                switchMode == 'Income' ? COLORS.primary : COLORS.switchColor,
            },
          ]}
          onPress={() => setSwitchMode('Income')}>
          <Text
            style={[
              styles.switchText,
              {
                color: switchMode == 'Income' ? COLORS.white : COLORS.black,
              },
            ]}>
            Income
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Chart here</Text>
        {renderChart()}
      </View>
      {/* //container view ends */}
    </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: SIZES.STATUSBAR_HEIGHT * 1.5,
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
    borderColor: COLORS.grey,
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
  switch: {
    flexDirection: 'row',
    width: '90%',
    minHeight: 50,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.switchColor,
    borderRadius: 22,
    justifyContent: 'space-between',
    backgroundColor: COLORS.switchColor,
  },
  switchbutton: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    width: '50%',
    minHeight: 50,
  },
  switchText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  chart: {
    alignSelf: 'center',
  },
});
