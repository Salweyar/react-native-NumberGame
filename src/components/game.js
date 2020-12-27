import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import RamdomNumber from './ramdomNumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
  state = {
    selectedNumbers: [],
    timmer: this.props.timmer,
  };

  currectStatus = 'Playing';

  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.selectedNumbers !== this.state.selectedNumbers ||
      nextState.timmer === 0
    ) {
      this.currectStatus = this.gameStatus(nextState);

      if (this.currectStatus !== 'Playing') {
        clearInterval(this.intervalId);
      }
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => ({
          timmer: prevState.timmer - 1,
        }),
        () => {
          if (this.state.timmer === 0) {
            clearInterval(this.intervalId);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  randomNumber = Array.from({length: this.props.randomCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  target = this.randomNumber
    .slice(0, this.props.randomCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  shuffledRandomNumbers = shuffle(this.randomNumber);

  isNumberSelected = (index) => {
    return this.state.selectedNumbers.indexOf(index) >= 0;
  };

  selectNumber = (index) => {
    this.setState((prevState) => ({
      selectedNumbers: [...prevState.selectedNumbers, index],
    }));
  };

  gameStatus = (nextState) => {
    const sumSelected = nextState.selectedNumbers.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);

    if (nextState.timmer === 0) {
      return 'Lost';
    }

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
    const gameStatus = this.currectStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.ramdomContainer}>
          {this.shuffledRandomNumbers.map((ramdom, index) => (
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

        <Text style={styles.timmer}>{this.state.timmer}</Text>
        {gameStatus !== 'Playing' && (
          <Button title="Play Again" onPress={this.props.onPlayAgain} />
        )}
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
  timmer: {
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#FF8C00',
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
    fontSize: 25,
    margin: 75,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Game;
