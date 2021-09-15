import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Aux from '../../hoc/_Aux'
import { BeatLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import cookie from 'react-cookies'
import axios from 'axios'
import * as API_LINKS from '../../config/links'

import { fetchMedicine } from '../../redux/actions/medicine/getMedicine'

import Confirmation from '../Widgets/Confirmation'
import MedicineForm from './Forms'

class MedicineDataTable extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      id: null,
      name: '',
      description: '',
      quantity: 0,
      dose: 0,
      price: 0
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
          description: '',
          quantity: 0,
          dose: 0,
          price: 0,
          confirm: false,
          modalAdd: !this.state.modalAdd
      })
  }

  toggleOpenEdit = (row) => {
      this.setState({
          id: row.id,
          name: row.name,
          description: row.description,
          quantity: row.quantity,
          dose: row.dose,
          price: row.price,
          modalEdit: !this.state.modalEdit
      })
  }

  toggleCloseEdit = () => {
      this.setState({
          id: null,
          name: '',
          description: '',
          quantity: 0,
          dose: 0,
          price: 0,
          confirm: false,
          modalEdit: !this.state.modalEdit
      })
  }

  toggleOpenDelete = (row) => {
      this.setState({
          id: row.id,
          name: row.name,
          description: row.description,
          quantity: row.quantity,
          dose: row.dose,
          price: row.price,
          modalDelete: !this.state.modalDelete
      })
  }

  toggleCloseDelete = () => {
      this.setState({
          id: null,
          name: '',
          description: '',
          quantity: 0,
          dose: 0,
          price: 0,
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

    priceFormatter = (cell) => {
      return cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    actionFormatter = (cell, row) => {
      const { active } = this.props
        return(
            <div>
                {
                    <div>
                        <Button onClick={() => this.toggleOpenEdit(row)} size="sm" variant="success"><i className="fa fa-pencil"></i>Ubah</Button>
                        <Button onClick={() => this.toggleOpenDelete(row)} size="sm" variant="danger"><i className="fa fa-trash"></i>Hapus</Button>
                    </div>
                }
            </div>
        )
    }

    customBtnGroup = (props) => {
        return(
            <div>
                <Button onClick={() => this.toggleOpenAdd()} variant="primary"><i className="fa fa-plus"></i>&nbsp;Tambah Data Obat</Button>
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
          noDataText: 'No compan(ies) found. Please check or input a new company',
      }

      const selectRow = {
          bgColor: '#1de9b6',
          hideSelectColumn: true,
          clickToExpand: false,
      }

      return(
        <BootstrapTable data={data} version="4" striped hover pagination search searchPlaceholder={"Cari berdasarkan nama obat atau deskripsi..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
            <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="80" searchable={false}>No</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort csvHeader="Nama Obat" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="150">Nama Obat</TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataSort csvHeader="Deskripsi" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="150">Deskripsi</TableHeaderColumn>
            <TableHeaderColumn dataField="dose" dataSort csvHeader="Dosis" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="100">Dosis</TableHeaderColumn>
            <TableHeaderColumn dataField="quantity" dataSort csvHeader="Kuantitas" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="120">Kuantitas</TableHeaderColumn>
            <TableHeaderColumn dataField="price" dataSort dataFormat={this.priceFormatter.bind(this)} csvHeader="Harga" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="100">Harga</TableHeaderColumn>
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
      const { name, description } = this.state
      const auth = cookie.load('token')

      if(name === "" || name === null || name === undefined){
          return toast.error("Medicine name could not be empty!")
      } else if(description === "" || description === null || description === undefined){
          return toast.error("Description could not be empty!")
      } else {
          this.setState({
              isAdding: true,
              isLoading: true
          })

          axios({
              method: 'post',
              url: API_LINKS.MEDICINE_ADD_URL,
              headers: {
                  Authorization: auth
              },
              data: { name, description }
          })
          .then((response) => {
              if(response.status === 200){
                  if(response.data.status === 200){
                      this.setState({
                          isAdding: false,
                          isLoading: false
                      })
                      this.toggleCloseAdd()
                      fetchMedicine({ organization_id: cookie.load('organizationId') })

                      return toast.success("Company successfully created!")
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
      const { id, name, description } = this.state
      const auth = cookie.load('token')

      if(name === "" || name === null || name === undefined){
          return toast.error("Company name could not be empty!")
      } else if(description === "" || description === null || description === undefined){
          return toast.error("Description could not be empty!")
      } else {
          this.setState({
              isEditing: true,
              isLoading: true
          })

          axios({
              method: 'post',
              url: API_LINKS.COMPANY_UPDATE_URL,
              headers: {
                  Authorization: auth
              },
              data: { id, name, description }
          })
          .then((response) => {
              if(response.status === 200){
                  if(response.data.status === 200){
                      this.setState({
                          isEditing: false,
                          isLoading: false
                      })
                      this.toggleCloseEdit()
                      fetchMedicine({ organization_id: cookie.load('organizationId') })

                      return toast.success("Medicine successfully edited!")
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
      const { id, name, description } = this.state
      const auth = cookie.load('token')

      if(name === "" || name === null || name === undefined){
          return toast.error("Company name could not be empty!")
      } else if(description === "" || description === null || description === undefined){
          return toast.error("Description could not be empty!")
      } else {
          this.setState({
              isDeleting: true,
              isLoading: true
          })

          axios({
              method: 'post',
              url: API_LINKS.COMPANY_DELETE_URL,
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
                      fetchMedicine({ organization_id: cookie.load('organizationId') })

                      return toast.success("Company successfully deleted!")
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
    const { medicineProgress } = this.props
    const { modalAdd, isAdding, modalEdit, isEditing, modalDelete, isDeleting,
            id, name, description, confirm, isLoading, message, status } = this.state

    return(
        <div>
            {
                medicineProgress ? <center><BeatLoader color={'#1de9b6'} loading={medicineProgress} /><br /> Loading.... Please wait...</center> : this.showTable()
            }

            <Modal show={modalAdd} onHide={this.toggleCloseAdd}>
                <Modal.Header closeButton>
                <Modal.Title>Tambah Data Obat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
            </Modal>

            <Modal show={modalEdit} onHide={this.toggleCloseEdit}>
                <Modal.Header closeButton>
                <Modal.Title>Ubah Data Obat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
            </Modal>

            <Modal show={modalDelete} onHide={this.toggleCloseDelete}>
                <Modal.Header closeButton>
                <Modal.Title>Hapus Data Obat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
      medicines: state.medicineStore.users,
      medicineOptions: state.medicineStore.usersOptions,
      medicineProgress: state.medicineStore.usersOptions
  }
}

export default connect(mapStateToProps, {fetchMedicine})(MedicineDataTable)