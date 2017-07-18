import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signIn, signOut } from '../reducer/user/actions';

const Identity = ({ username, fullname, thumbnailurl, _signIn_, _signOut_ }) => (
  <div className="identity">
    <div className={username ? 'dropdown js-dropdown' : 'hidden'}>
      <a href className="top-nav-link dropdown-btn js-dropdown-toggle">
        <img src={thumbnailurl} alt="thumbnail" />
        {fullname && fullname.split(' ')[0]}
        <i className="icon-ui-down-arrow" />
      </a>
      <nav className="dropdown-menu dropdown-right modifier-class">
        <span className="dropdown-title">{username}</span>
        <a href="#signout" className="dropdown-link" onClick={_signOut_()}>Sign Out</a>
      </nav>
    </div>
    <a href="#signin" className={username ? 'hidden' : 'top-nav-link'} onClick={_signIn_()}>
      <i className="icon-ui-user" />
      Sign In
    </a>
  </div>
  );

Identity.propTypes = {
  username: PropTypes.string,
  fullname: PropTypes.string,
  thumbnailurl: PropTypes.string,
  _signIn_: PropTypes.func.isRequired,
  _signOut_: PropTypes.func.isRequired,
};

Identity.defaultProps = {
  username: '',
  fullname: '',
  thumbnailurl: '',
};

const mapStateToProps = ({ user: { username, fullname, thumbnailurl } }) => ({
  username,
  fullname,
  thumbnailurl,
});

const mapDispatchToProps = dispatch => ({
  _signIn_() {
    return () => {
      dispatch(signIn());
    };
  },
  _signOut_() {
    return () => {
      dispatch(signOut());
    };
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Identity);
