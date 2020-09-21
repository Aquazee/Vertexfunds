import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, style} = this.props;

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '800',
            textAlign:"center",
            fontWeight:"bold"
          }, style }>
          {title}
        </Text>
      </View>
    );
  }
}

export default Title;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
