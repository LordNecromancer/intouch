import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {acceptFriendRequest,fetchUser} from '../actions'
import {Link} from "react-router-dom";
import ComposeComment from "./ComposeComment";
import CommentSection from "./CommentSection";

class FriendRequests extends Component{


    render() {
        let  friendRequests;
        if(this.props.friendRequests){
             friendRequests=this.props.friendRequests.friendRequestsReceived;
        }else{
            friendRequests=[];
        }
        return(
            <div>

                <ul>
                    {friendRequests.reverse().map((request) =>{

                        return(
                            <div className="row ">
                                <div className="col s12 m6 push-m3 ">
                                    <div className="card blue-grey darken-1">
                                        <div className="card-content white-text">
                                            <span className="card-title  center-align">{request.username}</span>
                                            <p>
                                                {request.username}
                                            </p>

                                        </div>
                                        <div className="card-action">
                                            <button onClick={()=>this.props.acceptFriendRequest(request._id)}>
                                                Accept
                                            </button>




                                        </div>
                                    </div>


                                </div>

                            </div>

                        )})}
                </ul>
            </div>
        )
    }
}


function mapStateToProps(state){


    return{

        friendRequests:state.auth
    }
}

export default connect(mapStateToProps,{acceptFriendRequest,fetchUser})(FriendRequests);