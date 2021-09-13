import React from 'react'
import { Row, Col, Card, Table, Button, Modal } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners'

class Confirmation extends React.Component {

    render(){
        const { confirm, message, isLoading, action, toggleOpenConfirm, toggleCloseConfirm, status } = this.props
        return(
            <Modal show={confirm} onHide={toggleCloseConfirm}>
                <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="12">
                            <h6 className="text-muted">{message}</h6>
                        </Col>
                    </Row><br />
                    {
                        isLoading ? <center><BeatLoader color={'#1de9b6'} loading={isLoading} /><br /> Loading.... Please wait...</center> :
                        <div>
                            <Button className="mr-2" onClick={() => action()} size="sm" variant={status === 'positive' ? "success" : "danger"} disabled={isLoading}>Yes</Button>
                            <Button onClick={() => toggleCloseConfirm()} size="sm" variant="secondary" disabled={isLoading}>No</Button>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

export default Confirmation