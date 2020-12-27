import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

class RamdomNumber extends React.Component {
  handlePress = () => {
    if (this.props.isNumberSelected) {
      return;
    }
    this.props.onPress(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text
          style={[
            styles.ramdomBlock,
            this.props.isNumberSelected && styles.selected,
          ]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  ramdomBlock: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 40,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  selected: {
    opacity: 0.3,
  },
});

export default RamdomNumber;
