import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../reducers/identity/actions'
import { loadWebscene } from '../reducers/webscene/actions';

const Identity = ({ username, thumbnailurl, websceneItems, _signIn_, _signOut_, _loadWebscene_ }) =>
    <div className="identity">
        <div className={username ? 'dropdown js-dropdown' : 'hidden'}>
          <button className="btn btn-transparent dropdown-btn js-dropdown-toggle" tabIndex="0" aria-haspopup="true" aria-expanded="false">
            <img src={thumbnailurl} /> {username} <i className="icon-ui-down-arrow"></i>
          </button>
          <nav className="dropdown-menu dropdown-right modifier-class" role="menu">
            <a href="#" className="dropdown-link" role="menu-item" onClick={_signOut_()}>Sign Out</a>
            <span className="dropdown-title">My Web Scenes</span>
            {websceneItems.map((item, index) =>
                <a href="#" className="dropdown-link" role="menu-item" key={item.id} onClick={_loadWebscene_(item.id)}>
                    {item.resourceInfo.title}
                </a>
            )}
          </nav>
        </div>
        <button className={username ? 'hidden' : 'btn btn-small btn-clear'} onClick={_signIn_()}>Sign In</button>
    </div>;

const mapStateToProps = ({ user: { username, thumbnailurl, websceneItems } }) => ({
    username,
    thumbnailurl,
    websceneItems
});

const mapDispatchToProps = dispatch => ({
    _signIn_() {
        return () => {
            dispatch(signIn());
        }
    },
    _signOut_() {
        return () => {
            dispatch(signOut());
        }
    },
    _loadWebscene_(websceneid) {
        return () => {
            dispatch(loadWebscene(websceneid))
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Identity);
