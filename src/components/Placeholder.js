import React, {Component, PropTypes} from 'react';
import {omit} from '../utils/helpers';
import style from '../style/placeholder';

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, ['style', 'disabledStyle', '_isDisabled']);
}

/**
 * Placeholder component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Placeholder extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Placeholder';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    style: PropTypes.object,
    disabledStyle: PropTypes.object,
    _isDisabled: PropTypes.bool,
  };

  static defaultProps = {
    _isDisabled: false,
  };

  /**
   * Update the childProps based on the updated properties passed to the
   * Placeholder.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    let computedStyle = {
      ...style.style,
      ...this.props.style,
    };
    if (this.props._isDisabled) {
      computedStyle = {
        ...computedStyle,
        ...style.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    return (
      <div style={ computedStyle } {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}
