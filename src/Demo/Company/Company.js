import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Aux from '../../hoc/_Aux'
import { connect } from 'react-redux'

import { fetchCompany } from '../../redux/actions/companies/getCompanies'

import CompanyDataTable from './CompanyDataTable'

class Company extends React.Component {
    
    componentWillMount = () => {
        this.props.fetchCompany()
    }

    render(){
        const { companies } = this.props

        return(
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Management Company</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <CompanyDataTable data={companies} active />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        companies: state.companyStore.companies,
        companiesOptions: state.companyStore.companiesOptions,
        companiesCount: state.companyStore.companiesCount,
        companyProgress: state.companyStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchCompany})(Company)