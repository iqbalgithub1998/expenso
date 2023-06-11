import {
  Animated,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES} from '../constants/theme';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

type Props = {};

type datatype = {
  id: string;
  key: string;
  title: string;
  description: string;
  image: any;
};
const bgs = ['#A5BBFF', '#DDBEFE', '#B98EFF'];

const DATA: datatype[] = [
  {
    id: '1',
    key: 'onboard1',
    title: 'Gain total control of your money',
    description: 'Become your own money manager and make every cent count',
    image: require('../assets/images/ob1.png'),
  },
  {
    id: '2',
    key: 'onboard2',
    title: 'Know where your money goes',
    description:
      'Track your transaction easily, with categories and financial report',
    image: require('../assets/images/Onboarding2.png'),
  },
  {
    id: '3',
    key: 'onboard3',
    title: 'Planning ahead',
    description: 'Setup your budget for each category so you in control',
    image: require('../assets/images/Onboarding3.png'),
  },
];

const Backdrop: React.FC<any> = ({scrollX}) => {
  const bg = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * SIZES.width),
    outputRange: bgs.map(bg => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: bg,
        },
      ]}></Animated.View>
  );
};

const Square: React.FC<any> = ({scrollX}) => {
  return (
    <Animated.View
      style={{
        width: SIZES.height,
        height: SIZES.height,
        backgroundColor: COLORS.white,
        borderRadius: 86,
        position: 'absolute',
        top: -SIZES.height * 0.65,
        left: -SIZES.height * 0.35,
        transform: [
          {
            rotate: '35deg',
          },
        ],
      }}
    />
  );
};

const Indicator: React.FC<any> = ({scrollX}) => {
  return (
    <View style={{position: 'absolute', bottom: 170, flexDirection: 'row'}}>
      {DATA.map((item: datatype, i: number) => {
        const inputRange = [
          (i - 1) * SIZES.width,
          i * SIZES.width,
          (i + 1) * SIZES.width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 0.9, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={[styles.indicator, opacity, {transform: [{scale}]}]}
          />
        );
      })}
    </View>
  );
};

const IntroFlatList = (props: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<datatype>>(null);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  let timer: number;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    let timer: number = 0;

    const handleRouteChange = () => {
      clearTimeout(timer);
    };

    if (!isFocused) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        const currentIndex = DATA.findIndex(item => item.id === currentItemId);
        const nextIndex = currentIndex < DATA.length - 1 ? currentIndex + 1 : 0;
        const nextItem = DATA[nextIndex];

        if (nextItem) {
          setCurrentItemId(nextItem.id);
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
      }, 4000);
    }

    return () => {
      //   console.log('finished timing');
      clearTimeout(timer);
    };
  }, [currentItemId, isFocused]);

  useEffect(() => {
    if (DATA.length > 0) {
      setCurrentItemId(DATA[0].id);
    }
  }, [DATA]);

  const renderItem: ListRenderItem<datatype> = ({item}) => {
    return (
      <View style={{width: SIZES.width, alignItems: 'center', padding: 20}}>
        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <Image
            source={item.image}
            style={{
              width: SIZES.width / 1.2,
              height: SIZES.width / 1.2,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flex: 0.2}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 32,
              marginBottom: 10,
              color: COLORS.white,
              textAlign: 'center',
              marginHorizontal: 10,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontWeight: '300',
              marginHorizontal: 10,
              textAlign: 'center',
              fontSize: 20,
              color: COLORS.white,
            }}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        ref={flatListRef}
        data={DATA}
        keyExtractor={item => item.key}
        contentContainerStyle={{paddingBottom: 50}}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
      <Indicator scrollX={scrollX} />
    </>
  );
};

export default IntroFlatList;

const styles = StyleSheet.create({
  ButtonText: {
    fontWeight: '500',
    fontSize: 22,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
  },
});
