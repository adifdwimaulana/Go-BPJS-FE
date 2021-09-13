import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Aux from '../../hoc/_Aux'
import { connect } from 'react-redux'

import { fetchUser } from '../../redux/actions/users/getUsers'
import { fetchCompany } from '../../redux/actions/companies/getCompanies'
import { fetchShip } from '../../redux/actions/ship/getShip'
import { fetchFuel } from '../../redux/actions/fuel/getFuel'
import { fetchCstern } from '../../redux/actions/cstern/getCstern'

import ShipDataTable from './ShipDataTable'

class Ship extends React.Component {

    componentWillMount = () => {
        this.props.fetchUser({role_id: 2})
        this.props.fetchCompany()
        this.props.fetchShip()
        this.props.fetchFuel()
        this.props.fetchCstern()
    }

    render(){
        const { ships } = this.props
        return(
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Management Ship</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <ShipDataTable data={ships} active />
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
        users: state.userStore.users,
        usersOptions: state.userStore.usersOptions,
        usersCount: state.userStore.usersCount,
        userProgress: state.userStore.inProgress,

        companies: state.companyStore.companies,
        companiesOptions: state.companyStore.companiesOptions,
        companiesCount: state.companyStore.companiesCount,
        companyProgress: state.companyStore.inProgress,

        ships: state.shipStore.ships,
        shipsOptions: state.shipStore.shipsOptions,
        shipsCount: state.shipStore.shipsCount,
        shipProgress: state.shipStore.inProgress,

        csterns: state.csternStore.csterns,
        csternsOptions: state.csternStore.csternsOptions,
        csternProgress: state.csternStore.inProgress,

        fuels: state.fuelStore.fuels,
        fuelsOptions: state.fuelStore.fuelsOptions,
        fuelProgress: state.fuelStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchUser, fetchCompany, fetchShip, fetchFuel, fetchCstern})(Ship)