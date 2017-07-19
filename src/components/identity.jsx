import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../reducer/user/actions';

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
          <a
            href="#"
            className="top-nav-link dropdown-btn js-dropdown-toggle"
            onMouseDown={() => this.toggleMenu()}
          >
            <img src={this.props.thumbnailurl} alt="thumbnail" />
            {this.props.fullname && this.props.fullname.split(' ')[0]}
            <i className="icon-ui-down-arrow" />
          </a>
          <nav className="dropdown-menu dropdown-right modifier-class">
            <span className="dropdown-title">{this.props.username}</span>
            <a href="#" className="dropdown-link" onMouseDown={this.props.signOut()}>Sign Out</a>
          </nav>
        </div>
        <a href="#" className={this.props.username ? 'hidden' : 'top-nav-link'} onClick={this.props.signIn()}>
          <i className="icon-ui-user" />
          Sign In
        </a>
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
