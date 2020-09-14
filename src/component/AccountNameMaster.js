import React from 'react';
import { connect } from 'react-redux';
import { Navbar, FormControl, Button } from 'react-bootstrap'
import NavigationBar from './NavigationBar'
import * as Icon from 'react-bootstrap-icons';
import * as accountNameMasterService from "../service/AccountNameMasterService";
import { history } from './../helpers/history';

import * as actions from '../state/actions';

class AccountNameMaster extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            searchResult: [],
            activeAccount: {},
            isDisabled: true,
            isUpdateCall: false,
            isSubmitted: false,
            error:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.saveOrUpdateAccountNameMaster = this.saveOrUpdateAccountNameMaster.bind(this);
        this.deleteAccountNameMaster = this.deleteAccountNameMaster.bind(this);
    }

    componentDidMount() {
        this.getAccountNameMasterList();
    }

    saveOrUpdateAccountNameMaster() {
        const isValid = this.validate();
        if (isValid) {
            const isUpdateCall = this.state.isUpdateCall
            const { dispatch } = this.props;
            dispatch(actions.request());
            if (isUpdateCall) {
                accountNameMasterService.update(this.state.activeAccount)
                    .then(response => {
                        console.log(response)
                        this.getAccountNameMasterList();
                        this.setState({ isDisabled: true, isUpdateCall: false })
                    })
                    .catch(error => {
                        alert("Failed to update Account Name.\nError : " + error);
                    })
            } else {
                accountNameMasterService.save(this.state.activeAccount)
                    .then(response => {
                        console.log(response)
                        this.getAccountNameMasterList();
                        this.setState({ isDisabled: true, activeAccount: response.data })
                    })
                    .catch(error => {
                        alert("Failed to create Account Name.\nError : " + error);
                    })
            }
        }
    }

    getAccountNameMasterList() {
        const { dispatch } = this.props;
        dispatch(actions.request());
        accountNameMasterService.getAll()
            .then(response => {
                dispatch(actions.getAccountNameMasterListSuccess(response.data));
                const { accountNameMasterList } = this.props;
                this.setState({ searchResult: accountNameMasterList, isSubmitted: false })
            })
            .catch(error => {
                alert("Failed to load Group Holder List.\nError:" + error)
            })
    }

    deleteAccountNameMaster() {
        if (window.confirm('Are you sure you wish to delete this group?')) {
            const { dispatch } = this.props;
            dispatch(actions.request());
            accountNameMasterService.deleteAccountNameMaster(this.state.activeAccount.id)
                .then(response => {
                    console.log(response)
                    this.setState({ activeAccount: { id: '', name: '', companyId: '', accountHolderMasterId: '', statusId: '' , rate:'', baseAmount:''} });
                    this.getAccountNameMasterList();
                })
                .catch(error => {
                    alert("Failed to delete Group Holder List.\nError:" + error)
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
        let result = this.props.AccountNameMasterList;
        result = result.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
        this.setState({ searchResult: result })
    }

    clearForm() {
        const isDisabled = this.state.isDisabled;
        this.setState({ isDisabled: !isDisabled, isSubmitted: false, activeAccount: { id: '', name: '', companyId: '', accountHolderMasterId: '', statusId: '' , rate:'', baseAmount:''} });
    }

    validate() {
        this.setState({ error:false})
        const activeAccount = this.state.activeAccount;
        if (activeAccount.name === '') {
            this.setState({ isSubmitted: true , error:true})
            return false;
        }else if(activeAccount.rate!= null && activeAccount.rate!='' && activeAccount.rate.toString().match(/^[+-]?\d+(\.\d+)?$/)===null){
            alert("Invalid Entry in Rate\nPlease Enter Numeric Values Only")
            return false;
        }else if(activeAccount.baseAmount!=null && activeAccount.baseAmount!='' && activeAccount.baseAmount.toString().match(/^[+-]?\d+(\.\d+)?$/)===null){
            alert("Invalid Entry in Base Amount\nPlease Enter Numeric Values Only")
            return false;
        }
        return true;
    }

    render() {
        const { loggingIn, companyMasterList, statusList, accountHolderMasterList } = this.props;
        const { searchTerm, activeAccount, isDisabled, isSubmitted ,error} = this.state;
        const { name, companyId, accountHolderMasterId, statusId, rate, baseAmount } = activeAccount;
        const items = []
        const elements = this.state.searchResult;
        for (const [index, value] of elements.entries()) {
            items.push(<li className={activeAccount.name === value.name ? "active item list-group-item" : "item list-group-item"}
                onClick={() => this.setState({ activeAccount: value, isDisabled: true, isSubmitted: false })} key={index}>{value.name}</li>)
        }

        const companyItems = []
        for (const [index, value] of companyMasterList.entries()) {
            companyItems.push(<option value={value.id} key={index}>{value.name}</option>)
        }

        const holderItems = []
        for (const [index, value] of accountHolderMasterList.entries()) {
            holderItems.push(<option value={value.id} key={index}>{value.name}</option>)
        }

        const statusItems = []
        for (const [index, value] of statusList.entries()) {
            statusItems.push(<option value={value.id} key={index}>{value.name}</option>)
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
                                        <li className="heading list-group-item disabled">Account Name</li>
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
                                            <Button variant="danger" onClick={this.deleteAccountNameMaster}><Icon.Trash />Delete</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="warning" onClick={() => history.push('/')}><Icon.X />Close</Button>
                                        </div>
                                    </Navbar>
                                </div>
                                <div hidden={isDisabled}>
                                    <Navbar bg="dark" variant="dark">
                                        <div className="btn-component">
                                            <Button variant="success" onClick={this.saveOrUpdateAccountNameMaster}><Icon.FileEarmark />Save</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="warning" onClick={this.clearForm}><Icon.X />Cancel</Button>
                                        </div>
                                    </Navbar>
                                </div>
                                <div className="inner-work-box row">
                                    <div className="work-section col-7">
                                        <div >
                                            <label className="lbl-form" htmlFor="name">Name:</label>
                                            <input type="text" disabled={isDisabled} value={name} className="form-control" name="name" onChange={this.handleChange} />
                                            {isSubmitted && error && !name &&
                                                <div className="help-block">Name is required</div>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-6" style={{ 'padding': '0px' }}>
                                                <label className="lbl-form" htmlFor="userName">Company :</label>
                                                <select disabled={isDisabled} value={companyId} class="custom-select mr-sm-2 form-control" name="companyId" id="inlineFormCustomSelect" onChange={this.handleChange}>
                                                    <option selected value=""></option>
                                                    {companyItems}
                                                </select>
                                                {/* {isSubmitted && error && !companyId &&
                                                    <div className="help-block">Company is required</div>
                                                } */}
                                            </div>

                                            <div className="col-6" style={{ 'paddingRight': '0px', 'paddingLeft': '1%' }}>
                                                <label className="lbl-form" htmlFor="password">Holder :</label>
                                                <select disabled={isDisabled} value={accountHolderMasterId} name="accountHolderMasterId" onChange={this.handleChange} class="custom-select mr-sm-2 form-control" id="inlineFormCustomSelect">
                                                    <option selected value=""></option>
                                                    {holderItems}
                                                </select>
                                                {/* {isSubmitted && error && !accountHolderMasterId &&
                                                    <div className="help-block">Holder is required</div>
                                                } */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3" style={{ 'padding': '0px' }}>
                                                <label className="lbl-form" htmlFor="userName">Rate :</label>
                                                <input type="text" disabled={isDisabled} value={rate} className="form-control" name="rate" onChange={this.handleChange} />
                                                {/* {isSubmitted && error && !rate &&
                                                    <div className="help-block">Rate is required</div>
                                                } */}
                                            </div>

                                            <div className="col-3" style={{ 'paddingRight': '0px', 'paddingLeft': '1%' }}>
                                                <label className="lbl-form" htmlFor="password">Base Amt. :</label>
                                                <input type="text" disabled={isDisabled} value={baseAmount} className="form-control" name="baseAmount" onChange={this.handleChange} />
                                                {/* {isSubmitted && error && !baseAmount &&
                                                    <div className="help-block">Base Amount is required</div>
                                                } */}
                                            </div>
                                            <div className="col-6" style={{ 'paddingRight': '0px', 'paddingLeft': '1%' }}>
                                                <label className="lbl-form" htmlFor="remakrs">Status:</label>
                                                <select disabled={isDisabled} value={statusId} class="custom-select mr-sm-2 form-control" name="statusId" id="inlineFormCustomSelect" onChange={this.handleChange}>
                                                    <option selected value=""></option>
                                                    {statusItems}
                                                </select>
                                                {/* {isSubmitted && !statusId && error &&
                                                    <div className="help-block">Status is required</div>
                                                } */}
                                            </div>
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
        accountNameMasterList: state.accountNameMasterReducer.accountNameMasterList,
        companyMasterList: state.companyMasterReducer.companyMasterList,
        accountHolderMasterList: state.accountHolderMasterReducer.accountHolderMasterList,
        statusList: state.accountHolderMasterReducer.statusList
    }
}

export default connect(mapStateToProps)(AccountNameMaster);