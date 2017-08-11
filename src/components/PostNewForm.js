import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { createPost, clearDataErr } from "../actions/post";
import { Link } from 'react-router-dom';


class PostNewForm extends Component{
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
        return(
            <div>
                <button action="submit" className="btn btn-primary">Post</button>
                <Link to="/posts" className="btn btn-danger">Cancel</Link>
            </div>

        )
    }

    onSubmit(values){
        if(values){
            this.props.createPost({title: values.title, content: values.content});
        }
    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
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
                    label="Tag:"
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
    return { postErrorMessage: state.data.error};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        createPost: createPost,
        clearDataErr: clearDataErr
    },dispatch);
}

export default  reduxForm({
    validate: validateForm,
    form: 'postNew',
})(connect(mapStateToProps, mapDispatchToProps)(PostNewForm))