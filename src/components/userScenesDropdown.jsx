import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadWebscene } from '../middleware/arcgisapi';

const UserScenesDropdown = ({ username, websceneItems, _loadWebscene_ }) =>
    <div className={username ? 'userscenesdropdown' : 'hidden'}>
        <div className='dropdown js-dropdown'>
          <a href className='top-nav-link dropdown-btn js-dropdown-toggle'>
            Scenes <i className='icon-ui-down-arrow'></i>
          </a>
          <nav className='dropdown-menu modifier-class' role="menu">
            <span className={websceneItems.length ? 'hidden' : 'dropdown-title'}><em>No scenes</em></span>
            {websceneItems.map((item, index) =>
                <a href='#' className='dropdown-link' role='menu-item' key={item.id} onClick={_loadWebscene_(item.id)}>
                    {item.resourceInfo.title}
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
    _loadWebscene_(websceneid) {
        return () => {
            dispatch(loadWebscene(websceneid))
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScenesDropdown);
