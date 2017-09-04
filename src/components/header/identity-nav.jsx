/* Copyright 2017 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DEFAULT_THUMBNAIL_URL } from '../../constants/app-constants';
import * as actions from '../../reducer/user/actions';

export class IdentityNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleMenu() {
    this.setState({ open: !this.state.open });
  }

  collapseMenu() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="identity">
        <div
          className={`dropdown ${this.props.username ? '' : ' hidden'} ${this.state.open ? ' is-active' : ''}`}
          onBlur={() => this.collapseMenu()}
        >
          <button className="top-nav-link dropdown-btn" onMouseDown={() => this.toggleMenu()}>
            <img src={this.props.thumbnailurl || DEFAULT_THUMBNAIL_URL} alt="thumbnail" />
            <span className="shortname">{this.props.fullname && this.props.fullname.split(' ')[0]}</span>
            <i className="icon-ui-down-arrow" />
          </button>
          <nav className="dropdown-menu dropdown-right modifier-class">
            <span className="dropdown-title">{this.props.username}</span>
            <a
              href="#sign-out"
              id="sign-out"
              className="dropdown-link"
              onMouseDown={this.props.signOut()}
            >
              Sign Out
            </a>
          </nav>
        </div>
        <button id="sign-in" className={this.props.username ? 'hidden' : 'top-nav-link'} onClick={this.props.signIn()}>
          <i className="icon-ui-user" />
          Sign In
        </button>
      </div>
    );
  }
}

IdentityNav.propTypes = {
  username: PropTypes.string,
  fullname: PropTypes.string,
  thumbnailurl: PropTypes.string,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

IdentityNav.defaultProps = {
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
  signIn() {
    return () => {
      dispatch(actions.signIn());
    };
  },
  signOut() {
    return () => {
      dispatch(actions.signOut());
    };
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(IdentityNav);
