import React from 'react';
import PropTypes from 'prop-types';

import {Range} from "rc-slider";
import Styled from './Styled';

import 'rc-slider/assets/index.css';

const {Limits, Wrapper} = Styled;

export class Slider extends React.PureComponent {
  render() {
    const {className, formatLimit, value, ...rest} = this.props;

    return (
      <Wrapper className={className}>
        <Limits>
          <span>от {formatLimit(value[0])}</span>
          <span>до {formatLimit(value[1])}</span>
        </Limits>
        <Range value={value} {...rest}/>
      </Wrapper>
    );
  }
}

Slider.propTypes = {
  className: PropTypes.string,
  formatLimit: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  pushable: PropTypes.bool,
  allowCross: PropTypes.bool,
  step: PropTypes.number,
};