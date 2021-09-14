import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";
import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import { useLocation } from "react-router-dom";
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
    marginBottom: 50,
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
    marginLeft: 40,
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
    width: "30%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeaderNo: {
    width: "10%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "30%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColNo: {
    width: "10%",
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

const DocumentRequest = (props) => {

  const location = props.location
  const data = location?.state
  const requestMedicines = data?.isReqmed || false; //state filter
  const dataDokter = [
    { id: 3, name: 'dr. Ari' },
    { id: 2, name: 'dr. Iwan' }
  ]
  const handleDate = (date, type) => {
    const  fixDate = moment(date).format(type==='ttd'?"DD-MMMM-YYYY":'YYYY/MM/DD');
    return fixDate;
  }

  const convertToRupiah = angka => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('');
  };
  
  const doctorName = dataDokter.filter((item)=>{
    return item.id === data?.doctor_id
  })
  
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
                          {handleDate(data?.date, "normal")||''}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:142}}>
                            <Text style={{ textAlign: "left" }}>Nama Pasien</Text>
                            <Text style={{ textAlign: "left", marginRight:5 }}>: </Text>
                        </View>
                        <Text style={{ textAlign: "left", textAlign:'justify', fontSize:'10pt' }}>
                          {data?.user?.name||''}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:142}}>
                            <Text style={{ textAlign: "left" }}>Dokter yang memeriksa</Text>
                            <Text style={{ textAlign: "left", marginRight:5 }}>: </Text>
                        </View>
                        <Text style={{ textAlign: "left", textAlign:'justify', fontSize:'10pt' }}>
                          {doctorName[0]?.name || ''}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:142}}>
                            <Text style={{ textAlign: "left" }}>Deskripsi</Text>
                            <Text style={{ textAlign: "left", marginRight:5 }}>: </Text>
                        </View>
                        <Text style={{ textAlign: "left", textAlign:'justify', fontSize:'10pt' }}>
                        {data?.description||''}
                        </Text>
                    </View>
                    <View style={{ padding: 40 }}>
                      <View style={styles.table}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableColHeaderNo}>
                            <Text style={styles.tableCellHeader}>No.</Text>
                          </View>
                          <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Nama Obat</Text>
                          </View>
                          <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Jumlah</Text>
                          </View>
                          <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Harga</Text>
                          </View>
                        </View>
                        {
                                data?.medicines?.map((med,id)=>{
                                    return(
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableColNo}>
                                            <Text style={styles.tableCell}>{id+1||''}.</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{med.name||''} {`(${med.dose||''} mg)`}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{med.reqmeds.quantity||''} lembar</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>
                                            Rp. {convertToRupiah(med.price||0)}
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
                        <Text style={{marginBottom:70}}>Probolinggo, {handleDate(data?.date||'', "ttd")}</Text>
                        <Text>{doctorName[0]?.name||''}</Text>
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


export default withRouter(DocumentRequest);
