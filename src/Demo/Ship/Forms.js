import React from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import cookie from 'react-cookies'

class ShipForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            type: this.props.type,
            isLoading: this.props.isLoading,
            name: this.props.defaultName,
            mass: this.props.defaultMass,
            wt: this.props.defaultWt,
            ie: this.props.defaultIe,
            sfoc: this.props.defaultSfoc,
            cstern: this.props.defaultCstern,
            csternOptions: this.props.csternOptions,
            fuel: this.props.defaultFuel,
            fuelOptions: this.props.fuelOptions,
            user: this.props.defaultUser,
            userOptions: this.props.userOptions,
            company: this.props.defaultCompany,
            companyOptions: this.props.companyOptions
        }
    }

    handleChangeName = (e) => {
        const value = e.target.value

        this.setState({name: value})
        this.props.name(value)
    }

    handleChangeMass = (e) => {
        const value = e.target.value

        this.setState({mass: value})
        this.props.mass(value)
    }

    handleChangeWt = (e) => {
        const value = e.target.value

        this.setState({wt: value})
        this.props.wt(value)
    }

    handleChangeIe = (e) => {
        const value = e.target.value

        this.setState({ie: value})
        this.props.ie(value)
    }

    handleChangeSfoc = (e) => {
        const value = e.target.value

        this.setState({sfoc: value})
        this.props.sfoc(value)
    }

    handleChangeCstern = (cstern) => {
        this.setState({cstern})
        this.props.cstern(cstern)
    }

    handleChangeFuel = (fuel) => {
        this.setState({fuel})
        this.props.fuel(fuel)
    }

    handleChangeUser = (user) => {
        this.setState({user})
        this.props.user(user)
    }

    handleChangeCompany = (company) => {
        this.setState({company})
        this.props.company(company)
    }

    checkForm = () => {
        const { name, mass, wt, ie, sfoc, cstern, fuel, user, company } = this.state
        
        if(
            (name !== "" && name !== null && name !== undefined) &&
            (mass !== "" && mass !== null && mass !== undefined) &&
            (wt !== "" && wt !== null && wt !== undefined) &&
            (ie !== "" && ie !== null && ie !== undefined) &&
            (sfoc !== "" && sfoc !== null && sfoc !== undefined) &&
            (cstern !== null && cstern !== undefined) &&
            (fuel !== null && fuel !== undefined) &&
            (user !== null && user !== undefined) &&
            (company !== null && company !== undefined)
        ){
            return false
        } else {
            return true
        }
    }

    checkEmpty = () => {
        const { type, name, mass, wt, ie, sfoc, cstern, fuel, user, company } = this.state
        const { toggleCloseConfirm, toggleCloseAdd, toggleCloseEdit, toggleCloseDelete } = this.props

        if(type == "add"){
            if(name != "" || mass != "" || wt != "" || ie != "" || sfoc != "" || cstern != null || fuel != null || user != null || company != null){
                toggleCloseConfirm()
            } else {
                toggleCloseAdd()
            }
        } else if(type == "edit"){
            if(name != "" || mass != "" || wt != "" || ie != "" || sfoc != "" || cstern != null || fuel != null || user != null || company != null){
                toggleCloseConfirm()
            } else {
                toggleCloseEdit()
            }
        } else if(type == "delete"){
            toggleCloseDelete()
        }
    }

    render(){
        const { type, isLoading, name, mass, wt, ie, sfoc, cstern, csternOptions, fuel, fuelOptions, 
                user, userOptions, company, companyOptions } = this.state
        const { toggleOpenConfirm } = this.props

        return(
            <div>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Ship Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={this.handleChangeName} value={name} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="mass">
                        <Form.Label>Mass Displacement</Form.Label>
                        <Form.Control type="number" placeholder="Mass in Kg" step="any" onChange={this.handleChangeMass} value={mass} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="wt">
                        <Form.Label>WT</Form.Label>
                        <Form.Control type="number" placeholder="WT" step="any" onChange={this.handleChangeWt} value={wt} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="ie">
                        <Form.Label>IE</Form.Label>
                        <Form.Control type="number" placeholder="IE" step="any" onChange={this.handleChangeIe} value={ie} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="sfoc">
                        <Form.Label>SFOC</Form.Label>
                        <Form.Control type="number" placeholder="SFOC" step="any" onChange={this.handleChangeSfoc} value={sfoc} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="cstern">
                        <Form.Label>Cstern</Form.Label>
                        <Row>
                            {
                                csternOptions.map((item, index) => 
                                <Col>
                                    <Form.Check type={"radio"} checked={cstern?.value == item.value} onChange={() => this.handleChangeCstern(item)} disabled={type != "add" && type != "edit" ? true : false || isLoading} />
                                    <div>
                                        <Row>
                                            <Col>
                                                <img src={require(`../../assets/images/cstern/${item.image_path}`)} width={100} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {item.label}
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                )
                            }
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="fuel">
                        <Form.Label>Fuel Type</Form.Label>
                        <Select options={fuelOptions} onChange={this.handleChangeFuel} value={fuel} placeholder="Fuel Type" isDisabled={type != "add" && type != "edit" ? true : false } isClearable autoComplete="off" />
                    </Form.Group>

                    <Form.Group controlId="company">
                        <Form.Label>Company</Form.Label>
                        <Select options={companyOptions} onChange={this.handleChangeCompany} value={company} placeholder="Company" isDisabled={(type != "add" && type != "edit" ? true : false) || cookie.load('roleId') < 1 ? true : false } isClearable autoComplete="off" />
                    </Form.Group>
                    
                    <Form.Group controlId="operator">
                        <Form.Label>Operator</Form.Label>
                        <Select options={userOptions} onChange={this.handleChangeUser} value={user} placeholder="Operator" isDisabled={type != "add" && type != "edit" ? true : false} isClearable autoComplete="off" />
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

export default ShipForm