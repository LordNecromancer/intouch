import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import SearchBar from "./SearchBar";
import {likePost,findUser} from "../actions";
import {withRouter} from 'react-router-dom';
import ComposeComment from "./ComposeComment";
import CommentSection from "./CommentSection";

class OtherUser extends Component{

    componentDidMount() {
        this.props.findUser(this.props.match.params.name,this.props.history);
    }


    render() {
        return(
            <div className="push-s3">
                <SearchBar/>
                <ul>
                    {this.props.friendPosts.reverse().map((post) =>{

                        return(
                            <div className="row ">
                                <div className="col s12 m6 push-m3 ">
                                    <div className="card blue-grey darken-1">
                                        <div className="card-content white-text">
                                            <span className="card-title  center-align">{post.title}</span>
                                            <p>
                                                {post.content}
                                            </p>

                                            <p>
                                                likes : {post.likeCounter}
                                            </p>
                                        </div>
                                        <div className="card-action">
                                            <button onClick={()=>this.props.likePost(post._id)}>
                                                Like
                                            </button>

                                            <ComposeComment postId={post._id}/>
                                            <CommentSection comments={post.comments} postId={post._id}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        friendPosts:state.find
    }
}

export default connect(mapStateToProps,{likePost,findUser})(withRouter(OtherUser));