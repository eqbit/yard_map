import styled from 'styled-components';

const Limits = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  .rc-slider {
    .rc-slider-rail {
      background-color: transparentize(#5AC925, .6);
    }

    .rc-slider-track {
      background-color: #5AC925;
    }

    .rc-slider-handle {
      border: none;
      background-color: #5AC925;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -8px;

      &:focus,
      &:active {
        box-shadow: none;
      }
    }
  }
`;

export default {Limits, Wrapper};