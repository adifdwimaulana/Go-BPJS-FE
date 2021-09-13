import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Aux from '../../hoc/_Aux'
import { connect } from 'react-redux'
import cookie from 'react-cookies'

import { fetchMedicine } from '../../redux/actions/medicine/getMedicine'

import MedicineDataTable from './MedicineDataTable'

class User extends React.Component {
    
    componentWillMount = () => {
        this.props.fetchMedicine({organization_id: cookie.load('organizationId')})
    }

    render(){
        const { medicines } = this.props

        return(
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Data Obat</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <MedicineDataTable data={medicines} />
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
        medicines: state.medicineStore.medicines,
        medicineOptions: state.medicineStore.medicineOptions,
        medicineProgress: state.medicineStore.isLoading
    }
}

export default connect(mapStateToProps, {fetchMedicine})(User)