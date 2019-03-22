import styled, {css} from 'styled-components';
import {mediaUp, mediaDown} from "../../../lib/media";
import tinycolor from 'tinycolor2';
import {Slider as SliderComponent} from "../../PureComponents/Slider";

const primary = '#5AC925';

const Wrapper = styled.div`
  position: relative;
  height: 80px;
  flex: 0 0 auto;
  order: 1;
  background-color: white;
  z-index: 100;
  font-family: 'Source Sans Pro', sans-serif;
  
  ${mediaUp.lg`
    order: 0;
  `}
`;


const Items = styled.div`
  display: none;
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: white;
  height: calc(660px - 100% - 50px);
  overflow: auto;
  padding: 30px 40px;
    
  ${props => props.open && css`
    display: block;
  `}
  
  ${props => props.fullscreen && css`
    height: calc(100vh - 100%) !important;
  `}
  
  ${mediaUp.lg`
    padding: 0;
    position: static;
    height: 100%;
    overflow: initial;
    display: flex;
    align-items: stretch;
    position: static;
  `}
`;

const Controls = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
  
  ${mediaUp.lg`
    display: none;
  `}
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  flex-basis: 100%;
  cursor: pointer;
  
  ${props => props.filter && css`
    &:hover {
      background-color: #F2F2F2;
    }
  `}
  
  ${props => props.apply && css`
    background-color: ${primary};
    color: white;
    
    &:hover {
      background-color: ${tinycolor(primary).brighten(5).toString()};
    }
  `}
  
  ${props => props.active && css`
    background-color: #F2F2F2;
  `}
  
  ${mediaUp.sm`
    padding-left: 25px;
    padding-right: 25px;
  `}
`;

const ControlIcon = styled.div`
  margin-right: 10px;
  flex: 0 0 auto;
`;

const Dropdown = styled.div`


  ${mediaUp.lg`
    position: absolute;
    display: none;
    top: 100%;
    left: 0;
    right: 0;
  `}
`;

const DropdownItem = styled.div`
  ${props => !props.sliders && css`
    display: inline-block;
    padding: 10px 30px;
    border: 1px solid #F2F2F2;
    border-radius: 2px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, .9);
  
    &:hover {
      background-color: ${primary};
      border-color: ${primary};
      color: white;
    }
  `}
  
  ${props => props.sliders && css`
    display: flex;
    flex-direction: column;
    background-color: white;
  `}
  
  ${props => props.active && css`
    background-color: ${primary};
    border-color: ${primary};
    color: white;
  `}
  
  ${props => props.type === 'free' && css`
    &:hover {
      background-color: #228b22;
      border-color: #228b22;
    }
  `}
  
  ${props => props.type === 'sold' && css`
    &:hover {
      background-color: #ea4700;
      border-color: #ea4700;
    }
  `}
  
  ${props => props.type === 'rented' && css`
    &:hover {
      background-color: #e5e838;
      border-color: #e5e838;
    }
  `}
  
  ${mediaUp.lg`
    padding: 10px 30px;
    
    ${props => !props.sliders && css`
      display: block;
      border: none;
      margin-right: 0;
      margin-bottom: 0;
    `}
    
    ${props => props.sliders && css`
      padding: 20px 30px;
    `}
  `}
`;

const Slider = styled(SliderComponent)`
  & + & {
    margin-top: 30px;
  }
  
  ${mediaUp.sm`
    & + & {
      margin-top: 40px;
    }
  `}
`;

const Item = styled.div`
  ${props => props.logo && css`
    display: none;
    padding-left: 50px;
    padding-right: 50px;
    
    ${mediaUp.lg`
      display: block;
    `}
  `}
  
  ${mediaUp.lg`
    position: relative;
    padding: 15px 30px;
    
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      border-right: 1px solid ${primary};
      height: 40px;
    }
  `}
`;

const Toggler = styled(Item)`
  & + & {
    border-top: 1px solid #F2F2F2;
    padding-top: 30px;
    margin-top: 30px;
  }
  
  ${mediaDown.lg`
    background-color: initial !important;
  `}

  ${mediaUp.lg`
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 30px;
    border-top: none;
    
    &:hover {
      
      ${Dropdown} {
        display: block;
      }
    }
    
    & + & {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }
  `}
`;

const TogglerTitle = styled.div`
  margin-bottom: 15px;
  
  ${mediaUp.lg`
    margin-bottom: 0;
  `}
  
  ${mediaDown.lg`
    margin-top: 20px;
  `}
`;

const TogglerArrow = styled.div`
  display: none;

  ${mediaUp.lg`
    display: block;
    margin-left: 15px;
  `}
`;

export default {
  Controls,
  Control,
  ControlIcon,
  Dropdown,
  DropdownItem,
  Items,
  Item,
  Toggler,
  TogglerTitle,
  TogglerArrow,
  Slider,
  Wrapper,
};