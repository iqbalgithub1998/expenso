import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {VictoryPie} from 'victory-native';
import {TransactionItemProps} from '../interface/User.interface';
import {SIZES} from '../constants/theme';
//import {COLORS} from '../constants/theme';

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
      2,
    );
    return {
      //x: `${category} (${percentage}%)`,
      x: `${percentage}%`,
      y: categoryCounts[category],
    };
  });

  return (
    <View style={styles.chartContainer}>
      <VictoryPie
        data={chartData}
        colorScale={colorScale}
        radius={SIZES.width * 0.4 - 10}
        innerRadius={70}
        labelRadius={({innerRadius}) => (SIZES.width * 0.4 + innerRadius) / 2.5}
        style={{
          labels: {fill: 'white', fontWeight: 'bold'},
          //parent: {...styles.shadow},
        }}
        width={SIZES.width * 0.8}
        height={SIZES.width * 0.8}
        //       events = {[{
        //         target:'data',
        //         eventHandlers:{
        //           onPress: () => {
        //             return [{
        //                 target: "labels",
        //                 mutation: (props) => {
        //                     let categoryName = chartData[props.index].name
        //                     setSelectCategoryByName(categoryName)
        //                 }
        //             }]
        //         }
        //     }
        // }]
        //   }
        // }]}
        //labelRadius={(({ innerRadius }: { innerRadius: number | (() => number) }) => (SIZES.width * 0.4 + innerRadius as number) / 2.5) as ((props: { innerRadius: number }) => number)}
      />

      <View style={{position: 'absolute', top: '42%', left: '42%'}}>
        <Text style={{fontWeight: '800', textAlign: 'center', color: 'black'}}>
          {totalCount}
        </Text>
        <Text style={{fontWeight: '700', textAlign: 'center', color: 'black'}}>
          Expenses
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default PieChart;
