import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import { history } from '../helpers/history';
import * as loginService from "../service/LoginService";

class NavigationBar extends React.Component {
   

    constructor(props) {
        super(props)
        this.state = { isOpen: false }
    }

    componentDidMount(props) {
        if(this.props.isLogout === true){
            this.logout();
        }
    }

    handleOpen = () => {
        this.setState({ isOpen: true })
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    logout() {
        // loginService.logout()
        // .then(response=>{
        //     console.log(response)
        // }).catch(error => {
        //     console.log(error)
        // })
        localStorage.removeItem('token');
        history.push('/login');
    }

    render() {
        return (
            <div>
                <Navbar className="navbar navbar-dark bg-dark" expand="lg">
                    <Navbar.Brand style={{"color":"#ffffff"}} href="" onClick={()=>history.push('/')}>G-Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <NavDropdown
                                title="Master"
                                id="master-dropdown"
                                onMouseEnter={(e) => document.getElementById("master-dropdown").click()}
                                onMouseLeave={(e) => document.getElementById("master-dropdown").click()}
                            >
                                <NavDropdown.Item href="" onClick={()=>history.push('/account-master')}>Account Name Master</NavDropdown.Item>
                                <NavDropdown.Item href="" onClick={()=>history.push('/holder-master')}>Account Holder Master</NavDropdown.Item>
                                <NavDropdown.Item href="" onClick={()=>history.push('/company-master')}>Company Master</NavDropdown.Item>
                                <NavDropdown.Item href="" onClick={()=>history.push('/holder-group-master')}>Holder Group Master</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title="Transactions"
                                id="transactions-dropdown"
                                className="navbar-dropdown"
                                onMouseEnter={(e) => document.getElementById("transactions-dropdown").click()}
                                onMouseLeave={(e) => document.getElementById("transactions-dropdown").click()}
                            >
                                <NavDropdown.Item href="" onClick={()=>history.push('/data-entry-company')}>Company wise Entry</NavDropdown.Item>
                                <NavDropdown.Item href="" onClick={()=>history.push('/data-entry-holder')}>Holder wise Entry</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown
                                title={<Icon.Person />}
                                id="person-dropdown"
                                className="navbar-dropdown"
                                onMouseEnter={(e) => document.getElementById("person-dropdown").click()}
                                onMouseLeave={(e) => document.getElementById("person-dropdown").click()}
                            >
                                <NavDropdown.Item href="" onClick={()=>this.logout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            
                        </Nav>
                        {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;