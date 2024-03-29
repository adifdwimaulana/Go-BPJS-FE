import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Aux from '../../hoc/_Aux'
import { connect } from 'react-redux'

import { fetchRequest } from '../../redux/actions/request/getRequest'

import RequestDataTable from './RequestDataTable'

class Request extends React.Component {
  componentWillMount = () => {
    this.props.fetchRequest()
  }

  render(){
    const { requests, requestProgress } = this.props
    return(
      <Aux>
          <Row>
              <Col md={12} xl={12}>
                  <Card className='Recent-Users'>
                      <Card.Header>
                          <Card.Title as='h5'>Data Pemeriksaan</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <RequestDataTable data={requests} />
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
      requestProgress: state.requestStore.inProgress,
  }
}

export default connect(mapStateToProps, {fetchRequest})(Request)