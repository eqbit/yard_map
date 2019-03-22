import {css} from 'styled-components';

const sizes = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 0,
};

// Iterate through the sizes and create a media template
export const mediaUp = Object.entries(sizes).reduce((acc, [label, value]) => {
  acc[label] = (...args) => css`
    @media (min-width: ${value}px) {
      ${css(...args)}
    }
  `;

  return acc
}, {});

export const mediaDown = Object.entries(sizes).reduce((acc, [label, value]) => {
  acc[label] = (...args) => css`
    @media (max-width: ${value}px) {
      ${css(...args)}
    }
  `;

  return acc
}, {});