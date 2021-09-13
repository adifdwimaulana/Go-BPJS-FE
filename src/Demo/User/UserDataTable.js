import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Aux from '../../hoc/_Aux'
import { BeatLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import cookie from 'react-cookies'
import axios from 'axios'
import * as API_LINKS from '../../config/links'

import { fetchUser } from '../../redux/actions/users/getUsers'

class UserDataTable extends React.Component {
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

    actionFormatter = (cell, row) => {
        return(
            <div>
                {
                    cookie.load('roleId') < 3 ?
                    <div>
                        <BootstrapSwitchButton
                            checked={cell === 1 ? true : false}
                            width={120}
                            height={20}
                            onlabel='Aktif'
                            offlabel='Non-aktif'
                            onChange={() => this.handleUpdateStatus(row)}
                        />
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
                <BootstrapTable data={data} version="4" striped hover pagination search searchPlaceholder={"Cari berdasarkan nama atau no. bpjs"} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={'Data Pasien.csv'} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                    <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="80" searchable={false}>No</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort csvHeader="Name" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="120">Nama</TableHeaderColumn>
                    <TableHeaderColumn dataField="no_bpjs" dataSort csvHeader="No. BPJS" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="120">No. BPJS</TableHeaderColumn>
                    <TableHeaderColumn dataField="organization" dataFormat={this.organizationFormatter.bind(this)} dataSort csvHeader="Faskes" csvFormat={this.organizationFormatter.bind(this)} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="200">Faskes</TableHeaderColumn>
                    <TableHeaderColumn dataAlign="center" dataField='status' export={false} dataFormat={ this.actionFormatter.bind(this) } thStyle={ { whiteSpace: 'normal', width: 300 } } tdStyle={ { whiteSpace: 'normal', width: 300 } } searchable={false} expandable={ false }>Status</TableHeaderColumn>
                </BootstrapTable>
        )
    }

    handleUpdateStatus(row) {
        const auth = cookie.load('token')
        this.setState({ isLoading: true })
 
        axios({
                method: 'post',
                url: API_LINKS.USER_UPDATE_URL,
                headers: {
                    Authorization: auth
                },
                data: { 
                    id: row.id,
                    status: row.status === 1 ? 2 : 1
               }
            })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.status === 200){
                        this.setState({
                            isLoading: false
                        })
                        this.props.fetchUser()

                        return toast.success("Data pasien berhasil diubah!")
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
        users: state.userStore.users,
        usersOptions: state.userStore.usersOptions,
        usersCount: state.userStore.usersCount,
        userProgress: state.userStore.inProgress,
    }
}

export default connect(mapStateToProps, {fetchUser})(UserDataTable)