import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div id="header">
    <div className="container">
      <h1><Link to='/'>Reacted</Link></h1>
    </div>
  </div>
);

export default Header;
