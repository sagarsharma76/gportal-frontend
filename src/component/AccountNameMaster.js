import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap'
import NavigationBar from './NavigationBar'
import * as Icon from 'react-bootstrap-icons';

import * as actions from '../state/actions';

class AccountNameMaster extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(actions.logout());

        this.state = {
            list:['abc','def','ghi','aed'],
            searchTerm:'',
            searchResult:[],
            activeAccount:null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentDidMount(){
        
        const list = this.state.list;
        this.setState({searchResult:list})
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

    handleSearchChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value});
        let result = this.state.list;
        result = result.filter(item=>item.toLowerCase().includes(value.toLowerCase()))
        this.setState({searchResult:result})
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        const items = []
        const elements = this.state.searchResult;
        for (const [index, value] of elements.entries()) {
            items.push(<li className="item list-group-item" key={index}>{value}</li>)
          }
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
                                        <li class="heading list-group-item disabled">Account Name</li>
                                        {items}
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
                                            {/* {submitted && !username &&
                                                <div className="help-block">Username is required</div>
                                            } */}
                                        </div>
                                        <div className="row">
                                            <div className="col-6" style={{ 'padding': '0px' }}>
                                                <label className="lbl-form" htmlFor="compamy">Company:</label>
                                                <select class="form-control" id="Company" name="Company">
                                                    <option>Python</option>
                                                    <option>C++</option>
                                                    <option>C#</option>
                                                    <option>Java</option>
                                                </select>
                                                {/* {submitted && !password &&
                                                <div className="help-block">Password is required</div>
                                            } */}
                                            </div>
                                            <div className="col-6" style={{ 'padding-right': '0px', 'padding-left': '1%' }}>
                                                <label className="lbl-form" htmlFor="holder">Holder:</label>
                                                <select class="form-control" id="holder" name="holder">
                                                    <option>Python</option>
                                                    <option>C++</option>
                                                    <option>C#</option>
                                                    <option>Java</option>
                                                </select>
                                                {/* {submitted && !password &&
                                                    <div className="help-block">Password is required</div>
                                                } */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4" style={{ 'padding': '0px' }}>
                                                <label className="lbl-form" htmlFor="rate">Rate:</label>
                                                <input type="text" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                                {/* {submitted && !password &&
                                                    <div className="help-block">Password is required</div>
                                                } */}
                                            </div>
                                            <div className="col-4" style={{ 'padding-right': '0px', 'padding-left': '1%' }}>
                                                <label className="lbl-form" htmlFor="baseamnt">Base Amnt. :</label>
                                                <input type="text" className="form-control" name="baseamnt" value={password} onChange={this.handleChange} />
                                                {submitted && !password &&
                                                    <div className="help-block">Password is required</div>
                                                }
                                            </div>
                                            <div className="col-4" style={{ 'padding-right': '0px', 'padding-left': '1%' }}>
                                                <label className="lbl-form" htmlFor="status">Status:</label>
                                                <select class="form-control" id="Company" name="Company">
                                                    <option>Python</option>
                                                    <option>C++</option>
                                                    <option>C#</option>
                                                    <option>Java</option>
                                                </select>
                                                {submitted && !password &&
                                                    <div className="help-block">Password is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps)(AccountNameMaster);