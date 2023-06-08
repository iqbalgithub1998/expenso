import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const MonthSelector: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  return (
    <RNPickerSelect
      placeholder={{ label: 'Select a month', value: null }}
      items={[
        { label: 'January', value: 'January' },
        { label: 'February', value: 'February' },
        { label: 'March', value: 'March' },
        { label: 'April', value: 'April' },
        { label: 'May', value: 'May' },
        { label: 'June', value: 'June' },
        { label: 'July', value: 'July' },
        { label: 'August', value: 'August' },
        { label: 'September', value: 'September' },
        { label: 'October', value: 'October' },
        { label: 'November', value: 'November' },
        { label: 'December', value: 'December' },
      ]}
      value={selectedMonth}
      onValueChange={handleMonthChange}
    />
  );
};

export default MonthSelector;
