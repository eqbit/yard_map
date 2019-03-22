import styled, {css} from 'styled-components';
import { Panel as ColorPickerPanel } from 'rc-color-picker';


const EditControlsWrapper = styled.div`
  position: absolute;
    bottom: 25px;
    right: 25px;
    z-index: 1000;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
`;

const Control = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 0 9px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: .3s;
  
  
  &:hover {
    opacity: 1;
  }
  
  ${props => props.active && css`
    opacity: 1;
  `}
`;

const FormPanel = styled.div`
    position: absolute;
    top: -100%;
    left: 20px;
    width: calc(50% - 40px);
    background: #FFF;
    z-index: 1000;
    padding: 20px;
    display: grid;
    grid-gap: 10px;
    transition: .3s;
    
    ${props => props.active && css`
        top: 20px
    `}
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    resize: none;   
`;

const Input = styled.input`
    width: 100%;
    padding: 5px 10px; 
`;

const Submit = styled.button `
    width: fit-content;
    padding: 5px 20px;
`;

const AcceptButton = styled(Control)`
    position: absolute;
    bottom: 25px;
    left: 25px;
    z-index: 1000;
    width: fit-content;
    opacity: 1;
    font-weight: bold;
    color: green
`;

const Goods = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 10px;
`;

const GoodsItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: lightgray;
    padding: 5px;
`;

const Checkbox = styled.input`
    width: 20px;
    height: 20px;
    margin: 0 !important;
    display: block !important;
`;

const Select = styled.select`
    padding: 5px;
`;

const RelativeInputWrap = styled.div`
    position: relative;
`;

const ColorPicker = styled(ColorPickerPanel)`
    position: absolute;
    top: 4px;
    right: 4px;
`;

export default {
    EditControlsWrapper,
    Control,
    FormPanel,
    Textarea,
    Input,
    Submit,
    AcceptButton,
    Goods,
    GoodsItem,
    Checkbox,
    Select,
    RelativeInputWrap,
    ColorPicker
};