import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Aux from '../../hoc/_Aux'
import { connect } from 'react-redux'

import { fetchCompany } from '../../redux/actions/companies/getCompanies'
import { fetchShip } from '../../redux/actions/ship/getShip'
import { fetchVoyage } from '../../redux/actions/voyages/getVoyages'
import { fetchLocation } from '../../redux/actions/locations/getLocations'

import VoyageDataTable from './VoyageDataTable'

class Voyage extends React.Component {

    componentWillMount = () => {
        this.props.fetchCompany()
        this.props.fetchShip()
        this.props.fetchVoyage()
    }

    render(){
        const { voyages } = this.props

        return(
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Management Voyage</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <VoyageDataTable data={voyages} active />
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
        companies: state.companyStore.companies,
        companiesOptions: state.companyStore.companiesOptions,
        companiesCount: state.companyStore.companiesCount,
        companyProgress: state.companyStore.inProgress,

        ships: state.shipStore.ships,
        shipsOptions: state.shipStore.shipsOptions,
        shipsCount: state.shipStore.shipsCount,
        shipProgress: state.shipStore.inProgress,

        voyages: state.voyageStore.voyages,
        voyageProgress: state.voyageStore.inProgress,

        locations: state.locationStore.locations,
        locationProgress: state.locationStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchCompany, fetchShip, fetchVoyage, fetchLocation})(Voyage)