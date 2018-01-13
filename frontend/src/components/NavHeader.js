import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

const NavHeader = ({ categories }) => (
  <div id="nav-header">
    <div className="container">
      <NavLink
        to='/'
        exact
      >
      Reacted
      </NavLink>&nbsp;
      {categories.length > 0 && categories.map((category) => (
        <NavLink key={category.path} to={`/categories/${category.path}`}>
          {category.name}&nbsp;
        </NavLink>
      ))}
    </div>
  </div>
);

const mapStateToProps = ({ categories }) => ({
  categories,
});

export default withRouter(connect(mapStateToProps)(NavHeader));
