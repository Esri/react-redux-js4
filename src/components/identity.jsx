import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../reducers/identity/actions'
import { loadWebscene } from '../reducers/webscene/actions';

const Identity = ({ username, fullname, thumbnailurl, websceneItems, _signIn_, _signOut_, _loadWebscene_ }) =>
    <div className="identity">
        <div className={username ? 'dropdown js-dropdown' : 'hidden'}>
          <a href className="top-nav-link dropdown-btn js-dropdown-toggle" tabIndex="0" aria-haspopup="true" aria-expanded="false">
            <img src={thumbnailurl} /> {fullname && fullname.split(' ')[0]} <i className="icon-ui-down-arrow"></i>
          </a>
          <nav className="dropdown-menu dropdown-right modifier-class" role="menu">
            <span className="dropdown-title">{username}</span>
            <a href="#" className="dropdown-link" role="menu-item" onClick={_signOut_()}>Sign Out</a>
            <span className="dropdown-title">My Web Scenes</span>
            {websceneItems.map((item, index) =>
                <a href="#" className="dropdown-link" role="menu-item" key={item.id} onClick={_loadWebscene_(item.id)}>
                    {item.resourceInfo.title}
                </a>
            )}
          </nav>
        </div>
        <a href="#" className={username ? 'hidden' : 'top-nav-link'} onClick={_signIn_()}><i className="icon-ui-user"></i>Sign In</a>
    </div>;

const mapStateToProps = ({ user: { username, fullname, thumbnailurl, websceneItems } }) => ({
    username,
    fullname,
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
