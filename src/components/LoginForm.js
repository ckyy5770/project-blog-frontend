import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { loginUser, clearAuthErr } from '../actions/index'


class LoginForm extends Component{
    componentWillMount(){
        this.props.clearAuthErr();
    }

    renderField(field){
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? "has-error" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type={field.type} {...field.input}/>
                <div className="input-helper">
                    {touched ? error : ""}
                </div>
            </div>
        )
    }

    renderAuthMessage(){
        if(this.props.authErrorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>{this.props.authErrorMessage}</strong>
                </div>
            )
        }
    }

    onSubmit(values){
        if(values){
            this.props.loginUser({email: values.email, password: values.password});
        }

    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))} className="login-form">
                <Field
                    label="Email:"
                    name="email"
                    type="email"
                    component={this.renderField}
                />
                <Field
                    label="Password:"
                    name="password"
                    type="password"
                    component={this.renderField}
                />
                {this.renderAuthMessage()}
                <button action="submit" className="btn btn-primary">Log in</button>
            </form>
        );
    }
}

function validateForm(values){
    const errors={};

   if(!values.email){
        errors.email = "enter a email";
    }

    if(!values.password){
        errors.password = "enter a password";
    }

    return errors;
}

function mapStateToProps(state){
    return { authErrorMessage: state.auth.error};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        loginUser: loginUser,
        clearAuthErr: clearAuthErr
    },dispatch);
}

export default  reduxForm({
    validate: validateForm,
    form: 'login',
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm))