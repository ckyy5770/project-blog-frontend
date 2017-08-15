import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { signupUser, clearAuthErr } from '../actions/index'
import history from '../history';
import { Button } from 'antd';

class SignupForm extends Component{
    componentWillMount(){
        this.props.clearAuthErr();
    }

    onSubmit(values){
        if(values){
            this.props.signupUser({email: values.email, password: values.password, nickName: values.nickName});
        }
    }

    onCancelClick(){
        history.push('/posts');
    }

    onLoginClick(){
        history.push('/login');
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

    renderButton(){
        const { handleSubmit } = this.props;
        return(
            <div>
                <div>
                    <Button onClick={handleSubmit(this.onSubmit.bind(this))}>
                        Sign up
                    </Button>
                    &nbsp;
                    <Button onClick={this.onCancelClick.bind(this)}>
                        Cancel
                    </Button>
                </div>
                <div style={{padding: '10px 0px'}}>
                    Already has an account?
                    &nbsp;
                    <Button onClick={this.onLoginClick.bind(this)}>
                        Login
                    </Button>
                </div>
            </div>
        )
    }

    render(){


        return(
            <form>
                <Field
                    label="Nick Name:"
                    name="nickName"
                    type="text"
                    component={this.renderField}
                />
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
                {this.renderButton()}
            </form>
        );
    }
}

function validateForm(values){
    const errors={};
    console.log(values);

    if(!values.nickName){
        errors.nickName = "enter a nick name";
    }
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