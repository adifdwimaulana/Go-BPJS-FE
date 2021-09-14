import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Aux from '../../hoc/_Aux'
import { connect } from 'react-redux'

import { fetchRequest } from '../../redux/actions/request/getRequest'
import ReqMedDataTable from './ReqMedDataTable'

class RequestMedicine extends React.Component {
    
    componentWillMount = () => {
        this.props.fetchRequest()
    }

    render(){
        const { requests } = this.props
        console.log(requests)
        return(
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Data Permintaan Obat</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <ReqMedDataTable data={requests} active />
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
        requests: state.requestStore.requests,
        requestOptions: state.requestStore.requestOption,
        requestCount: state.requestStore.requestCount,
        requestProgress: state.requestStore.inProgress,
    }
}

export default connect(mapStateToProps, {fetchRequest})(RequestMedicine)