import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getMoreComments} from "../actions";
import {Comment,Header} from "semantic-ui-react";
import {withRouter} from 'react-router-dom';
import {findUser} from "../actions";

class CommentSection extends Component {

    state={num : 0};
    render(){
    return(

        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
        <div>
            {
            this.props.comments.map((comment)=>{
                return (
                    <Comment>

                        <Comment.Avatar src={'http://localhost:5000/'+comment._user.imageName}/>
                        <Comment.Content>
                        <Comment.Author  onClick={() =>this.props.findUser(comment.name,this.props.history)}>
                        {comment.name}
                        </Comment.Author>
                            <Comment.Text>
                            {comment.comment}
                            </Comment.Text>
                        </Comment.Content>

                    </Comment>
                )
            })
        }
        <div>
            <button onClick={this.getComments}> more comments</button>
        </div>
        </div>
        </Comment.Group>
    );



}
    getComments=() =>{
        this.setState((state) => {return {num:state.num +1}});
        this.props.getMoreComments(this.props.postId,this.state.num);

    }
}

export default connect(null,{getMoreComments,findUser})(withRouter(CommentSection));