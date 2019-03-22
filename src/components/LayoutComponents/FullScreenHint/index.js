import React from 'react';
import OnVisible from 'react-on-visible';
import Styled from './Styled';

const {
    FSHint,
    CloseHintIcon
} = Styled;

export default class Canvas extends React.PureComponent {
    state = {
        showFSHint: true
    };

    onHintVisible = () => {
        setTimeout(() => {
            this.setState({showFSHint: false})
        }, 3000);
    };

    render() {
        const {showFSHint} = this.state;
        return (
            <React.Fragment>
                {showFSHint &&
                <OnVisible onChange={this.onHintVisible}>
                    <FSHint>
                        Нажми иконку <img src="/local/templates/main/assets/map/static/media/fullscreen-icon.svg"/>, чтобы развернуть карту на весь экран.
                        <CloseHintIcon onClick={() => this.setState({showFSHint: false})}>
                            <img src="/local/templates/main/assets/map/static/media/close.svg" alt=""/>
                        </CloseHintIcon>
                    </FSHint>
                </OnVisible>
                }
            </React.Fragment>
        )
    }
}