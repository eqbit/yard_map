import React from 'react';
import {FeatureGroup} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import Styled from './Styled';
import './lang';
import axios from "axios";


const {
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
    ColorPicker,
    RelativeInputWrap
} = Styled;


export default class EditPanel extends React.PureComponent {
    state = {
        panel: '',
        editModeActive: false,
        formMarkerVisible: false,
        formAreaVisible: false,
        formDistrictVisible: false,
        acceptButtonVisible: false,
        currentObject: '',
        currentObjectId: 0,
        currentLayer: {},
        currentLayers: [],
        allowEdit: false,
        data: {},
        districtCoords: [],
        falseMarkerBool: false
    };

    clearForms = () => {
        let inputs = document.querySelectorAll('[data-clear-on-success]');

        for(let index in inputs) {
            if(!inputs.hasOwnProperty(index)) continue;

            inputs[index].value = '';
            inputs[index].checked = false;
        }
    };

    ajaxRequest = (url, data) => {
        let $this = this;
        axios.post(url,data).then(function(){
            $this.clearForms();
        }).catch(function(error){
            console.log(error);
        }).then(function(){
            $this.clearForms();
        });
    };

    drawAcceptButton = () => {
        let action;

        switch(this.state.currentObject) {
            case 'marker':
                action = '_onMarkerAccept';
                break;

            case 'area':
                action = '_onAreaAccept';
                break;

            case 'district' :
                action = '_onDistrictAccept';
        }

        if(this.state.acceptButtonVisible) {
            return (
                <AcceptButton onClick={() => this[action]()}>
                    Подтвердить координаты
                </AcceptButton>
            )
        } else {
            return null;
        }
    };

    _onNewMarker = (e) => {
        this.setState({
            acceptButtonVisible: true,
            allowEdit: true,
            data: e.layer._latlng,
            currentObject: 'marker',
            currentObjectId: e.layer._leaflet_id,
            currentLayer: e.layer
        });
    };

    _onMarkerEdited = (e) => {
        this.setState({
            data: e.layers._layers[this.state['currentObjectId']]._latlng
        });
    };

    _onMarkerAccept = () => {
        this.setState({
            acceptButtonVisible: false,
            formMarkerVisible: true
        })
    };

    _onNewArea = (e) => {
        this.setState({
            acceptButtonVisible: true,
            allowEdit: true,
            data: e.layer._latlngs,
            currentObject: 'area',
            currentObjectId: e.layer._leaflet_id,
            currentLayer: e.layer
        });
    };

    _onAreaEdited = (e) => {
        this.setState({
            data: e.layers._layers[this.state['currentObjectId']]._latlngs
        });
    };

    _onAreaAccept = () => {
        this.setState({
            acceptButtonVisible: false,
            formAreaVisible: true
        })
    };

    _onNewDistrict = (e) => {
        let districtCoords = this.state.districtCoords.slice();
        districtCoords[e.layer._leaflet_id] = e.layer._latlngs[0];

        let currentLayers = this.state.currentLayers.slice();
        currentLayers.push(e.layer);

        this.setState({
            acceptButtonVisible: true,
            allowEdit: true,
            currentObject: 'district',
            falseMarkerBool: true,
            districtCoords,
            currentLayers
        });

        this.setState({
            falseMarkerBool: false
        });
    };

    _onDistrictEdited = (e) => {
        let districtCoords = this.state.districtCoords.slice();

        for (let _leaflet_id in e.layers._layers) {
            districtCoords[_leaflet_id] = e.layers._layers[_leaflet_id]._latlngs[0];
        }
    };

    _onDistrictAccept = () => {
        this.setState({
            acceptButtonVisible: false,
            formDistrictVisible: true
        })
    };

    markers = () => {
        const {allowEdit} = this.state;
        return (
            <EditControl
                position='topleft'
                onEdited={this._onMarkerEdited}
                onCreated={this._onNewMarker}
                edit={{
                    edit: allowEdit
                }}
                draw={{
                    rectangle: false,
                    circle: false,
                    circlemarker: false,
                    polyline: false,
                    polygon: false,
                    marker: !allowEdit
                }}
            />
        )
    };

