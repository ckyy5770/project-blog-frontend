import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { updatePost, clearDataErr } from "../actions/post";
import history from '../history';
import { Button } from 'antd';

class PostEditForm extends Component{
    constructor(){
        super();
        this.renderField = this.renderField.bind(this);
    }

    componentWillMount(){
        this.props.clearDataErr();
    }

    onSubmit(values){
        if(values){
            // parse tag to array
            let tags = [];
            if(!values.tag){
                tags = values.tag.split(',');
            }
            this.props.updatePost({title: values.title, content: values.content, tags: tags}, this.props.postId);
        }
    }

    onCancelClick(){
        history.push(`/posts/${this.props.postId}`);
    }

    renderField(field){
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? "has-error" : ""}`;

        if(field.input.name === "content") return (
            <div className={className}>
                <label>{field.label}</label>
                <textarea className="form-control" type={field.type} {...field.input}/>
                <div className="input-helper">
                    {touched ? error : ""}
                </div>
            </div>
        );

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type={field.type} {...field.input} />
                <div className="input-helper">
                    {touched ? error : ""}
                </div>
            </div>
        )
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
                <Button onClick={handleSubmit(this.onSubmit.bind(this))}>Update</Button>
                &nbsp;
                <Button onClick={this.onCancelClick.bind(this)}>Cancel</Button>
            </div>

        )
    }

    render(){
        return(
            <form>
                <Field
                    label="Title:"
                    name="title"
                    type="text"
                    component={this.renderField}
                />
                <Field
                    label="Content:"
                    name="content"
                    type="text"
                    component={this.renderField}
                />
                <Field
                    label="Tag (split by comma):"
                    name="tag"
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

    if(!values.title){
        errors.title = "enter a title";
    }

    if(!values.content){
        errors.content = "enter content";
    }

    return errors;
}

function mapStateToProps(state){
    return {
        postErrorMessage: state.data.error,
        initialValues: state.data.show.data
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        updatePost: updatePost,
        clearDataErr: clearDataErr
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    validate: validateForm,
    form: 'postEdit',
    enableReinitialize : true
})(PostEditForm))