import React from 'react';
import {Row, Col, Card, Button} from 'react-bootstrap';
import { MapContainer, TileLayer, Popup, Polyline, Polygon, LayerGroup, FeatureGroup, Marker } from 'react-leaflet'
import { BeatLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import moment from 'moment'
import cookie from 'react-cookies'
import axios from 'axios'
import * as API_LINKS from '../../config/links'

import { fetchLocation } from '../../redux/actions/locations/getLocations'
import { fetchReport } from '../../redux/actions/report/getReport'
import { fetchRectangle } from '../../redux/actions/locations/getRectangle'

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import reactWindowSize from 'react-window-size';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

let colorOptions = ['green', 'blue', 'yellow', 'red', 'purple', 'black', 'lime', 'cyan', 'red', 'yellow', 'green', 'blue']
let colorLines = ['red', 'blue', 'yellow', 'green', 'purple', 'black', 'lime', 'cyan', 'red', 'yellow', 'green', 'blue']


class Map extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            center: [-7.186433333, 112.6959833],
            zoom: 9
        }
    }

    render(){
        const { locationProgress, reportProgress, rectangleProgress, data, locations, lines, rectangles } = this.props
        const { center } = this.state

        return(
            <div>
                {
                    locationProgress || reportProgress || rectangleProgress ? <center><BeatLoader color={'#1de9b6'} loading={locationProgress || reportProgress || rectangleProgress} /><br /> Loading.... Please wait...</center> : 
                    <MapContainer center={center} zoom={8} scrollWheelZoom={false} style={{height: 430, width: 'auto'}}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            maxZoom={14}
                        />
                        {
                            cookie.load('roleId') < 1 ?
                            rectangles.map((rectangle, index) =>
                                <Polygon positions={rectangle.coordinate} pathOptions={{color: colorOptions[index]}} />
                            ) : null
                        }

                        {
                            lines  ?
                            lines.map((line, index) => 
                               <Polyline 
                                    positions={line} color={colorLines[index]}
                                />
                            ) : null
                        }

                        {
                            locations.map((location, index) =>
                                location.length > 0 ?
                                <Marker position={[location[location.length - 1]?.latitude, location[location.length - 1]?.longitude]}>
                                    <Popup>
                                        Date: {moment(location[location.length - 1]?.time_stamp).format('DD-MM-YYYY HH:mm')} <br /> 
                                        Lat: {location[location.length - 1]?.latitude} <br />
                                        Long: {location[location.length - 1]?.longitude} <br />
                                        Ship: {location[location.length - 1]?.['voyage.ship.name']}
                                    </Popup>
                                </Marker> : null
                            )
                        }

                    </MapContainer>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state.locationStore.locations,
        lines: state.locationStore.lines,
        locationProgress: state.locationStore.inProgress,

        rectangles: state.rectangleStore.rectangles,
        rectangleProgress: state.rectangleStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchLocation, fetchReport, fetchRectangle})(Map)