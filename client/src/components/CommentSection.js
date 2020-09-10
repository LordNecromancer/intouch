import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getMoreComments} from "../actions";
import {Comment,Header} from "semantic-ui-react";
import {withRouter} from 'react-router-dom';
import {findUser} from "../actions";
import handleMeta from "./general/handleMeta";
import keys from '../keys'

class CommentSection extends Component {

    state={num : 0};

    componentDidMount() {
        this.setState({num:1});
    }

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

                        <Comment.Avatar src={keys.host+comment._user.imageName}/>
                        <Comment.Content>
                            <Comment.Author className='clickable' onClick={() =>this.props.findUser(comment.name,this.props.history)}>
                                {comment.name}
                            </Comment.Author>
                            <Comment.Metadata>
                                <div>{handleMeta(comment)}</div>
                            </Comment.Metadata>
                            <Comment.Text>
                            {comment.comment}
                            </Comment.Text>
                        </Comment.Content>

                        <div className='ui hidden divider'></div>
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