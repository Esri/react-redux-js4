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

import { DEFAULT_SCENE_ID } from '../../constants/app-constants';

export class ScenesNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      mouse: false,
    };
  }

  mouseEnter() {
    this.setState({
      mouse: true,
    });
  }

  mouseLeave() {
    this.setState({
      mouse: false,
    });
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open,
    });
  }

  collapseMenu() {
    if (this.state.mouse) return;
    this.setState({ open: false });
  }


  render() {
    return (
      <div
        className={`dropdown ${this.state.open ? ' is-active' : ''}`}
        onBlur={() => this.collapseMenu()}
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.mouseLeave()}
      >
        <button className="top-nav-link dropdown-btn" onMouseDown={() => this.toggleMenu()}>
          Scenes &nbsp;
          <i className="icon-ui-down-arrow" />
        </button>
        <nav className="dropdown-menu modifier-class">
          <span className={`dropdown-title ${this.props.websceneItems.length ? 'hidden' : ''}`}>
            {this.props.username ?
              <em>You have no web scenes.</em> :
              <em>You are not logged in.</em>}
            <br />
            <a href={`/?id=${DEFAULT_SCENE_ID}`}>Open a default scene?</a>
          </span>
          {this.props.websceneItems.map(item => (
            <a
              href={`/?id=${item.id}`}
              className="dropdown-link"
              key={item.id}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    );
  }
}

ScenesNav.propTypes = {
  username: PropTypes.string,
  websceneItems: PropTypes.array,
};

ScenesNav.defaultProps = {
  username: null,
  websceneItems: [],
};

const mapStateToProps = ({ user: { username, websceneItems } }) => ({
  username,
  websceneItems,
});

export default connect(mapStateToProps)(ScenesNav);
