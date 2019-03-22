import styled, {css} from 'styled-components';
import tinycolor from 'tinycolor2';
import {mediaUp, mediaDown} from "../../../lib/media";
import {
  Polygon,
  Tooltip as LeafTooltip,
  Popup as LeafPopup,
} from 'react-leaflet';
import close from '../../../resources/images/close.svg';

const primary = '#5AC925';

const Wrapper = styled.div`
  background-color: #82C15C;
  height: 680px;
  position: relative; 
  z-index: 10;
  font-family: 'Source Sans Pro', sans-serif;
  
  ${props => props.fullscreen && css`
    flex: 1 0 auto;
  `}
  
  ${mediaDown.lg`
    height: calc(100vh - 70px);
  `};
`;

const Area = styled(Polygon)`
  fill-opacity: .6;
  position: relative;

  &:hover {
    fill-opacity: 0;
  }
`;

const Tooltip = styled(LeafTooltip)`
  box-sizing: border-box;
  min-width: 200px;
  width: auto;
  margin-left: 100px;
  border-radius: 3px 3px 3px 0;
  padding: 20px 30px;
  position: relative;
  top: -20px;
  box-shadow: none;
  border: 1px solid #5AC925;
  font: 14px Roboto;

  &:before {
    border-top-color: transparent !important;
    border-left-color: white !important;
    border-width: 20px !important;
    left: 0 !important;
    margin-left: 0 !important;
  }
`;

const BottomTooltip = styled(Tooltip)`
  top: 20px;
`;

const TooltipInner = styled.div`
  position: relative;
  z-index: 100;
  word-break: break-word;
  white-space: initial;
`;

const Controls = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 1000;
`;

const ControlsWrap = styled.div`
  background-color: white;
  border-radius: 3px;
  margin-bottom: 15px;
  border: 1px solid #E5E5E5;
  width: fit-content;
`;

const ControlsDivider = styled.div`
  width: 25px;
  margin: auto;
  border-top: 1px solid #E5E5E5;
`;

const Control = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 9px;
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

const KadastrLink = styled.a`
  color: ${primary} !important;
  
  &:focus,
  &:hover {
    text-decoration: none !important;
  }
`;

const ZoomControl = styled(Control)`
  position: relative;

  &:before, 
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #333333;
  }
`;

const ZoomIn = styled(ZoomControl)`
  &:before {
    width: 20px;
    height: 3px;
  }
  
  &:after {
    height: 20px;
    width: 3px;
  }
`;

const ZoomOut = styled(ZoomControl)`
  &:before {
    width: 20px;
    height: 3px;
  }
`;


const Popup = styled(LeafPopup)`
  width: 320px;
  margin-left: 160px;
  
  .leaflet-popup-content-wrapper {
    padding: 0;
    border-radius: 0;
  }
  
  .leaflet-popup-content {
    margin: 0;
    position: relative;
    width: 100% !important;
  
    &:before {
      content: '';
      display: block;
      border: solid transparent;
      border-width: 20px;
      border-left-color: white;
      position: absolute;
      left: 0;
      top: calc(100% - 20px);
      width: 40px;
      height: 40px;
    }
  }
  
  a.leaflet-popup-close-button {
    right: 20px;
    top: 42px;
    font-size: 0;
    background: url(${close}) no-repeat center;
    background-size: contain;
  }
  
  .leaflet-popup-tip-container {
    display: none
  }
`;

const PopupInner = styled.div`
  margin: 0;
  position: relative;
  padding: 30px 20px;
  font-size: 14px;
`;

const PopupTitle = styled.div`
  font-weight: bold;
  line-height: 39px;
  font-size: 22px;
  color: #333333;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #F2F2F2;
`;

const PopupRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 47px;
  padding: 0 20px;
  background: #F2F2F2;
  font-size: 14px;
  margin-bottom: 5px;
  
  ${props => props.primary && css`
    background-color: ${primary};
    color: white;
  `}
`;

const PopupRowValue = styled.span`
  color: #848484;
  
  ${props => props.primary && css`
    color: ${primary}
  `}
  
  ${props => props.white && css`
    color: white;
  `}
`;

const PopupImages = styled.div`
  margin: 5px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PopupCall = styled.a`
  display: block;
  background-color: ${primary};
  color: white !important;
  text-align: center;
  padding: 15px;
  
  &:hover {
    text-decoration: none;
    color: white;
    background-color: ${tinycolor(primary).brighten(5).toString()}
  }
`;



export default {
  Wrapper,
  Area,
  Tooltip,
  BottomTooltip,
  TooltipInner,
  Controls,
  Control,
  ControlsDivider,
  ControlsWrap,
  KadastrLink,
  ZoomIn,
  ZoomOut,
  Popup,
  PopupInner,
  PopupTitle,
  PopupCall,
  PopupImages,
  PopupRow,
  PopupRowValue
};