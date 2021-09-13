import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import { BarLoader } from 'react-spinners'
import { connect } from 'react-redux'
import cookie from 'react-cookies'
import Aux from "../../../hoc/_Aux";

import { fetchLogout } from '../../../redux/actions/users/auth'

class Logout extends React.Component {
    constructor(props){
        super(props)

        this.state = { 
            modal: true,
         }
    }

    toggleClose = () => {
        this.props.history.goBack()
    }

    handleLogout = () => {
        this.props.fetchLogout()
        this.props.history.push('/login')
    }

    render () {
        const { modal } = this.state
        const { authData, isAuthenticated, loginProgress } = this.props
        return(
            <Aux>
                {
                    loginProgress == true ? <center><BarLoader color={'#123abc'} loading={loginProgress} /></center> :
                    <Modal show={modal} onHide={this.toggleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Logout</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure want to logout ?</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" size="sm" onClick={this.toggleClose}>
                            No
                        </Button>
                        <Button variant="danger" size="sm" onClick={this.handleLogout}>
                            Yes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        authData: state.loginStore.authData,
        isAuthenticated: state.loginStore.isAuthenticated,
        loginProgress: state.loginStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchLogout})(Logout);