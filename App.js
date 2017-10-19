import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const AnimatedList = Animated.createAnimatedComponent(FlatList);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      imageScaled: false,
    };
  }
  imageParallex = new Animated.Value(0);
  coverScale = new Animated.Value(0);
  // onScroll(event) {
  //   let offsetX = event.nativeEvent.contentOffset.x,
  //     pageWidth = width - 10;
  //   this.setState({
  //     currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1,
  //   });
  //   console.log(this.state);
  // }
  animate() {
    if (!this.state.imageScaled) {
      Animated.timing(this.coverScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(this.coverScale, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    this.setState({
      imageScaled: !this.state.imageScaled,
    });
  }
  translateX = this.imageParallex.interpolate({
    inputRange: [0, 150, 300],
    outputRange: [0, 30, 60],
    extrapolate: 'clamp',
  });
  scale = this.coverScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.125, 1.25],
    extrapolate: 'clamp',
  });
  render() {
    return (
      <View style={styles.container}>
        <AnimatedList
          data={[{ name: 'Ings', color: '#39b46e' }, { name: 'Origi', color: '#29b3e9' }]}
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: 'row' }}
          contentContainerStyle={{ justifyContent: 'center' }}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.imageParallex } } }],
            { useNativeDriver: true },
          )}
          horizontal
          scrollEventThrottle={1}
          renderItem={({ item }) => (
            <View
              key={item.name}
              style={{
                width: width,
                height: height - 200,
                padding: 25,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.animate()}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                }}
              >
                <Animated.View
                  style={{
                    height: '100%',
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    overflow: 'hidden',
                    transform: [{ scale: this.scale }],
                  }}
                >
                  <Animated.Image
                    style={{
                      width: '100%',
                      height: '75%',
                      transform: [{ translateX: this.translateX }],
                    }}
                    source={require('./google-now-wallpaper-2.png')}
                  />
                  <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text style={{ fontSize: 26 }}>{item.name}</Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
