import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../reducer/user/actions'

const Identity = ({ username, fullname, thumbnailurl, _signIn_, _signOut_}) =>
    <div className='identity'>
        <div className={username ? 'dropdown js-dropdown' : 'hidden'}>
          <a href className='top-nav-link dropdown-btn js-dropdown-toggle'>
            <img src={thumbnailurl} /> {fullname && fullname.split(' ')[0]} <i className='icon-ui-down-arrow'></i>
          </a>
          <nav className='dropdown-menu dropdown-right modifier-class' role='menu'>
            <span className='dropdown-title'>{username}</span>
            <a href='#' className='dropdown-link' role='menu-item' onClick={_signOut_()}>Sign Out</a>
          </nav>
        </div>
        <a href='#' className={username ? 'hidden' : 'top-nav-link'} onClick={_signIn_()}><i className='icon-ui-user'></i>Sign In</a>
    </div>;

const mapStateToProps = ({ user: { username, fullname, thumbnailurl } }) => ({
    username,
    fullname,
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
