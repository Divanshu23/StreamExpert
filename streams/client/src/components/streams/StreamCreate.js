import React from 'react';
import {Field, reduxForm} from 'redux-form';
//Field is a react component and reduxForm is a function

class StreamCreate extends React.Component {

    renderError({error, touched}){
        if(touched && error){
            return(
                <div className='ui error message'>
                    <div className='header'>
                        {error}
                    </div>
                </div>
            );
        }
    }
    //formprops ko destructure kiya hai
    renderInput = ({input, label, meta})=> {
        const className =   `field ${meta.error && meta.touched ? 'error' :''}`;
        return (
            <div className= {className}>
                <label>{label}</label>
                 <input {...input} autoComplete='Off'/>
                 {this.renderError(meta)}
            </div>
        );

    }

    onSubmit(formValues){
        console.log(formValues);
    }
    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
                <Field name='title'component={this.renderInput} label='Enter Title'/>
                <Field name="description" component={this.renderInput} label='Enter Description'/>
                <button className='ui button primary'>Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        errors.title = 'You must enter a title of the stream';
    }
    if(!formValues.description){
        errors.description = 'You must enter a description of the stream';
    }
    return errors;
};

export default reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);  