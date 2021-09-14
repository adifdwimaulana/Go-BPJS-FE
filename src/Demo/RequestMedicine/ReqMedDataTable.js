import axios from 'axios'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import moment from 'moment'
import React from 'react'
import { Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import * as API_LINKS from '../../config/links'
import { fetchRequest } from '../../redux/actions/request/getRequest'


class ReqMedDataTable extends React.Component {
    
    constructor(props){
        super(props)

        this.state = {
            isLoading: false
        }
    }

    numericSortFunc = (a,b,order) => {
        if (order === 'desc'){
            return Number(b.no) - Number(a.no)
        } else {
            return Number(a.no) - Number(b.no)
        }
    }

    organizationFormatter = (cell, row) => {
        return cell.name
    }

    timeFormatter = (cell, row) => {
        return moment(cell).format('DD-MMM-YYYY')
    }
    
    nameFormatter = (cell, row) => {
        return cell.name
    }
    
    bpjsFormatter = (cell, row) => {
        return cell.no_bpjs
    }
    
    ageFormatter = (cell, row) => {
        return moment(new Date()).diff(moment(cell.ttl), 'years')
    }

    handleTransferData = (pathname, data) => {
        this.props.history.push({
            pathname: pathname,
            state: {...data, isReqmed:true}
        });
    };

    actionFormatter = (cell, row) => {
        return(
            <div>
                {
                  cookie.load('roleId') == 3 ?
                  <div>
                      <Button onClick={() => this.handleTransferData('/document', row)} size="sm" variant="secondary"><i className="fa fa-pencil"></i>Print</Button>
                      {cell===2&&<Button onClick={() => this.handleUpdateStatus(row, "accept")} size="sm" variant="primary"><i className="fa fa-pencil"></i>Accept</Button>}
                      {cell===3&&<Button onClick={() => this.handleUpdateStatus(row, "done")} size="sm" variant="success"><i className="fa fa-pencil"></i>Done</Button>}
                  </div> : '-'
                }
            </div>
        )
    }

    customBtnGroup = (props) => {
        return(
            <div>
                {
                    cookie.load('roleId') < 2 ? <Button onClick={() => this.toggleOpenAdd()} variant="primary"><i className="fa fa-plus"></i>&nbsp;Add New User</Button> : null
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
            noDataText: 'No user(s) found. Please check or input a new user',
        }

        const selectRow = {
            bgColor: '#1de9b6',
            hideSelectColumn: true,
            clickToExpand: false,
        }

        return(
                <BootstrapTable data={data} version="4" striped hover pagination search searchPlaceholder={"Cari berdasarkan nama atau no. bpjs..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={'Data Pasien.csv'} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                    <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="80" searchable={false}>No</TableHeaderColumn>
                    <TableHeaderColumn dataField="date" dataFormat={this.timeFormatter.bind(this)} dataSort csvHeader="Tanggal" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="120">Tanggal</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort csvHeader="No. BPJS" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="120">Deskripsi</TableHeaderColumn>
                    <TableHeaderColumn dataField="user" dataFormat={this.nameFormatter.bind(this)} dataSort csvHeader="Nama" csvFormat={this.organizationFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="200">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="user" dataFormat={this.bpjsFormatter.bind(this)} dataSort csvHeader="No. BPJS" csvFormat={this.organizationFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="200">No. BPJS</TableHeaderColumn>
                    <TableHeaderColumn dataField="user" dataFormat={this.ageFormatter.bind(this)} dataSort csvHeader="Usia" csvFormat={this.organizationFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="200">Usia</TableHeaderColumn>
                    <TableHeaderColumn dataAlign="center" dataField='status' export={false} dataFormat={ this.actionFormatter.bind(this) } thStyle={ { whiteSpace: 'normal', width: 300 } } tdStyle={ { whiteSpace: 'normal', width: 300 } } searchable={false} expandable={ false }>Status</TableHeaderColumn>
                </BootstrapTable>
        )
    }

    handleUpdateStatus(row, type) {
        const auth = cookie.load('token')
        this.setState({ isLoading: true })
 
        axios({
                method: 'post',
                url: API_LINKS.REQUEST_UPDATE_URL,
                headers: {
                    Authorization: auth
                },
                data: { 
                    id: row.id,
                    status: type==='accept'?3:4
               }
            })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.status === 200){
                        this.setState({
                            isLoading: false
                        })
                        this.props.fetchUser()

                        return toast.success(type==='accept'?"Update Status, resep obat telah diterima Apotek!":"Update Status, Obat telah selesai dan dapat diambil pasien!")
                    } else {
                        this.setState({
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
                            isLoading: false
                        })
                        return toast.error("Invalid credentials! Please try again!");
                    } else if (error.response.status === 403) {
                        this.setState({
                            isLoading: false
                        })
                        return toast.error("Unauthorized Access! Please try to logout..");
                    } else if (error.response.status === 400) {
                        this.setState({
                            isLoading: false
                        })
                        return toast.error(error.response.data.message);
                    } else if (error.response.status === 404 || error.response.status === 500) {
                        this.setState({
                            isLoading: false
                        })
                        return toast.error("Server cannot be contacted! Please ask your system administrator!");
                    } else {
                        this.setState({
                            isLoading: false
                        })
                        return toast.error('Something went wrong... Please try again later...')
                    }
                } else if (error.request) {
                    this.setState({
                        isLoading: false
                    })
                    return toast.error('Request error! Please try again later...')
                } else {
                    this.setState({
                        isLoading: false
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            })
    }

    render(){
        const { userProgress } = this.props
        const { isLoading } = this.state

        return(
            <div>
                {
                    userProgress || isLoading ? <center><BeatLoader color={'#1de9b6'} loading={userProgress || isLoading} /><br /> Loading.... Please wait...</center> : this.showTable()
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        requests: state.requestStore.requests,
        requestOptions: state.requestStore.requestOption,
        requestCount: state.requestStore.requestCount,
        requestProgress: state.requestStore.inProgress,
    }
}

export default connect(mapStateToProps, {fetchRequest})(withRouter(ReqMedDataTable))