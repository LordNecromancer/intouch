import React ,{Component} from 'react';
import {reduxForm,Field,Form} from 'redux-form';
import {withRouter, Link} from 'react-router-dom';
import {sendPost} from '../../actions';
import {connect} from 'react-redux';
import postFormField from "./postFormField";
import '../../flex.css'
import UploadImages from "../UploadImages";
class NewPostForm extends Component{


state={
    imageData:[]
}
    componentDidMount() {

        this.props.initialize(
            {
                title:this.props.location.state.title,
                content:this.props.location.state.content,
                images:this.props.location.state.images
            })
        console.log(this.props.location.state.images)
       // this.setState({imageData:this.props.location.state.images},()=>console.log(this.state.imageData))
    }


    handleImageData=(images) =>{
    console.log(images)
    if (images) {
        this.setState({imageData: images}, () => console.log(this.state.imageData))
    }



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

            <div style={{minWidth:'250px',maxWidth:'600px'}}>
            <UploadImages handleImageData={(e) => this.handleImageData(e)}/>
            <Form  className='form-field' onSubmit={this.props.handleSubmit(async (values) => {
                const form=new FormData();


                //   form.append('imageName','img');
                console.log(this.state.imageData)

               await  this.state.imageData.forEach(  (file)=>  form.append('imageData',file))

                form.append('values',JSON.stringify(values))
                form.append('postId',this.props.location.state.postId)



                this.props.sendPost(this.props.location.state.postId,values,form,this.props.history,this.props.user._id)
                //this.props.history.push('/dashboard')
            })


            }>

            {this.renderContent()}

           <Link to='/dashboard' className="red  btn-flat">
               Back
           </Link>
            <button type="submit" className="right teal  btn-flat">
                Post
            </button>
            </Form>
        </div>
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

function mapStateToProps(state) {
    return {
        user: state.auth

    }
}

export default connect(mapStateToProps,{sendPost})(reduxForm({
    validate,
    form:'newPostForm',

   // enableReinitialize:true



})(withRouter(NewPostForm)))