    districts = () => {
        const {allowEdit, falseMarkerBool} = this.state;
        return (
            <EditControl
                position='topleft'
                onEdited={this._onDistrictEdited}
                onCreated={this._onNewDistrict}
                edit={{
                    edit: allowEdit
                }}
                draw={{
                    rectangle: false,
                    circle: false,
                    circlemarker: false,
                    polyline: false,
                    marker: falseMarkerBool
                }}
            />
        )
    };

    colorPicker = (e) => {
        document.getElementById("districtPropColor").value = e.color;
    };

    areas = () => {
        const {allowEdit} = this.state;
        return (
            <EditControl
                position='topleft'
                onEdited={this._onAreaEdited}
                onCreated={this._onNewArea}
                edit={{
                    edit: allowEdit
                }}
                draw={{
                    rectangle: false,
                    circle: false,
                    circlemarker: false,
                    polyline: false,
                    marker: false,
                    polygon: !allowEdit
                }}
            />
        )
    };

    drawPanel = () => {
        const {markers, districts, areas} = this;
        switch (this.state.panel) {
            case 'marker' :
                return markers();

            case 'district':
                return districts();

            case 'area':
                return areas();

            default:
                return null;
        }
    };

    drawSwitcher = () => {
        const {panel} = this.state;

        switch (this.state.editModeActive) {
            case true:
                return (
                    <EditControlsWrapper>
                        <Control active={panel === 'district'} onClick={() => this.setState({panel: 'district'})}>
                            Добавить район
                        </Control>
                        <Control active={panel === 'area'} onClick={() => this.setState({panel: 'area'})}>
                            Добавить участок
                        </Control>
                        <Control active={panel === 'marker'} onClick={() => this.setState({panel: 'marker'})}>
                            Добавить маркер
                        </Control>
                        <Control onClick={() => this.setState({
                            editModeActive: false, panel: ''
                        })}>
                            Выйти из режима редактирования
                        </Control>
                    </EditControlsWrapper>
                );
            default:
                return (
                    <EditControlsWrapper>
                        <Control onClick={() => this.setState({
                            editModeActive: true
                        })}>
                            Режим редактирования
                        </Control>
                    </EditControlsWrapper>
                )
        }
    };


    markerForm = () => {
        const {formMarkerVisible} = this.state;

        return (
            <FormPanel active={formMarkerVisible === true}>
                <div>Введите данные метки</div>

                <Textarea id="markerTextArea" type="text" placeholder="Текст метки" rows="3" data-marker-required-input data-clear-on-success/>

                <Submit onClick={() => this.api()}>Отправить</Submit>
            </FormPanel>
        )
    };

