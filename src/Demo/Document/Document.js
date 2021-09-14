import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Aux from "../../hoc/_Aux";

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    fontSize: 25,
    textAlign: "center",
    fontSize: "14pt",
    fontWeight: "bold",
  },
  title2: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
    fontSize: "11pt",
    marginTop: 5,
  },
  body: {
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
    marginLeft: 20,
    width: 350,
    padding: 5,
    fontSize: "10pt",
  },
  block: {
    flexGrow: 1,
  },
  text: {
    width: "60%",
    margin: 10,
    textAlign: "justify",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 10,
  },
});

const DocumentRequest = () => {
    const requestMedicines = false; //state filter

    const dataDummy = 
    {
      id: 1,
      date: "2021-09-12T00:00:00.000Z",
      nurse_id: 4,
      doctor_id: 3,
      organization_id: 2,
      drugstore_id: 4,
      user_id: 15,
      description: "Gejala Hyperthyroid",
      bp: "120/90",
      height: 165,
      weight: 53,
      price: 150000,
      status: 4,
      createdAt: "2021-09-12T08:36:22.258Z",
      updatedAt: "2021-09-12T08:43:32.645Z",
      medicines: [
        {
          id: 6,
          name: "Asam Mefenamat",
          dose: 500,
          price: 5000,
          quantity: 100,
          reqmeds: {
            id: 1,
            request_id: 1,
            medicine_id: 6,
            quantity: 2,
          },
          Requestmedicines: {
            createdAt: "2021-09-12T08:41:11.125Z",
            updatedAt: "2021-09-12T08:41:11.125Z",
            medicine_id: 6,
            request_id: 1,
          },
        },
        {
          id: 7,
          name: "Piroxicam",
          dose: 20,
          price: 4500,
          quantity: 100,
          reqmeds: {
            id: 2,
            request_id: 1,
            medicine_id: 7,
            quantity: 4,
          },
          Requestmedicines: {
            createdAt: "2021-09-12T08:41:17.450Z",
            updatedAt: "2021-09-12T08:41:17.450Z",
            medicine_id: 7,
            request_id: 1,
          },
        },
      ],
      no: 1,
    }
  return (
    <Aux>
      <Row>
        <Col md={12} xl={12}>
          <div className="offline-box">
            <PDFViewer>
              <Document>
                <Page size="A4">
                  <Text style={styles.title}>RUMAH SAKIT RIZANI</Text>
                  <Text style={styles.title2}>Dokumen {requestMedicines?"Permintaan Obat":"Pemeriksaan"}</Text>
                  <View style={styles.body}>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:142}}>
                            <Text style={{ textAlign: "left" }}>Tanggal</Text>
                            <Text style={{ textAlign: "left", marginRight:5 }}>: </Text>
                        </View>
                        <Text style={{ textAlign: "left", textAlign:'justify', fontSize:'10pt' }}>
                          2021/08/22
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:142}}>
                            <Text style={{ textAlign: "left" }}>Nama Pasien</Text>
                            <Text style={{ textAlign: "left", marginRight:5 }}>: </Text>
                        </View>
                        <Text style={{ textAlign: "left", textAlign:'justify', fontSize:'10pt' }}>
                          is simply dummy 
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:142}}>
                            <Text style={{ textAlign: "left" }}>Dokter yang memeriksa</Text>
                            <Text style={{ textAlign: "left", marginRight:5 }}>: </Text>
                        </View>
                        <Text style={{ textAlign: "left", textAlign:'justify', fontSize:'10pt' }}>
                          is simply dummy 
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:142}}>
                            <Text style={{ textAlign: "left" }}>{requestMedicines?"Apotik Rujukan":"Faskes"}</Text>
                            <Text style={{ textAlign: "left", marginRight:5 }}>: </Text>
                        </View>
                        <Text style={{ textAlign: "left", textAlign:'justify', fontSize:'10pt' }}>
                          is simply dummy 
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:246}}>
                            <Text style={{ textAlign: "left" }}>Deskripsi</Text>
                            <Text style={{ textAlign: "left", marginRight:5 }}>: </Text>
                        </View>
                        <Text style={{ textAlign: "left", textAlign:'justify', fontSize:'10pt' }}>
                          {" "}
                          is simply dummy text of the printing and typesetting
                          industry. Lorem Ipsum has been the industry's standard
                          dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make
                          a type specimen book. It has survived not only five
                          centuries, but also the leap into electronic
                          typesetting, remaining essentially unchanged. It was
                          popularised in the 1960s with the release of Letraset
                          sheets containing Lorem Ipsum passages, and more
                          recently with desktop publishin
                        </Text>
                    </View>
                    <View style={{ padding: 40 }}>
                      <View style={styles.table}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>No.</Text>
                          </View>
                          <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Nama Obat</Text>
                          </View>
                          <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Jumlah</Text>
                          </View>
                          <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Penggunaan</Text>
                          </View>
                        </View>
                        {
                                dataDummy.medicines.map((med,id)=>{
                                    return(
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{id+1}.</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{med.name}.</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{med.quantity}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>
                                            {med.dose}
                                            </Text>
                                        </View>
                                    </View>
                                )
                                })
                        }
                        </View>
                    </View>
                    <View style={{fontSize:'10pt', padding:5, position:'absolute', bottom:100, left:40}}>
                        <Text style={{marginBottom:10}}>{requestMedicines?"Menyetujui":"Mengetahui"}</Text>
                        <Text style={{marginBottom:70}}>Probolinggo, {moment(dataDummy.date).format('DD MMMM YYYY')}</Text>
                        <Text>Dr. Iwan</Text>
                    </View>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </div>
        </Col>
      </Row>
    </Aux>
  );
};

export default DocumentRequest;
