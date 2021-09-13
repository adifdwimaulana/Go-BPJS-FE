import React from 'react'
import { Button, Modal, Card, Row, Col } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Aux from '../../hoc/_Aux'
import { BeatLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import moment from 'moment'
import cookie from 'react-cookies'
import axios from 'axios'
import * as API_LINKS from '../../config/links'

import { fetchLocation } from '../../redux/actions/locations/getLocations'
import { fetchReport } from '../../redux/actions/report/getReport'

import Confirmation from '../Widgets/Confirmation'
import LocationForm from './Forms'

class LocationDataTable extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            latitude: null,
            longitude: null,
            time: new Date(),
            voyage: null
        }
    }

    toggleOpenAdd = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    toggleCloseAdd = () => {
        this.setState({
            latitude: null,
            longitude: null,
            time: new Date(),
            voyage: null,
            confirm: false,
            modalAdd: !this.state.modalAdd
        })
    }

    toggleOpenEdit = (row) => {
        this.setState({
            id: row.id,
            latitude: row.latitude,
            longitude: row.longitude,
            time: row.time_stamp,
            modalEdit: !this.state.modalEdit
        })
    }

    toggleCloseEdit = () => {
        this.setState({
            id: null,
            latitude: null,
            longitude: null,
            time: new Date(),
            voyage: null,
            confirm: false,
            modalEdit: !this.state.modalEdit
        })
    }

    toggleOpenDelete = (row) => {
        this.setState({
            id: row.id,
            latitude: row.latitude,
            longitude: row.longitude,
            time: row.time_stamp,
            modalDelete: !this.state.modalDelete
        })
    }

    toggleCloseDelete = () => {
        this.setState({
            id: null,
            latitude: null,
            longitude: null,
            time: new Date(),
            voyage: null,
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

    timeFormatter = (cell, row) => {
        return moment(cell).format('DD-MM-YYYY HH:mm:ss')
    }

    decimalFormatter = (cell, row) => {
        return cell.toFixed(2)
    }

    decimal5Formatter = (cell, row) => {
        return cell.toPrecision(5)
    }

    actionFormatter = (cell, row) => {
        const { active } = this.props
        return(
            <div>
                {
                    cookie.load('roleId') == 2 ?
                    <div>
                        <Button onClick={() => this.toggleOpenEdit(row)} size="sm" variant="success"><i className="fa fa-pencil"></i>Edit</Button>
                        <Button onClick={() => this.toggleOpenDelete(row)} size="sm" variant="danger"><i className="fa fa-trash"></i>Delete</Button>
                    </div> : '-'
                }
            </div>
        )
    }

    customBtnGroup = (props) => {
        return(
            <div>
                { props.exportCSVBtn }
            </div>
        )
    }

    showTable = () => {
        const { report, average } = this.props
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
            noDataText: 'No coordinate(s) found. Please check or input a new company',
        }

        const selectRow = {
            hideSelectColumn: true,
            clickToExpand: false,
        }

        if(cookie.load('roleId') < 1){
            if(cookie.load('voyage_type') == 'emission'){
                return(
                    <BootstrapTable data={report} version="4" striped hover pagination search searchPlaceholder={"Search by name or operaotr..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                        <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal', width: 60 } } tdStyle={ { whiteSpace: 'normal', width: 60 } } searchable={false}>No</TableHeaderColumn>
                        <TableHeaderColumn dataField="time_stamp" dataSort dataFormat={this.timeFormatter.bind(this)} csvHeader="Time Stamp" csvFormat={this.timeFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 175 } } tdStyle={ { whiteSpace: 'normal', width: 175 } } searchable={true}>Time Stamp</TableHeaderColumn>
                        <TableHeaderColumn dataField="eeoi" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="EEOI" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>EEOI</TableHeaderColumn>
                        <TableHeaderColumn dataField="co" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="CO" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>CO</TableHeaderColumn>
                        <TableHeaderColumn dataField="nox" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="NOx" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>NOx</TableHeaderColumn>
                        <TableHeaderColumn dataField="hc" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="HC" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>HC</TableHeaderColumn>
                        <TableHeaderColumn dataField="so2" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="SO2" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>SO2</TableHeaderColumn>
                        <TableHeaderColumn dataField="co2" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="CO2" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>CO2</TableHeaderColumn>
                    </BootstrapTable>
                )
            } else if(cookie.load('voyage_type') == 'fc'){
                return(
                    <BootstrapTable data={report} version="4" striped hover pagination search searchPlaceholder={"Search by name or operaotr..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                        <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal', width: 60 } } tdStyle={ { whiteSpace: 'normal', width: 60 } } searchable={false}>No</TableHeaderColumn>
                        <TableHeaderColumn dataField="v_knot" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="Vs (knot)" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>Vs (knot)</TableHeaderColumn>
                        <TableHeaderColumn dataField="rholtrop" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="Tahanan Holtrop Total" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 175 } } tdStyle={ { whiteSpace: 'normal', width: 175 } } searchable={false}>Tahanan Holtropp Total</TableHeaderColumn>
                        <TableHeaderColumn dataField="rstw" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="Tahanan STWave Total" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 150 } } tdStyle={ { whiteSpace: 'normal', width: 150 } } searchable={false}>Tahanan STWave Total</TableHeaderColumn>
                        <TableHeaderColumn dataField="rtotal" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="Tahanan Total" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 125 } } tdStyle={ { whiteSpace: 'normal', width: 125 } } searchable={false}>Tahanan Total</TableHeaderColumn>
                        <TableHeaderColumn dataField="bhp" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="BHP" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>BHP</TableHeaderColumn>
                        <TableHeaderColumn dataField="fc_lt" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="FC (liter)" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>FC (liter)</TableHeaderColumn>
                        <TableHeaderColumn dataField="fc_ton" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="FC (ton)" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>FC (ton)</TableHeaderColumn>
                    </BootstrapTable>
                )
            } else {
                return(
                        <BootstrapTable data={report} version="4" striped hover pagination search searchPlaceholder={"Search by name or operaotr..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                            <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal', width: 60 } } tdStyle={ { whiteSpace: 'normal', width: 60 } } searchable={false}>No</TableHeaderColumn>
                            <TableHeaderColumn dataField="time_stamp" dataSort dataFormat={this.timeFormatter.bind(this)} csvHeader="Time Stamp" csvFormat={this.timeFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 175 } } tdStyle={ { whiteSpace: 'normal', width: 175 } } searchable={true}>Time Stamp</TableHeaderColumn>
                            <TableHeaderColumn dataField="v_knot" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="Vs (knot)" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>Vs (knot)</TableHeaderColumn>
                            <TableHeaderColumn dataField="rtotal" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="Tahanan Total" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 150 } } tdStyle={ { whiteSpace: 'normal', width: 150 } } searchable={false}>Tahanan Total</TableHeaderColumn>
                            <TableHeaderColumn dataField="bhp_mcr" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="Daya Mesin" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 150 } } tdStyle={ { whiteSpace: 'normal', width: 150 } } searchable={false}>Daya Mesin</TableHeaderColumn>
                            <TableHeaderColumn dataField="eeoi" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="EEOI" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>EEOI</TableHeaderColumn>
                            <TableHeaderColumn dataField="fc_lt" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="FC (liter)" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>FC (liter)</TableHeaderColumn>
                            <TableHeaderColumn dataField="fc_ton" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="FC (ton)" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>FC (ton)</TableHeaderColumn>
                            <TableHeaderColumn dataField="co" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="CO" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>CO</TableHeaderColumn>
                            <TableHeaderColumn dataField="nox" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="NOx" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>NOx</TableHeaderColumn>
                            <TableHeaderColumn dataField="hc" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="HC" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>HC</TableHeaderColumn>
                            <TableHeaderColumn dataField="so2" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="SO2" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>SO2</TableHeaderColumn>
                            <TableHeaderColumn dataField="co2" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="CO2" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false}>CO2</TableHeaderColumn>
                        </BootstrapTable>
                )
            }
        } else {
            if(cookie.load('voyage_type') == 'emission'){
                return(
                    <BootstrapTable data={average} version="4" striped hover pagination search searchPlaceholder={"Search by name or operaotr..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                        <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="10%" searchable={false}>No</TableHeaderColumn>
                        <TableHeaderColumn dataField="co" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="CO" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">CO</TableHeaderColumn>
                        <TableHeaderColumn dataField="nox" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="NOx" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">NOx</TableHeaderColumn>
                        <TableHeaderColumn dataField="hc" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="HC" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">HC</TableHeaderColumn>
                        <TableHeaderColumn dataField="so2" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="SO2" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">SO2</TableHeaderColumn>
                        <TableHeaderColumn dataField="co2" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="CO2" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">CO2</TableHeaderColumn>
                    </BootstrapTable>
                )
            } else if(cookie.load('voyage_type') == 'fc'){
                return(
                    <BootstrapTable data={average} version="4" striped hover pagination search searchPlaceholder={"Search by name or operaotr..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                        <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="10%" searchable={false}>No</TableHeaderColumn>
                        <TableHeaderColumn dataField="v_knot" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="Vs (knot)" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="25%">Vs (knot)</TableHeaderColumn>
                        <TableHeaderColumn dataField="fc_lt_total" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="FC (liter)" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="25%">FC (liter)</TableHeaderColumn>
                        <TableHeaderColumn dataField="fc_ton_total" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="FC (ton)" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="25%">FC (ton)</TableHeaderColumn>
                    </BootstrapTable>
                )
            } else {
                return(
                    <BootstrapTable data={average} version="4" striped hover pagination search searchPlaceholder={"Search by name or operaotr..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                        <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="10%" searchable={false}>No</TableHeaderColumn>
                        <TableHeaderColumn dataField="v_knot" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="Vs (knot)" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="25%">Vs (knot)</TableHeaderColumn>
                        <TableHeaderColumn dataField="fc_lt_total" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="FC (liter)" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="25%">FC (liter)</TableHeaderColumn>
                        <TableHeaderColumn dataField="fc_ton_total" dataSort dataFormat={this.decimalFormatter.bind(this)} csvHeader="FC (ton)" csvFormat={this.decimalFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="25%">FC (ton)</TableHeaderColumn>
                        <TableHeaderColumn dataField="co" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="CO" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">CO</TableHeaderColumn>
                        <TableHeaderColumn dataField="nox" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="NOx" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">NOx</TableHeaderColumn>
                        <TableHeaderColumn dataField="hc" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="HC" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">HC</TableHeaderColumn>
                        <TableHeaderColumn dataField="so2" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="SO2" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">SO2</TableHeaderColumn>
                        <TableHeaderColumn dataField="co2" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="CO2" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="20%">CO2</TableHeaderColumn>
                        <TableHeaderColumn dataField="eeoi" dataSort dataFormat={this.decimal5Formatter.bind(this)} csvHeader="EEOI" csvFormat={this.decimal5Formatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="25%">EEOI</TableHeaderColumn>
                    </BootstrapTable>
                )
            }
        }
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
        const { time, latitude, longitude } = this.state
        const auth = cookie.load('token')

        if(time === "" || time === null || time === undefined){
            return toast.error("Time could not be empty!")
        } else if(latitude === "" || latitude === null || latitude === undefined){
            return toast.error("Latitude could not be empty!")
        } else if(longitude === "" || longitude === null || longitude === undefined){
            return toast.error("Longitude could not be empty!")
        } else {
            this.setState({
                isAdding: true,
                isLoading: true
            })

            axios({
                method: 'post',
                url: API_LINKS.LOCATION_ADD_URL,
                headers: {
                    Authorization: auth
                },
                data: { 
                    time_stamp: time,
                    latitude,
                    longitude,
                    voyage_id: this.props.params.id
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
                        this.props.fetchLocation({voyage_id: this.props.params.id})
                        this.props.fetchReport({voyage_id: this.props.params.id})

                        return toast.success("Coordinates successfully created!")
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
        const { id, time, latitude, longitude } = this.state
        const auth = cookie.load('token')

        if(time === "" || time === null || time === undefined){
            return toast.error("Time could not be empty!")
        } else if(latitude === "" || latitude === null || latitude === undefined){
            return toast.error("Latitude could not be empty!")
        } else if(longitude === "" || longitude === null || longitude === undefined){
            return toast.error("Longitude could not be empty!")
        } else {
            this.setState({
                isEditing: true,
                isLoading: true
            })

            axios({
                method: 'post',
                url: API_LINKS.LOCATION_UPDATE_URL,
                headers: {
                    Authorization: auth
                },
                data: { 
                    id,
                    time_stamp: time,
                    latitude,
                    longitude,
                    voyage_id: this.props.params.id
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
                        this.props.fetchLocation({voyage_id: this.props.params.id})
                        this.props.fetchReport({voyage_id: this.props.params.id})

                        return toast.success("Coordinates successfully edited!")
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
        const { id, time, latitude, longitude } = this.state
        const auth = cookie.load('token')

        if(time === "" || time === null || time === undefined){
            return toast.error("Time could not be empty!")
        } else if(latitude === "" || latitude === null || latitude === undefined){
            return toast.error("Latitude could not be empty!")
        } else if(longitude === "" || longitude === null || longitude === undefined){
            return toast.error("Longitude could not be empty!")
        } else {
            this.setState({
                isDeleting: true,
                isLoading: true
            })

            axios({
                method: 'post',
                url: API_LINKS.LOCATION_DELETE_URL,
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
                        this.props.fetchLocation({voyage_id: this.props.params.id})
                        this.props.fetchReport({voyage_id: this.props.params.id})

                        return toast.success("Coordinates successfully deleted!")
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
        const { locationProgress, reportProgress } = this.props
        const { modalAdd, isAdding, modalEdit, isEditing, modalDelete, isDeleting, 
                id, latitude, longitude, time, confirm, isLoading, message, status } = this.state

        return(
            <div>
                {
                    locationProgress || reportProgress ? <center><BeatLoader color={'#1de9b6'} loading={locationProgress || reportProgress} /><br /> Loading.... Please wait...</center> : this.showTable()
                }

                <Modal show={modalAdd} onHide={this.toggleCloseAdd}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Coordinate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LocationForm 
                            type="add"
                            isLoading={isAdding}
                            defaultLatitude={null}
                            defaultLongitude={null}
                            defaultTime={new Date()}

                            latitude={latitude => this.setState({latitude})}
                            longitude={longitude => this.setState({longitude})}
                            time={time => this.setState({time})}
                            toggleOpenConfirm={() => this.toggleConfirmation('submit add', 'Are you sure to continue this action? Please check on the details before adding!', isAdding, 'positive')}
                            toggleCloseConfirm={() => this.toggleConfirmation('discard add', 'Discarding filled forms. Are you sure?', isAdding, 'positive')}
                            toggleCloseAdd={() => this.toggleCloseAdd()}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={modalEdit} onHide={this.toggleCloseEdit}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Coordinate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LocationForm 
                            type="edit"
                            isLoading={isEditing}
                            defaultLatitude={latitude}
                            defaultLongitude={longitude}
                            defaultTime={time}

                            latitude={latitude => this.setState({latitude})}
                            longitude={longitude => this.setState({longitude})}
                            time={time => this.setState({time})}
                            toggleOpenConfirm={() => this.toggleConfirmation('submit edit', 'Editing action will change the coordinates details! Please proceed carefully!', isEditing, 'positive')}
                            toggleCloseConfirm={() => this.toggleConfirmation('discard edit', 'Discarding edited forms. Are you sure?', isEditing, 'positive')}
                            toggleCloseEdit={() => this.toggleCloseEdit()}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={modalDelete} onHide={this.toggleCloseDelete}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Coordinate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LocationForm 
                            type="delete"
                            isLoading={isDeleting}
                            defaultLatitude={latitude}
                            defaultLongitude={longitude}
                            defaultTime={time}

                            latitude={latitude => this.setState({latitude})}
                            longitude={longitude => this.setState({longitude})}
                            time={time => this.setState({time})}
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
        locations: state.locationStore.locations,
        locationProgress: state.locationStore.inProgress,

        integration: state.reportStore.integration,
        holtrop: state.reportStore.holtrop,
        stwave: state.reportStore.stwave,
        foc: state.reportStore.foc,
        report: state.reportStore.report,
        average: state.reportStore.average,
        reportProgress: state.reportStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchLocation, fetchReport})(LocationDataTable)