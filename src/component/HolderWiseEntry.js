import React from 'react';
import { connect } from 'react-redux';
import { Navbar, FormControl, Button } from 'react-bootstrap'
import NavigationBar from './NavigationBar'
import * as Icon from 'react-bootstrap-icons';
import * as companyMasterService from "../service/CompanyMasterService";
import { history } from './../helpers/history';

import * as actions from '../state/actions';

class CompanyWiseEntry extends React.Component {
    constructor(props) {
        super(props);

        var today = new Date(),
            date = (today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate()) + '/' + (today.getMonth() < 10 ? ('0' + today.getMonth()) : today.getMonth) + '/' + today.getFullYear();

        this.state = {
            searchTerm: '',
            searchResult: [],
            activeAccount: { id: '', name: '', userName: '', password: '', remarks: '' },
            activeCompanyTransaction: {},
            isDisabled: true,
            isUpdateCall: false,
            isSubmitted: false,
            date: date
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.deleteCompanyMaster = this.deleteCompanyMaster.bind(this);
    }

    componentDidMount() {
        this.getCompanyMasterList();
    }

    handleKeyDown(e, index) {
        if (e.key === 'Enter') {
            this.saveCompanyAccountTransaction(index);
        }
    }

    saveCompanyAccountTransaction(index) {
        const { dispatch } = this.props;
        dispatch(actions.request());
        const transaction = this.state.activeCompanyTransaction.transactions[index];
        companyMasterService.saveCompanyAccountTransaction(transaction)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                alert("Failed to update Group Holder.\nError:" + error);
            })
    }

    getCompanyMasterList() {
        const { dispatch } = this.props;
        dispatch(actions.request());
        companyMasterService.getAll()
            .then(response => {
                dispatch(actions.getCompanyMasterListSuccess(response.data));
                const { companyMasterList } = this.props;
                console.log(companyMasterList)
                this.setState({ searchResult: companyMasterList, isSubmitted: false, activeAccount: companyMasterList[0] })
                if (companyMasterList != []) {
                    this.getCompanyTransactions(companyMasterList[0].id);
                }

            })
            .catch(error => {
                alert("Failed to load Group Holder List.\nError:" + error)
            })
    }

    getCompanyTransactions(id) {
        const { dispatch } = this.props;
        dispatch(actions.request());
        companyMasterService.getCompanyTransactions(id)
            .then(response => {
                console.log(response);
                this.setState({ activeCompanyTransaction: response.data });
            })
    }

    deleteCompanyMaster() {
        if (window.confirm('Are you sure you wish to delete this group?')) {
            const { dispatch } = this.props;
            dispatch(actions.request());
            companyMasterService.deleteCompanyMaster(this.state.activeAccount.id)
                .then(response => {
                    console.log(response)
                    this.setState({ activeAccount: { id: '', name: '', baseRate: '', remarks: '' } });
                    this.getCompanyMasterList();
                })
                .catch(error => {
                    alert("Failed to delete Group Holder List.\nError:" + error)
                })
        }
    }

    handleChange(e, index) {
        const { name, value } = e.target;
        const activeCompanyTransaction = { ...this.state.activeCompanyTransaction };
        const transactions = activeCompanyTransaction.transactions;
        transactions[index].balance = value;
        const { rate, base, balance } = transactions[index];
        let pointPnl = (balance - base)
        let profitLoss = (pointPnl * rate)

        transactions[index].pointPnl = pointPnl.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
        });
        transactions[index].profitLoss = profitLoss.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        });

        this.setState({ activeCompanyTransaction: activeCompanyTransaction });
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
        if (activeAccount.name === '' || activeAccount.userName === '' || activeAccount.password === '' || activeAccount.remarks === '') {
            this.setState({ isSubmitted: true })
            return false;
        }
        return true;
    }

    render() {
        const { loggingIn } = this.props;
        const { searchTerm, activeAccount, isDisabled, isSubmitted, date, activeCompanyTransaction } = this.state;
        const { name, baseRate, remarks } = activeAccount;
        const { lastSaved } = activeCompanyTransaction;
        const items = []
        const elements = this.state.searchResult;
        for (const [index, value] of elements.entries()) {
            items.push(<li className={activeAccount.name === value.name ? "active item list-group-item" : "item list-group-item"}
                onClick={() => this.setState({ activeAccount: value, isDisabled: true, isSubmitted: false })} key={index}>{value.name}</li>)
        }

        const transactionRows = []
        const transactions = activeCompanyTransaction.transactions || [];
        let srNum = 1;
        for (const [index, value] of transactions.entries()) {
            transactionRows.push(
                <tr key={index}>
                    <td>{srNum}</td>
                    <td>{value.accountName}</td>
                    <td>{value.holderName}</td>
                    <td>{value.obalance}</td>
                    <td>{value.rate}</td>
                    <td>{value.base}</td>
                    <td><input style={{ 'width': '80%' }} type="text" value={value.balance} name="balance"
                        onChange={(e) => this.handleChange(e, index)}
                        onKeyDown={(e) => this.handleKeyDown(e, index)} /></td>
                    <td>{value.pointPnl}</td>
                    <td>{value.profitLoss}</td>
                </tr>
            )
            srNum++;
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
                                            <Button variant="warning" onClick={() => history.push('/')}><Icon.X />Close</Button>
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
                                    <div className="work-section col-12">
                                        <div className="row">
                                            <div className="col-3" style={{ 'padding': '0px' }}>
                                                <label className="lbl-heading" htmlFor="name">Company : {name}</label>
                                                {/* <input type="text" disabled={isDisabled} value={name} className="form-control" name="name" onChange={this.handleChange} />
                                                {isSubmitted && !name &&
                                                    <div className="help-block">Name is required</div>
                                                } */}
                                            </div>
                                            <div className="col-3" style={{ 'padding': '0px' }}></div>
                                            <div className="col-3" style={{ 'padding': '0px' }}></div>
                                            <div className="col-3" style={{ 'padding': '0px' }}>
                                                <label className="lbl-heading" htmlFor="userName">Date : {date}</label>
                                                {/* <input type="text" disabled={isDisabled} value={baseRate} className="form-control" name="baseRate" onChange={this.handleChange} />
                                                {isSubmitted && !baseRate &&
                                                    <div className="help-block">Base rate is required</div>
                                                } */}
                                            </div>
                                        </div>
                                        <div className="table-wrapper table-responsive">
                                            <table className="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" style={{ 'width': '5%' }}>Sr.</th>
                                                        <th scope="col" style={{ 'width': '10%' }}>Account</th>
                                                        <th scope="col" style={{ 'width': '10%' }}>Holder</th>
                                                        <th scope="col" style={{ 'width': '10%' }}>O.Balance</th>
                                                        <th scope="col" style={{ 'width': '5%' }}>Rate</th>
                                                        <th scope="col" style={{ 'width': '10%' }}>Base</th>
                                                        <th scope="col" style={{ 'width': '10%' }}>Balance</th>
                                                        <th scope="col" style={{ 'width': '10%' }}>Point P/L</th>
                                                        <th scope="col" style={{ 'width': '10%' }}>Profit/Loss (₹)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {transactionRows}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th scope="col">Total</th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                        <th scope="col">OBalance</th>
                                                        <th scope="col"></th>
                                                        <th scope="col">Base</th>
                                                        <th scope="col">Balance</th>
                                                        <th scope="col">Point P/L</th>
                                                        <th scope="col">Profit/Loss (₹)</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            {/* <label className="lbl-form" htmlFor="remakrs">Remarks :</label>
                                            <input type="text" disabled={isDisabled} value={remarks} className="form-control" name="remarks" onChange={this.handleChange} />
                                            {isSubmitted && !remarks &&
                                                <div className="help-block">Remarks are required</div>
                                            } */}
                                        </div>
                                        <div>{lastSaved}</div>
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

export default connect(mapStateToProps)(CompanyWiseEntry);