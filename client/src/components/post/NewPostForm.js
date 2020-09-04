import React ,{Component} from 'react';
import {reduxForm,Field,Form} from 'redux-form';
import {withRouter, Link} from 'react-router-dom';
import {sendPost} from '../../actions';
import {connect} from 'react-redux';
import postFormField from "./postFormField";
import '../../flex.css'
class NewPostForm extends Component{



    componentDidMount() {

        this.props.initialize(
            {
                title:this.props.location.state.title,
                content:this.props.location.state.content
            })
    }

    renderContent(){
        return(
            <div>
                <Field name="title" type="text"  label="title" component={postFormField}/>
                <Field name="content" type="text" label="content"   component={postFormField}/>

            </div>
        )
    }

    render() {

    return(
        <div className='flex-container'>

            <Form className='form-field' onSubmit={this.props.handleSubmit((values) => this.props.sendPost(this.props.location.state.postId,values,this.props.history))}>
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

   if(!values.title)
       errors.title="provide bitch !";
   if(!values.content)
       errors.content="provide bitch !";

   return errors;
}


export default connect(null,{sendPost})(reduxForm({
    validate,
    form:'newPostForm',
   // enableReinitialize:true



})(withRouter(NewPostForm)));