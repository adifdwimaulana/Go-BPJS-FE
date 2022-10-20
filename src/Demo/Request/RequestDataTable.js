import React from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import QrReader from "react-qr-reader";
import Aux from "../../hoc/_Aux";
import { BeatLoader } from "react-spinners";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import cookie from "react-cookies";
import axios from "axios";
import * as API_LINKS from "../../config/links";
import Select from "react-select";

import { fetchRequest } from "../../redux/actions/request/getRequest";
import { fetchMedicine } from "../../redux/actions/medicine/getMedicine";
import { fetchUser } from "../../redux/actions/users/getUsers";
import { withRouter } from "react-router";

class RequestDataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalScanner: false,
      modalAdd: false,
      modalMedicine: false,
      isLoading: false,
      date: new Date(),
      description: "",
      bp: "",
      height: 0,
      weight: 0,
      price: 0,
      userId: 0,
      medicineOne: null,
      medicineOneQty: 0,
      medicineTwo: null,
      medicineTwoQty: 0,
      medicineThree: null,
      medicineThreeQty: 0,
    };
  }

  toggleOpenScanner = () => {
    this.setState({
      modalScanner: !this.state.modalScanner,
    });
  };

  toggleCloseScanner = () => {
    this.setState({
      modalScanner: !this.state.modalScanner,
    });
  };

  toggleOpenAdd = () => {
    this.setState({
      modalAdd: !this.state.modalAdd,
    });
  };

  toggleCloseAdd = () => {
    this.setState({
      date: new Date(),
      description: "",
      bp: "",
      height: 0,
      weight: 0,
      price: 0,
      userId: 0,
      modalAdd: !this.state.modalAdd,
    });
  };

  toggleOpenMedicine = (row) => {
    this.props.fetchMedicine({ organization_id: 3 });
    this.setState({
      requestId: row.id,
      modalMedicine: !this.state.modalMedicine,
    });
  };

  toggleCloseMedicine = () => {
    this.setState({
      requestId: null,
      medicineOne: null,
      medicineOneQty: 0,
      medicineTwo: null,
      medicineTwoQty: 0,
      medicineThree: null,
      medicineThreeQty: 0,
      modalMedicine: !this.state.modalMedicine,
    });
  };

  numericSortFunc = (a, b, order) => {
    if (order === "desc") {
      return Number(b.no) - Number(a.no);
    } else {
      return Number(a.no) - Number(b.no);
    }
  };

  timeFormatter = (cell, row) => {
    return moment(cell).format("DD-MMM-YYYY");
  };

  nameFormatter = (cell, row) => {
    return cell?.name;
  };

  bpjsFormatter = (cell, row) => {
    return cell?.no_bpjs;
  };

  ageFormatter = (cell, row) => {
    return cell?.ttl
      ? moment(new Date()).diff(moment(cell?.ttl), "years")
      : null;
  };

  handleTransferData = (pathname, data) => {
    this.props.history.push({
      pathname: pathname,
      state: { ...data, isReqmed: false },
    });
  };
  actionFormatter = (cell, row) => {
    return (
      <div>
        {cookie.load("roleId") == 1 && row.status == 1 ? (
          <div>
            <Button
              onClick={() => this.toggleOpenMedicine(row)}
              size="sm"
              variant="primary"
            >
              <i className="fa fa-plus"></i>Beri Resep
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => this.handleTransferData("/document", row)}
            size="sm"
            variant="secondary"
          >
            <i className="fa fa-print"></i>Print
          </Button>
        )}
      </div>
    );
  };

  customBtnGroup = (props) => {
    return (
      <div>
        {cookie.load("roleId") == 2 ? (
          <Button onClick={() => this.toggleOpenScanner()} variant="primary">
            <i className="fa fa-plus"></i>&nbsp;Tambah Data Pemeriksaan
          </Button>
        ) : null}
        {props.exportCSVBtn}
      </div>
    );
  };

  showTable = () => {
    const { data } = this.props;
    const options = {
      sortName: "no",
      sizePerPageList: [
        {
          text: "10",
          value: 10,
        },
        {
          text: "20",
          value: 20,
        },
        {
          text: "30",
          value: 30,
        },
      ],
      sizePerPage: 30,
      btnGroup: this.customBtnGroup,
      expandBy: "column",
      noDataText: "No user(s) found. Please check or input a new user",
    };

    const selectRow = {
      bgColor: "#1de9b6",
      hideSelectColumn: true,
      clickToExpand: false,
    };

    return (
      <BootstrapTable
        data={data}
        version="4"
        striped
        hover
        pagination
        search
        searchPlaceholder={"Cari berdasarkan nama atau no. bpjs..."}
        edit
        options={options}
        selectRow={selectRow}
        exportCSV
        csvFileName={"Data Pasien.csv"}
        expandableRow={this.expandableRow}
        expandComponent={this.expandComponent}
        expandColumnOptions={{ expandColumnVisible: false }}
      >
        <TableHeaderColumn
          dataField="id"
          isKey
          dataSort
          csvHeader="ID"
          hidden
          searchable={false}
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="no"
          dataSort
          sortFunc={this.numericSortFunc.bind(this)}
          csvHeader="No"
          thStyle={{ whiteSpace: "normal" }}
          tdStyle={{ whiteSpace: "normal" }}
          width="80"
          searchable={false}
        >
          No
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="date"
          dataFormat={this.timeFormatter.bind(this)}
          dataSort
          csvHeader="Tanggal"
          thStyle={{ whiteSpace: "normal" }}
          tdStyle={{ whiteSpace: "normal" }}
          searchable
          width="120"
        >
          Tanggal
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="description"
          dataSort
          csvHeader="Keterangan"
          thStyle={{ whiteSpace: "normal" }}
          tdStyle={{ whiteSpace: "normal" }}
          searchable
          width="200"
        >
          Keterangan
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="user"
          dataFormat={this.nameFormatter.bind(this)}
          dataSort
          csvHeader="Nama"
          thStyle={{ whiteSpace: "normal" }}
          tdStyle={{ whiteSpace: "normal" }}
          searchable
          width="120"
        >
          Nama
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="user"
          dataFormat={this.bpjsFormatter.bind(this)}
          dataSort
          csvHeader="No. BPJS"
          thStyle={{ whiteSpace: "normal" }}
          tdStyle={{ whiteSpace: "normal" }}
          searchable
          width="160"
        >
          No. BPJS
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="user"
          dataFormat={this.ageFormatter.bind(this)}
          dataSort
          csvHeader="Usia"
          thStyle={{ whiteSpace: "normal" }}
          tdStyle={{ whiteSpace: "normal" }}
          searchable
          width="80"
        >
          Usia
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="bp"
          dataSort
          csvHeader="Tekanan Darah"
          thStyle={{ whiteSpace: "normal" }}
          tdStyle={{ whiteSpace: "normal" }}
          searchable
          width="160"
        >
          Tekanan Darah
        </TableHeaderColumn>
        <TableHeaderColumn
          dataAlign="center"
          dataField="status"
          export={false}
          dataFormat={this.actionFormatter.bind(this)}
          thStyle={{ whiteSpace: "normal", width: 200 }}
          tdStyle={{ whiteSpace: "normal", width: 200 }}
          searchable={false}
          expandable={false}
        >
          Aksi
        </TableHeaderColumn>
      </BootstrapTable>
    );
  };

  handleError = (error) => {
    console.log(error);
  };

  handleScan = (result) => {
    if (result) {
      const userId = JSON.parse(result)?.user?.id;

      this.setState({ userId });
      this.toggleCloseScanner();
      this.toggleOpenAdd();
      this.props.fetchUser({ id: userId });
    }
  };

  handleAdd = () => {
    const auth = cookie.load("token");
    this.setState({ isLoading: true });
    const { userId, date, description, bp, height, weight, price } = this.state;

    console.log(userId);

    axios({
      method: "post",
      url: API_LINKS.REQUEST_ADD_URL,
      headers: {
        Authorization: auth,
      },
      data: {
        date,
        description,
        bp,
        height,
        weight,
        price,
        drugstore_id: 3,
        user_id: userId,
        nurse_id: JSON.parse(cookie.load("userId")),
        doctor_id: 3,
        status: 1,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            this.setState({
              isLoading: false,
            });
            this.toggleCloseAdd();
            this.props.fetchUser();
            this.props.fetchRequest();

            return toast.success("Data pemeriksaan berhasil ditambahkan!");
          } else {
            this.setState({
              isLoading: false,
            });
            return toast.error(response.data.message);
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            this.setState({
              isLoading: false,
            });
            return toast.error("Invalid credentials! Please try again!");
          } else if (error.response.status === 403) {
            this.setState({
              isLoading: false,
            });
            return toast.error("Unauthorized Access! Please try to logout..");
          } else if (error.response.status === 400) {
            this.setState({
              isLoading: false,
            });
            return toast.error(error.response.data.message);
          } else if (
            error.response.status === 404 ||
            error.response.status === 500
          ) {
            this.setState({
              isLoading: false,
            });
            return toast.error(
              "Server cannot be contacted! Please ask your system administrator!"
            );
          } else {
            this.setState({
              isLoading: false,
            });
            return toast.error(
              "Something went wrong... Please try again later..."
            );
          }
        } else if (error.request) {
          this.setState({
            isLoading: false,
          });
          return toast.error("Request error! Please try again later...");
        } else {
          this.setState({
            isLoading: false,
          });
          return toast.error(
            "Something went wrong... Please try again later..."
          );
        }
      });
  };

  handleAddMedicine = () => {
    const auth = cookie.load("token");
    this.setState({ isLoading: true });
    const {
      requestId,
      medicineOne,
      medicineOneQty,
      medicineTwo,
      medicineTwoQty,
      medicineThree,
      medicineThreeQty,
    } = this.state;
    let medicines = [];

    if (medicineOne) {
      medicines.push({
        medicine_id: medicineOne.value,
        quantity: medicineOneQty,
      });
    }

    if (medicineTwo) {
      medicines.push({
        medicine_id: medicineTwo.value,
        quantity: medicineTwoQty,
      });
    }

    if (medicineThree) {
      medicines.push({
        medicine_id: medicineThree.value,
        quantity: medicineThreeQty,
      });
    }

    axios({
      method: "post",
      url: API_LINKS.REQMED_ADD_URL,
      headers: {
        Authorization: auth,
      },
      data: { request_id: requestId, medicines },
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            axios({
              method: "post",
              url: API_LINKS.REQUEST_UPDATE_URL,
              headers: {
                Authorization: auth,
              },
              data: { id: requestId, status: 2 },
            }).then((response) => {
              if (response.status === 200) {
                this.setState({
                  isLoading: false,
                });
                this.toggleCloseMedicine();
                this.props.fetchUser();
                this.props.fetchRequest();

                return toast.success("Data obat berhasil ditambahkan!");
              }
            });
          } else {
            this.setState({
              isLoading: false,
            });
            return toast.error(response.data.message);
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            this.setState({
              isLoading: false,
            });
            return toast.error("Invalid credentials! Please try again!");
          } else if (error.response.status === 403) {
            this.setState({
              isLoading: false,
            });
            return toast.error("Unauthorized Access! Please try to logout..");
          } else if (error.response.status === 400) {
            this.setState({
              isLoading: false,
            });
            return toast.error(error.response.data.message);
          } else if (
            error.response.status === 404 ||
            error.response.status === 500
          ) {
            this.setState({
              isLoading: false,
            });
            return toast.error(
              "Server cannot be contacted! Please ask your system administrator!"
            );
          } else {
            this.setState({
              isLoading: false,
            });
            return toast.error(
              "Something went wrong... Please try again later..."
            );
          }
        } else if (error.request) {
          this.setState({
            isLoading: false,
          });
          return toast.error("Request error! Please try again later...");
        } else {
          this.setState({
            isLoading: false,
          });
          return toast.error(
            "Something went wrong... Please try again later..."
          );
        }
      });
  };

  render() {
    const {
      requests,
      requestProgress,
      medicineOptions,
      medicineProgress,
      users,
      userProgress,
    } = this.props;
    const {
      modalScanner,
      modalAdd,
      modalMedicine,
      isLoading,
      date,
      description,
      bp,
      height,
      weight,
      price,
      medicineOne,
      medicineOneQty,
      medicineTwo,
      medicineTwoQty,
      medicineThree,
      medicineThreeQty,
    } = this.state;

    return (
      <div>
        {requestProgress || medicineProgress || isLoading ? (
          <center>
            <BeatLoader
              color={"#1de9b6"}
              loading={requestProgress || medicineProgress || isLoading}
            />
            <br /> Loading.... Please wait...
          </center>
        ) : (
          this.showTable()
        )}

        {modalScanner ? (
          <Modal show={modalScanner} onHide={this.toggleCloseScanner}>
            <Modal.Header closeButton>
              <Modal.Title>Scan QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                facingMode="user"
              />
            </Modal.Body>
          </Modal>
        ) : null}

        {modalAdd ? (
          userProgress || !users ? (
            <center>
              <BeatLoader color={"#1de9b6"} loading={userProgress} />
              <br /> Loading.... Please wait...
            </center>
          ) : (
            <Modal show={modalAdd} onHide={this.toggleCloseAdd}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Data Pemeriksaan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="date">
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Tanggal Pemeriksaan"
                      value={moment(date).format("YYYY-MM-DD")}
                      disabled={isLoading}
                      autoComplete="off"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="name">
                    <Form.Label>Nama Pasien</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nama Pasien"
                      value={users[0]?.name}
                      disabled={true}
                      autoComplete="off"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="bpjs">
                    <Form.Label>No. BPJS</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="No. BPJS"
                      value={users[0]?.no_bpjs}
                      disabled={true}
                      autoComplete="off"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Keterangan</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Keterangan / Keluhan"
                      value={description}
                      onChange={(e) =>
                        this.setState({ description: e.target.value })
                      }
                      disabled={isLoading}
                      autoComplete="off"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="bp">
                    <Form.Label>Tekanan Darah</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="120/90"
                      value={bp}
                      onChange={(e) => this.setState({ bp: e.target.value })}
                      disabled={isLoading}
                      autoComplete="off"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="height">
                    <Form.Label>Tinggi (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="170 cm"
                      value={height}
                      onChange={(e) =>
                        this.setState({ height: e.target.value })
                      }
                      disabled={isLoading}
                      autoComplete="off"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="weight">
                    <Form.Label>Berat Badan (kg)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="80 kg"
                      value={weight}
                      onChange={(e) =>
                        this.setState({ weight: e.target.value })
                      }
                      disabled={isLoading}
                      autoComplete="off"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="price">
                    <Form.Label>Biaya</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={price}
                      onChange={(e) => this.setState({ price: e.target.value })}
                      disabled={isLoading}
                      autoComplete="off"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    size="sm"
                    onClick={this.handleAdd}
                    disabled={isLoading}
                  >
                    Tambah
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          )
        ) : null}

        {modalMedicine ? (
          medicineProgress || !medicineOptions ? (
            <center>
              <BeatLoader color={"#1de9b6"} loading={medicineProgress} />
              <br /> Loading.... Please wait...
            </center>
          ) : (
            <Modal show={modalMedicine} onHide={this.toggleCloseMedicine}>
              <Modal.Header closeButton>
                <Modal.Title>Resep Obat</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group controlId="obat1">
                        <Form.Label>Obat</Form.Label>
                        <Select
                          options={medicineOptions}
                          onChange={(medicineOne) =>
                            this.setState({ medicineOne })
                          }
                          value={medicineOne}
                          placeholder="Nama Obat"
                          isDisabled={isLoading}
                          isClearable
                          autoComplete="off"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="qty">
                        <Form.Label>Kuantitas</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="5"
                          value={medicineOneQty}
                          onChange={(e) =>
                            this.setState({ medicineOneQty: e.target.value })
                          }
                          disabled={isLoading}
                          autoComplete="off"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="obat2">
                        <Form.Label>Obat</Form.Label>
                        <Select
                          options={medicineOptions}
                          onChange={(medicineTwo) =>
                            this.setState({ medicineTwo })
                          }
                          value={medicineTwo}
                          placeholder="Nama Obat"
                          isDisabled={isLoading}
                          isClearable
                          autoComplete="off"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="qty">
                        <Form.Label>Kuantitas</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="5"
                          value={medicineTwoQty}
                          onChange={(e) =>
                            this.setState({ medicineTwoQty: e.target.value })
                          }
                          disabled={isLoading}
                          autoComplete="off"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="obat3">
                        <Form.Label>Obat</Form.Label>
                        <Select
                          options={medicineOptions}
                          onChange={(medicineThree) =>
                            this.setState({ medicineThree })
                          }
                          value={medicineThree}
                          placeholder="Nama Obat"
                          isDisabled={isLoading}
                          isClearable
                          autoComplete="off"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="qty">
                        <Form.Label>Kuantitas</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="5"
                          value={medicineThreeQty}
                          onChange={(e) =>
                            this.setState({ medicineThreeQty: e.target.value })
                          }
                          disabled={isLoading}
                          autoComplete="off"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={this.handleAddMedicine}
                    disabled={isLoading}
                  >
                    Tambah
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requests: state.requestStore.requests,
    requestProgress: state.requestStore.inProgress,

    medicines: state.medicineStore.medicines,
    medicineOptions: state.medicineStore.medicineOptions,
    medicineProgress: state.medicineStore.isLoading,

    users: state.userStore.users,
    userProgress: state.userStore.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchRequest,
  fetchMedicine,
  fetchUser,
})(withRouter(RequestDataTable));
