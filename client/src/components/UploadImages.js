import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {uploadImage} from "../actions";
import {withRouter} from 'react-router-dom';

class UploadImages extends Component{
    constructor(props) {
        super(props)
        this.state={
            files:[]
        }
    }



    handleSubmit=() =>{
        const form=new FormData();

        //   form.append('imageName','img');
        form.append('files',this.state.files);

        this.props.uploadImage(form)
    }

    render() {
        return(

                <div className='   m3 s8 darken-2 grey z-depth-3 card-panel' style={{marginTop:'40px'}}>
                    <label className='label  white-text' htmlFor='upload'> upload images</label>


                    <input name='imageData'  multiple  type='file' className='input-field lighten-1' id='upload' style={{width:'1000px'}}onChange={(event) => {
                        this.setState({files:[...event.target.files ]})
                        this.props.handleImageData([...event.target.files ])}}/>
                  <div className='flex-container-posts-image'>

                      {

                        this.state.files.map((file) =>{
                            return(

                                <div>
                        <img style={{width: '200px', height: '200px'}} src={URL.createObjectURL(file)}/>
                                </div>
                        )
                    })
                    }

                  </div>

                </div>

        )
    }
}

export default connect(null,{uploadImage})(withRouter(UploadImages));