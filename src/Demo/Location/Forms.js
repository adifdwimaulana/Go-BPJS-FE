import React from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import cookie from 'react-cookies'
import moment from 'moment'

class LocationForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            type: this.props.type,
            isLoading: this.props.isLoading,
            latitude: this.props.defaultLatitude,
            longitude: this.props.defaultLongitude,
            time: this.props.defaultTime
        }
    }

    handleChangeLatitude = (e) => {
        const value = e.target.value

        this.setState({latitude: value})
        this.props.latitude(value)
    }

    handleChangeLongitude = (e) => {
        const value = e.target.value

        this.setState({longitude: value})
        this.props.longitude(value)
    }

    handleChangeTime = (e) => {
        const value = e.target.value

        this.setState({time: value})
        this.props.time(value)
    }

    checkForm = () => {
        const { latitude, longitude, time } = this.state

        if(
            (latitude !== "" && latitude !== null && latitude !== undefined) &&
            (longitude !== "" && longitude !== null && longitude !== undefined) &&
            (time !== "" && time !== null && time !== undefined)
        ){
            return false
        } else {
            return true
        }
    }

    checkEmpty = () => {
        const { type, latitude, longitude, time } = this.state
        const { toggleCloseConfirm, toggleCloseAdd, toggleCloseEdit, toggleCloseDelete } = this.props

        if(type == "add"){
            if(latitude != null || longitude != null || time != null){
                toggleCloseConfirm()
            } else {
                toggleCloseAdd()
            }
        } else if(type == "edit"){
            if(latitude != null || longitude != null || time != null){
                toggleCloseConfirm()
            } else {
                toggleCloseEdit()
            }
        } else if(type == "delete"){
            toggleCloseDelete()
        }
    }

    render(){
        const { type, isLoading, latitude, longitude, time } = this.state
        const { toggleOpenConfirm } = this.props

        return(
            <div>
                <Form>
                    <Form.Group controlId="time">
                        <Form.Label>Time Stamp</Form.Label>
                        <Form.Control type="datetime-local" placeholder="Time Stamp" onChange={this.handleChangeTime} value={moment(time).format('YYYY-MM-DDTHH:mm')} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="latitude">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control type="number" placeholder="Latitude" step="any" onChange={this.handleChangeLatitude} value={latitude} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="longitude">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="number" placeholder="Longitude" step="any" onChange={this.handleChangeLongitude} value={longitude} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>
                </Form>

                <Form.Text className="text-danger">
                    { this.checkForm() ? "Please fill out all required fields!" : null }
                </Form.Text>

                <div className="mt-4 float-right">
                    <Button variant="secondary" size="sm" onClick={this.checkEmpty}>
                        Close
                    </Button>
                    {
                        type == "delete" ?
                        <Button variant="danger" size="sm" onClick={toggleOpenConfirm} disabled={isLoading || this.checkForm()}>
                            Delete
                        </Button> :        
                        type == "accept" ?
                        <Button variant="success" size="sm" onClick={toggleOpenConfirm} disabled={isLoading || this.checkForm()}>
                            Accept
                        </Button> :
                        type == "reject" ?
                        <Button variant="danger" size="sm" onClick={toggleOpenConfirm} disabled={isLoading || this.checkForm()}>
                            Reject
                        </Button> :
                        <Button variant="success" size="sm" onClick={toggleOpenConfirm} disabled={isLoading || this.checkForm()}>
                            Submit
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

export default LocationForm