    areaForm = () => {
        const {formAreaVisible} = this.state;

        return (
            <FormPanel active={formAreaVisible === true}>
                <div>Введите данные участка</div>

                <Input id="areaPropArea" type="text" placeholder="Площадь" data-area-required-input data-clear-on-success/>
                <Input id="areaPropPrice" type="text" placeholder="Цена" data-area-required-input data-clear-on-success/>
                <Input id="areaPropNumber" type="text" placeholder="Номер участка" data-area-required-input data-clear-on-success/>
                <Input id="areaPropLength" type="text" placeholder="Размеры: длина" data-area-required-input data-clear-on-success/>
                <Input id="areaPropWidth" type="text" placeholder="Размеры: ширина" data-area-required-input data-clear-on-success/>
                <Input id="areaPropStreet" type="text" placeholder="Адрес: улица" data-area-required-input data-clear-on-success/>
                <Input id="areaPropHouseNumber" type="text" placeholder="Адрес: дом" data-area-required-input data-clear-on-success/>
                <Input id="areaPropCadastral" type="text" placeholder="Кадастровый номер" data-area-required-input data-clear-on-success/>

                <Goods>
                    <GoodsItem>
                        <span>Газ</span>
                        <Checkbox type="checkbox" id="areaPropGas" data-clear-on-success/>
                    </GoodsItem>

                    <GoodsItem>
                        <span>Электричество</span>
                        <Checkbox type="checkbox" id="areaPropElectricity" data-clear-on-success/>
                    </GoodsItem>

                    <GoodsItem>
                        <span>Интернет</span>
                        <Checkbox type="checkbox" id="areaPropWeb" data-clear-on-success/>
                    </GoodsItem>

                    <GoodsItem>
                        <span>Дорога</span>
                        <Checkbox type="checkbox" id="areaPropRoad" data-clear-on-success/>
                    </GoodsItem>

                    <GoodsItem>
                        <span>Видеонаблюдение</span>
                        <Checkbox type="checkbox" id="areaPropVideo" data-clear-on-success/>
                    </GoodsItem>

                    <GoodsItem>
                        <span>Вода</span>
                        <Checkbox type="checkbox" id="areaPropWater" data-clear-on-success/>
                    </GoodsItem>
                </Goods>

                <Select id="areaPropStatus">
                    <option>
                        Свободен
                    </option>
                    <option>
                        Забронирован
                    </option>
                    <option>
                        Продан
                    </option>
                </Select>

                <Submit onClick={() => this.api()}>Отправить</Submit>
            </FormPanel>
        )
    };

    districtForm = () => {
        const {formDistrictVisible} = this.state;

        return (
            <FormPanel active={formDistrictVisible === true}>
                <div>Введите данные района</div>

                <Input id="districtPropName" type="text" placeholder="Название района" data-district-required-input data-clear-on-success/>

                <RelativeInputWrap>
                    <Input id="districtPropColor" type="text" placeholder="Код цвета района" data-district-required-input data-clear-on-success/>
                    <ColorPicker enableAlpha={false} color={'#345679'} onChange={this.colorPicker} mode="RGB" />
                </RelativeInputWrap>

                <Submit onClick={() => this.api()}>Отправить</Submit>
            </FormPanel>
        )
    };

    validate = (selector) => {
        let inputs = document.querySelectorAll(selector);

        let valid = true;
        for(let index in inputs) {
            if(!inputs.hasOwnProperty(index)) continue;

            if(!inputs[index].value) valid = false;
        }

        return valid;
    };

