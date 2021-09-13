import React from 'react';
import {Row, Col, Card, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { Line, Chart } from 'react-chartjs-2';
import cookie from 'react-cookies'
import Aux from "../../hoc/_Aux";
import Map from '../Location/Map';
import SummaryWidget from '../Widgets/SummaryWidget';
import DEMO from "../../store/constant";
import moment from 'moment';

import { fetchLocation } from '../../redux/actions/locations/getLocations';
import { fetchRectangle } from '../../redux/actions/locations/getRectangle';
import { fetchReport } from '../../redux/actions/report/getReport'

const data = {
    labels: [],
    datasets: [
      {
        label: "EEOI vs Timestamp",
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
};

class Dashboard extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            chartOptions: {
                tension: 0,
                legend: {
                    display: false
                },
                maintainAspectRatio: false
            },
            rendered: false
        }
    }

    componentWillMount = () => {
        // Fetch Report
    }

    render() {

        return (
            <Aux>
                <div>
                    <Row>
                        <Col md="4" xl="4">
                            <SummaryWidget title="Laporan Harian" value={5} color="green" icon="icon-arrow-up" />
                        </Col>
                        <Col md="4" xl="4">
                            <SummaryWidget title="Laporan Mingguan" value={5} color="blue" icon="icon-arrow-right" />
                        </Col>
                        <Col md="4" xl="4">
                            <SummaryWidget title="Laporan Bulanan" value={5} color="red" icon="icon-arrow-down" />
                        </Col>
                    </Row>
                    <Row>
                        <Col> 
                            <Card className='Recent-Users'>
                                <Card.Header>
                                    <Card.Title as='h5'>{cookie.load('roleId') < 3 ? 'Laporan Pemeriksaan' : 'Laporan Permintaan Obat'}</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, {fetchLocation, fetchRectangle, fetchReport})(Dashboard);