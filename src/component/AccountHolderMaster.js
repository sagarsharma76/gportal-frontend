import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap'
import NavigationBar from './NavigationBar'
import * as Icon from 'react-bootstrap-icons';

import * as actions from '../state/actions';

class AccountHolderMaster extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(actions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(actions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
                <NavigationBar />
                <div className="outer-panel">
                    <div className="row" >
                        <div className="outer-search-panel col-sm-3">
                            <div className="inner-search-panel">
                                <div>
                                    <Navbar className="inner-nav" bg="dark" variant="dark">
                                        <div className="col-12">
                                            <FormControl type="text" placeholder="Search" />
                                        </div>
                                    </Navbar>
                                </div>
                                <div className="inner-search-box">
                                    <ul class="list-group">
                                        <li class="heading list-group-item disabled">Group Name</li>
                                        <li class="item list-group-item" onClick={() => alert("hello")}>Cras justo odio</li>
                                        <li class="item list-group-item">Dapibus ac facilisis in</li>
                                        <li class="item list-group-item">Morbi leo risus</li>
                                        <li class="item list-group-item">Porta ac consectetur ac</li>
                                        <li class="item list-group-item">Vestibulum at eros</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="outer-work-panel col-sm-9">
                            <div className="inner-work-panel">
                                <div>
                                    <Navbar bg="dark" variant="dark">

                                        <div className="btn-component">
                                            <Button variant="success"><Icon.Plus />New</Button>
                                        </div>

                                        <div className="btn-component">
                                            <Button variant="primary"><Icon.Check />Modify</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="danger"><Icon.Trash />Delete</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="warning"><Icon.X />Close</Button>
                                        </div>

                                    </Navbar>
                                </div>
                                <div className="inner-work-box row">
                                    <div className="col-7">
                                        <div >
                                            <label className="lbl-form" htmlFor="name">Name:</label>
                                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                            {submitted && !username &&
                                                <div className="help-block">Username is required</div>
                                            }
                                        </div>
                                        <div >
                                            <label className="lbl-form" htmlFor="password">App Username</label>
                                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                            {submitted && !password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                        </div>

                                        <div>
                                            <label className="lbl-form" htmlFor="password">App Password</label>
                                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                            {submitted && !password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                        </div>
                                        <div>
                                            <label className="lbl-form" htmlFor="password">Remarks</label>
                                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                            {submitted && !password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps)(AccountHolderMaster);