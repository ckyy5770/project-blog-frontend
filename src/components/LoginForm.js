import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class LoginForm extends Component{

    renderField(field){
        const {meta: {touched, error}} = field;
        const className = 'form-group ${touched && error ? "has-danger" : ""}';

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

    onSubmit(values){
        if(values){
            console.log(values.email, values.password);
        }

    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
                <fieldset className="form-group">
                    <Field
                        label="Email:"
                        name="email"
                        type="email"
                        component={this.renderField}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        label="Password:"
                        name="password"
                        type="password"
                        component={this.renderField}
                    />
                </fieldset>
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

export default  reduxForm({
    validateForm,
    form: 'login',
})(LoginForm)