import React from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import cookie from 'react-cookies'
import moment from 'moment'

class VoyageForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            type: this.props.type,
            isLoading: this.props.isLoading,
            start: this.props.defaultStart,
            end: this.props.defaultEnd,
            length: this.props.defaultLength,
            breadth: this.props.defaultBreadth,
            draft: this.props.defaultDraft,
            dwt: this.props.defaultDwt,
            mass: this.props.defaultMass,
            route: this.props.defaultRoute,
            routeOptions: this.props.routeOptions,
            ship: this.props.defaultShip,
            ships: this.props.ships,
            shipsOptions: this.props.shipsOptions,
            company: this.props.defaultCompany,
            companiesOptions: this.props.companiesOptions
        }
    }

    handleChangeStart = (e) => {
        const value = e.target.value
        console.log(value)

        this.setState({start: value})
        this.props.start(value)
    }

    handleChangeEnd = (e) => {
        const value = e.target.value

        this.setState({end: value})
        this.props.end(value)
    }

    handleChangeLength = (e) => {
        const value = e.target.value

        this.setState({length: value})
        this.props.length(value)
    }

    handleChangeBreadth = (e) => {
        const value = e.target.value

        this.setState({breadth: value})
        this.props.breadth(value)
    }

    handleChangeDraft = (e) => {
        const value = e.target.value

        this.setState({draft: value})
        this.props.draft(value)
    }

    handleChangeDwt = (e) => {
        const value = e.target.value

        this.setState({dwt: value})
        this.props.dwt(value)
    }

    handleChangeMass = (e) => {
        const value = e.target.value

        this.setState({mass: value})
        this.props.mass(value)
    }

    handleChangeShip = (ship) => {
        const { ships } = this.state

        let selectedShip = ships.filter(x => x.id == ship.value)
        if(selectedShip.length > 0){
            if(selectedShip[0]?.voyages.length > 0){
                let voyage = selectedShip[0]?.voyages[0]
                this.setState({
                    length: voyage.length,
                    breadth: voyage.breadth,
                    draft: voyage.draft,
                    dwt: voyage.dwt
                })
                this.props.length(voyage.length)
                this.props.breadth(voyage.breadth)
                this.props.draft(voyage.draft)
                this.props.dwt(voyage.dwt)
            }
        }
        
        this.setState({ship})
        this.props.ship(ship)
    }

    handleChangeRoute = (route) => {
        this.setState({route})
        this.props.route(route)
    }

    handleChangeCompany = (company) => {
        this.setState({company})
        this.props.company(company)
    }

    checkForm = () => {
        const { start, end, length, breadth, draft, dwt, mass, ship, route, company } = this.state

        if(
            (start !== "" && start !== null && start !== undefined) &&
            (length !== "" && length !== null && length !== undefined) &&
            (breadth !== "" && breadth !== null && breadth !== undefined) &&
            (draft !== "" && draft !== null && draft !== undefined) &&
            (dwt !== "" && dwt !== null && dwt !== undefined) &&
            (mass !== "" && mass !== null && mass !== undefined) &&
            (ship !== null && ship !== undefined) &&
            (route !== null && route !== undefined)
        ){
            return false
        } else {
            return true
        }
    }

    checkEmpty = () => {
        const { type, start, end, length, breadth, draft, dwt, mass, ship, route, company } = this.state
        const { toggleCloseConfirm, toggleCloseAdd, toggleCloseEdit, toggleCloseDelete } = this.props

        if(type == "add"){
            if(start != "" || end != "" || length != "" || breadth != "" || draft != "" || dwt != "" || mass != "" || ship != null || route != null){
                toggleCloseConfirm()
            } else {
                toggleCloseAdd()
            }
        } else if(type == "edit"){
            if(start != "" || end != "" || length != "" || breadth != "" || draft != "" || dwt != "" || mass != "" || ship != null || route != null){
                toggleCloseConfirm()
            } else {
                toggleCloseEdit()
            }
        } else if(type == "delete"){
            toggleCloseDelete()
        }
    }

    render(){
        const { type, isLoading, start, end, length, breadth, draft, dwt, mass, route, routeOptions, ship, shipsOptions, company, companiesOptions } = this.state
        const { toggleOpenConfirm } = this.props

        return(
            <div>
                <Form>
                    <Form.Group controlId="start">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="datetime-local" step="1" placeholder="Start Date" onChange={this.handleChangeStart} value={moment(start).format('YYYY-MM-DDTHH:mm:ss')} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="ship">
                        <Form.Label>Ship</Form.Label>
                        <Select options={shipsOptions} onChange={this.handleChangeShip} value={ship} placeholder="Ship" isDisabled={type != "add" && type != "edit" ? true : false } isClearable autoComplete="off" />
                    </Form.Group>

                    {
                        type == "add" ?
                        <Form.Group controlId="route">
                            <Form.Label>Route</Form.Label>
                            <Select options={routeOptions} onChange={this.handleChangeRoute} value={route} placeholder="Route" isDisabled={type != "add" && type != "edit" ? true : false } isClearable autoComplete="off" />
                        </Form.Group> : null
                    }

                    <Form.Group controlId="length">
                        <Form.Label>Length</Form.Label>
                        <Form.Control type="number" placeholder="Length" step="any" onChange={this.handleChangeLength} value={length} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="breadth">
                        <Form.Label>Breadth</Form.Label>
                        <Form.Control type="number" placeholder="Breadth" step="any" onChange={this.handleChangeBreadth} value={breadth} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="draft">
                        <Form.Label>Draft</Form.Label>
                        <Form.Control type="number" placeholder="Draft" step="any" onChange={this.handleChangeDraft} value={draft} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="dwt">
                        <Form.Label>DWT</Form.Label>
                        <Form.Control type="number" placeholder="Draft" step="any" onChange={this.handleChangeDwt} value={dwt} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="mass">
                        <Form.Label>Cargo Mass (ton)</Form.Label>
                        <Form.Control type="number" placeholder="Cargo Mass" step="any" onChange={this.handleChangeMass} value={mass} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
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

export default VoyageForm