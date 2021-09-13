import React from 'react'
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import DEMO from "../../store/constant";

const propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType(['string', 'number']),
    percentage: PropTypes.number,
    color: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.string
}

const defaultProps = {
    title: 'Daily Transaction',
    value: 'Rp. 249.95',
    color: 'green',
    icon: 'icon-arrow-up',
    link: DEMO.BLANK_LINK
}

const SummaryWidget = ({title, value, percentage, color, icon, link, children}) => {
    return(
        <div>
            <Card>
                <Link to={link}>
                    <Card.Body>
                        <h6 className='mb-4'>{title}</h6>
                        <div className="row d-flex align-items-center">
                            <div className="col-12">
                                <h5 style={{display: 'flex', alignItems: 'center', width: '100%'}} className="f-w-300 m-b-0"><i className={`feather ${icon} text-c-${color} f-30 m-r-5`}/>{value}</h5>
                            </div>
                        </div>
                        { children }
                    </Card.Body>
                
                </Link>
            </Card>
        </div>
    )
}

SummaryWidget.propTypes = propTypes
SummaryWidget.defaultProps = defaultProps

export default SummaryWidget