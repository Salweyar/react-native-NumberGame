import React from 'react';
import Game from './game';
class App extends React.Component {
  render() {
    return <Game randomCount={6} />;
  }
}

export default App;
