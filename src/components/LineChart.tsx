import React from 'react';
import { View, StyleSheet } from 'react-native';

const generateRandomLineChart = () => {
  const dataPoints = 100; // Number of data points for the line chart
  const amplitude = 80; // Amplitude of the wave
  const frequency = 0.1; // Frequency of the wave

  const lineData = [];

  for (let i = 0; i <= dataPoints; i++) {
    const x = (i / dataPoints) * 2 * Math.PI;
    const y = Math.sin(x * frequency) * amplitude;
    lineData.push({ x, y });
  }

  return lineData;
};

const LineChart = () => {
  const lineData = generateRandomLineChart();

  return (
    <View style={styles.container}>
      <View style={styles.lineChart}>
        {lineData.map((point, index) => (
          <View
            key={index}
            style={[
              styles.line,
              { left: (index / lineData.length) * 100, bottom: point.y },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineChart: {
    width: '100%',
    height: '80%',
    backgroundColor: 'transparent',
    //borderWidth: 2,
    //borderColor: 'purple',
    overflow: 'hidden',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'purple',
    position: 'absolute',
  },
});

export default LineChart;
