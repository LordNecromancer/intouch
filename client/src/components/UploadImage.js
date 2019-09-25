import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {uploadImage} from "../actions";
import {withRouter} from 'react-router-dom';

class UploadImage extends Component{

    state= {
        file : '',
        fileURL:''

    };

    handleSubmit=() =>{
        const form=new FormData();

     //   form.append('imageName','img');
        form.append('imageData',this.state.file);

        console.log(form)
         this.props.uploadImage(form)
    }

    render() {
        return(
            <div className='row'>
                <div className=' col offset-m2 m3 offset-s2 s8 darken-2 grey z-depth-3 card-panel' style={{marginTop:'40px'}}>
                    <label className='label  white-text' htmlFor='upload'> upload image</label>

                    <input  name='imageData' type='file' className='input-field lighten-1' id='upload' onChange={(event) => this.setState({file : event.target.files[0] ,fileURL:URL.createObjectURL(event.target.files[0])})}/>
                    <img style={{width:'100px',height:'100px'}} src={this.state.fileURL}/>
                    <button className='right btn-flat teal ' onClick={this.handleSubmit}>
                        <i className="material-icons">search</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(null,{uploadImage})(withRouter(UploadImage));