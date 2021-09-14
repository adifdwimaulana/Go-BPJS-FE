import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Aux from '../../hoc/_Aux'
import { BeatLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import moment from 'moment'
import cookie from 'react-cookies'
import axios from 'axios'
import * as API_LINKS from '../../config/links'

import { fetchRequest } from '../../redux/actions/request/getRequest'
import { fetchMedicine } from '../../redux/actions/medicine/getMedicine'

class RequestDataTable extends React.Component {

  numericSortFunc = (a,b,order) => {
    if (order === 'desc'){
        return Number(b.no) - Number(a.no)
    } else {
        return Number(a.no) - Number(b.no)
    }
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

  actionFormatter = (cell, row) => {
      return(
          <div>
              {
                cookie.load('roleId') == 1 ?
                <div>
                    <Button onClick={() => this.toggleOpenEdit(row)} size="sm" variant="success"><i className="fa fa-pencil"></i>Ubah</Button>
                    <Button onClick={() => this.toggleOpenDelete(row)} size="sm" variant="danger"><i className="fa fa-trash"></i>Hapus</Button>
                </div> : '-'
              }
          </div>
      )
  }

  customBtnGroup = (props) => {
      return(
          <div>
              {
                  cookie.load('roleId') == 2 ? <Button onClick={() => this.toggleOpenAdd()} variant="primary"><i className="fa fa-plus"></i>&nbsp;Tambah Data Pemeriksaan</Button> : null
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
            <BootstrapTable data={data} version="4" striped hover pagination search searchPlaceholder={"Cari berdasarkan nama atau no. bpjs..."} edit options={options} selectRow={selectRow} exportCSV={false} csvFileName={'Data Pasien.csv'} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="80" searchable={false}>No</TableHeaderColumn>
                <TableHeaderColumn dataField="date" dataFormat={this.timeFormatter.bind(this)} dataSort csvHeader="Tanggal" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="120">Tanggal</TableHeaderColumn>
                <TableHeaderColumn dataField="description" dataSort csvHeader="Deskripsi" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="200">Deskripsi</TableHeaderColumn>
                <TableHeaderColumn dataField="user" dataFormat={this.nameFormatter.bind(this)} dataSort csvHeader="Nama" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="120">Nama</TableHeaderColumn>
                <TableHeaderColumn dataField="user" dataFormat={this.bpjsFormatter.bind(this)} dataSort csvHeader="No. BPJS" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="160">No. BPJS</TableHeaderColumn>
                <TableHeaderColumn dataField="user" dataFormat={this.ageFormatter.bind(this)} dataSort csvHeader="Usia" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="80">Usia</TableHeaderColumn>
                <TableHeaderColumn dataField="bp" dataSort csvHeader="Tekanan Darah" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="160">Tekanan Darah</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField='status' export={false} dataFormat={ this.actionFormatter.bind(this) } thStyle={ { whiteSpace: 'normal', width: 300 } } tdStyle={ { whiteSpace: 'normal', width: 300 } } searchable={false} expandable={ false }>Aksi</TableHeaderColumn>
            </BootstrapTable>
    )
  }

  render(){
    const { requests, requestProgress, medicineOptions, medicineProgress } = this.props
    
    return(
      <div>
        {
            requestProgress || medicineProgress ? <center><BeatLoader color={'#1de9b6'} loading={requestProgress || medicineProgress} /><br /> Loading.... Please wait...</center> : this.showTable()
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      requests: state.requestStore.requests,
      requestProgress: state.requestStore.inProgress,

      medicines: state.medicineStore.medicines,
      medicineOptions: state.medicineStore.medicineOptions,
      medicineProgress: state.medicineStore.isLoading
  }
}


export default connect(mapStateToProps, {fetchRequest, fetchMedicine})(RequestDataTable)