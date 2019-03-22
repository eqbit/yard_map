import React, {PureComponent} from 'react';
import styled, {css} from 'styled-components';
import fscreen from 'fscreen';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {isIOS} from 'react-device-detect';

import {Header} from "./components/LayoutComponents/Header";
import {Canvas} from "./components/LayoutComponents/Canvas";
import {AreaPanel} from "./components/LayoutComponents/AreaPanel";
import {mediaUp, mediaDown} from "./lib/media";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: "/local/templates/main/assets/map/static/media/marker.svg",
    iconSize: [14, 20],
    iconAnchor: [8, 12],
    shadowUrl: null
});

const AppWrapper = styled.div`
  max-width: 1000px; 
  margin: auto;
  background-color: white;
  font: 16px Roboto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  ${props => props.fullscreen && css`
    height: 100%;
    max-width: initial;
  `}
`;

const Fullscreen = styled.div`
  padding: 60px 0;
  
  ${props => props.fullscreen && css`
    width: 100%;
    height: 100%;
    padding: 0;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 99999999999;
  `}
  
  ${mediaDown.lg`
    padding: 0;
  `}
`;

const districts = window.secu.map(d => ({
    coords: d.geometry.coordinates,
    color: d.properties.color,
    name: d.properties.name,
}));

const districtsNames = districts.map(d => d.name);

const statuses = [{
        id: -1,
        title: 'Все участки'
    }],
    areas = [];
let minCost = Number.MAX_SAFE_INTEGER,
    maxCost = 0,
    minArea = Number.MAX_SAFE_INTEGER,
    maxArea = 0;

let initActiveAreaKey = null;


const areaNeedOpen = () => {
    let parts = window.location.search.substr(1).split("&");
    let $_GET = {};
    for (let i = 0; i < parts.length; i++) {
        let temp = parts[i].split("=");
        $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
    }

    return $_GET['place'] ? $_GET['place'] : null;
};

const areaNeedOpenID = areaNeedOpen();
let initAreaData = {
    num: 10,
    cost: 1000,
    stus: 'Свободен',
    area: 100,
    a_length: 10,
    a_width: 15,
    street: 'Baker Street',
    housenum: '221b',
    kadastr: '72:17:1105002:2230',
    com: [
        "gas",
        "inet",
        "elec",
        "road"
    ],
    poselok: "London"
};

