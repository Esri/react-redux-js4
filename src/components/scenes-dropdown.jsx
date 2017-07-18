import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadWebScene } from '../reducer/webscene/actions';

const ScenesDropdown = ({ websceneItems, _loadWebScene_ }) => (
  <div className={websceneItems.length ? 'userscenesdropdown' : 'hidden'}>
    <div className="dropdown js-dropdown">
      <a href className="top-nav-link dropdown-btn js-dropdown-toggle">
        Scenes
        <i className="icon-ui-down-arrow" />
      </a>
      <nav className="dropdown-menu modifier-class">
        <span className={websceneItems.length ? 'hidden' : 'dropdown-title'}>
          <em>No scenes</em>
        </span>
        {websceneItems.map(item => (
          <a
            href="#open-webscene"
            className="dropdown-link"
            key={item.id}
            onClick={_loadWebScene_(item.id)}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  </div>
);

ScenesDropdown.propTypes = {
  websceneItems: PropTypes.array,
  _loadWebScene_: PropTypes.func.isRequired,
};

ScenesDropdown.defaultProps = {
  websceneItems: [],
};

const mapStateToProps = ({ user: { websceneItems } }) => ({
  websceneItems,
});

const mapDispatchToProps = dispatch => ({
  _loadWebScene_(websceneid) {
    return () => {
      dispatch(loadWebScene(websceneid));
    };
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScenesDropdown);
