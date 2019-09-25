import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import SearchBar from "./SearchBar";
import {likePost,findUser,sendFriendRequest} from "../actions";
import {withRouter} from 'react-router-dom';
import ComposeComment from "./ComposeComment";
import CommentSection from "./CommentSection";
import ReactToolTip from 'react-tooltip';
import MyModali from "./modali";
import Modal from "./Modal";

class OtherUser extends Component{

   // state={showModal : false};
    componentDidMount() {
        this.props.findUser(this.props.match.params.name,this.props.history);
    }


    setFriendIcon(){
        if(this.props.current_user) {
            if (this.props.current_user.friends.filter(e => e.username === this.props.match.params.name).length > 0) {
                return <i  className="material-icons">highlight_off</i>

            }else if(this.props.current_user.friendRequestsSent.filter(e => e.username === this.props.match.params.name).length > 0) {

                return <i className="material-icons">error</i>
            }else{
                return <i className="material-icons">person_add</i>

            }
        }
        return <p>Login to add as friend</p>

    }

    setFriendToolTip(){

        if(this.props.current_user) {
            if(this.props.current_user.friends.filter(e => e.username === this.props.match.params.name).length > 0)
                return "remove friend" ;
            else if(this.props.current_user.friendRequestsSent.filter(e => e.username === this.props.match.params.name).length > 0)
            return "request pending";
            else{
                return "add friend";

            }
        }
        return 'not logged in';
    }
    handleFriendButton(){
        if(this.props.current_user) {
            if(this.props.current_user.friends.filter(e => e.username === this.props.match.params.name).length > 0)
                return <MyModali name={this.props.match.params.name}/> ;

            else{
                return(
                <button data-for='friendOption' data-tip={this.setFriendToolTip()} onClick={()=> this.props.sendFriendRequest(this.props.match.params.name)}>
                    {this.setFriendIcon()}
                    <ReactToolTip id='friendOption'/>

                </button>
                )
            }
        }
        return 'not logged in';

    }
    render() {
        return(


            <div className="push-s3">

                {this.handleFriendButton()}

                <Link to={'/users/message/'+this.props.match.params.name}>

                    message
                </Link>



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
        friendPosts:state.find,
        current_user:state.auth
    }
}

export default connect(mapStateToProps,{likePost,findUser,sendFriendRequest})(withRouter(OtherUser));