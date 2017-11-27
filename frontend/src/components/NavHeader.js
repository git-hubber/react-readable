import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavHeader = ({ categories }) => (
  <div>
    <NavLink
      to='/'
    >
      Readable
    </NavLink>&nbsp;
    {categories.length > 0 && categories.map((category) => (
      <NavLink key={category.path} to={`/categories/${category.path}`}>
        {category.name}&nbsp;
      </NavLink>
    ))}
  </div>
);

const mapStateToProps = ({ categories }) => ({
  categories,
});

export default connect(mapStateToProps)(NavHeader);
