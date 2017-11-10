import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableHeight: {
    height: height * 0.8,
    width: width * 0.8,
    borderRadius: 10,
  },
  shadowContainer: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  innerShadow: {
    height: '60%',
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  innerAnimated: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    color: '#303030',
  },
  animatedCard: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: 200,
    width: 375,
  },
  innerCard: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    height: 200,
    width: 220,
  },
  cardTitle: { textAlign: 'center', marginTop: 12 },
  cardText: { color: '#626262', fontSize: 12 },
  cardPadding: { padding: 12 },
});

export default styles;
