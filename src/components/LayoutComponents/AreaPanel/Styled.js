import styled, {css} from 'styled-components';
import {mediaUp, mediaDown} from "../../../lib/media";
import tinycolor from "tinycolor2";

const primary = '#5AC925';

const PanelWrapper = styled.div`
    width: 360px;
    max-width: 100%;
    max-height: calc(100% - 80px);
    padding: 30px 20px;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    right: 0;
    background: #FFF;
    z-index: 10;
    transform: translateY(110%);
    opacity: 0;
    transition: .3s;
    font-family: 'Source Sans Pro', sans-serif;
    
    ${props => props.active && css`
        transform: none;
        opacity: 1;
    `}
    
    ${mediaDown.lg`
        top:0;
        left: 0;
        max-height: 100%;
        width: 100%;
    `}
`;

const CloseTrigger = styled.div`
    position: absolute;
    top: 27px;
    right: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    
    &:before, &:after {
        content: "";
        width: 20px;
        height: 2px;
        background: gray;
        display: block;
        position: absolute;
        top: 14px;
        left: 5px;
    }
    
    &:before {
        transform: rotate(45deg)
    }
    
    &:after {
        transform: rotate(-45deg)
    }
`;

const Title = styled.div`
    font-weight: bold;
    line-height: normal;
    font-size: 22px;
    color: #333333;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #F2F2F2;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #F2F2F2;
    font-size: 14px;
    margin-bottom: 5px;
    
    ${props => props.primary && css`
        background-color: ${primary};
        color: white;
    `}
`;

const RowValue = styled.span`
  color: #848484;
  
  ${props => props.primary && css`
    color: ${primary}
  `}
  
  ${props => props.white && css`
    color: white;
  `}
`;

const Images = styled.div`
  margin: 5px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Call = styled.a`
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

const CadastralLink = styled.a`
  color: ${primary} !important;
  
  &:focus,
  &:hover {
    text-decoration: none !important;
  }
`;

const TopMargin10 = styled.div`
    margin-top: 10px;
`;

export default {
    PanelWrapper,
    CloseTrigger,
    Title,
    Row,
    RowValue,
    Images,
    Call,
    CadastralLink,
    TopMargin10
};