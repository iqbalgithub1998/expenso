import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import {TransactionItemProps} from '../interface/User.interface';

interface BarChartProps {
  data: TransactionItemProps[];
}

const BarChart: React.FC<BarChartProps> = ({data}) => {
  const paymentMethods = data.map(item => item.method);
  const uniqueMethods = Array.from(new Set(paymentMethods));

  const methodCounts = data.reduce<{[key: string]: number}>((counts, item) => {
    counts[item.method] = (counts[item.method] || 0) + 1;
    return counts;
  }, {});

  const chartData = Object.keys(methodCounts).map(method => {
    return {method, frequency: methodCounts[method]};
  });

  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{x: 20, y: 10}}
        height={300}
        padding={{left: 60, right: 30, top: 50, bottom: 50}}>
        <VictoryBar
          data={chartData}
          x="method"
          y="frequency"
          barWidth={30}
          cornerRadius={{topLeft: 5, topRight: 5}}
          style={{
            data: {
              fill: '#7F3DFF',
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default BarChart;
