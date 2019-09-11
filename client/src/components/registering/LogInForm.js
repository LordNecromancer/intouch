import React ,{Component} from 'react';
import {reduxForm,Field,Form} from 'redux-form';
import {withRouter, Link} from 'react-router-dom';
import {logIn} from '../../actions';
import {connect} from 'react-redux';
import postFormField from '../post/postFormField';
class LogInForm extends Component{




    renderContent(){
        return(
            <div>
                <Field name="username" type="text" label="Username" component={postFormField}/>
                <Field name="password" type="password" label="Password" component={postFormField}/>



            </div>
        )
    }

    render() {

        return(
            <div>

                <Form onSubmit={this.props.handleSubmit((values) => this.props.logIn(values,this.props.history))}>
                    {this.renderContent()}

                    <Link to='/dashboard' className="red  btn-flat">
                        Back
                    </Link>
                    <button type="submit" className="right teal  btn-flat">
                        Post
                    </button>
                </Form>
            </div>

        )
    }



}

function validate(values) {

    const errors={};

    if(!values.username)
        errors.username="Choose a username !";
    if(!values.password)
        errors.password="choose a password !";



    return errors;
}


export default connect(null,{logIn})(reduxForm({
    validate,
    form:'logInForm'


})(withRouter(LogInForm)));