    api = () => {
        let data = {};
        switch(this.state.currentObject) {
            case 'marker':
                if(this.validate('[data-marker-required-input]')) {

                    let pureCoordinates = this.state.data;
                    let coordinates = [pureCoordinates.lat, pureCoordinates.lng];

                    data = {
                        coords: coordinates,
                        name: document.getElementById('markerTextArea').value,
                        objectType: 'marker',
                        subjectID: window.sectionId ? window.sectionId : 'no data'
                    };

                    this.ajaxRequest('?ajax_action=new_marker', data);

                    window.markers.push({name: data.name, coords: [pureCoordinates.lat, pureCoordinates.lng]});

                    this.setState({
                        formMarkerVisible: false,
                        allowEdit: false,
                        currentObject: '',
                        currentObjectId: 0,
                        currentLayer: {}
                    });

                    if (typeof this.props.onNewMarker === 'function') {
                        this.props.onNewMarker(this.state.currentLayer);
                    }
                } else {
                    alert("Необходимо заполнить все поля");
                }

                break;


            case 'area':
                if(this.validate('[data-area-required-input]')) {

                    let pureCoordinates = this.state.data[0];
                    let coordinates = [];

                    for(let idx in pureCoordinates) {
                        let LatLng = pureCoordinates[idx];
                        coordinates.push([LatLng.lat, LatLng.lng])
                    }

                    data = {
                        coords: coordinates,
                        area: document.getElementById('areaPropArea').value,
                        price: document.getElementById('areaPropPrice').value,
                        areaNumber: document.getElementById('areaPropNumber').value,
                        length: document.getElementById('areaPropLength').value,
                        width: document.getElementById('areaPropWidth').value,
                        street: document.getElementById('areaPropStreet').value,
                        houseNumber: document.getElementById('areaPropHouseNumber').value,
                        cadastral: document.getElementById('areaPropCadastral').value,
                        status: document.getElementById('areaPropStatus').options[document.getElementById('areaPropStatus').selectedIndex].value,
                        gas: document.getElementById('areaPropGas').checked,
                        electricity: document.getElementById('areaPropElectricity').checked,
                        web: document.getElementById('areaPropWeb').checked,
                        road: document.getElementById('areaPropRoad').checked,
                        video: document.getElementById('areaPropVideo').checked,
                        water: document.getElementById('areaPropWater').checked,
                        objectType: 'area',
                        subjectID: window.sectionId ? window.sectionId : 'no data'
                    };

                    this.ajaxRequest('?ajax_action=new_area', data);

                    let coords = [];

                    for (let key in pureCoordinates) {
                        if (!pureCoordinates.hasOwnProperty(key)) continue;

                        let temp = [pureCoordinates[key].lat, pureCoordinates[key].lng];
                        coords.push(temp);
                    }

                    let stus_id = 4,
                        color = "#ea4700";

                    switch (data.status) {
                        case "Свободен":
                            stus_id = 12;
                            color = "#228b22";
                            break;
                        case "Забронирован":
                            stus_id = 3;
                            color = "#e5e838";
                            break;
                    }

                    let areaData = {
                        color: color,
                        coords: coords,
                        data: {
                            stus: data.status,
                            stus_id: stus_id,
                            com: [
                                "gas",
                                "elec"
                            ],
                            cost: "1800000",
                            area: "1400"
                        }
                    };

                    this.setState({
                        formAreaVisible: false,
                        allowEdit: false,
                        currentObject: '',
                        currentObjectId: 0,
                        currentLayer: {}
                    });

                    if (typeof this.props.onNewArea === 'function') {
                        this.props.onNewArea(this.state.currentLayer, areaData);
                    }
                } else {
                    alert("Необходимо заполнить все поля");
                }

                break;


            case 'district':
                if(this.validate('[data-district-required-input]')) {
                    let pureCoordinates = this.state.districtCoords.slice();
                    let coordinates = [];

                    for(let index in pureCoordinates) {
                        let districtPart = [];
                        for(let idx in pureCoordinates[index]) {
                            let LatLng = pureCoordinates[index][idx];
                            districtPart.push([LatLng.lng, LatLng.lat])
                        }
                        coordinates.push(districtPart);
                    }

                    data = {
                        coords: coordinates,
                        name: document.getElementById('districtPropName').value,
                        color: document.getElementById('districtPropColor').value,
                        objectType: 'district',
                        subjectID: window.sectionId ? window.sectionId : 'no data'
                    };

                    this.ajaxRequest('?ajax_action=new_district', data);

                    window.markers.push({name: data.name, coords: [data.coords.lat, data.coords.lng]});

                    if (typeof this.props.removeDistrictDraws === 'function'){
                        for(let index in this.state.currentLayers) {
                            this.props.removeDistrictDraws(this.state.currentLayers[index]);
                        }
                    }

                    if (typeof this.props.onNewDistrict === 'function'){
                        this.props.onNewDistrict(data);
                    }

                    this.setState({
                        formDistrictVisible: false,
                        allowEdit: false,
                        currentObject: '',
                        currentObjectId: 0,
                        currentLayers: [],
                        districtCoords: []
                    });
                } else {
                    alert("Необходимо заполнить все поля");
                }
                break;
        }
    };


    render() {
        const {drawPanel, drawSwitcher, drawAcceptButton, markerForm, areaForm, districtForm} = this;
        return (
            <FeatureGroup>
                {markerForm()}
                {areaForm()}
                {districtForm()}

                {drawAcceptButton()}

                {drawPanel()}

                {drawSwitcher()}
            </FeatureGroup>
        )
    }
}