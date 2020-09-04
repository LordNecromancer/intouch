import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {acceptFriendRequest,findUser} from '../actions'
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
            <div >

                <ul style={{marginTop:'50px'}}>
                    {friendRequests.reverse().map((request) =>{

                        return(

                                <div className=" ui card centered  ">
                                    <div className="content">
                                        <img className='right floated mini ui image' src={'http://localhost:5000/'+request.imageName}/>
                                            <div className="header clickable" onClick={() =>this.props.findUser(request.username,this.props.history)}>
                                                {request.username}
                                            </div>

                                        <div className="ui two buttons">
                                            <div className="ui basic green button" onClick={()=>this.props.acceptFriendRequest(request._id)}>Approve</div>
                                            <div className="ui basic red button">Decline</div>
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

export default connect(mapStateToProps,{acceptFriendRequest,findUser})(FriendRequests);