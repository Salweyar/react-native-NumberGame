import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RamdomNumber from './ramdomNumber';

class Game extends React.Component {
  state = {
    selectedNumbers: [],
  };

  randomNumber = Array.from({length: this.props.randomCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  target = this.randomNumber
    .slice(0, this.props.randomCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  isNumberSelected = (index) => {
    return this.state.selectedNumbers.indexOf(index) >= 0;
  };

  selectNumber = (index) => {
    this.setState((prevState) => ({
      selectedNumbers: [...prevState.selectedNumbers, index],
    }));
  };

  gameStatus = () => {
    const sumSelected = this.state.selectedNumbers.reduce((acc, curr) => {
      return acc + this.randomNumber[curr];
    }, 0);

    if (sumSelected < this.target) {
      return 'Playing';
    }
    if (sumSelected === this.target) {
      return 'Won';
    }
    if (sumSelected > this.target) {
      return 'Lost';
    }
  };

  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.ramdomContainer}>
          {this.randomNumber.map((ramdom, index) => (
            <RamdomNumber
              key={index}
              id={index}
              number={ramdom}
              isNumberSelected={
                this.isNumberSelected(index) || gameStatus !== 'Playing'
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>
        <Text style={[styles.status, styles[`STATUS_${gameStatus}`]]}>
          {gameStatus}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },
  target: {
    fontSize: 50,

    margin: 50,
    textAlign: 'center',
    marginTop: 10,
  },
  ramdomContainer: {
    flex: 1,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_Playing: {
    backgroundColor: '#bbb',
  },
  STATUS_Won: {
    backgroundColor: 'green',
  },
  STATUS_Lost: {
    backgroundColor: 'red',
  },
  status: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Game;
