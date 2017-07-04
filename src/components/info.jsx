import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOut } from '../reducers/identity/actions'

const Info = ({ username, interacting, scale, zoom, items, _signOut_ }) =>
    <div className="list-items">
        <p>user: {username} <button onClick={_signOut_()}>x</button></p>
        <p>interacting: {String(interacting)}</p>
        <p>scale: {(scale || 0).toFixed(2)}</p>
        <p>zoom: {(zoom || 0).toFixed(2)}</p>
        <p>selected items: {items.length || 0}</p>
    </div>;

const mapStateToProps = ({ identity: { username }, view: { interacting, scale, zoom }, selection: { items } }) => ({
    username,
    interacting,
    scale,
    zoom,
    items
});

const mapDispatchToProps = dispatch => ({
    _signOut_() {
        return () => {
            dispatch(signOut());
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);
