import React, { Component } from 'react';
import { connect } from 'react-redux';


const Info = ({ interacting, scale, zoom, selection}) =>
    <div className="info">
        <div className="card">
            <div className="card-content">
                <p>interacting: {String(interacting)}</p>
                <p>scale: {(scale || 0).toFixed(2)}</p>
                <p>zoom: {(zoom || 0).toFixed(2)}</p>
                <p>selected items: {selection.length || 0}</p>
            </div>
        </div>
        
    </div>;

const mapStateToProps = ({ webscene: { selection, interacting, scale, zoom } }) => ({
    interacting,
    scale,
    zoom,
    selection
});


export default connect(mapStateToProps)(Info);
