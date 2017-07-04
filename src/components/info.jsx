import React, { Component } from 'react';
import { connect } from 'react-redux';


const Info = ({ interacting, scale, zoom, items}) =>
    <div className="info">
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
