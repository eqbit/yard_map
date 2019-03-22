import React from 'react';
import Styled from './Styled';
import {areaFormatter, costFormatter} from "../../../lib/formatters";

const {
    PanelWrapper,
    CloseTrigger,
    Title,
    Row,
    RowValue,
    Images,
    Call,
    CadastralLink,
    TopMargin10
} = Styled;

export class AreaPanel extends React.PureComponent {

    render() {
        const data = this.props.data;
        const f = data.com.reduce((state, c) => {
            state[c] = true;
            return state;
        }, {});

        return (
            <PanelWrapper active={this.props.popupOpen}>
                <CloseTrigger onClick={this.props.closePopup}/>

                <Title>
                    Участок №{data.num}
                </Title>

                <Row primary={true}>
                    <span>Цена:</span>
                    <RowValue white={true}>
                        {Number.isNaN(data.cost)
                            ? 'Не указана'
                            : costFormatter.to(data.cost)}
                    </RowValue>
                </Row>

                <Row>
                    <span>Статус:</span>
                    <RowValue>{data.stus}</RowValue>
                </Row>

                <Row>
                    <span>Площадь участка:</span>
                    <RowValue>{Number.isNaN(data.area)
                        ? 'Не указана'
                        : areaFormatter.to(data.area)}</RowValue>
                </Row>

                <Row>
                    <span>Размеры:</span>
                    <RowValue>{data.a_length} x {data.a_width} м.</RowValue>
                </Row>

                <Row>
                    <span>Адрес:</span>
                    <RowValue>{data.street} {data.housenum}</RowValue>
                </Row>

                <Row>
                    <span>Кадастровый номер</span>
                    <RowValue primary={true}>
                        <CadastralLink
                            href={`http://pkk5.rosreestr.ru/#text=${data.kadastr}&type=1&app=search&opened=1`}
                            target="_blank"
                        >
                            {data.kadastr}
                        </CadastralLink>
                    </RowValue>
                </Row>

                <TopMargin10>
                    Доступно на участке
                </TopMargin10>

                <Images>
                    {f.gas && <img src="/local/templates/main/assets/map/static/media/gas.svg"/>}
                    {f.video && <img src="/local/templates/main/assets/map/static/media/video.svg"/>}
                    {f.elec && <img src="/local/templates/main/assets/map/static/media/elec.svg"/>}
                    {f.inet && <img src="/local/templates/main/assets/map/static/media/inet.svg"/>}
                    {f.road && <img src="/local/templates/main/assets/map/static/media/road.svg"/>}
                    {f.voda && <img src="/local/templates/main/assets/map/static/media/voda.svg"/>}
                </Images>

                {data.stus !== "Продан" &&
                <Call
                    href={'#'}
                    data-toggle="modal"
                    data-target="#callbackmodal"
                    data-label="Заказать звонок"
                    data-event="BOOK_AREA"
                    data-area={`Участок №${data.num}, (${data.poselok})`}
                >
                    Записаться на просмотр
                </Call>}

            </PanelWrapper>
        )
    }
}

