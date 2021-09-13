import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Aux from '../../hoc/_Aux'
import { connect } from 'react-redux'

import { fetchLocation } from '../../redux/actions/locations/getLocations'
import { fetchReport } from '../../redux/actions/report/getReport'
import { fetchRectangle } from '../../redux/actions/locations/getRectangle'

import cookie from 'react-cookies'

import LocationDataTable from './LocationDataTable'
import Map from './Map'

class Location extends React.Component {

    componentWillMount = () => {
        this.props.fetchReport({voyage_id: this.props.match.params.id})
    }

    componentWillUnmount = () => {
        cookie.remove('voyage_type')
    }
    
    render(){
        const { locations } = this.props
        
        return(
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>{cookie.load('voyage_type') == 'emission' ? 'Emission Detail' : 'Fuel Consumed Detail'}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <LocationDataTable data={locations} params={this.props.match.params} active />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state.locationStore.locations,
        locationProgress: state.locationStore.inProgress,

        integration: state.reportStore.integration,
        holtrop: state.reportStore.holtrop,
        stwave: state.reportStore.stwave,
        foc: state.reportStore.foc,
        report: state.reportStore.report,
        average: state.reportStore.average,
        reportProgress: state.reportStore.inProgress,

        rectangles: state.rectangleStore.rectangles,
        rectangleProgress: state.rectangleStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchLocation, fetchReport, fetchRectangle})(Location)