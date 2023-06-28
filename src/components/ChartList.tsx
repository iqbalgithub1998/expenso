import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {VictoryPie} from 'victory-native';
import {TransactionItemProps} from '../interface/User.interface';
import {SIZES} from '../constants/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface PieChartProps {
  data: TransactionItemProps[];
  selectedCategory: string | null;
}

const COLORS: {[key: string]: string} = {
  primary: '#7F3DFF',
  Food: '#E44D26',
  Travel: '#1565C0',
  Housing: '#dd1818',
  Transportation: '#605C3C',
  Entertainment: '#fdbb2d',
  Utilities: '#EB5757',
  Healthcare: '#44A08D',
  Education: '#333399',
  PersonalCare: '#F56217',
  Miscellaneous: '#3C3B3F',
  secondary: '#EEE5FF',
};

const ChartList: React.FC<PieChartProps> = ({data, selectedCategory}) => {
  const categories = data.map(item => item.category);
  const uniqueCategories = Array.from(new Set(categories));

  const colorScale = uniqueCategories.map(
    category => COLORS[category] || COLORS.primary,
  );

  const categoryCounts = data.reduce<{[key: string]: number}>(
    (counts, item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
      return counts;
    },
    {},
  );

  const totalCount = Object.values(categoryCounts).reduce(
    (total, count) => total + count,
    0,
  );

  const chartData = Object.keys(categoryCounts).map(category => {
    const percentage = ((categoryCounts[category] / totalCount) * 100).toFixed(
      0,
    );
    return {
      name: category,
      color: COLORS[category] || COLORS.primary,
      x: `${percentage}%`,
      y: categoryCounts[category],
    };
  });

  const renderItem = ({
    item,
  }: {
    item: {name: string; color: string; x: string};
  }) => {
    let iconComponent = null;
    const IconSize = 28;

    if (item.name === 'Food') {
      iconComponent = (
        <Ionicons
          name="md-fast-food-sharp"
          size={IconSize}
          color={COLORS.Food}
        />
      );
    } else if (item.name === 'Travel') {
      iconComponent = (
        <Ionicons
          name="md-car-sport-sharp"
          size={IconSize}
          color={COLORS.Travel}
        />
      );
    } else if (item.name === 'Housing') {
      iconComponent = (
        <Ionicons name="md-business" size={IconSize} color={COLORS.Housing} />
      );
    } else if (item.name === 'Transportation') {
      iconComponent = (
        <FontAwesome5
          name="truck-loading"
          size={IconSize}
          color={COLORS.Transportation}
        />
      );
    } else if (item.name === 'Entertainment') {
      iconComponent = (
        <MaterialIcons
          name="sports-esports"
          size={IconSize}
          color={COLORS.Entertainment}
        />
      );
    } else if (item.name === 'Utilities') {
      iconComponent = (
        <Ionicons name="build" size={IconSize} color={COLORS.Utilities} />
      );
    } else if (item.name === 'Healthcare') {
      iconComponent = (
        <FontAwesome5
          name="hospital-user"
          size={IconSize}
          color={COLORS.Healthcare}
        />
      );
    } else if (item.name === 'Education') {
      iconComponent = (
        <Ionicons
          name="md-school-sharp"
          size={IconSize}
          color={COLORS.Education}
        />
      );
    } else if (item.name === 'Personal Care') {
      iconComponent = (
        <MaterialCommunityIcons
          name="lotion"
          size={IconSize}
          color={COLORS.PersonalCare}
        />
      );
    } else if (item.name === 'Personal') {
      iconComponent = (
        <MaterialCommunityIcons
          name="lotion"
          size={IconSize}
          color={COLORS.PersonalCare}
        />
      );
    } else if (item.name === 'Miscellaneous') {
      iconComponent = (
        <FontAwesome5
          name="random"
          size={IconSize}
          color={COLORS.Miscellaneous}
        />
      );
    }
    const categorySum = data.reduce((sum, currentItem) => {
      if (currentItem.category === item.name) {
        return sum + currentItem.expense;
      }
      return sum;
    }, 0);

    return (
      <TouchableOpacity>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor:
                selectedCategory === item.name ? item.color : COLORS.white,
            },
          ]}>
          <View
            style={[
              styles.icon,
              {
                backgroundColor:
                  selectedCategory === item.name ? 'white' : COLORS.secondary,
              },
            ]}>
            {iconComponent}
          </View>

          <Text
            style={[
              styles.itemText,
              {
                fontSize: 20,
                color: selectedCategory === item.name ? 'white' : 'black',
              },
            ]}>
            {item.name}
          </Text>
          <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text
              style={[
                styles.itemText,
                {
                  fontSize: 18,
                  color: selectedCategory === item.name ? 'white' : 'black',
                },
              ]}>{`₹${categorySum}`}</Text>
            <Text
              style={[
                styles.itemText,
                {color: selectedCategory === item.name ? 'white' : 'black'},
              ]}>
              {item.x}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.chartContainer}>
      </View> */}
      <View style={styles.flatListContainer}>
        <FlatList
          ListHeaderComponent={
            <Text
              style={{fontSize: 20, fontWeight: '800', color: COLORS.primary}}>
              {' '}
              Details
            </Text>
          }
          data={chartData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  chartContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  itemContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 14,
    //borderBottomColor: '#ccc',
    borderWidth: 1,
    borderColor: COLORS.black,
    minHeight: 50,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    //color: 'black',
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChartList;
