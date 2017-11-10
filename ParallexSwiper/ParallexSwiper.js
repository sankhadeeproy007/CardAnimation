import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const AnimatedList = Animated.createAnimatedComponent(FlatList);

const getInterpolate = (animatedScroll, i) => {
  const inputRange = [i - 1 * width, i * width, (i + 1) * width];

  const outputRange = i === 0 ? [0, 0, 110] : [-300, 0, 110];

  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      scrollDisabled: false,
    };
  }
  imageParallex = new Animated.Value(0);
  coverScale = new Animated.Value(0);
  animate() {
    if (!this.state.scrollDisabled) {
      Animated.timing(this.coverScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(this.coverScale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    this.setState({
      scrollDisabled: !this.state.scrollDisabled,
    });
  }
  opacity = this.coverScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.15, 0],
    extrapolate: 'clamp',
  });
  translateY = this.coverScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [150, 50, -155],
    extrapolate: 'clamp',
  });
  scale = this.coverScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.12, 1.25],
    extrapolate: 'clamp',
  });
  render() {
    return (
      <AnimatedList
        data={this.props.data}
        scrollEnabled={!this.state.scrollDisabled}
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: 'row' }}
        contentContainerStyle={{ justifyContent: 'center' }}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.imageParallex } } }],
          { useNativeDriver: true },
        )}
        horizontal
        keyExtractor={item => item.name}
        scrollEventThrottle={1}
        renderItem={({ item, index }) => (
          <Animated.View
            key={item.name}
            style={[
              styles.item,
              {
                transform: [{ scale: this.scale }],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.animate()}
              style={styles.touchableHeight}
            >
              <Animated.View style={styles.shadowContainer}>
                <View style={styles.innerShadow}>
                  <Animated.Image
                    style={[
                      styles.coverImage,
                      {
                        transform: [
                          {
                            translateX: getInterpolate(this.imageParallex, index),
                          },
                        ],
                      },
                    ]}
                    source={item.cover}
                  />
                </View>
                <Animated.View
                  style={[
                    styles.innerAnimated,
                    {
                      opacity: this.opacity,
                    },
                  ]}
                >
                  <Animated.Image style={styles.avatar} source={item.avatar} />
                  <Text style={styles.title}>{item.name}</Text>
                </Animated.View>
              </Animated.View>
              <Animated.View
                style={[
                  styles.animatedCard,
                  {
                    transform: [
                      {
                        translateY: this.translateY,
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.innerCard}>
                  <Text style={styles.cardTitle}>{item.cardTitle}</Text>
                  <View style={styles.cardPadding}>
                    <Text style={styles.cardText}>{item.cardText}</Text>
                  </View>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    );
  }
}
