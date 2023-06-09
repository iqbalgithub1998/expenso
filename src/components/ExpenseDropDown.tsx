import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/theme';
import {Modal} from 'react-native';

interface ExpenseDropDownProps {
  options: string[];
  placeholder: string;
  Style?: ViewStyle | TextStyle[];
  onSelectValue: (value: string) => void;
}

const ExpenseDropDown: React.FC<ExpenseDropDownProps> = ({
  options,
  placeholder,
  Style,
  onSelectValue,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(placeholder);
  //const [isClicked, setIsCLicked] = useState(false);
  const [data, setData] = useState(options);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSearch = (txt: string) => {
    if (txt !== '') {
      let tempData = data.filter(item => {
        return item.toLowerCase().indexOf(txt.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(options);
    }
  };

  return (
    <View style={styles.customDropDown}>
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(!isModalVisible);
        }}
        style={[styles.dropdownselector, Style]}>
        <Text style={{fontSize: 18, paddingRight: 20, color: COLORS.grey}}>
          {selectedCategory}
        </Text>

        <Ionicons
          name={isModalVisible ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={28}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Search"
              style={styles.search}
              onChangeText={txt => onSearch(txt)}
              placeholderTextColor={COLORS.grey}
            />
            <FlatList
              data={data}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setSelectedCategory(item);
                    onSearch('');
                    setIsModalVisible(false);
                    onSelectValue(item);
                  }}>
                  <Text style={styles.dropdownText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExpenseDropDown;

const styles = StyleSheet.create({
  customDropDown: {
    minHeight: 60,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: COLORS.lightgrey,
    paddingHorizontal: 10,
  },

  dropdownselector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownArea: {
    width: '95%',
    height: 300,
    borderRadius: 10,
    //marginTop:5,
    backgroundColor: COLORS.white,
    elevation: 5,
    alignSelf: 'center',
    zIndex: 50,
  },
  search: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderColor: COLORS.lightgrey,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 15,
    color: COLORS.grey,
  },
  categoryItem: {
    width: '85%',
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.grey,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.grey,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 10,
    height: 400,
  },
});
