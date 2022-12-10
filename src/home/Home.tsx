import React from 'react';
import './Home.scss';
import Header from './header/Header';
import Content from './content/Content';

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <Content />
      </div>
    );
  }
}
