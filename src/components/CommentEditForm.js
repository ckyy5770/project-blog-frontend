import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { clearDataErr } from "../actions/post";
import { updateComment } from "../actions/comment"
import { Link } from 'react-router-dom';
import history from '../history';
import { Button } from 'antd';

class CommentEditForm extends Component{
    constructor(){
        super();
        this.renderField = this.renderField.bind(this);
    }

    componentWillMount(){
        this.props.clearDataErr();
    }

    onSubmit(values){
        if(values){
            this.props.updateComment({content: values.content}, this.props.postId, this.props.commentId);
        }
    }

    onCancelClick(){
        history.push(`/posts/${this.props.initialValues.postId}`)
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
                <Button onClick = {handleSubmit(this.onSubmit.bind(this))}>
                    Update
                </Button>
                &nbsp;
                <Button onClick = {this.onCancelClick.bind(this)}>
                    Cancel
                </Button>
            </div>

        )
    }

    render(){
        return(
            <form>
                <Field
                    label="Edit your comment:"
                    name="content"
                    type="text"
                    component={this.renderField}
                />
                {this.renderDataMessage()}
                {this.renderButton()}
            </form>
        );
    }
}

function validateForm(values){
    const errors={};
    return errors;
}

function mapStateToProps(state){
    return {
        postErrorMessage: state.data.error,
        initialValues: state.data.showComment.data
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        updateComment: updateComment,
        clearDataErr: clearDataErr
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    validate: validateForm,
    form: 'commentNew',
    enableReinitialize : true
})(CommentEditForm));