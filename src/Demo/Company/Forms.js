import React from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'

class CompanyForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            type: this.props.type,
            isLoading: this.props.isLoading,
            name: this.props.defaultName,
            description: this.props.defaultDescription
        }
    }

    handleChangeName = (e) => {
        const value = e.target.value

        this.setState({name: value})
        this.props.name(value)
    }

    handleChangeDescription = (e) => {
        const value = e.target.value

        this.setState({description: value})
        this.props.description(value)
    }

    checkForm = () => {
        const { name, description } = this.state

        if(
            (name !== "" && name !== null && name !== undefined) &&
            (description !== "" && description !== null && description !== undefined)        
        ){
            return false
        } else {
            return true
        }
    }

    checkEmpty = () => {
        const { type, name, description } = this.state
        const { toggleCloseConfirm, toggleCloseAdd, toggleCloseEdit, toggleCloseDelete } = this.props

        if(type == "add"){
            if(name != "" || description != ""){
                toggleCloseConfirm()
            } else {
                toggleCloseAdd()
            }
        } else if(type == "edit") {
            if(name != "" || description != ""){
                toggleCloseConfirm()
            } else {
                toggleCloseEdit()
            }
        } else if(type == "delete") {
            toggleCloseDelete()
        }
    }

    render(){
        const { type, name, description, isLoading } = this.state
        const { toggleOpenConfirm } = this.props

        return(
            <div>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" placeholder="Company Name" onChange={this.handleChangeName} value={name} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" onChange={this.handleChangeDescription} value={description} disabled={type != "add" && type != "edit" ? true : false || isLoading} autoComplete="off" required />
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
                        <Button variant="success" size="sm" onClick={toggleOpenConfirm} disabled={isLoading || this.checkForm()}>
                            Submit
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

export default CompanyForm