import React ,{Component} from 'react';
import {reduxForm,Field,Form} from 'redux-form';
import {withRouter, Link} from 'react-router-dom';
import {signUp} from '../../actions';
import {connect} from 'react-redux';
import postFormField from '../post/postFormField';
import '../../flex.css'
class SignUpForm extends Component{




    renderContent(){
        return(
            <div>
                <img style={{height:'9.3vh'}} className='ui image medium' src='http://localhost:5000/logo1.png'/>

                <Field name="username" type="text" label="Username" component={postFormField}/>
                <Field name="email" type="email" label="ٍEmail" component={postFormField}/>
                <Field name="password" type="password" label="Password" component={postFormField}/>
                <Field name="confirmPass" type="password" label="Confirm Password" component={postFormField}/>


            </div>
        )
    }

    render() {

        return(
            <div className='flex-container'>

                <Form className="form-field" style={{border:'3px solid teal',padding:'25px 25px' ,color:'blue',alignSelf:'flex-end'} } onSubmit={this.props.handleSubmit((values) => this.props.signUp(values,this.props.history))}>
                    {this.renderContent()}

                    <Link to='/' className="red  btn-flat">
                        Back
                    </Link>
                    <button type="submit" className="right teal  btn-flat">
                        Sign Up
                    </button>
                </Form>
            </div>

        )
    }



}

function validate(values,props) {

    const errors={};

    // if(props.serverError)
    //     errors.username=props.serverError;
    if(!values.username )
        errors.username="Choose a username !";
    if(!values.email )
        errors.email="Enter your email !";
    if(!values.password)
        errors.password="choose a password !";
    if(!values.confirmPass)
        errors.confirmPass="confirm password !";
    if(values.confirmPass !==values.password)
        errors.confirmPass="this is a different password";



    return errors;
}


export default connect(null,{signUp})(reduxForm({
    validate,
    form:'signUpForm'


})(withRouter(SignUpForm)));