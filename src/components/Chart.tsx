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
}

const COLORS: {[key: string]: string} = {
  primary: '#7F3DFF',
  Food: '#E44D26',
  Travel: '#1565C0',
  Housing: '#434343',
  Transportation: '#605C3C',
  Entertainment: '#fdbb2d',
  Utilities: '#EB5757',
  Healthcare: '#44A08D',
  Education: '#333399',
  PersonalCare: '#F29492',
  Miscellaneous: '#3C3B3F',
};

const PieChart: React.FC<PieChartProps> = ({data}) => {
  const categories = data.map(item => item.category);
  const uniqueCategories = Array.from(new Set(categories));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleChartPress = (_: any, props: any) => {
    const categoryName = chartData[props.index].x;
    setSelectedCategory(
      selectedCategory === categoryName ? null : categoryName,
    );
    console.log(selectedCategory);
  };

  // const renderItem = ({
  //   item,
  // }: {
  //   item: {name: string; color: string; x: string};
  // }) => (
  //   <TouchableOpacity>
  //     <View style={[styles.itemContainer, {backgroundColor: COLORS.white}]}>
  //       <View
  //         style={{
  //           width: 40,
  //           height: 40,
  //           backgroundColor: item.color,
  //           borderRadius: 5,
  //           borderWidth: 1,
  //           borderColor: COLORS.black,
  //         }}></View>

  //       <Text style={[styles.itemText, {fontSize: 20}]}>{item.name}</Text>
  //       <Text style={styles.itemText}>{item.x}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  const renderItem = ({
    item,
  }: {
    item: {name: string; color: string; x: string};
  }) => {
    const categorySum = data.reduce((sum, currentItem) => {
      if (currentItem.category === item.name) {
        return sum + currentItem.expense;
      }
      return sum;
    }, 0);

    return (
      <TouchableOpacity>
        <View style={[styles.itemContainer, {backgroundColor: COLORS.white}]}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: item.color,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.black,
            }}></View>

          <Text style={[styles.itemText, {fontSize: 20}]}>{item.name}</Text>
          <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text
              style={[
                styles.itemText,
                {fontSize: 18},
              ]}>{`₹${categorySum}`}</Text>
            <Text style={styles.itemText}>{item.x}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <VictoryPie
          data={chartData}
          colorScale={colorScale}
          radius={({datum}) =>
            selectedCategory && selectedCategory === datum.x
              ? SIZES.width * 0.4
              : SIZES.width * 0.4 - 10
          }
          innerRadius={70}
          labelRadius={({innerRadius}) =>
            (SIZES.width * 0.4 + innerRadius) / 2.5
          }
          style={{
            labels: {fill: 'white', fontWeight: 'bold'},
          }}
          width={SIZES.width * 0.8}
          height={SIZES.width * 0.8}
        />

        <View
          style={{
            position: 'absolute',
            top: '42%',
            left: '40%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontWeight: '800',
              textAlign: 'center',
              color: 'black',
              fontSize: 20,
            }}>
            {totalCount}
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
      <View style={styles.flatListContainer}>
        <FlatList
          data={chartData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
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
    color: 'black',
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default PieChart;
