import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Aux from '../../hoc/_Aux'
import { connect } from 'react-redux'

import { fetchUser } from '../../redux/actions/users/getUsers'

import UserDataTable from './UserDataTable'

class User extends React.Component {
    
    componentWillMount = () => {
        this.props.fetchUser()
    }

    render(){
        const { users } = this.props
        return(
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Data Pasien</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <UserDataTable data={users} active />
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
    }
}

export default connect(mapStateToProps, {fetchUser})(User)