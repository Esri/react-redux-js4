import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../reducer/webscene/actions';

export class ScenesDropdown extends Component {
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
      <div className={`userscenesdropdown ${this.props.websceneItems.length ? '' : 'hidden'}`}>
        <div
          className={`dropdown ${this.state.open ? ' is-active' : ''}`}
          onBlur={() => this.collapseMenu()}
        >
          <a href="#" className="top-nav-link dropdown-btn" onMouseDown={() => this.toggleMenu()}>
            Scenes &nbsp;
            <i className="icon-ui-down-arrow" />
          </a>
          <nav className="dropdown-menu modifier-class">
            <span className={`dropdown-title ${this.props.websceneItems.length ? 'hidden' : ''}`}>
              <em>No scenes</em>
            </span>
            {this.props.websceneItems.map(item => (
              <a
                href="#"
                className="dropdown-link"
                key={item.id}
                onMouseDown={this.props.loadWebScene(item.id)}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    );
  }
}

ScenesDropdown.propTypes = {
  websceneItems: PropTypes.array,
  loadWebScene: PropTypes.func.isRequired,
};

ScenesDropdown.defaultProps = {
  websceneItems: [],
};

const mapStateToProps = ({ user: { websceneItems } }) => ({
  websceneItems,
});

const mapDispatchToProps = dispatch => ({
  loadWebScene(websceneid) {
    return () => {
      dispatch(actions.loadWebScene(websceneid));
    };
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScenesDropdown);
