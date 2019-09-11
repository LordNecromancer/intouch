import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {fetchPosts,likePost} from "../actions";
import SearchBar from "./SearchBar";

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
                        console.log(post.id)

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
                                            likes : {post.counter}
                                        </p>
                                    </div>
                                    <div className="card-action">
                                        <button onClick={()=>this.props.likePost(post._id)}>
                                            Like
                                        </button>
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

export default connect(mapStateToProps,{fetchPosts,likePost})(Dashboard);