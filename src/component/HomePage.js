import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar'
import * as loginService from "../service/LoginService";
import * as companyMasterService from "../service/CompanyMasterService"
import * as accountHolderMasterService from "../service/AccountHolderMasterService";

import * as actions from '../state/actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogout: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getStatusList();
        this.getCompanyMasterList();
        this.getAccountHolderMasterList();

    }

    getCompanyMasterList() {
        const { dispatch } = this.props;
        companyMasterService.getAll()
            .then(response => {
                dispatch(actions.getCompanyMasterListSuccess(response.data));
                const { companyMasterList } = this.props;
                console.log(companyMasterList)
                this.setState({ searchResult: companyMasterList, isSubmitted: false })
            })
            .catch(error => {
                if (error === 401) {
                    alert("Session Expired !!\nPlease login.")
                    this.setState({ isLogout: true })
                } else {
                    alert("Failed to load Group Holder List.\nError:" + error)
                }
            })
    }

    getAccountHolderMasterList() {
        const { dispatch } = this.props;
        accountHolderMasterService.getAll()
            .then(response => {
                console.log(response)
                dispatch(actions.getAccountHolderMasterListSuccess(response.data));
                const { accountHolderMasterList } = this.props;
                this.setState({ searchResult: accountHolderMasterList, isSubmitted: false })
            })
    }

    getStatusList() {
        const { dispatch } = this.props;
        loginService.getStatusList()
            .then(response => {
                console.log(response)
                dispatch(actions.getStatusListSuccess(response.data));
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <NavigationBar isLogout={this.state.isLogout} />
            </div>
        );
    }
}


export default connect()(HomePage);