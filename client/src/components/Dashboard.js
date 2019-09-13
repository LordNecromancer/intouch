import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {fetchPosts,likePost,deletePost} from "../actions";
import SearchBar from "./SearchBar";
import ComposeComment from "./ComposeComment";
import CommentSection from "./CommentSection";

class Dashboard extends Component{

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return(
            <div className="push-s3">
            <SearchBar/>

                <ul>
                    {this.props.posts.reverse().map((post) =>{

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



                                        <Link
                                            to={
                                                {pathname : '/post/edit' ,
                                                 state :{
                                                    title : post.title,
                                                     content:post.content,
                                                     postId:post._id
                                                 }
                                            }}>
                                            edit
                                        </Link>


                                        <Link className="right"
                                            to={
                                                {pathname : '/post/delete' ,
                                                    state :{
                                                        title : post.title,
                                                        content:post.content,
                                                        postId:post._id
                                                    }
                                                }}>
                                            delete
                                        </Link>

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
        posts:state.posts,
        friendPosts:state.find
    }
}

export default connect(mapStateToProps,{fetchPosts,likePost,deletePost})(Dashboard);