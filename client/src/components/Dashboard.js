import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {fetchPosts,likePost,deletePost,uploadImage} from "../actions";
import SearchBar from "./SearchBar";
import ComposeComment from "./ComposeComment";
import CommentSection from "./CommentSection";
import UploadImage from "./UploadImage";

class Dashboard extends Component{

    componentDidMount() {

       this.props.fetchPosts();
    }

    handleNoPosts = () =>{
      if(this.props.posts.length<1){

          return(<div className='center-align'>
                  <h4 >No Posts Yet</h4>
                  <p>create posts to share moments with friends</p>
          </div>
          );
      }
    };

    render() {
        if(this.props.current_user){
        return(


            <div className="push-s3">
            <SearchBar/>

        <UploadImage/>


                {this.handleNoPosts()}


                <ul>
                    {this.props.posts.reverse().map((post) =>{

                        return(
                        <div className="row ">
                            <div className="col s12 m6 push-m3 ">
                                <div className="card blue-grey darken-1">
                                    <div className="card-content white-text">
                                        <span className="card-title  center-align">{post.title}</span>
                                        <button className="btn-floating" onClick={()=>this.props.likePost(post._id)}>
                                            <i className="material-icons">{(post.likes.filter(e => e.username === this.props.current_user.username).length > 0)? 'favorite': 'favorite_border'}</i>

                                        </button>
                                        <p>
                                            {post.content}
                                        </p>

                                        <p>
                                            likes : {post.likeCounter}
                                        </p>
                                    </div>
                                    <div className="card-action">




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
        )};

        return <div> Loading !!!</div>
    }


}



function mapStateToProps(state) {
    return {
        posts:state.posts,
        current_user:state.auth

    }
}

export default connect(mapStateToProps,{fetchPosts,likePost,deletePost,uploadImage})(Dashboard);