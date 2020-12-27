import React from 'react';
import Game from './game';
class App extends React.Component {
  state = {
    gameId: 1,
  };

  resetGame = () => {
    this.setState((prevState) => ({
      gameId: prevState.gameId + 1,
    }));
  };

  render() {
    return (
      <Game
        key={this.state.gameId}
        onPlayAgain={this.resetGame}
        randomCount={6}
        timmer={10}
      />
    );
  }
}

export default App;
