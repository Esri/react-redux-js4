import React, { Component } from 'react';
import { connect } from 'react-redux';
//import store from '../stores/app';

const Info = ({ interacting, scale, zoom, items }) =>
  <div className="list-items">
    <p>interacting: {String(interacting)}</p>
    <p>scale: {(scale || 0).toFixed(2)}</p>
    <p>zoom: {(zoom || 0).toFixed(2)}</p>
    <p>selected items: {items.length || 0}</p>
  </div>;

const mapStateToProps = ({ view: { interacting, scale, zoom }, selection: { items } }) => ({
  interacting,
  scale,
  zoom,
  items
});

export default connect(mapStateToProps)(Info);

/*
<ul>
          {this.state.selection.attributes.map((attribute) =>
            <li key={attribute.key}>{attribute.key}: {attribute.value}</li>
          )}
        </ul>
        */