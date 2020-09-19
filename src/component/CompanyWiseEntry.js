import React from 'react';
import { connect } from 'react-redux';
import { Navbar, FormControl, Button } from 'react-bootstrap'
import NavigationBar from './NavigationBar'
import * as Icon from 'react-bootstrap-icons';
import * as companyMasterService from "../service/CompanyMasterService";
import { history } from './../helpers/history';
import ReactToPrint from 'react-to-print'

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
            date: date,
            obalanceSum: 0,
            balanceSum: 0,
            pointPnlSum: 0,
            profitLossSum: 0,
            successMessage: false,
            isLogout: false,
            lastSaved:''
        };

        this.myRef = React.createRef();

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.clearTransactions = this.clearTransactions.bind(this);
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
        const transaction = this.state.activeCompanyTransaction.transactions[index];
        const result = transaction.balance.toString().match(/^[+-]?\d+(\.\d+)?$/);
        if (result == null) {
            alert("Invalid entry.\nPlease enter numeric values only.")
            return;
        }
        const { dispatch } = this.props;

        companyMasterService.saveCompanyAccountTransaction(transaction)
            .then(response => {
                console.log(response)
                this.showSuccessMessage();
                this.setState({lastSaved:response.data.lastSaved})
            })
            .catch(error => {
                if (error === 401) {
                    alert("Session Expired !!\nPlease login.")
                    this.setState({ isLogout: true })
                } else {
                    alert("Failed to update Group Holder Transaction.\nError : " + error);
                }
            })
    }

    getCompanyMasterList() {
        const { dispatch } = this.props;
        companyMasterService.getAll()
            .then(response => {
                dispatch(actions.getCompanyMasterListSuccess(response.data));
                const { companyMasterList } = this.props;
                console.log(companyMasterList)
                this.setState({ searchResult: companyMasterList, isSubmitted: false, activeAccount: companyMasterList[0] })
                if (companyMasterList != [] && companyMasterList.length > 0) {
                    this.getCompanyTransactions(companyMasterList[0]);
                }

            })
            .catch(error => {
                if (error === 401) {
                    alert("Session Expired !!\nPlease login.")
                    this.setState({ isLogout: true })
                } else {
                    alert("Failed to load Company List.\nError:" + error)
                }
            })
    }

    getCompanyTransactions(company) {
        const { dispatch } = this.props;
        companyMasterService.getCompanyTransactions(company.id)
            .then(response => {
                console.log(response);
                let activeCompanyTransaction = response.data;
                let obalanceSum = 0;
                let balanceSum = 0;
                let pointPnlSum = 0;
                let profitLossSum = 0;
                const transactions = activeCompanyTransaction.transactions;
                if (transactions != null) {
                    for (let tran of transactions) {
                        obalanceSum = obalanceSum + tran.obalance;
                        balanceSum = balanceSum + tran.balance;
                        pointPnlSum = pointPnlSum + tran.pointPnl;
                        profitLossSum = profitLossSum + tran.profitLoss;
                    }
                }

                this.setState({ activeCompanyTransaction: response.data, obalanceSum: obalanceSum, balanceSum: balanceSum, activeAccount: company, lastSaved:response.data.lastSaved,pointPnlSum: pointPnlSum, profitLossSum: profitLossSum });
            })
    }

    handleChange(e, index) {
        const { name, value } = e.target;
        const activeCompanyTransaction = { ...this.state.activeCompanyTransaction };
        const transactions = activeCompanyTransaction.transactions;
        transactions[index].balance = value;
        const { rate, base, balance } = transactions[index];
        let pointPnl = (balance - base)
        let profitLoss = (pointPnl * rate)
        transactions[index].pointPnl = pointPnl
        transactions[index].profitLoss = profitLoss
        let obalanceSum = 0;
        let balanceSum = 0;
        let pointPnlSum = 0;
        let profitLossSum = 0;
        for (let tran of transactions) {
            balanceSum = balanceSum + Number.parseFloat(tran.balance === '' ? 0 : tran.balance);
            pointPnlSum = pointPnlSum + tran.pointPnl;
            profitLossSum = profitLossSum + tran.profitLoss;
        }

        this.setState({ activeCompanyTransaction: activeCompanyTransaction, balanceSum: balanceSum ,pointPnlSum: pointPnlSum, profitLossSum: profitLossSum});
    }

    handleSearchChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        let result = this.props.CompanyMasterList;
        result = result.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
        this.setState({ searchResult: result })
    }

    clearTransactions(company) {
        const { dispatch } = this.props;
        companyMasterService.clearCompanyTransations(company.id)
            .then(response => {
                console.log(response);
                this.getCompanyTransactions(company)
            })
    }

    showSuccessMessage() {
        this.setState({ successMessage: true })
        setTimeout(() => {
            this.setState({ successMessage: false })
        }, 2000);
    }


    render() {
        const { searchTerm, activeAccount, isDisabled, isSubmitted, date, activeCompanyTransaction, obalanceSum, balanceSum, isLogout,lastSaved,profitLossSum, pointPnlSum  } = this.state;
        const { name, baseRate, remarks } = activeAccount || '';
        const items = []
        const elements = this.state.searchResult;
        for (const [index, value] of elements.entries()) {
            items.push(<li className={activeCompanyTransaction.id === value.id ? "active item list-group-item" : "item list-group-item"}
                onClick={() => this.getCompanyTransactions(value)} key={index}>{value.name}</li>)
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
                    {/* <td>{value.obalance}</td> */}
                    <td>{value.rate}</td>
                    <td>{value.base}</td>
                    <td><input style={{ 'width': '80%' }} type="text" value={value.balance} name="balance"
                        onChange={(e) => this.handleChange(e, index)}
                        onKeyDown={(e) => this.handleKeyDown(e, index)} /></td>
                    <td style={{ 'background-color': value.pointPnl >= 0 ? '#b6daad' : '#f1a9b4' }}>
                        {value.pointPnl.toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR'
                        })}
                    </td>
                    <td style={{ 'background-color': value.profitLoss >= 0 ? '#b6daad' : '#f1a9b4' }}>
                        {value.profitLoss.toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR'
                        })}
                    </td>
                </tr>
            )
            srNum++;
        }

        return (
            <div>
                <NavigationBar isLogout={isLogout} />
                <div className="outer-panel">
                    <div className="row" >
                        <div className="outer-search-panel col-sm-3">
                            <div className="inner-search-panel">
                                <div>
                                    <Navbar className="inner-nav navbar-custom">
                                        <div className="col-12">
                                            <FormControl type="text" value={searchTerm} placeholder="Search" name="searchTerm" onChange={this.handleSearchChange} />
                                        </div>
                                    </Navbar>
                                </div>
                                <div className="inner-search-box">
                                    <ul className="list-group">
                                        <li className="heading list-group-item disabled navbar-custom">Company Name</li>
                                        {items}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="outer-work-panel col-sm-9">
                            <div className="inner-work-panel">
                                <div>
                                    <Navbar className="navbar-custom">
                                        {/* <div className="btn-component">
                                            <Button variant="success"><Icon.FileEarmark />Save</Button>
                                        </div> */}
                                        <div className="btn-component">
                                            <Button variant="danger"
                                                onClick={() => this.clearTransactions(this.state.activeAccount)}><Icon.Trash />Clear</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="primary" onClick={() => window.print()}><Icon.Printer />Print</Button>
                                        </div>
                                        {/* <div className="btn-component">
                                            <ReactToPrint
                                                trigger={() => {
                                                    return (
                                                        <div>
                                                            <Button variant="primary"><Icon.Printer />Print</Button>
                                                        </div>
                                                    )
                                                }}
                                                content={() => this.myRef}
                                            />
                                        </div> */}

                                        <div className="btn-component">
                                            <Button variant="warning" onClick={() => history.push('/')}><Icon.X />Close</Button>
                                        </div>
                                        <label className={this.state.successMessage ? 'success-message' : 'hidden'}>Transaction Saved Successfully</label>
                                    </Navbar>
                                </div>
                                <div className="inner-work-box row">
                                    <div className="work-section col-12">
                                        <div className="row">
                                            <div className="col-5" style={{ 'padding': '0px' }}>
                                                <label className="lbl-heading" htmlFor="name">Company : {name}</label>
                                                {/* <input type="text" disabled={isDisabled} value={name} className="form-control" name="name" onChange={this.handleChange} />
                                                {isSubmitted && !name &&
                                                    <div className="help-block">Name is required</div>
                                                } */}
                                            </div>
                                            <div className="col-2" style={{ 'padding': '0px' }}></div>
                                            <div className="col-2" style={{ 'padding': '0px' }}></div>
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
                                                        {/* <th scope="col" style={{ 'width': '10%' }}>O.Balance</th> */}
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
                                                        {/* <th scope="col">{obalanceSum}</th> */}
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                        <th scope="col">{balanceSum}</th>
                                                        <th scope="col">
                                                            {pointPnlSum.toLocaleString('en-IN', {
                                                                maximumFractionDigits: 2,
                                                                // style: 'currency',
                                                                // currency: 'INR'
                                                            })}
                                                        </th>
                                                        <th scope="col">
                                                            {profitLossSum.toLocaleString('en-IN', {
                                                                maximumFractionDigits: 2,
                                                                style: 'currency',
                                                                currency: 'INR'
                                                            })}
                                                        </th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            {/* <label className="lbl-form" htmlFor="remakrs">Remarks :</label>
                                            <input type="text" disabled={isDisabled} value={remarks} className="form-control" name="remarks" onChange={this.handleChange} />
                                            {isSubmitted && !remarks &&
                                                <div className="help-block">Remarks are required</div>
                                            } */}
                                        </div>
                                        <div style={{'display':lastSaved?'':'none'}}> Last Saved : {lastSaved}</div>
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