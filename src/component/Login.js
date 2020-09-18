import React from 'react';
import { connect } from 'react-redux';
import * as loginService from "../service/LoginService";
import { history } from '../helpers/history';

import * as actions from '../state/actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            submitted: false,
            loggingIn:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onKeyDown(e){
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        const isValid = this.validate();
        if (isValid) {
            this.setState({loggingIn:true})
            const { userName, password } = this.state;
            const { dispatch } = this.props;
            loginService.login(userName, password)
                .then(response => {
                    const token = (response && response.data && response.data.token) || "";
                    if (token != null && token != "") {
                        //localStorage.setItem('token', token);
                        dispatch(actions.loginSuccess(token))
                        console.log(this.props.token)
                        history.push("/")
                        // setTimeout(() => {
                        //     if(this.props.token!==null && this.props.token!=='' && this.props.token!==undefined){
                        //         history.push("/")
                        //     }
                        // }, 300); 
                    } else {
                        alert("Login Failed !!")
                    }
                }).catch(error => {
                    alert("Login Failed !!\nError : " + error)
                })
        }
    }

    validate() {
        const { userName, password } = this.state;
        if (userName === '' || password === '') {
            this.setState({ submitted: true })
            return false;
        }
        return true;
    }

    render() {
        const { loggingIn,userName, password, submitted } = this.state;
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">

                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange} onKeyDown={(e)=>this.onKeyDown(e)} />
                        {submitted && !userName &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} onKeyDown={(e)=>this.onKeyDown(e)} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button onClick={(e) => this.handleSubmit(e)} className="btn btn-primary btn-block">Login</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authenticationReducer;
    return {
        token:state.authenticationReducer.token
    };
}

export default connect(mapStateToProps)(LoginPage);