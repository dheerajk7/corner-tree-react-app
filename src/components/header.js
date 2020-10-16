import React, { Component } from 'react';
import { APIUrls } from '../helpers/urls';

class Navbar extends Component {
  constructor(props) {
    super(props);
    // state to maintain search result and loading state
    this.state = {
      result: [],
      isLoading: false,
    };
    this.intervalId = null;
  }

  handleComponentToDisplay = (e) => {
    this.props.changeActiveItem(e.target.id);
  };

  fetchResult = (searchKey) => {
    this.setState({ isLoading: true });
    const url = APIUrls.search(searchKey);
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data');
        this.setState({ result: data.data.jobs });
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 500);
      });
  };

  handleChange = (e) => {
    let context = this;
    if (e.target.value.length > 0) {
      clearInterval(this.intervalId);
      let fetchFunction = this.fetchResult;
      let argument = [];
      argument.push(e.target.value);
      this.intervalId = setTimeout(() => {
        fetchFunction.apply(context, argument);
      }, 300);
    }
  };

  render() {
    const { result, isLoading } = this.state;
    return (
      <nav className="navbar-container unselectable">
        <div
          className="navbar-logo"
          id="home"
          onClick={this.handleComponentToDisplay}
        >
          Jobs
        </div>
        <div className="search-container">
          <input
            className="search-input"
            placeholder="search"
            onChange={this.handleChange}
          ></input>
          <ul className="search-item-list">
            {isLoading ? (
              <li className="loading">Loading</li>
            ) : result.length === 0 ? (
              <li className="loading">No Result Found</li>
            ) : (
              result.map((r) => {
                return <li>{r.role + ' - ' + r.company}</li>;
              })
            )}
          </ul>
        </div>
        <ul className="navbar-menu">
          <li onClick={this.handleComponentToDisplay} id="post-job">
            Post Job
          </li>
          <li onClick={this.handleComponentToDisplay} id="apply-job">
            Apply Job
          </li>
          <li onClick={this.handleComponentToDisplay} id="sign-in">
            Sign In
          </li>
          <li onClick={this.handleComponentToDisplay} id="sign-up">
            Sign Up
          </li>
          <li onClick={this.handleComponentToDisplay} id="support">
            Support
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
