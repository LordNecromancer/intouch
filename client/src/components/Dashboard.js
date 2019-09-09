import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {fetchPosts} from "../actions";

class Dashboard extends Component{

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return(
            <div className="push-s3">
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
                                    </div>
                                    {/*<div className="card-action">*/}
                                    {/*    <a href="#">This is a link</a>*/}
                                    {/*    <a href="#">This is a link</a>*/}
                                    {/*</div>*/}
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
        posts:state.posts
    }
}

export default connect(mapStateToProps,{fetchPosts})(Dashboard);