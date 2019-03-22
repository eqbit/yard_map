import styled from "styled-components";

const FSHint = styled.div`
  position: absolute;
  bottom: 30px;
  left: calc(50% - 133px);
  z-index: 1000;
  width: 266px;
  padding: 20px 50px 20px 20px;
  background: #FFF;
  border: 1px solid #5AC925;
  border-radius: 6px;
  cursor: auto;
  line-height: 24px;
  font-size: 16px;
  color: #333333;
`;

const CloseHintIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

export default {
    FSHint,
    CloseHintIcon
};