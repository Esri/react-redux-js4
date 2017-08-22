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
                checked={this.props.shadows}
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
