import React ,{Component} from 'react';
import {reduxForm,Field,Form} from 'redux-form';
import {withRouter, Link} from 'react-router-dom';
import {signUp} from '../../actions';
import {connect} from 'react-redux';
import postFormField from '../post/postFormField';
class SignUpForm extends Component{




    renderContent(){
        return(
            <div>
                <Field name="username" type="text" label="Username" component={postFormField}/>
                <Field name="password" type="password" label="Password" component={postFormField}/>
                <Field name="confirmPass" type="password" label="Confirm Password" component={postFormField}/>


            </div>
        )
    }

    render() {

        console.log("props           "+this.props.serverError)
        return(
            <div>

                <Form onSubmit={this.props.handleSubmit((values) => this.props.signUp(values,this.props.history))}>
                    {this.renderContent()}

                    <Link to='/dashboard' className="red  btn-flat">
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

    console.log(props)
    const errors={};

    // if(props.serverError)
    //     errors.username=props.serverError;
    if(!values.username )
        errors.username="Choose a username !";
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