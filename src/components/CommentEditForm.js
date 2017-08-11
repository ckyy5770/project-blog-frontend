import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { clearDataErr } from "../actions/post";
import { updateComment } from "../actions/comment"
import { Link } from 'react-router-dom';


class CommentEditForm extends Component{
    constructor(){
        super();
        this.renderField = this.renderField.bind(this);
    }

    componentWillMount(){
        this.props.clearDataErr();
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
        return(
            <div>
                <button action="submit" className="btn btn-primary">Submit</button>
            </div>

        )
    }

    onSubmit(values){
        if(values){
            this.props.updateComment({content: values.content}, this.props.postId, this.props.commentId);
        }
    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Edit you comment:"
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