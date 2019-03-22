import React from 'react';
import PropTypes from 'prop-types';

import {
  Map,
  GeoJSON,
  TileLayer,
  Marker,
} from 'react-leaflet';

import Styled from './Styled';

import OnVisible from 'react-on-visible';

import {CRS, icon} from 'leaflet';
import {SvgExpand} from "../../SvgComponents/Expand";


import EditPanel from "../../EditComponents/Panel";
import FullScreenHint from "../../LayoutComponents/FullScreenHint";

const topMarkerIcon = icon({
    iconUrl: "/local/templates/main/assets/map/static/media/marker.svg",
    iconSize: [14, 20],
    popupAnchor: [20, -190],
});

const maxBounds = [[-5, 30.25], [-177, 279]];
const fullscreenBounds = maxBounds;

const {
  Wrapper,
  Area,
  Tooltip,
  TooltipInner,
  Control,
  Controls,
  ControlsDivider,
  ControlsWrap,
  ZoomOut,
  ZoomIn,
  BottomTooltip
} = Styled;

export class Canvas extends React.PureComponent {
  districts = [];

  state = {
    center: [-256, 256],
    markers: window.markers,
    geoJSONData: [{
      type: 'FeatureCollection',
      features: window.secu,
    }],
    activeArea: null,
    activeAreaKey: null
  };

  componentDidUpdate(prevProps) {
    const {fullscreen} = this.props;
    const map = this.map.leafletElement;


    if (prevProps.fullscreen !== fullscreen) {
      map.invalidateSize();

      if (fullscreen) {
        map.setMinZoom(2);
        map.setZoom(3);
        map.setMaxZoom(4);
        map.setMaxBounds(fullscreenBounds);
      } else {
        map.setMinZoom(2);
        map.setZoom(2);
        map.setMaxBounds(maxBounds);
        map.closePopup();
      }
    }
  }

  styleDistrict = district => ({
    fillColor: district.properties.color,
    weight: 3,
    opacity: 1,
    color: district.properties.color,
    fillOpacity: 0.15
  });

  highlightDistrict = ({target: district}) => {
    district.setStyle({
      dashArray: '',
      fillOpacity: 0.6
    });
  };

  resetDistrictHighlight = ({target: district}) => {
    this.geoJSON.leafletElement.resetStyle(district);
  };

  zoomToArea = area => {
      const map = this.map.leafletElement;

      map.setView((area ? area : map).getBounds().getCenter(), 4);
  };

  zoomIn = () => this.map.leafletElement.zoomIn();

  zoomOut = () => this.map.leafletElement.zoomOut();

  onEachFeature = (feature, layer) => {
    const {
      districts
    } = this;
    districts.push(layer);
  };

  adminMode = () => {
      let parts = window.location.search.substr(1).split("&");
      let $_GET = {};
      for (let i = 0; i < parts.length; i++) {
          let temp = parts[i].split("=");
          $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
      }

      return $_GET['adminMode'] === "true";
  };

  onNewMarker = (layer) => {
      const map = this.map.leafletElement;
      map.removeLayer(layer);
      this.forceUpdate();

      if (typeof this.props.onReInit === 'function'){
          this.props.onReInit();
      }
  };

  onNewArea = (layer, data) => {
      const map = this.map.leafletElement;
      map.removeLayer(layer);

      if (typeof this.props.onNewArea === 'function'){
          this.props.onNewArea(data);
      }
  };

  removeDistrictDraws = (layer) => {
      const map = this.map.leafletElement;
      map.removeLayer(layer);
  };

  onNewDistrict = (data) => {
      let newDistrict = {
          type: "Feature",
          geometry: {
              type: "Polygon",
              coordinates: data.coords
          },
          properties: {
              name: data.name,
              color: data.color,
              index_c: window.secu.length
          }
      };

      this.geoJSON.leafletElement.addData(newDistrict);

      this.props.onNewDistrict(data.name);
  };

  onAreaClick = (data, key) => {
      this.props.onAreaClick(data, key);
  };

  render() {
    const {
      geoJSONData,
      center,
      markers,
    } = this.state;
    const {areas, onChange} = this.props;
    const {fullscreen} = this.props;
    const {zoomIn, zoomOut} = this;

    return (
      <Wrapper fullscreen={fullscreen}>
        <Map
          ref={ref => this.map = ref}
          zoomControl={false}
          style={{backgroundColor: 'transparent', height: '100%'}}
          crs={CRS.Simple}
          center={center}
          zoom={2}
          noWrap={true}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          minZoom={2}
          maxZoom={4}
          maxBounds={maxBounds}
          maxBoundsViscosity={.9}
        >
          <FullScreenHint/>

          {this.adminMode()
              ? <EditPanel
                  onNewMarker={this.onNewMarker}
                  onNewArea={this.onNewArea}
                  removeDistrictDraws={this.removeDistrictDraws}
                  onNewDistrict={this.onNewDistrict}
              />
              : null}

          <TileLayer
              tms={false}
              tileSize={250}
              attribution={null}
              url={window.tileUrl}
          />

          <GeoJSON
              ref={ref => this.geoJSON = ref}
              data={geoJSONData}
              style={this.styleDistrict}
              onEachFeature={this.onEachFeature}
          />

          {areas.map((area, idx) => {
              const {coords, color, data, itemID} = area;
              let areaColor = color;
              let areaWeight = 1;

              if(this.props.activeAreaKey === itemID) {
                  areaColor = "#FFF";
                  areaWeight = 3;
              }

              return (
                  <Area
                      key={idx}
                      positions={coords}
                      color={areaColor}
                      stroke={true}
                      weight={areaWeight}
                      opacity={1}
                      onClick={() => this.onAreaClick(data, itemID)}
                  >
                  </Area>
              )
          })}



          {markers.map((m, idx) => {
              return m.coords[0] === undefined ? null : (
                  <Marker key={idx} position={m.coords} icon={topMarkerIcon}>
                      {m.coords[0] > -48
                          ? (
                              <BottomTooltip className={'custom-tooltip-before'} direction={'bottom'}>
                                  <TooltipInner dangerouslySetInnerHTML={{__html: m.name}}/>
                              </BottomTooltip>
                          )
                          : (
                              <Tooltip className={'custom-tooltip-before'} direction={'top'}>
                                  <TooltipInner dangerouslySetInnerHTML={{__html: m.name}}/>
                              </Tooltip>
                          )}
                  </Marker>
              )
          })
          }
        </Map>
        <Controls>
          <ControlsWrap>
            <ZoomIn onClick={zoomIn}/>
            <ControlsDivider/>
            <ZoomOut onClick={zoomOut}/>
          </ControlsWrap>
          <Control onClick={() => onChange('fullscreen', !fullscreen)}>
            <SvgExpand/>
          </Control>
        </Controls>
      </Wrapper>
    );
  }
}

Canvas.propTypes = {
  areas: PropTypes.array,
  statuses: PropTypes.array,
  status: PropTypes.object,
  fullscreen: PropTypes.bool,

  onChange: PropTypes.func,
};