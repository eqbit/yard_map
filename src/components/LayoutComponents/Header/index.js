import React from 'react';
import PropTypes from 'prop-types';

import {costFormatter, areaFormatter} from "../../../lib/formatters";
import {SvgArrowDown} from "../../SvgComponents/ArrowDown";
import {SvgFilter} from "../../SvgComponents/Filter";
import Styled from './Styled';

const {
  Dropdown,
  DropdownItem,
  Wrapper,
  Items,
  Item,
  Toggler,
  TogglerArrow,
  TogglerTitle,
  Controls,
  Control,
  ControlIcon,
  Slider,
} = Styled;

const statusAlias = {
  3: 'rented',
  4: 'sold',
  12: 'free'
};

export class Header extends React.PureComponent {
  state = {
    open: false,
  };

  toggleOpen = () => this.setState({open: !this.state.open});

  render() {
    const {toggleOpen} = this;
    const {
      areaSquares,
      costs,
      statuses,
      districts,
      status,
      minCost,
      minArea,
      maxCost,
      maxArea,

      recalculateAreas,
      onChange,
    } = this.props;
    const {open} = this.state;

    return (
      <Wrapper id={"map-header"}>
        <Items open={open}>

          {this.props.fullscreen && (
              <Item logo={true}>
              <img src="/local/templates/main/assets/map/static/media/logo.svg" alt={'yard-logo'} />
              </Item>
          )}

          <Toggler>
            <TogglerTitle>Параметры участка</TogglerTitle>
            <TogglerArrow>
              <SvgArrowDown />
            </TogglerArrow>
            <Dropdown>
              <DropdownItem sliders={true}>
                <Slider
                  value={costs}
                  formatLimit={costFormatter.to}
                  onChange={values => onChange('costs', values)}
                  onAfterChange={recalculateAreas}
                  min={minCost}
                  max={maxCost}
                  allowCross={false}
                />

                <Slider
                  value={areaSquares}
                  formatLimit={areaFormatter.to}
                  onChange={values => onChange('areaSquares', values)}
                  onAfterChange={recalculateAreas}
                  min={minArea}
                  max={maxArea}
                  allowCross={false}
                />
              </DropdownItem>
            </Dropdown>
          </Toggler>

          <Toggler style={{backgroundColor: status ? status.color: ''}}>
            <TogglerTitle>
              <div className={'hidden-md hidden-lg'}>Доступность участка</div>
              <div className={'hidden visible-md visible-lg'}>
                {status ? status.title : `Доступность участка`}
              </div>
            </TogglerTitle>

            <TogglerArrow>
              <SvgArrowDown />
            </TogglerArrow>

            <Dropdown>
              {statuses.map((s, idx) => (
                <DropdownItem
                  key={idx}
                  type={statusAlias[s.id]}
                  active={status && s.id === status.id}
                  onClick={() => onChange('status', s)}
                >
                  {s.title}
                </DropdownItem>
              ))}
            </Dropdown>
          </Toggler>
        </Items>

        <Controls>
          <Control filter={1} active={open} onClick={toggleOpen}>
            <ControlIcon>
              <SvgFilter />
            </ControlIcon>
            <span>Подбор участка</span>
          </Control>
          {open &&
          <Control apply={true} onClick={toggleOpen}>
            Показать
          </Control>}
        </Controls>
      </Wrapper>
    );
  }
}

Header.propTypes = {
  minCost: PropTypes.number,
  maxCost: PropTypes.number,
  minArea: PropTypes.number,
  maxArea: PropTypes.number,
  statuses: PropTypes.array,
  districts: PropTypes.array,
  areaSquares: PropTypes.array,
  costs: PropTypes.array,
  status: PropTypes.object,

  recalculateAreas: PropTypes.func,
  onDistrictSelect: PropTypes.func,
  onChange: PropTypes.func
};