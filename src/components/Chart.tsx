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

interface PieChartProps {
  data: TransactionItemProps[];
  selectedCategory: string | null;
  setSelectedCategory: (name: string) => void;
}
interface CategoryExpense {
  [category: string]: number;
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
  Personal: '#F56217',
  Miscellaneous: '#3C3B3F',
};

const PieChart: React.FC<PieChartProps> = ({
  selectedCategory,
  setSelectedCategory,
  data,
}) => {
  const categoryExpenses: CategoryExpense = {};
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
  data.forEach(item => {
    const {category, expense} = item;
    if (categoryExpenses[category]) {
      categoryExpenses[category] += expense;
    } else {
      categoryExpenses[category] = expense;
    }
  });

  const totalCount = Object.values(categoryCounts).reduce(
    (total, count) => total + count,
    0,
  );
  const totalExpense = Object.values(categoryExpenses).reduce(
    (total, expense) => total + expense,
    0,
  );

  const chartData = Object.keys(categoryCounts).map(category => {
    const percentage = ((categoryCounts[category] / totalCount) * 100).toFixed(
      0,
    );
    const expense = categoryExpenses[category];
    const expensepercentage = ((expense / totalExpense) * 100).toFixed(0);
    return {
      name: category,
      color: COLORS[category] || COLORS.primary,
      x: `${expensepercentage}%`,
      y: categoryCounts[category],
    };
  });

  const handleChartPress = (_: any, props: any) => {
    //const categoryName = chartData[props.index].name;
    console.log('Category pressed:');
  };
  let innerRadius = 70;
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <VictoryPie
          data={chartData}
          //labels={datum => `${datum.x}`}
          colorScale={colorScale}
          radius={({datum}) =>
            selectedCategory && selectedCategory === datum.name
              ? SIZES.width * 0.37
              : SIZES.width * 0.38 - 12
          }
          innerRadius={70}
          labelRadius={({innerRadius: any}) =>
            (SIZES.width * 0.4 + innerRadius) / 2.5
          }
          style={{
            labels: {fill: 'white', fontWeight: 'bold'},
          }}
          width={SIZES.width * 0.8}
          height={SIZES.width * 0.8}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: 'labels',
                      //eventKey: props.index,
                      mutation: props => {
                        let categoryName = chartData[props.index].name;
                        setSelectedCategory(categoryName);
                        //console.log(categoryName);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />

        <View
          style={{
            position: 'absolute',
            top: '42%',
            left: '38%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontWeight: '800',
              textAlign: 'center',
              color: 'black',
              fontSize: 20,
            }}>
            {totalCount - 2}
          </Text>
          <Text
            style={{
              fontWeight: '700',
              textAlign: 'center',
              color: 'black',
              fontSize: 18,
            }}>
            Expenses
          </Text>
        </View>
      </View>

      {/* <View style={styles.flatListContainer}>
        <FlatList
          data={chartData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View> */}
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
    color: 'black',
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default PieChart;
