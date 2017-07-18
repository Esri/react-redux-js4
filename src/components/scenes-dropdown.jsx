import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadWebScene } from '../reducer/webscene/actions';

const ScenesDropdown = ({ username, websceneItems, _loadWebScene_ }) =>
    <div className={username ? 'userscenesdropdown' : 'hidden'}>
        <div className='dropdown js-dropdown'>
          <a href className='top-nav-link dropdown-btn js-dropdown-toggle'>
            Scenes <i className='icon-ui-down-arrow'></i>
          </a>
          <nav className='dropdown-menu modifier-class' role="menu">
            <span className={websceneItems.length ? 'hidden' : 'dropdown-title'}>
              <em>No scenes</em>
            </span>
            {websceneItems.map((item, index) =>
                <a href='#' className='dropdown-link' role='menu-item' key={item.id}
                  onClick={_loadWebScene_(item.id)}>
                  {item.title}
                </a>
            )}
          </nav>
        </div>
    </div>;

const mapStateToProps = ({ user: { username, websceneItems } }) => ({
    username,
    websceneItems
});

const mapDispatchToProps = dispatch => ({
    _loadWebScene_(websceneid) {
        return () => {
            dispatch(loadWebScene(websceneid))
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScenesDropdown);
