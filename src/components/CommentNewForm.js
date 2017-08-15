import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { clearDataErr } from "../actions/post";
import { createComment } from "../actions/comment"
import { Link } from 'react-router-dom';
import history from '../history';
import { Button } from 'antd';

class CommentNewForm extends Component{
    constructor(){
        super();
        this.renderField = this.renderField.bind(this);
    }

    componentWillMount(){
        this.props.clearDataErr();
    }

    onSubmit(values){
        if(values){
            this.props.createComment({content: values.content}, this.props.postId);
        }
    }

    onLoginClick(){
        history.push('/login');
    }

    onSignupClick(){
        history.push('/signup');
    }

    renderField(field){
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? "has-error" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <textarea className="form-control" type={field.type} {...field.input}/>
                <div className="input-helper">
                    {touched ? error : ""}
                </div>
            </div>
        );

    }

    renderDataMessage(){
        if(this.props.postErrorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>{this.props.postErrorMessage}</strong>
                </div>
            )
        }
    }

    renderButton(){
        const { handleSubmit } = this.props;
        return(
            <div>
                <Button onClick={handleSubmit(this.onSubmit.bind(this))}>
                    Submit
                </Button>
            </div>

        )
    }


    render(){
        if(this.props.user && this.props.user.id){
            return(
                <form>
                    <Field
                        label="Leave you comment:"
                        name="content"
                        type="text"
                        component={this.renderField}
                    />
                    {this.renderDataMessage()}
                    {this.renderButton()}
                </form>
            );
        }else{
            return(
                <div style={{fontSize: ".8em", padding: "5% 5%", textAlign: "center"}}>
                    Please &nbsp;
                    <Button onClick={this.onLoginClick.bind(this)}>
                        Log in
                    </Button>
                    &nbsp;
                    Or
                    &nbsp;
                    <Button onClick={this.onSignupClick.bind(this)}>
                        Sign up
                    </Button>
                    &nbsp;
                    to leave a comment
                </div>
            );
        }

    }
}

function validateForm(values){
    const errors={};
    return errors;
}

function mapStateToProps(state){
    return {
        postErrorMessage: state.data.error,
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        createComment: createComment,
        clearDataErr: clearDataErr
    },dispatch);
}

export default  reduxForm({
    validate: validateForm,
    form: 'commentNew',
})(connect(mapStateToProps, mapDispatchToProps)(CommentNewForm))