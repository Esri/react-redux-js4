import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Info = ({ interacting, scale, zoom, selectionLength }) => (
  <div className="info">
    <div className="card">
      <div className="card-content">
        <p>interacting: {String(interacting)}</p>
        <p>scale: {(scale || 0).toFixed(2)}</p>
        <p>zoom: {(zoom || 0).toFixed(2)}</p>
        <p>selected items: {selectionLength || 0}</p>
      </div>
    </div>
  </div>
);

Info.propTypes = {
  interacting: PropTypes.bool.isRequired,
  scale: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  selectionLength: PropTypes.number.isRequired,
};

const mapStateToProps = ({ webscene: { selection, interacting, scale, zoom } }) => ({
  interacting,
  scale,
  zoom,
  selectionLength: selection.length,
});


export default connect(mapStateToProps)(Info);
