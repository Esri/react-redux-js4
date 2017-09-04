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
import { bindActionCreators } from 'redux';

import * as actions from '../../reducer/environment/actions';

export class ShadowsNav extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.setShadows(event.target.checked);
  }

  render() {
    return (
      <div className="shadow-nav card">
        <div className="card-content">
          <fieldset className="fieldset-checkbox">
            <label htmlFor="shadows">
              <input
                type="checkbox"
                id="shadows"
                checked={this.props.shadows !== null ? this.props.shadows : false}
                onChange={this.handleChange}
              />
              &nbsp;
              Shadows
            </label>
          </fieldset>
        </div>
      </div>
    );
  }
}

ShadowsNav.propTypes = {
  shadows: PropTypes.bool,
  setShadows: PropTypes.func.isRequired,
};

ShadowsNav.defaultProps = {
  shadows: false,
};

const mapStateToProps = ({ environment: { shadows } }) => ({
  shadows,
});

function mapDispatchToProps(dispatch) {
  return {
    setShadows: bindActionCreators(actions.setShadows, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShadowsNav);
