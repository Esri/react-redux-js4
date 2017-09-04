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

const pad2 = value => (value.toString().length === 1 ? `0${value.toString()}` : value.toString());

export class TimeNav extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  getTimeString() {
    if (!this.props.date) return '';

    const hours = this.props.date.getUTCHours();
    const minutes = this.props.date.getUTCMinutes();
    return `${pad2(hours)}:${pad2(minutes)}`;
  }

  getSliderValue() {
    if (!this.props.date) return 0;

    const value = this.props.date.getUTCHours() + (this.props.date.getUTCMinutes() / 60);
    return value;
  }

  handleChange(event) {
    const date = new Date(this.props.date);

    const hours = Math.floor(event.target.value);
    const minutes = Math.floor(60 * (event.target.value % 1));

    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);

    this.props.setDate(date);
  }

  render() {
    return (
      <div className="time-nav card">
        <div className="card-content">
          <label htmlFor="time">Time: {`${this.getTimeString()}`}</label>
          <input
            className="time-range-slider"
            id="time"
            type="range"
            min="0"
            max="23.99"
            step="0.02"
            value={this.getSliderValue()}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

TimeNav.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
};

TimeNav.defaultProps = {
  date: new Date(Date.UTC(2017, 3, 15, 12, 0)),
};

const mapStateToProps = ({ environment: { date } }) => ({
  date,
});

function mapDispatchToProps(dispatch) {
  return {
    setDate: bindActionCreators(actions.setDate, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeNav);
