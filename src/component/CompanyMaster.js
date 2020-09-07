import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap'
import NavigationBar from './NavigationBar'
import * as Icon from 'react-bootstrap-icons';
import * as companyMasterService from "../service/CompanyMasterService";
import {history} from './../helpers/history';

import * as actions from '../state/actions';

class CompanyMaster extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            searchResult: [],
            activeAccount: { id: '', name: '', userName: '', password: '', remarks: '' },
            isDisabled: true,
            isUpdateCall: false,
            isSubmitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.saveOrUpdatecompanyMaster = this.saveOrUpdatecompanyMaster.bind(this);
        this.deleteCompanyMaster = this.deleteCompanyMaster.bind(this);
    }

    componentDidMount() {
        this.getCompanyMasterList();
    }

    saveOrUpdatecompanyMaster() {
        const isValid = this.validate();
        if (isValid) {
            const isUpdateCall = this.state.isUpdateCall
            const { dispatch } = this.props;
            dispatch(actions.request());
            if (isUpdateCall) {
                companyMasterService.update(this.state.activeAccount)
                    .then(response => {
                        console.log(response)
                        this.getCompanyMasterList();
                        this.setState({ isDisabled: true, isUpdateCall: false })
                    })
                    .catch(error => {
                        alert("Failed to update Group Holder.\nError:"+error);
                    })
            } else {
                companyMasterService.save(this.state.activeAccount)
                    .then(response => {
                        console.log(response)
                        this.getCompanyMasterList();
                        this.setState({ isDisabled: true,activeAccount:response.data})
                    })
                    .catch(error => {
                        alert("Failed to create Group Holder.\nError:"+error);
                    })
            }
        }
    }

    getCompanyMasterList() {
        const { dispatch } = this.props;
        dispatch(actions.request());
        companyMasterService.getAll()
            .then(response => {
                dispatch(actions.getCompanyMasterListSuccess(response.data));
                const { companyMasterList } = this.props;
                console.log(companyMasterList)
                this.setState({ searchResult: companyMasterList, isSubmitted: false })
            })
            .catch(error=>{
                alert("Failed to load Group Holder List.\nError:"+error)
            })
    }

    deleteCompanyMaster() {
        if (window.confirm('Are you sure you wish to delete this group?')) {
            const { dispatch } = this.props;
            dispatch(actions.request());
            companyMasterService.deleteCompanyMaster(this.state.activeAccount.id)
                .then(response => {
                    console.log(response)
                    this.setState({activeAccount: { id: '', name: '', baseRate: '', remarks: '' }});
                    this.getCompanyMasterList();
                })
                .catch(error => {
                    alert("Failed to delete Group Holder List.\nError:"+error)
                })
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ activeAccount: { ...this.state.activeAccount, [name]: value } });
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

    handleSearchChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        let result = this.props.CompanyMasterList;
        result = result.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
        this.setState({ searchResult: result })
    }

    clearForm() {
        const isDisabled = this.state.isDisabled;
        this.setState({ isDisabled: !isDisabled, isSubmitted: false, activeAccount: { id: '', name: '', baseRate: '', remarks: '' } });
    }

    validate() {
        const activeAccount = this.state.activeAccount;
        if (activeAccount.name == '' || activeAccount.userName == '' || activeAccount.password == '' || activeAccount.remarks == '') {
            this.setState({ isSubmitted: true })
            return false;
        }
        return true;
    }

    render() {
        const { loggingIn } = this.props;
        const { searchTerm, activeAccount, isDisabled, isSubmitted } = this.state;
        const { name, baseRate, remarks } = activeAccount;
        const items = []
        const elements = this.state.searchResult;
        for (const [index, value] of elements.entries()) {
            items.push(<li className={activeAccount.name == value.name ? "active item list-group-item" : "item list-group-item"}
                onClick={() => this.setState({ activeAccount: value, isDisabled: true, isSubmitted: false })} key={index}>{value.name}</li>)
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
                                            <FormControl type="text" value={searchTerm} placeholder="Search" name="searchTerm" onChange={this.handleSearchChange} />
                                        </div>
                                    </Navbar>
                                </div>
                                <div className="inner-search-box">
                                    <ul className="list-group">
                                        <li className="heading list-group-item disabled">Company Name</li>
                                        {items}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="outer-work-panel col-sm-9">
                            <div className="inner-work-panel">
                                <div hidden={!isDisabled}>
                                    <Navbar bg="dark" variant="dark">
                                        <div className="btn-component">
                                            <Button variant="success" onClick={this.clearForm}><Icon.Plus />New</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="primary"
                                                onClick={() => this.setState({ isDisabled: false, isUpdateCall: true })}><Icon.Check />Modify</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="danger" onClick={this.deleteCompanyMaster}><Icon.Trash />Delete</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="warning" onClick={()=>history.push('/')}><Icon.X />Close</Button>
                                        </div>
                                    </Navbar>
                                </div>
                                <div hidden={isDisabled}>
                                    <Navbar bg="dark" variant="dark">
                                        <div className="btn-component">
                                            <Button variant="success" onClick={this.saveOrUpdatecompanyMaster}><Icon.FileEarmark />Save</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="warning" onClick={this.clearForm}><Icon.X />Cancel</Button>
                                        </div>
                                    </Navbar>
                                </div>
                                <div className="inner-work-box row">
                                    <div className="col-7">
                                        <div >
                                            <label className="lbl-form" htmlFor="name">Name :</label>
                                            <input type="text" disabled={isDisabled} value={name} className="form-control" name="name" onChange={this.handleChange} />
                                            {isSubmitted && !name &&
                                                <div className="help-block">Name is required</div>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-6" style={{ 'padding': '0px' }}>
                                                <label className="lbl-form" htmlFor="userName">Base Rate :</label>
                                                <input type="text" disabled={isDisabled} value={baseRate} className="form-control" name="baseRate" onChange={this.handleChange} />
                                                {isSubmitted && !baseRate &&
                                                    <div className="help-block">Base rate is required</div>
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <label className="lbl-form" htmlFor="remakrs">Remarks :</label>
                                            <input type="text" disabled={isDisabled} value={remarks} className="form-control" name="remarks" onChange={this.handleChange} />
                                            {isSubmitted && !remarks &&
                                                <div className="help-block">Remarks are required</div>
                                            }
                                        </div>
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
    return {
        companyMasterList: state.companyMasterReducer.companyMasterList
    }
}

export default connect(mapStateToProps)(CompanyMaster);