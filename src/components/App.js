import React, { Component } from 'react';
import {Header} from "./Header";
import {Main} from "./Main";
import { TOKEN_KEY } from '../constants';
import '../styles/App.css';

class App extends Component {
    handleLogin = (response) => {
        localStorage.setItem(TOKEN_KEY, response);
        this.setState({ isLoggedIn: true });
    }
  render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default App;
