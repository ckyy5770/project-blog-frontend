import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { signupUser, clearAuthErr } from '../actions/index'

class SignupForm extends Component{
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
            this.props.signupUser({email: values.email, password: values.password});
        }

    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
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
                <Field
                    label="Confirm Password:"
                    name="passwordConfirm"
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
    console.log(values);
    if(!values.email){
        errors.email = "enter a email";
    }

    if(!values.password){
        errors.password = "enter a password";
    }

    if(!values.passwordConfirm){
        errors.passwordConfirm = "confirm your password";
    }else{
        if(values.passwordConfirm != values.password){
            errors.passwordConfirm = "password doesn't match";
        }
    }

    return errors;
}

function mapStateToProps(state){
    return { authErrorMessage: state.auth.error};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        signupUser: signupUser,
        clearAuthErr: clearAuthErr
    },dispatch);
}

export default  reduxForm({
    validate: validateForm,
    form: 'signup',
})(connect(mapStateToProps, mapDispatchToProps)(SignupForm))