import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {fetchMessageList} from "../actions";
import SearchBar from "./SearchBar";
import ComposeComment from "./ComposeComment";
import CommentSection from "./CommentSection";
import UploadImage from "./UploadImage";

class MessageList extends Component{

    componentDidMount() {

        this.props.fetchMessageList();
    }

    handleNoPosts = () =>{
        if(this.props.current_user.chats.length<1){

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



                    {this.handleNoPosts()}


                    <ul>
                        {this.props.current_user.chats.reverse().map( (message) =>{
                            let sender=[{username:''} ];
                            if(message._users){
                                 sender= message._users.filter((user)  => user._id!==this.props.current_user._id)

                            }

                            return(
                                <li key={message._id}>
                                <div  className="row ">
                                    <div className="col s12 m6 push-m3 ">
                                        <div className="card blue-grey darken-1">
                                            <div className="card-content white-text">
                                                <span className="card-title  center-align">{sender[0].username}</span>



                                            </div>
                                            <div className="card-action">





                                            </div>
                                        </div>


                                    </div>

                                </div>
                                </li>

                            )})}
                    </ul>
                </div>
            )};

        return <div> Loading !!!</div>
    }


}



function mapStateToProps(state) {
    return {
        current_user:state.auth

    }
}

export default connect(mapStateToProps,{fetchMessageList})(MessageList);