window.map_points.forEach(area => {
    const foundStatus = statuses.find(s => s.id === area.data.stus_id);

    if (!foundStatus) {
        statuses.push({
            id: area.data.stus_id,
            color: area.color,
            title: area.data.stus
        });
    }

    area.data.cost = parseInt(area.data.cost.replace(/\D/gi, ''), 10);
    area.data.area = parseInt(area.data.area.replace(/\D/gi, ''), 10);

    areas.push(area);

    if(areaNeedOpenID && area.itemID == areaNeedOpenID) {
        initAreaData = area.data;
    }
});

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.areaPanel = React.createRef();
    }
    state = {
        minCost,
        maxCost,
        minArea,
        maxArea,
        fullscreen: false,
        status: statuses[0],
        costs: [0, 0],
        areaSquares: [0, 0],
        areas,
        displayAreas: [...areas],
        districts: districtsNames,
        areaData: initAreaData,
        popupOpen: !!areaNeedOpenID,
        activeAreaKey: areaNeedOpenID
    };



    componentWillMount() {
        this.calculateMeta();
        fscreen.addEventListener('fullscreenchange', this.onFullScreenChanged);
    }

    componentDidUpdate(prevProps, prevState) {
        const {status, district, fullscreen} = this.state;

        if (prevState.district !== district || prevState.status !== status) {
            this.calculateMeta();
        }

        if (prevState.fullscreen !== fullscreen) {
            fullscreen ? this.enterFullScreen() : this.leaveFullScreen();
        }
    }

    enterFullScreen = () => {
        if(isIOS) {
            console.log('nah');
        } else {
            fscreen.requestFullscreen(this.fullScreen);
        }
    };

    leaveFullScreen = () => {
        if (fscreen.fullscreenElement) {
            fscreen.exitFullscreen();
        }
    };

    calculateMeta = () => {
        const {status, areas} = this.state;

        const nextState = areas.reduce((state, area) => {
            if ((status && status.id === -1) || area.data.stus_id === status.id) {
                area.data.cost < state.minCost && (state.minCost = area.data.cost);
                state.maxCost < area.data.cost && (state.maxCost = area.data.cost);

                area.data.area < state.minArea && (state.minArea = area.data.area);
                state.maxArea < area.data.area && (state.maxArea = area.data.area);
            }
            return state;
        }, {
            minCost: Number.MAX_SAFE_INTEGER,
            maxCost: 0,
            minArea: Number.MAX_SAFE_INTEGER,
            maxArea: 0,
        });
        const {minCost, maxCost, minArea, maxArea} = nextState;
        const nextAreas = areas.filter(({data: {stus_id, cost, area}}) => {
            return ((status && status.id === -1) || stus_id === status.id)
                && (Number.isNaN(cost) || (minCost <= cost && cost <= maxCost))
                && (Number.isNaN(area) || (minArea <= area && area <= maxArea))
        });

        this.setState({
            ...nextState,
            displayAreas: nextAreas,
            costs: [nextState.minCost, nextState.maxCost],
            areaSquares: [nextState.minArea, nextState.maxArea],
        });
    };

    recalculateAreas = () => {
        const {
            costs: [minCost, maxCost],
            areaSquares: [minArea, maxArea],
            areas,
            status
        } = this.state;

        const nextAreas = areas.filter(({data: {stus_id, cost, area}}) => {
            return ((status && status.id === -1) || stus_id === status.id)
                && (Number.isNaN(cost) || (minCost <= cost && cost <= maxCost))
                && (Number.isNaN(area) || (minArea <= area && area <= maxArea))
        });

        this.setState({displayAreas: nextAreas});
    };

    onChange = (key, value) => {
        if (key === 'fullscreen' && value === false) {
            document.body.classList.remove('fullscreen-active');
            return this.setState({
                fullscreen: false,
            });
        } else if(key === 'fullscreen' && value === true) {
            document.body.classList.add('fullscreen-active');
        }

        this.setState({[key]: value});
    };

    onFullScreenChanged = () => {
        this.setState({fullscreen: !!fscreen.fullscreenElement});
    };

    onNewArea = (data) => {
        const areas = this.state.areas.slice();
        areas.push({
            coords: data.coords,
            color: data.color,
            data: data.data
        });

        this.setState({areas}, this.recalculateAreas);
    };

    onNewDistrict = (name) => {
        const districts = this.state.districts.slice();
        districts.push(name);

        this.setState({districts});
    };

    closePopup = () => {
        this.setState({
            popupOpen: false,
            activeAreaKey: null
        });
    };

    onAreaClick = (data, itemID) => {
        this.setState({
            areaData: data,
            popupOpen: true,
            activeAreaKey: itemID
        });
    };

    render() {
        const {
            minCost,
            maxCost,
            minArea,
            maxArea,
            status,
            fullscreen,
            costs,
            areaSquares,
            displayAreas,
            districts,
            activeAreaKey

        } = this.state;
        const {
            recalculateAreas,
            onChange
        } = this;

        return (
            <Fullscreen ref={ref => this.fullScreen = ref} fullscreen={fullscreen}>
                <AppWrapper fullscreen={fullscreen}>
                    <Header
                        minCost={minCost}
                        maxCost={maxCost}
                        minArea={minArea}
                        maxArea={maxArea}
                        costs={costs}
                        areaSquares={areaSquares}
                        districts={districts}
                        statuses={statuses}
                        status={status}
                        recalculateAreas={recalculateAreas}
                        onChange={onChange}
                        fullscreen={fullscreen}
                    />
                    <Canvas
                        areas={displayAreas}
                        fullscreen={fullscreen}
                        status={status}
                        onChange={onChange}
                        onNewArea={this.onNewArea}
                        onNewDistrict={this.onNewDistrict}
                        onAreaClick={this.onAreaClick}
                        closePopup={this.closePopup}
                        activeAreaKey={activeAreaKey}
                    />
                    <AreaPanel
                        data={this.state.areaData}
                        popupOpen={this.state.popupOpen}
                        closePopup={this.closePopup}
                    />
                </AppWrapper>
            </Fullscreen>
        );
    }
}

export default App;
