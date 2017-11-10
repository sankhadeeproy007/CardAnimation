# ParallexSwiper in react-native!
![](https://github.com/sankhadeeproy007/CardAnimation/blob/master/demo2.gif)
`<ParallexSwiper />` takes `data` as a prop (built on top of react-native FlatList).
Shape of `data` object is
```
{
  name: '',
  cover: require(''),
  avatar: require(''),
  cardTitle: '',
  cardText: '',
},
```
`cover` and `avatar` are images.

## Example
```
import ParallexSwiper from './ParallexSwiper';

export default class App extends React.Component {
  render() {
    return (
      <ParallexSwiper data={data} />
    );
  }
}
```
