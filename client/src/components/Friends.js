import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {findUser} from "../actions";
import keys from '../keys';



class Friends extends Component{


    render() {
        let  friends;
        if(this.props.friends){
            friends=this.props.friends.friends;
        }else{
            friends=[];
        }
        return(
            <div >

                <ul style={{marginTop:'50px'}}>
                    {friends.reverse().map((friend) =>{

                        return(
                            <div className="ui card centered ">
                                <div className="content clickable " onClick={() =>this.props.findUser(friend.username,this.props.history)}>
                                    <img className="ui avatar image" src={keys.host+friend.imageName}/>

                                            <div className="header center aligned" >
                                                {friend.username}
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