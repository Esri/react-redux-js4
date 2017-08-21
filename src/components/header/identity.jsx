import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../reducer/user/actions';

export class Identity extends Component {
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
            <img src={this.props.thumbnailurl} alt="thumbnail" />
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

Identity.propTypes = {
  username: PropTypes.string,
  fullname: PropTypes.string,
  thumbnailurl: PropTypes.string,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Identity);
