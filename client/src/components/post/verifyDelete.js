import React from 'react';
import {deletePost} from '../../actions';
import {connect} from "react-redux";
import {Link} from "react-router-dom";


function verifyDelete(props) {



    return(
        <div>
            <label>{props.location.state.title}</label>
            <p>{props.location.state.content}</p>
            <button className="red right" onClick={()=>props.deletePost(props.location.state.postId,props.history)}>
                delete
            </button>

            <Link to='/dashboard'> Back</Link>
        </div>
    )

}

export default connect(null,{deletePost})(verifyDelete);