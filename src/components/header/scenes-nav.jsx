import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


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
        className={`dropdown ${this.state.open ? ' is-active' : ''} ${this.props.websceneItems.length ? '' : 'hidden'}`}
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
            <em>No scenes</em>
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
  websceneItems: PropTypes.array,
};

ScenesNav.defaultProps = {
  websceneItems: [],
};

const mapStateToProps = ({ user: { websceneItems } }) => ({
  websceneItems,
});

export default connect(mapStateToProps)(ScenesNav);
