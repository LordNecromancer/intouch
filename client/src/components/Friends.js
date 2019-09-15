import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {findUser} from "../actions";


class Friends extends Component{


    render() {
        let  friends;
        if(this.props.friends){
            friends=this.props.friends.friends;
        }else{
            friends=[];
        }
        return(
            <div>

                <ul>
                    {friends.reverse().map((friend) =>{

                        return(
                            <div className="row ">
                                <div className="col s12 m6 push-m3 ">
                                    <div className="card blue-grey darken-1">
                                        <div className="card-content white-text" onClick={() =>this.props.findUser(friend.username,this.props.history)}>
                                            <span className="card-title  center-align">{friend.username}</span>


                                        </div>
                                        <div className="card-action">





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

        friends:state.auth
    }
}

export default connect(mapStateToProps,{findUser})(Friends);