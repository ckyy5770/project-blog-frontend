import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { clearDataErr } from "../actions/post";
import { createComment } from "../actions/comment"
import { Link } from 'react-router-dom';
import history from '../history';
import { Button, Icon } from 'antd';

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
            <div style={{textAlign: 'center'}}>
                <Button onClick={handleSubmit(this.onSubmit.bind(this))}>
                    Submit
                </Button>
            </div>

        )
    }


    render(){
        if(this.props.user && this.props.user.id){
            return(
                <div>
                    <div style={{padding: "0 0 2% 0"}}>
                        Leave your comment &nbsp;
                        <Icon type="message"/>
                    </div>
                    <form style={{fontSize: "1em"}}>
                        <Field
                            name="content"
                            type="text"
                            component={this.renderField}
                        />
                        {this.renderDataMessage()}
                        {this.renderButton()}
                    </form>
                </div>

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