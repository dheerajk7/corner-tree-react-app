import React, { Component } from 'react';
import '../styles/App.scss';
import Header from './header';
import PostJob from './postjob';
import Dashboard from './dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
    };
  }

  changeActiveItem = (item) => {
    this.setState({ activeItem: item });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div className="App">
        <div className="blank-space"></div>
        <Header changeActiveItem={this.changeActiveItem} />
        {activeItem === 'post-job' && <PostJob />}
        {activeItem === 'home' && <Dashboard />}
      </div>
    );
  }
}

export default App;
