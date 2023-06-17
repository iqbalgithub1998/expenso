import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Details: React.FC = ({route}) => {
  const {item} = route.params;

  return (
    <View>
      <Text>Title: {item.category}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Expense: {item.expense}</Text>
      {/* Display other details of the item */}
      <Text>Settle by : {item.deadline}</Text>
      <Text>
        Deal done at :
        {item.createdAt
          ? item.createdAt.toDate().toLocaleDateString([], {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : ''}
      </Text>
    </View>
  );
};
export default Details;

const styles = StyleSheet.create({});
