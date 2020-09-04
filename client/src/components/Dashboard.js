import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {fetchPosts,likePost,deletePost,uploadImage} from "../actions";
import SearchBar from "./SearchBar";
import ComposeComment from "./ComposeComment";
import CommentSection from "./CommentSection";
import UploadImage from "./UploadImage";
import handleMeta from "./general/handleMeta";

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
            {document.body.style= " background :#464646;"}
        return(


            <div >
            <SearchBar/>



                {this.handleNoPosts()}


                <ul>
                    {this.props.posts.reverse().map((post) =>{

                        return(

                                <div className="ui card centered " style={{padding:'20px',backgroundColor:'#FF9800',width:'85vh', wordWrap:'break-word'} }>
                                    <div className="content " >
                                        <div>
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
                                        </div>
                                        <div className='meta'>
                                            {handleMeta(post)}
                                        </div>
                                        <div className="center aligned header">{post.title}</div>


                                        {/*<button className="btn-floating" onClick={()=>this.props.likePost(post._id)}>*/}
                                        {/*    <i className="material-icons">{(post.likes.filter(e => e.username === this.props.current_user.username).length > 0)? 'favorite': 'favorite_border'}</i>*/}

                                        {/*</button>*/}
                                        <div className='description' style={{marginBottom:'75px'}}>
                                            {post.content}
                                        </div>

                                        <span className="right floated">

                                        <i onClick={()=>this.props.likePost(post._id)} className={(post.likes.filter(e => e.username === this.props.current_user.username).length > 0)? "heart  like icon": "heart outline  like icon"}></i>


                                            {post.likes.length}
                                         </span>
                                        <i class="comment icon"></i>
                                        {post.comments.length+'comments'}

                                    </div>
                                    <div className="ui right bottom floated">






                                        <ComposeComment postId={post._id}/>
                                        <CommentSection comments={post.comments} postId={post._id}/>

                                    </div>
                                </div>




                        )})}
                </ul>
            </div>
        )};

        return <div className='ui active dimmer centered ' >

            <img className='ui medium image' src={'http://localhost:5000/loader.png'}/>
            <div className="ui loader">Loading</div>

        </div>

    }



}



function mapStateToProps(state) {
    return {
        posts:Object.values(state.posts),
        current_user:state.auth

    }
}

export default connect(mapStateToProps,{fetchPosts,likePost,deletePost,uploadImage})(Dashboard);