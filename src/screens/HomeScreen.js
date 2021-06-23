import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Screen from '../components/Screen';
import {colors, sizes, width} from '../constants/theme';
import {onBoardings} from '../data';
const HomeScreen = () => {
  const [completed, setCompleted] = useState(false);

  const scrollX = new Animated.Value(0);
  useEffect(() => {
    scrollX.addListener(({value}) => {
      console.log(Math.floor(value / width) === 1);
      if (Math.floor(value / width) === 1) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
    });
    return () => scrollX.removeListener();
  }, [completed]);
  const renderContent = () => (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEnabled
      decelerationRate={0}
      snapToAlignment="center"
      scrollEventThrottle={16}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: false,
      })}
      showsHorizontalScrollIndicator={false}>
      {onBoardings.map(({img, title, description}, i) => {
        return (
          <View style={{width: width}} key={i}>
            <View style={styles.imageContainer}>
              <Image style={styles.img} source={img} resizeMode="cover" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => console.log('hey')}>
              <Text style={styles.btnText}>
                {completed ? "Let's Go" : 'Skip'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View style={styles.dotConatiner}>
        {onBoardings.map((item, i) => {
          const opacity = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotSize = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [sizes.base, 17, sizes.base],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              opacity={opacity}
              key={`dot-${i}`}
              style={[styles.dots, {width: dotSize, height: dotSize}]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <Screen>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </Screen>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  imageContainer: {flex: 2, alignItems: 'center', justifyContent: 'center'},
  img: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: '10%',
    left: 40,
    right: 40,
  },
  title: {
    fontSize: sizes.h1,
    color: colors.gray,
    textAlign: 'center',
  },
  description: {
    marginTop: sizes.base,
    textAlign: 'center',
    fontSize: sizes.body3,
    color: colors.gray,
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: sizes.height > 700 ? '30%' : '25%',
  },
  dotConatiner: {
    flexDirection: 'row',
    height: sizes.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    borderRadius: sizes.radius,
    backgroundColor: colors.blue,
    marginHorizontal: sizes.radius / 2,
    width: 20,
    height: 20,
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 150,
    height: 60,
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: colors.blue,
  },
  btnText: {
    fontSize: sizes.h1,
    color: colors.white,
    fontWeight: '700',
  },
});
