import React from 'react';
import { connect } from 'react-redux';
import { Navbar, FormControl, Button } from 'react-bootstrap'
import NavigationBar from './NavigationBar'
import * as Icon from 'react-bootstrap-icons';
import * as holderGroupMasterService from "../service/HolderGroupMasterService";
import { history } from './../helpers/history';

import * as actions from '../state/actions';

class HolderGroupMaster extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            searchResult: [],
            activeAccount: { id: '', name: '', userName: '', password: '', remarks: '' },
            isDisabled: true,
            isUpdateCall: false,
            isSubmitted: false,
            isLogout: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.saveOrUpdateHolderGroupMaster = this.saveOrUpdateHolderGroupMaster.bind(this);
        this.deleteHolderGroupMaster = this.deleteHolderGroupMaster.bind(this);
    }

    componentDidMount() {
        this.getHolderGroupMasterList();
    }

    saveOrUpdateHolderGroupMaster() {
        const isValid = this.validate();
        if (isValid) {
            const isUpdateCall = this.state.isUpdateCall
            const { dispatch } = this.props;
            if (isUpdateCall) {
                holderGroupMasterService.update(this.state.activeAccount)
                    .then(response => {
                        console.log(response)
                        this.getHolderGroupMasterList();
                        this.setState({ isDisabled: true, isUpdateCall: false })
                    })
                    .catch(error => {
                        if (error === 401) {
                            alert("Session Expired !!\nPlease login.")
                            this.setState({ isLogout: true })
                        } else {
                            alert("Failed to update Group Holder.\nError : " + error);
                        }
                    })
            } else {
                holderGroupMasterService.save(this.state.activeAccount)
                    .then(response => {
                        console.log(response)
                        this.getHolderGroupMasterList();
                        this.setState({ isDisabled: true, activeAccount: response.data })
                    })
                    .catch(error => {
                        if (error === 401) {
                            alert("Session Expired !!\nPlease login.")
                            this.setState({ isLogout: true })
                        } else {
                            alert("Failed to create Group Holder.\nError : " + error);
                        }
                    })
            }
        }
    }

    getHolderGroupMasterList() {
        const { dispatch } = this.props;
        holderGroupMasterService.getAll()
            .then(response => {
                dispatch(actions.getHolderGroupMasterListSuccess(response.data));
                const { holderGroupMasterList } = this.props;
                this.setState({ searchResult: holderGroupMasterList, isSubmitted: false })
            })
            .catch(error => {
                alert("Failed to load Group Holder List.\nError:" + error)
            })
    }

    deleteHolderGroupMaster() {
        if (window.confirm('Are you sure you wish to delete this group?')) {
            const { dispatch } = this.props;
            holderGroupMasterService.deleteHolderGroupMaster(this.state.activeAccount.id)
                .then(response => {
                    console.log(response)
                    this.setState({ activeAccount: { id: '', name: '', userName: '', password: '', remarks: '' } });
                    this.getHolderGroupMasterList();
                })
                .catch(error => {
                    if (error === 401) {
                        alert("Session Expired !!\nPlease login.")
                        this.setState({ isLogout: true })
                    } else {
                        alert("Failed to delete Group Holder.\nError : " + error)
                    }
                })
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ activeAccount: { ...this.state.activeAccount, [name]: value } });
    }

    handleSearchChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        let result = this.props.holderGroupMasterList;
        result = result.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
        this.setState({ searchResult: result })
    }

    clearForm() {
        const isDisabled = this.state.isDisabled;
        this.setState({ isDisabled: !isDisabled, isSubmitted: false, activeAccount: { id: '', name: '', userName: '', password: '', remarks: '' } });
    }

    validate() {
        const activeAccount = this.state.activeAccount;
        if (activeAccount.name === '') {
            this.setState({ isSubmitted: true })
            return false;
        }
        return true;
    }

    render() {
        const { loggingIn } = this.props;
        const { searchTerm, activeAccount, isDisabled, isSubmitted, isLogout } = this.state;
        const { name, userName, password, remarks } = activeAccount;
        const items = []
        const elements = this.state.searchResult;
        for (const [index, value] of elements.entries()) {
            items.push(<li className={activeAccount.name === value.name ? "active item list-group-item" : "item list-group-item"}
                onClick={() => this.setState({ activeAccount: value, isDisabled: true, isSubmitted: false })} key={index}>{value.name}</li>)
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
                                        <li className="heading list-group-item disabled navbar-custom">Group Name</li>
                                        {items}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="outer-work-panel col-sm-9">
                            <div className="inner-work-panel">
                                <div hidden={!isDisabled}>
                                    <Navbar className="navbar-custom">
                                        <div className="btn-component">
                                            <Button variant="success" onClick={this.clearForm}><Icon.Plus />New</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="primary"
                                                onClick={() => this.setState({ isDisabled: false, isUpdateCall: true })}><Icon.Check />Modify</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="danger" disabled={activeAccount.id===''?true:false} onClick={this.deleteHolderGroupMaster}><Icon.Trash />Delete</Button>
                                        </div>
                                        <div className="btn-component">
                                            <Button variant="warning" onClick={() => history.push('/')}><Icon.X />Close</Button>
                                        </div>
                                    </Navbar>
                                </div>
                                <div hidden={isDisabled}>
                                    <Navbar className="navbar-custom">
                                        <div className="btn-component">
                                            <Button variant="success" onClick={this.saveOrUpdateHolderGroupMaster}><Icon.FileEarmark />Save</Button>
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
                                            {isSubmitted && !name &&
                                                <div className="help-block">Name is required</div>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-6" style={{ 'padding': '0px' }}>
                                                <label className="lbl-form" htmlFor="userName">App Username:</label>
                                                <input type="text" disabled={isDisabled} value={userName} className="form-control" name="userName" onChange={this.handleChange} />
                                                {/* {isSubmitted && !userName &&
                                                    <div className="help-block">Username is required</div>
                                                } */}
                                            </div>

                                            <div className="col-6" style={{ 'paddingRight': '0px', 'paddingLeft': '1%' }}>
                                                <label className="lbl-form" htmlFor="password">App Password:</label>
                                                <input type="password" disabled={isDisabled} value={password} className="form-control" name="password" onChange={this.handleChange} />
                                                {/* {isSubmitted && !password &&
                                                    <div className="help-block">Password is required</div>
                                                } */}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="lbl-form" htmlFor="remakrs">Remarks:</label>
                                            <input type="text" disabled={isDisabled} value={remarks} className="form-control" name="remarks" onChange={this.handleChange} />
                                            {/* {isSubmitted && !remarks &&
                                                <div className="help-block">Remarks are required</div>
                                            } */}
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
        holderGroupMasterList: state.holderGroupMasterReducer.holderGroupMasterList
    }
}

export default connect(mapStateToProps)(HolderGroupMaster);