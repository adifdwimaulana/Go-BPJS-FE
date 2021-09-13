import { extend } from 'jquery'
import React from 'react'
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap'
import Aux from '../../hoc/_Aux'

class RestrictedPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            modal: true
        }
    }

    render(){
        const { modal } = this.state
        return(
            <Aux>
                <Modal show={modal} onHide={() => this.props.history.goBack()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Restricted</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You are not authorized for this page!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" size="sm" onClick={() => this.props.history.goBack()}>
                            Go Back
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Aux>
        )
    }
}

export default RestrictedPage