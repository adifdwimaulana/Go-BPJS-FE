import React from 'react'
import { Button, Modal, Card } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Aux from '../../hoc/_Aux'
import { BeatLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import cookie from 'react-cookies'
import axios from 'axios'
import * as API_LINKS from '../../config/links'

import { fetchUser } from '../../redux/actions/users/getUsers'
import { fetchCompany } from '../../redux/actions/companies/getCompanies'
import { fetchShip } from '../../redux/actions/ship/getShip'
import { fetchFuel } from '../../redux/actions/fuel/getFuel'
import { fetchCstern } from '../../redux/actions/cstern/getCstern'

import Confirmation from '../Widgets/Confirmation'
import ShipForm from './Forms'

class ShipDataTable extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            mass: 0,
            wt: 0,
            ie: 0,
            sfoc: 0,
            cstern: null,
            fuel: null,
            user: null,
            company: null
        }
    }

    toggleOpenAdd = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    toggleCloseAdd = () => {
        this.setState({
            name: '',
            mass: 0,
            wt: 0,
            ie: 0,
            sfoc: 0,
            cstern: null,
            fuel: null,
            user: null,
            company: null,
            confirm: false,
            modalAdd: !this.state.modalAdd
        })
    }

    toggleOpenEdit = (row) => {
        this.setState({
            id: row.id,
            name: row.name,
            mass: row.mass_displacement,
            wt: row.wt,
            ie: row.ie,
            sfoc: row.sfoc,
            cstern: {label: row.cstern.value, value: row.cstern.id, image_path: row.cstern.image_path},
            fuel: {label: `${row.fuel.name} (${row.fuel.value})`, value: row.fuel.id},
            user: {label: row.user.name, value: row.user.id},
            company: {label: row.company.name, value: row.company.id},
            modalEdit: !this.state.modalEdit
        })
    }

    toggleCloseEdit = () => {
        this.setState({
            id: null,
            name: '',
            mass: 0,
            wt: 0,
            ie: 0,
            sfoc: 0,
            cstern: null,
            fuel: null,
            user: null,
            company: null,
            confirm: false,
            modalEdit: !this.state.modalEdit
        })
    }

    toggleOpenDelete = (row) => {
        this.setState({
            id: row.id,
            name: row.name,
            mass: row.mass_displacement,
            wt: row.wt,
            ie: row.ie,
            sfoc: row.sfoc,
            cstern: {label: row.cstern.value, value: row.cstern.id, image_path: row.cstern.image_path},
            fuel: {label: `${row.fuel.name} (${row.fuel.value})`, value: row.fuel.id},
            user: {label: row.user.name, value: row.user.id},
            company: {label: row.company.name, value: row.company.id},
            modalDelete: !this.state.modalDelete
        })
    }

    toggleCloseDelete = () => {
        this.setState({
            id: null,
            name: '',
            mass: 0,
            wt: 0,
            ie: 0,
            sfoc: 0,
            cstern: null,
            fuel: null,
            user: null,
            company: null,
            confirm: false,
            modalDelete: !this.state.modalDelete
        })
    }

    numericSortFunc = (a,b,order) => {
        if (order === 'desc'){
            return Number(b.no) - Number(a.no)
        } else {
            return Number(a.no) - Number(b.no)
        }
    }

    csternFormatter = (cell, row) => {
        return cell.value
    }

    fuelFormatter = (cell, row) => {
        return cell.name
    }

    operatorFormatter = (cell, row) => {
        return cell.name
    }

    lengthFormatter = (cell, row) => {
        if(cell?.length > 0){
            return cell[0]?.length
        } else {
            return '-'
        }
    }

    breadthFormatter = (cell, row) => {
        if(cell?.length > 0){
            return cell[0]?.breadth
        } else {
            return '-'
        }
    }

    draftFormatter = (cell, row) => {
        if(cell?.length > 0){
            return cell[0]?.draft
        } else {
            return '-'
        }
    }

    dwtFormatter = (cell, row) => {
        if(cell?.length > 0){
            return cell[0]?.dwt
        } else {
            return '-'
        }
    }

    actionFormatter = (cell, row) => {
        const { active } = this.props
        return(
            <div>
                {
                    cookie.load('roleId') < 2 ?
                    <div>
                        <Button onClick={() => this.toggleOpenEdit(row)} size="sm" variant="success"><i className="fa fa-pencil"></i>Edit</Button>
                        <Button onClick={() => this.toggleOpenDelete(row)} size="sm" variant="danger"><i className="fa fa-trash"></i>Delete</Button>
                    </div> : '-'
                }
            </div>
        )
    }

    viewFormatter = (cell, row) => {
        return(
            <div>
                <Button onClick={() => this.toggleOpenEdit(row)} size="sm" variant="primary"><i className="fa fa-eye"></i>View Detail</Button>
            </div>
        )
    }

    customBtnGroup = (props) => {
        return(
            <div>
                {
                    cookie.load('roleId') < 2 ? <Button onClick={() => this.toggleOpenAdd()} variant="primary"><i className="fa fa-plus"></i>&nbsp;Add New Ship</Button> : null
                }
                { props.exportCSVBtn }
            </div>
        )
    }

    expandableRow = (row) => {
        return false
    }

    expandComponent = (row) => {
        const voyages = [
            {
                id: 1,
                no: 1,
                cargo_mass: '20 Ton',
                cargo_unit: 5,
                start_date: '13-05-2021',
                end_date: '28-05-2021'
            },
            {
                id: 2,
                no: 2,
                cargo_mass: '50 Ton',
                cargo_unit: 20,
                start_date: '10-06-2021',
                end_date: '-'
            }
        ]
        const options = {
            sortName: 'no',
            sizePerPageList: [{
                text: '10', value: 10
            },{
                text: '20', value: 20
            },{
                text: '30', value: 30
            }],
            sizePerPage: 30,
            // btnGroup: this.customBtnGroup,
            expandBy: 'column',
            noDataText: 'No data(s) found. Please check or input a new company',
        }
        return(
            <Card>
                <Card.Header>
                    <Card.Title as='h5'>Voyage Data {row.ship_number}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <BootstrapTable data={voyages} version="4" striped hover pagination search searchPlaceholder={"Search by name, type, or applicant..."} edit options={options} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={false} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                        <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="5%" searchable={false}>No</TableHeaderColumn>
                        <TableHeaderColumn dataField="start_date" dataSort csvHeader="Start Date" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false}>Start Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="end_date" dataSort csvHeader="End Date" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false}>End Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="cargo_mass" dataSort csvHeader="Cargo Mass" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false}>Cargo Mass</TableHeaderColumn>
                        <TableHeaderColumn dataField="cargo_unit" dataSort csvHeader="Cargo Unit" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false}>Cargo Unit</TableHeaderColumn>
                        <TableHeaderColumn dataAlign="center" dataField='action' export={false} dataFormat={ this.viewFormatter.bind(this) } thStyle={ { whiteSpace: 'normal', width: 300 } } tdStyle={ { whiteSpace: 'normal', width: 300 } } searchable={false} expandable={ false }>Action</TableHeaderColumn>
                    </BootstrapTable>
                </Card.Body>
            </Card>
        )
    }

    showTable = () => {
        const { data } = this.props
        const options = {
            sortName: 'no',
            sizePerPageList: [{
                text: '10', value: 10
            },{
                text: '20', value: 20
            },{
                text: '30', value: 30
            }],
            sizePerPage: 30,
            btnGroup: this.customBtnGroup,
            expandBy: 'column',
            noDataText: 'No ship(s) found. Please check or input a new company',
        }

        const selectRow = {
            // bgColor: '#1de9b6',
            hideSelectColumn: true,
            clickToExpand: false,
        }

        return(
                <BootstrapTable data={data} version="4" striped hover pagination search searchPlaceholder={"Search by name or operaotr..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                    <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="80" searchable={false}>No</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort csvHeader="Ship Number" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={true} width="150">Ship Number</TableHeaderColumn>
                    <TableHeaderColumn dataField="mass_displacement" dataSort csvHeader="Mass Displacement" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="200">Mass Displacement</TableHeaderColumn>
                    <TableHeaderColumn dataField="wt" dataSort csvHeader="WT" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="80">WT</TableHeaderColumn>
                    <TableHeaderColumn dataField="ie" dataSort csvHeader="IE" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="80">IE</TableHeaderColumn>
                    <TableHeaderColumn dataField="sfoc" dataSort csvHeader="SFOC" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="120">SFOC</TableHeaderColumn>
                    <TableHeaderColumn dataField="cstern" dataSort dataFormat={this.csternFormatter.bind(this)} csvHeader="C Stern" csvFormat={this.csternFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="120">C Stern</TableHeaderColumn>
                    <TableHeaderColumn dataField="fuel" dataSort dataFormat={this.fuelFormatter.bind(this)} csvHeader="Fuel Type" csvFormat={this.fuelFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="120">Fuel Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="voyages" dataSort dataFormat={this.lengthFormatter.bind(this)} csvHeader="Length" csvFormat={this.lengthFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="80">L</TableHeaderColumn>
                    <TableHeaderColumn dataField="voyages" dataSort dataFormat={this.breadthFormatter.bind(this)} csvHeader="Bradth" csvFormat={this.breadthFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="80">B</TableHeaderColumn>
                    <TableHeaderColumn dataField="voyages" dataSort dataFormat={this.draftFormatter.bind(this)} csvHeader="Draft" csvFormat={this.draftFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="80">Draft</TableHeaderColumn>
                    <TableHeaderColumn dataField="voyages" dataSort dataFormat={this.dwtFormatter.bind(this)} csvHeader="DWT" csvFormat={this.dwtFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="80">DWT</TableHeaderColumn>
                    <TableHeaderColumn dataField="user" dataSort dataFormat={this.operatorFormatter.bind(this)} csvHeader="Operator" csvFormat={this.operatorFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={true} width="180">Operator</TableHeaderColumn>
                    <TableHeaderColumn dataAlign="center" dataField='action' export={false} dataFormat={ this.actionFormatter.bind(this) } thStyle={ { whiteSpace: 'normal', width: 300 } } tdStyle={ { whiteSpace: 'normal', width: 300 } } searchable={false} expandable={ false }>Action</TableHeaderColumn>
                </BootstrapTable>
        )
    }

    toggleConfirmation = (type, message, isLoading, status) => {
        this.setState({
            confirm: true,
            type,
            message,
            isLoading,
            status
        })
    }

    action = () => {
        const { type } = this.state

        if(type == "submit add"){
            this.handleAdd()
        } else if(type == "discard add"){
            this.toggleCloseAdd()
        } else if(type == "submit edit"){
            this.handleEdit()
        } else if(type == "discard edit"){
            this.toggleCloseEdit()
        } else if(type == "delete"){
            this.handleDelete()
        }
    }

    handleAdd = () => {
        const { name, mass, wt, ie, sfoc, cstern, fuel, user, company } = this.state
        const auth = cookie.load('token')

        if(name === "" || name === null || name === undefined){
            return toast.error("Ship name could not be empty!")
        } else if(mass === "" || mass === null || mass === undefined){
            return toast.error("Mass Displacement could not be empty!")
        } else if(wt === "" || wt === null || wt === undefined){
            return toast.error("WT could not be empty!")
        } else if(ie === "" || ie === null || ie === undefined){
            return toast.error("IE could not be empty!")
        } else if(sfoc === "" || sfoc === null || sfoc === undefined){
            return toast.error("SFOC could not be empty!")
        } else if(cstern === "" || cstern === null || cstern === undefined){
            return toast.error("CStern could not be empty!")
        } else if(fuel === "" || fuel === null || fuel === undefined){
            return toast.error("Fuel could not be empty!")
        } else if(company === "" || company === null || company === undefined){
            return toast.error("Company could not be empty!")
        } else if(user === "" || user === null || user === undefined){
            return toast.error("User could not be empty!")
        } else {
            this.setState({
                isAdding: true,
                isLoading: true
            })

            axios({
                method: 'post',
                url: API_LINKS.SHIP_ADD_URL,
                headers: {
                    Authorization: auth
                },
                data: { 
                    name, 
                    mass_displacement: mass,
                    wt,
                    ie,
                    sfoc,
                    cstern_id: cstern.value,
                    fuel_type_id: fuel.value,
                    company_id: company.value,
                    user_id: user.value
                }
            })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.status === 200){
                        this.setState({
                            isAdding: false,
                            isLoading: false
                        })
                        this.toggleCloseAdd()
                        this.props.fetchUser({role_id: 2})
                        this.props.fetchCompany()
                        this.props.fetchShip()
                        this.props.fetchFuel()
                        this.props.fetchCstern()

                        return toast.success("Ship successfully created!")
                    } else {
                        this.setState({
                            isAdding: false,
                            isLoading: false
                        })
                        return toast.error(response.data.message)
                    }
                }
            })
            .catch((error) => {
                if (error.response) {
                    if(error.response.status === 401) {
                        this.setState({
                            isAdding: false,
                            isLoading: false
                        })
                        return toast.error("Invalid credentials! Please try again!");
                    } else if (error.response.status === 403) {
                        this.setState({
                            isAdding: false,
                            isLoading: false
                        })
                        return toast.error("Unauthorized Access! Please try to logout..");
                    } else if (error.response.status === 400) {
                        this.setState({
                            isAdding: false,
                            isLoading: false
                        })
                        return toast.error(error.response.data.message);
                    } else if (error.response.status === 404 || error.response.status === 500) {
                        this.setState({
                            isAdding: false,
                            isLoading: false
                        })
                        return toast.error("Server cannot be contacted! Please ask your system administrator!");
                    } else {
                        this.setState({
                            isAdding: false,
                            isLoading: false
                        })
                        return toast.error('Something went wrong... Please try again later...')
                    }
                } else if (error.request) {
                    this.setState({
                        isAdding: false,
                        isLoading: false
                    })
                    return toast.error('Request error! Please try again later...')
                } else {
                    this.setState({
                        isAdding: false,
                        isLoading: false
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            })
        }
    }

    handleEdit = () => {
        const { id, name, mass, wt, ie, sfoc, cstern, fuel, user, company } = this.state
        const auth = cookie.load('token')

        if(name === "" || name === null || name === undefined){
            return toast.error("Ship name could not be empty!")
        } else if(mass === "" || mass === null || mass === undefined){
            return toast.error("Mass Displacement could not be empty!")
        } else if(wt === "" || wt === null || wt === undefined){
            return toast.error("WT could not be empty!")
        } else if(ie === "" || ie === null || ie === undefined){
            return toast.error("IE could not be empty!")
        } else if(sfoc === "" || sfoc === null || sfoc === undefined){
            return toast.error("SFOC could not be empty!")
        } else if(cstern === "" || cstern === null || cstern === undefined){
            return toast.error("CStern could not be empty!")
        } else if(fuel === "" || fuel === null || fuel === undefined){
            return toast.error("Fuel could not be empty!")
        } else if(company === "" || company === null || company === undefined){
            return toast.error("Company could not be empty!")
        } else if(user === "" || user === null || user === undefined){
            return toast.error("User could not be empty!")
        } else {
            this.setState({
                isEditing: true,
                isLoading: true
            })

            axios({
                method: 'post',
                url: API_LINKS.SHIP_UPDATE_URL,
                headers: {
                    Authorization: auth
                },
                data: { 
                    id,
                    name, 
                    mass_displacement: mass,
                    wt,
                    ie,
                    sfoc,
                    cstern_id: cstern.value,
                    fuel_type_id: fuel.value,
                    company_id: company.value,
                    user_id: user.value
                }
            })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.status === 200){
                        this.setState({
                            isEditing: false,
                            isLoading: false
                        })
                        this.toggleCloseEdit()
                        this.props.fetchUser({role_id: 2})
                        this.props.fetchCompany()
                        this.props.fetchShip()
                        this.props.fetchFuel()
                        this.props.fetchCstern()

                        return toast.success("Ship successfully edited!")
                    } else {
                        this.setState({
                            isEditing: false,
                            isLoading: false
                        })
                        return toast.error(response.data.message)
                    }
                }
            })
            .catch((error) => {
                if (error.response) {
                    if(error.response.status === 401) {
                        this.setState({
                            isEditing: false,
                            isLoading: false
                        })
                        return toast.error("Invalid credentials! Please try again!");
                    } else if (error.response.status === 403) {
                        this.setState({
                            isEditing: false,
                            isLoading: false
                        })
                        return toast.error("Unauthorized Access! Please try to logout..");
                    } else if (error.response.status === 400) {
                        this.setState({
                            isEditing: false,
                            isLoading: false
                        })
                        return toast.error(error.response.data.message);
                    } else if (error.response.status === 404 || error.response.status === 500) {
                        this.setState({
                            isEditing: false,
                            isLoading: false
                        })
                        return toast.error("Server cannot be contacted! Please ask your system administrator!");
                    } else {
                        this.setState({
                            isEditing: false,
                            isLoading: false
                        })
                        return toast.error('Something went wrong... Please try again later...')
                    }
                } else if (error.request) {
                    this.setState({
                        isEditing: false,
                        isLoading: false
                    })
                    return toast.error('Request error! Please try again later...')
                } else {
                    this.setState({
                        isEditing: false,
                        isLoading: false
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            })
        }
    }

    handleDelete = () => {
        const { id, name, mass, wt, ie, sfoc, cstern, fuel, user, company } = this.state
        const auth = cookie.load('token')

        if(name === "" || name === null || name === undefined){
            return toast.error("Ship name could not be empty!")
        } else if(mass === "" || mass === null || mass === undefined){
            return toast.error("Mass Displacement could not be empty!")
        } else if(wt === "" || wt === null || wt === undefined){
            return toast.error("WT could not be empty!")
        } else if(ie === "" || ie === null || ie === undefined){
            return toast.error("IE could not be empty!")
        } else if(sfoc === "" || sfoc === null || sfoc === undefined){
            return toast.error("SFOC could not be empty!")
        } else if(cstern === "" || cstern === null || cstern === undefined){
            return toast.error("CStern could not be empty!")
        } else if(fuel === "" || fuel === null || fuel === undefined){
            return toast.error("Fuel could not be empty!")
        } else if(company === "" || company === null || company === undefined){
            return toast.error("Company could not be empty!")
        } else if(user === "" || user === null || user === undefined){
            return toast.error("User could not be empty!")
        } else {
            this.setState({
                isDeleting: true,
                isLoading: true
            })

            axios({
                method: 'post',
                url: API_LINKS.SHIP_DELETE_URL,
                headers: {
                    Authorization: auth
                },
                data: { id }
            })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.status === 200){
                        this.setState({
                            isDeleting: false,
                            isLoading: false
                        })
                        this.toggleCloseDelete()
                        this.props.fetchUser({role_id: 2})
                        this.props.fetchCompany()
                        this.props.fetchShip()
                        this.props.fetchFuel()
                        this.props.fetchCstern()

                        return toast.success("Ship successfully deleted!")
                    } else {
                        this.setState({
                            isDeleting: false,
                            isLoading: false
                        })
                        return toast.error(response.data.message)
                    }
                }
            })
            .catch((error) => {
                if (error.response) {
                    if(error.response.status === 401) {
                        this.setState({
                            isDeleting: false,
                            isLoading: false
                        })
                        return toast.error("Invalid credentials! Please try again!");
                    } else if (error.response.status === 403) {
                        this.setState({
                            isDeleting: false,
                            isLoading: false
                        })
                        return toast.error("Unauthorized Access! Please try to logout..");
                    } else if (error.response.status === 400) {
                        this.setState({
                            isDeleting: false,
                            isLoading: false
                        })
                        return toast.error(error.response.data.message);
                    } else if (error.response.status === 404 || error.response.status === 500) {
                        this.setState({
                            isDeleting: false,
                            isLoading: false
                        })
                        return toast.error("Server cannot be contacted! Please ask your system administrator!");
                    } else {
                        this.setState({
                            isDeleting: false,
                            isLoading: false
                        })
                        return toast.error('Something went wrong... Please try again later...')
                    }
                } else if (error.request) {
                    this.setState({
                        isDeleting: false,
                        isLoading: false
                    })
                    return toast.error('Request error! Please try again later...')
                } else {
                    this.setState({
                        isDeleting: false,
                        isLoading: false
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            })
        }
    }

    render(){
        const { userProgress, companyProgress, shipProgress, fuelProgress, csternProgress, csternsOptions, fuelsOptions, usersOptions, companiesOptions } = this.props
        const { modalAdd, isAdding, modalEdit, isEditing, modalDelete, isDeleting,
                id, name, mass, wt, ie, sfoc, cstern, fuel, user, company, confirm, isLoading, message, status } = this.state

        return(
            <div>
                {
                    userProgress || companyProgress || shipProgress || csternProgress || fuelProgress ? <center><BeatLoader color={'#1de9b6'} loading={userProgress || companyProgress || shipProgress || csternProgress || fuelProgress} /><br /> Loading.... Please wait...</center> : this.showTable()
                }

                <Modal show={modalAdd} onHide={this.toggleCloseAdd}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Ship</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ShipForm 
                            type="add"
                            isLoading={isAdding}
                            defaultName=""
                            defaultMass={0}
                            defaultWt={0}
                            defaultIe={0}
                            defaultSfoc={0}
                            defaultCstern={null}
                            csternOptions={csternsOptions}
                            defaultFuel={null}
                            fuelOptions={fuelsOptions}
                            defaultUser={null}
                            userOptions={usersOptions}
                            defaultCompany={null}
                            companyOptions={companiesOptions}

                            name={name => this.setState({name})}
                            mass={mass => this.setState({mass})}
                            wt={wt => this.setState({wt})}
                            ie={ie => this.setState({ie})}
                            sfoc={sfoc => this.setState({sfoc})}
                            cstern={cstern => this.setState({cstern})}
                            fuel={fuel => this.setState({fuel})}
                            user={user => this.setState({user})}
                            company={company => this.setState({company})}
                            toggleOpenConfirm={() => this.toggleConfirmation('submit add', 'Are you sure to continue this action? Please check on the details before adding!', isAdding, 'positive')}
                            toggleCloseConfirm={() => this.toggleConfirmation('discard add', 'Discarding filled forms. Are you sure?', isAdding, 'positive')}
                            toggleCloseAdd={() => this.toggleCloseAdd()}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={modalEdit} onHide={this.toggleCloseEdit}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Ship</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ShipForm 
                            type="edit"
                            isLoading={isEditing}
                            defaultName={name}
                            defaultMass={mass}
                            defaultWt={wt}
                            defaultIe={ie}
                            defaultSfoc={sfoc}
                            defaultCstern={cstern}
                            csternOptions={csternsOptions}
                            defaultFuel={fuel}
                            fuelOptions={fuelsOptions}
                            defaultUser={user}
                            userOptions={usersOptions}
                            defaultCompany={company}
                            companyOptions={companiesOptions}

                            name={name => this.setState({name})}
                            mass={mass => this.setState({mass})}
                            wt={wt => this.setState({wt})}
                            ie={ie => this.setState({ie})}
                            sfoc={sfoc => this.setState({sfoc})}
                            cstern={cstern => this.setState({cstern})}
                            fuel={fuel => this.setState({fuel})}
                            user={user => this.setState({user})}
                            company={company => this.setState({company})}
                            toggleOpenConfirm={() => this.toggleConfirmation('submit edit', 'Editing action will change the ship details! Please proceed carefully!', isEditing, 'positive')}
                            toggleCloseConfirm={() => this.toggleConfirmation('discard edit', 'Discarding edited forms. Are you sure?', isEditing, 'positive')}
                            toggleCloseEdit={() => this.toggleCloseEdit()}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={modalDelete} onHide={this.toggleCloseDelete}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Ship</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ShipForm 
                            type="delete"
                            isLoading={isDeleting}
                            defaultName={name}
                            defaultMass={mass}
                            defaultWt={wt}
                            defaultIe={ie}
                            defaultSfoc={sfoc}
                            defaultCstern={cstern}
                            csternOptions={csternsOptions}
                            defaultFuel={fuel}
                            fuelOptions={fuelsOptions}
                            defaultUser={user}
                            userOptions={usersOptions}
                            defaultCompany={company}
                            companyOptions={companiesOptions}

                            name={name => this.setState({name})}
                            mass={mass => this.setState({mass})}
                            wt={wt => this.setState({wt})}
                            ie={ie => this.setState({ie})}
                            sfoc={sfoc => this.setState({sfoc})}
                            cstern={cstern => this.setState({cstern})}
                            fuel={fuel => this.setState({fuel})}
                            user={user => this.setState({user})}
                            company={company => this.setState({company})}
                            toggleOpenConfirm={() => this.toggleConfirmation('delete', "Are you sure want to delete this ship. Continue?", isDeleting, 'negative')}
                            toggleCloseDelete={() => this.toggleCloseDelete()}
                        />
                    </Modal.Body>
                </Modal>

                <Confirmation 
                    confirm={confirm}
                    message={message}
                    isLoading={isLoading}
                    action={() => this.action()}
                    status={status}
                    toggleOpenConfirm={() => this.setState({confirm: !confirm})}
                    toggleCloseConfirm={() => this.setState({confirm: !confirm, message: null, isLoading: null})}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userStore.users,
        usersOptions: state.userStore.usersOptions,
        usersCount: state.userStore.usersCount,
        userProgress: state.userStore.inProgress,

        companies: state.companyStore.companies,
        companiesOptions: state.companyStore.companiesOptions,
        companiesCount: state.companyStore.companiesCount,
        companyProgress: state.companyStore.inProgress,

        ships: state.shipStore.ships,
        shipsCount: state.shipStore.shipsCount,
        shipProgress: state.shipStore.inProgress,

        csterns: state.csternStore.csterns,
        csternsOptions: state.csternStore.csternsOptions,
        csternProgress: state.csternStore.inProgress,

        fuels: state.fuelStore.fuels,
        fuelsOptions: state.fuelStore.fuelsOptions,
        fuelProgress: state.fuelStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchUser, fetchCompany, fetchShip, fetchCstern, fetchFuel})(ShipDataTable)