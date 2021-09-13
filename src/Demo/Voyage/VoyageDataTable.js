import React from 'react'
import { Button, Modal, Card } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/_Aux'
import { BeatLoader } from 'react-spinners'
import { connect } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-toastify'
import cookie from 'react-cookies'
import axios from 'axios'
import * as API_LINKS from '../../config/links'

import { fetchCompany } from '../../redux/actions/companies/getCompanies'
import { fetchShip } from '../../redux/actions/ship/getShip'
import { fetchVoyage } from '../../redux/actions/voyages/getVoyages'
import { fetchLocation } from '../../redux/actions/locations/getLocations'

import Confirmation from '../Widgets/Confirmation'
import VoyageForm from './Forms'

class VoyageDataTable extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            start: new Date(),
            end: new Date(),
            length: 0,
            breadth: 0,
            draft: 0,
            dwt: 0,
            mass: 0,
            ship: null,
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
            start: new Date(),
            end: new Date(),
            length: 0,
            breadth: 0,
            draft: 0,
            dwt: 0,
            mass: 0,
            ship: null,
            route: null,
            company: null,
            confirm: false,
            modalAdd: !this.state.modalAdd
        })
    }

    toggleOpenEdit = (row) => {
        this.setState({
            id: row.id,
            start: row.start_date,
            end: row.end_date,
            length: row.length,
            breadth: row.breadth,
            draft: row.draft,
            dwt: row.dwt,
            mass: row.cargo_mass,
            ship: {label: row.ship.name, value: row.ship.id},
            company: {label: row.company.name, value: row.company.id},
            modalEdit: !this.state.modalEdit
        })
    }

    toggleCloseEdit = () => {
        this.setState({
            start: new Date(),
            end: new Date(),
            length: 0,
            breadth: 0,
            draft: 0,
            dwt: 0,
            mass: 0,
            ship: null,
            company: null,
            confirm: false,
            modalEdit: !this.state.modalEdit
        })
    }

    toggleOpenDelete = (row) => {
        this.setState({
            id: row.id,
            start: row.start_date,
            end: row.end_date,
            length: row.length,
            breadth: row.breadth,
            draft: row.draft,
            dwt: row.dwt,
            mass: row.cargo_mass,
            ship: {label: row.ship.name, value: row.ship.id},
            company: {label: row.company.name, value: row.company.id},
            modalDelete: !this.state.modalDelete
        })
    }

    toggleCloseDelete = () => {
        this.setState({
            start: new Date(),
            end: new Date(),
            length: 0,
            breadth: 0,
            draft: 0,
            dwt: 0,
            mass: 0,
            ship: null,
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

    startFormatter = (cell, row) => {
        return moment(cell).format('DD-MM-YYYY HH:mm:ss')
    }

    endFormatter = (cell, row) => {
        if(cell){
            return moment(cell).format('DD-MM-YYYY HH:mm:ss')
        } else {
            return '-'
        }
    }

    shipFormatter = (cell, row) => {
        return cell.name
    }

    originFormatter = (cell, row) => {
        if(cell == "SBY-BJM"){
            return 'Surabaya'
        } else if(cell == "JKT-SBY"){
            return 'Jakarta'
        } else if(cell == "PERAK-PRIOK"){
            return 'Tj. Perak'
        } else {
            return 'Surabaya'
        }
    }

    destinationFormatter = (cell, row) => {
        if(cell == "SBY-BJM"){
            return 'Banjarmasin'
        } else if(cell == "JKT-SBY"){
            return 'Surabaya'
        } else if(cell == "PERAK-PRIOK"){
            return 'Tj. Priok'
        } else {
            return 'Jakarta'
        }
    }

    actionFormatter = (cell, row) => {
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                    cookie.load('roleId') == 2 && row.ship.user_id == cookie.load('userId') ? 
                    <Button onClick={() => this.handleFinish(row)} size="sm" variant="secondary"><i className="fa fa-check"></i>Finish</Button> : null
                }
                <Link to={`/voyage/${row.id}`}>
                    <Button size="sm" onClick={() => {
                        cookie.save('voyage_type', 'emission', {path: '/'})
                    }} variant="primary"><i className="fa fa-eye"></i>Emission</Button>
                </Link>
                <Link to={`/voyage/${row.id}`}>
                    <Button size="sm" onClick={() => {
                        console.log('fc')
                        cookie.save('voyage_type', 'fc', {path: '/'})
                    }} variant="primary"><i className="fa fa-eye"></i>Fuel Consumed</Button>
                </Link>
                {
                    cookie.load('roleId') == 2 && row.ship.user_id == cookie.load('userId') ? 
                    <Button onClick={() => this.toggleOpenEdit(row)} size="sm" variant="success"><i className="fa fa-pencil"></i>Edit</Button> : null
                }
                {
                    cookie.load('roleId') == 2 && row.ship.user_id == cookie.load('userId') ? 
                    <Button onClick={() => this.toggleOpenDelete(row)} size="sm" variant="danger"><i className="fa fa-trash"></i>Delete</Button> : null
                }
            </div>
        )
    }

    customBtnGroup = (props) => {
        return(
            <div>
                {
                    cookie.load('roleId') == 2 ? <Button onClick={() => this.toggleOpenAdd()} variant="primary"><i className="fa fa-plus"></i>&nbsp;Add New Voyage</Button> : null
                }
                { props.exportCSVBtn }
            </div>
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
            noDataText: 'No voyage(s) found. Please check or input a new company',
        }

        const selectRow = {
            // bgColor: '#1de9b6',
            hideSelectColumn: true,
            clickToExpand: false,
        }

        return(
                <BootstrapTable data={data} version="4" striped hover pagination search searchPlaceholder={"Search by date..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                    <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="80" searchable={false}>No</TableHeaderColumn>
                    <TableHeaderColumn dataField="start_date" dataSort dataFormat={this.startFormatter.bind(this)} csvHeader="Start Date" csvFormat={this.startFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={true} width="180">Start Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="end_date" dataSort dataFormat={this.endFormatter.bind(this)} csvHeader="End Date" csvFormat={this.endFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={true} width="180">End Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="cargo_mass" dataSort csvHeader="Cargo Mass (ton)" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="180">Cargo Mass (ton)</TableHeaderColumn>
                    <TableHeaderColumn dataField="ship" dataSort dataFormat={this.shipFormatter.bind(this)} csvHeader="Ship" csvFormat={this.shipFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={true} width="120">Ship</TableHeaderColumn>
                    <TableHeaderColumn dataField="route" dataSort dataFormat={this.originFormatter.bind(this)} csvHeader="Origin Port" csvFormat={this.originFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={true} width="150">Origin Port</TableHeaderColumn>
                    <TableHeaderColumn dataField="route" dataSort dataFormat={this.destinationFormatter.bind(this)} csvHeader="Destination Port" csvFormat={this.destinationFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={true} width="150">Destination Port</TableHeaderColumn>
                    <TableHeaderColumn dataAlign="center" dataField='action' export={false} dataFormat={ this.actionFormatter.bind(this) } thStyle={ { whiteSpace: 'normal', width: 600 } } tdStyle={ { whiteSpace: 'normal', width: 600 } } searchable={false} expandable={ false }>Action</TableHeaderColumn>
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
        const { start, length, breadth, draft, dwt, mass, ship, route, company } = this.state
        const auth = cookie.load('token')

        if(start === "" || start === null || start === undefined){
            return toast.error("Start Date could not be empty!")
        } else if(length === "" || length === null || length === undefined){
            return toast.error("Length Displacement could not be empty!")
        } else if(breadth === "" || breadth === null || breadth === undefined){
            return toast.error("Breadth could not be empty!")
        } else if(draft === "" || draft === null || draft === undefined){
            return toast.error("Draft could not be empty!")
        } else if(dwt === "" || dwt === null || dwt === undefined){
            return toast.error("DWT could not be empty!")
        } else if(mass === "" || mass === null || mass === undefined){
            return toast.error("Cargo Mass could not be empty!")
        } else if(ship === "" || ship === null || ship === undefined){
            return toast.error("Ship could not be empty!")
        } else if(route === "" || route === null || route === undefined){
            return toast.error("Route could not be empty!")
        } else {
            this.setState({
                isAdding: true,
                isLoading: true
            })

            axios({
                method: 'post',
                url: API_LINKS.VOYAGE_ADD_URL,
                headers: {
                    Authorization: auth
                },
                data: { 
                    start_date: start,
                    length,
                    breadth,
                    draft,
                    dwt,
                    cargo_mass: mass,
                    ship_id: ship.value,
                    route: route.value,
                    company_id: cookie.load('companyId')
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
                        this.props.fetchCompany()
                        this.props.fetchShip()
                        this.props.fetchVoyage()

                        return toast.success("Voyage successfully created!")
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
        const { id, start, length, breadth, draft, dwt, mass, ship, company } = this.state
        const auth = cookie.load('token')

        if(start === "" || start === null || start === undefined){
            return toast.error("Start Date could not be empty!")
        } else if(length === "" || length === null || length === undefined){
            return toast.error("Length Displacement could not be empty!")
        } else if(breadth === "" || breadth === null || breadth === undefined){
            return toast.error("Breadth could not be empty!")
        } else if(draft === "" || draft === null || draft === undefined){
            return toast.error("Draft could not be empty!")
        } else if(dwt === "" || dwt === null || dwt === undefined){
            return toast.error("DWT could not be empty!")
        } else if(mass === "" || mass === null || mass === undefined){
            return toast.error("Cargo Mass could not be empty!")
        } else if(ship === "" || ship === null || ship === undefined){
            return toast.error("Ship could not be empty!")
        } else {
            this.setState({
                isEditing: true,
                isLoading: true
            })

            axios({
                method: 'post',
                url: API_LINKS.VOYAGE_UPDATE_URL,
                headers: {
                    Authorization: auth
                },
                data: { 
                    id,
                    start_date: start,
                    length,
                    breadth,
                    draft,
                    dwt,
                    cargo_mass: mass,
                    ship_id: ship.value,
                    company_id: cookie.load('companyId')
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
                        this.props.fetchCompany()
                        this.props.fetchShip()
                        this.props.fetchVoyage()

                        return toast.success("Voyage successfully edited!")
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
        const { id, start, length, breadth, draft, dwt, mass, ship, company } = this.state
        const auth = cookie.load('token')

        if(start === "" || start === null || start === undefined){
            return toast.error("Start Date could not be empty!")
        } else if(length === "" || length === null || length === undefined){
            return toast.error("Length Displacement could not be empty!")
        } else if(breadth === "" || breadth === null || breadth === undefined){
            return toast.error("Breadth could not be empty!")
        } else if(draft === "" || draft === null || draft === undefined){
            return toast.error("Draft could not be empty!")
        } else if(dwt === "" || dwt === null || dwt === undefined){
            return toast.error("DWT could not be empty!")
        } else if(mass === "" || mass === null || mass === undefined){
            return toast.error("Cargo Mass could not be empty!")
        } else if(ship === "" || ship === null || ship === undefined){
            return toast.error("Ship could not be empty!")
        } else {
            this.setState({
                isDeleting: true,
                isLoading: true
            })

            axios({
                method: 'post',
                url: API_LINKS.VOYAGE_DELETE_URL,
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
                        this.props.fetchCompany()
                        this.props.fetchShip()
                        this.props.fetchVoyage()

                        return toast.success("Voyage successfully deleted!")
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

    handleFinish = (row) => {
        const auth = cookie.load('token')

        this.setState({
            isEditing: true,
            isLoading: true
        })

        axios({
            method: 'post',
            url: API_LINKS.VOYAGE_UPDATE_URL,
            headers: {
                Authorization: auth
            },
            data: { 
                id: row.id,
                end_date: new Date()
            }
        })
        .then((response) => {
            if(response.status === 200){
                if(response.data.status === 200){
                    this.setState({
                        isEditing: false,
                        isLoading: false
                    })
                    this.props.fetchCompany()
                    this.props.fetchShip()
                    this.props.fetchVoyage()

                    return toast.success("Voyage successfully finished!")
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

    render(){
        const { ships, shipProgress, companyProgress, voyageProgress, locationProgress, shipsOptions, companiesOptions } = this.props
        const { modalAdd, isAdding, modalEdit, isEditing, modalDelete, isDeleting,
                id, start, end, length, breadth, draft, dwt, mass, ship, company, isLoading, confirm, message, status } = this.state

        return(
            <div>
                {
                    companyProgress || shipProgress ? <center><BeatLoader color={'#1de9b6'} loading={companyProgress || shipProgress} /><br /> Loading.... Please wait...</center> : this.showTable()
                }

                <Modal show={modalAdd} onHide={this.toggleCloseAdd}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Voyage</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VoyageForm 
                            type="add"
                            isLoading={isAdding}
                            defaultStart={null}
                            defaultEnd={null}
                            defaultLength={0}
                            defaultBreadth={0}
                            defaultDraft={0}
                            defaultDwt={0}
                            defaultMass={0}
                            defaultShip={null}
                            defaultRoute={null}
                            routeOptions={[{label: 'Surabaya-Jakarta', value: 'SBY-JKT'}, {label: 'Surabaya-Banjarmasin', value: 'SBY-BJM'}, {label: 'Jakarta-Surabaya', value: 'JKT-SBY'}, {label: 'Tj. Perak-Tj. Priok', value: 'PERAK-PRIOK'}]}
                            shipsOptions={shipsOptions}
                            ships={ships}
                            defaultCompany={null}
                            companiesOptions={companiesOptions}

                            start={start => this.setState({start})}
                            end={end => this.setState({end})}
                            length={length => this.setState({length})}
                            breadth={breadth => this.setState({breadth})}
                            draft={draft => this.setState({draft})}
                            dwt={dwt => this.setState({dwt})}
                            mass={mass => this.setState({mass})}
                            ship={ship => this.setState({ship})}
                            route={route => this.setState({route})}
                            company={company => this.setState({company})}
                            toggleOpenConfirm={() => this.toggleConfirmation('submit add', 'Are you sure to continue this action? Please check on the details before adding!', isAdding, 'positive')}
                            toggleCloseConfirm={() => this.toggleConfirmation('discard add', 'Discarding filled forms. Are you sure?', isAdding, 'positive')}
                            toggleCloseAdd={() => this.toggleCloseAdd()}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={modalEdit} onHide={this.toggleCloseEdit}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Voyage</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VoyageForm 
                            type="edit"
                            isLoading={isEditing}
                            defaultStart={start}
                            defaultEnd={end}
                            defaultLength={length}
                            defaultBreadth={breadth}
                            defaultDraft={draft}
                            defaultDwt={dwt}
                            defaultMass={mass}
                            defaultShip={ship}
                            defaultRoute={""}
                            shipsOptions={shipsOptions}
                            defaultCompany={company}
                            companiesOptions={companiesOptions}

                            start={start => this.setState({start})}
                            end={end => this.setState({end})}
                            length={length => this.setState({length})}
                            breadth={breadth => this.setState({breadth})}
                            draft={draft => this.setState({draft})}
                            dwt={dwt => this.setState({dwt})}
                            mass={mass => this.setState({mass})}
                            ship={ship => this.setState({ship})}
                            company={company => this.setState({company})}
                            toggleOpenConfirm={() => this.toggleConfirmation('submit edit', 'Editing action will change the company details! Please proceed carefully!', isEditing, 'positive')}
                            toggleCloseConfirm={() => this.toggleConfirmation('discard edit', 'Discarding edited forms. Are you sure?', isEditing, 'positive')}
                            toggleCloseEdit={() => this.toggleCloseEdit()}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={modalDelete} onHide={this.toggleCloseDelete}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Voyage</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VoyageForm 
                            type="delete"
                            isLoading={isDeleting}
                            defaultStart={start}
                            defaultEnd={end}
                            defaultLength={length}
                            defaultBreadth={breadth}
                            defaultDraft={draft}
                            defaultDwt={dwt}
                            defaultMass={mass}
                            defaultShip={ship}
                            defaultRoute={""}
                            shipsOptions={shipsOptions}
                            defaultCompany={company}
                            companiesOptions={companiesOptions}

                            start={start => this.setState({start})}
                            end={end => this.setState({end})}
                            length={length => this.setState({length})}
                            breadth={breadth => this.setState({breadth})}
                            draft={draft => this.setState({draft})}
                            dwt={dwt => this.setState({dwt})}
                            mass={mass => this.setState({mass})}
                            ship={ship => this.setState({ship})}
                            company={company => this.setState({company})}
                            toggleOpenConfirm={() => this.toggleConfirmation('delete', "Are you sure want to delete this voyage. Continue?", isDeleting, 'negative')}
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
        companies: state.companyStore.companies,
        companiesOptions: state.companyStore.companiesOptions,
        companiesCount: state.companyStore.companiesCount,
        companyProgress: state.companyStore.inProgress,

        ships: state.shipStore.ships,
        shipsOptions: state.shipStore.shipsOptions,
        shipsCount: state.shipStore.shipsCount,
        shipProgress: state.shipStore.inProgress,

        voyages: state.voyageStore.voyages,
        voyageProgress: state.voyageStore.inProgress,

        locations: state.locationStore.locations,
        locationProgress: state.locationStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchCompany, fetchShip, fetchVoyage, fetchLocation})(VoyageDataTable)