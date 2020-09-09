import React ,{Component} from 'react';
import {reduxForm,Field,Form} from 'redux-form';
import {withRouter, Link} from 'react-router-dom';
import {logIn} from '../../actions';
import {connect} from 'react-redux';
import postFormField from '../post/postFormField';
import '../../flex.css'
class LogInForm extends Component{




    renderContent(){
        return(
            <div >
                <img style={{height:'9.3vh'}} className='ui image medium' src='http://localhost:5000/logo1.png'/>

                <Field  name="username" type="text" label="Username or email" component={postFormField}/>
                <Field  name="password" type="password" label="Password" component={postFormField}/>



            </div>
        )
    }

    render() {

        return(
            <div className="flex-container">


                <Form  className="form-field" style={{border:'3px solid teal',padding:'25px 25px' ,color:'blue',alignSelf:'flex-end'} }  onSubmit={this.props.handleSubmit((values) => this.props.logIn(values,this.props.history))}>
                    {this.renderContent()}

                    <Link to='/dashboard' className="red  btn-flat">
                        Back
                    </Link>
                    <button type="submit" className="right teal  btn-flat">
                        Log In
                    </button>
                </Form>
            </div>

        )
    }



}

function validate(values) {

    const errors={};

    if(!values.username)
        errors.username="Enter a username or email !";
    if(!values.password)
        errors.password="Enter your password !";



    return errors;
}


export default connect(null,{logIn})(reduxForm({
    validate,
    form:'logInForm'


})(withRouter(LogInForm)));