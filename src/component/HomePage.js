import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar'
import * as loginService from "../service/LoginService";
import * as companyMasterService from "../service/CompanyMasterService"
import * as accountHolderMasterService from "../service/AccountHolderMasterService";

import * as actions from '../state/actions';

class HomePage extends React.Component {
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

    componentDidMount(){
        this.getStatusList();
        this.getCompanyMasterList();
        this.getAccountHolderMasterList();
        
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

    getAccountHolderMasterList() {
        const { dispatch } = this.props;
        dispatch(actions.request());
        accountHolderMasterService.getAll()
            .then(response => {
                console.log(response)
                dispatch(actions.getAccountHolderMasterListSuccess(response.data));
                const { accountHolderMasterList } = this.props;
                this.setState({ searchResult: accountHolderMasterList, isSubmitted: false })
            })
    }

    getStatusList(){
        const { dispatch } = this.props;
        dispatch(actions.request());
        loginService.getStatusList()
            .then(response => {
                console.log(response)
                dispatch(actions.getStatusListSuccess(response.data));
            })
            .catch(error=>{
                alert("Failed to load Group Holder List.\nError:"+error)
            })

        
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
            <NavigationBar/>
            </div>
        );
    }
}


export default connect()(HomePage);