import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../reducers/identity/actions'

const Identity = ({ username, thumbnailurl, _signIn_, _signOut_ }) =>
    <div className="identity">
        <div className={username ? 'dropdown js-dropdown' : 'hidden'}>
          <button className="btn btn-transparent dropdown-btn js-dropdown-toggle" tabIndex="0" aria-haspopup="true" aria-expanded="false">
            <img src={thumbnailurl} /> {username} <i className="icon-ui-down-arrow"></i>
          </button>
          <nav className="dropdown-menu dropdown-right modifier-class" role="menu">
            <a href="#" className="dropdown-link" role="menu-item" onClick={_signOut_()}>Sign Out</a>
          </nav>
        </div>
        <button className={username ? 'hidden' : 'btn btn-small btn-clear'} onClick={_signIn_()}>Sign In</button>
    </div>;

const mapStateToProps = ({ identity: { username, thumbnailurl } }) => ({
    username,
    thumbnailurl
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Identity);

/*
<p className={username ? '' : 'hidden'}>{username} <button className="btn btn-small btn-clear" onClick={_signOut_()}>Sign Out</button></p>
        */
