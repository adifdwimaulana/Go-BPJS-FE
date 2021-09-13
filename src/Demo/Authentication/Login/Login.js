import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { connect } from 'react-redux'
import './../../../assets/scss/style.scss'
import Aux from "../../../hoc/_Aux"
import { ClipLoader } from 'react-spinners'
import cookie from 'react-cookies'

import { fetchLogin, RESET_LOGIN } from '../../../redux/actions/users/auth'

class SignIn1 extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            loggedIn: false
        }
    }

    resetAuth = () => {
        this.props.resetAuthentication()
    }

    handleSubmit = () => {
        const { email, password } = this.state
        this.props.fetchLogin(email, password)
    }

    render () {
        const { email, password, loggedIn } = this.state
        const { isAuthenticated, authData, loginProgress } = this.props

        if(isAuthenticated == true && authData !== null && loggedIn == false){ 
            this.setState({loggedIn: true})

            return(
                <Redirect from="/login" to="/dashboard" />
            )
        }

        return(
            <Aux>
                <ToastContainer autoClose={5000} position="bottom-right"/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <Card>
                            <Card.Body>
                                <div className="mb-4 text-center">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4 text-center">Login</h3>
                                <Form>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={e => this.setState({email: e.target.value})} value={email} autoComplete="off" />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})} value={password} autoComplete="off" />
                                    </Form.Group>
                                    <Form.Group controlId="checkbox">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" block onClick={this.handleSubmit} disabled={loginProgress || !email || !password}>
                                        <div className="vh-center">
                                            {
                                                loginProgress ? <div className="m-0 p-0 vh-center"><ClipLoader size="18" loading={loginProgress} color="#fff" /> &nbsp;&nbsp; </div> : null
                                            }
                                            Login
                                        </div>
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.loginStore.isAuthenticated,
        authData: state.loginStore.authData,
        loginProgress: state.loginStore.inProgress,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetAuthentication: () => dispatch({type: RESET_LOGIN})
    }
}

export default connect(mapStateToProps, {...mapDispatchToProps, fetchLogin})(SignIn1);