import React from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import Select from 'react-select'

class UserForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            type: this.props.type,
            isLoading: this.props.isLoading,
            name: this.props.defaultName,
            email: this.props.defaultEmail,
            role: this.props.defaultRole,
            company: this.props.defaultCompany
        }
    }

    handleChangeName = (e) => {
        const value = e.target.value

        this.setState({name: value})
        this.props.name(value)
    }

    handleChangeEmail = (e) => {
        const value = e.target.value

        this.setState({email: value})
        this.props.email(value)
    }

    handleChangeRole = (role) => {
        this.setState({role})
        this.props.role(role)
    }

    handleChangeCompany = (company) => {
        this.setState({company})
        this.props.company(company)
    }

    checkForm = () => {
        const { name, email, role, company } = this.state

        if(
            (name !== "" && name !== null && name !== undefined) &&
            (email !== "" && email !== null && email !== undefined) &&
            (role !== null && role !== undefined) &&
            (company !== null && company !== undefined)        
        ){
            return false
        } else {
            return true
        }
    }

    checkEmpty = () => {
        const { type, name, email, role, company } = this.state
        const { toggleCloseConfirm, toggleCloseAdd, toggleCloseEdit, toggleCloseDelete } = this.props

        if(type == "add"){
            if(name != "" || email != "" || role != null || company != null){
                toggleCloseConfirm()
            } else {
                toggleCloseAdd()
            }
        } else if(type == "edit") {
            if(name != "" || email != "" || role != null || company != null){
                toggleCloseConfirm()
            } else {
                toggleCloseEdit()
            }
        } else if(type == "delete") {
            toggleCloseDelete()
        }
    }

    render(){
        const { type, name, email, role, company, isLoading } = this.state
        const { toggleOpenConfirm, rolesOptions, companiesOptions } = this.props

        return(
            <div>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={this.handleChangeName} value={name} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email@example.com" onChange={this.handleChangeEmail} value={email} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Select options={rolesOptions} onChange={this.handleChangeRole} value={role} placeholder="Role" isDisabled={type != "add" && type != "edit" ? true : false} isClearable autoComplete="off" />
                    </Form.Group>

                    <Form.Group controlId="company">
                        <Form.Label>Company</Form.Label>
                        <Select options={companiesOptions} onChange={this.handleChangeCompany} value={company} placeholder="Company" isDisabled={type != "add" && type != "edit" ? true : false} isClearable autoComplete="off" />
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

export default UserForm