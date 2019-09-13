import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getMoreComments} from "../actions";

class CommentSection extends Component {

    state={num : 0};
    render(){
    return(
        <div>
            {
            this.props.comments.map((comment)=>{
                return (
                    <div>
                        {comment.name}
                        <div>
                            {comment.comment}
                        </div>
                    </div>
                )
            })
        }
        <div>
            <button onClick={this.getComments}> more comments</button>
        </div>
        </div>
    );



}
    getComments=() =>{
        this.setState((state) => {return {num:state.num +1}});
        this.props.getMoreComments(this.props.postId,this.state.num);

    }
}

export default connect(null,{getMoreComments})(CommentSection);