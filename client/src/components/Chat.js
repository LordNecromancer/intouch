import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchChats,sendMessage} from "../actions";
import {withRouter} from 'react-router-dom';
import {socket} from "./App";

class Chat extends Component{

    state= {term : ''};

    componentDidMount() {
     //   this.props.fetchChats(this.props.match.params.name);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if( this.props.current_user) {
              this.props.fetchChats(this.props.current_user._id,this.props.match.params.name);


         }
    }


    renderContent = () =>{
        if(this.props.chats && this.props.chats.messages && this.props.current_user) {
            return (
                <div>
                    {
                        this.props.chats.messages.map((chat) => {
                            return (

                                <React.Fragment>
                                <div style={(chat._sender.username===this.props.current_user.username) ?{marginTop:'20px',display: 'table'} :{marginTop:'20px',display: 'table'}} className={(chat._sender.username===this.props.current_user.username) ? ' light-green card-panel ' : 'card-panel light-blue'}>

                                    { chat.message}
                                </div>
                                    <br/>

                                </React.Fragment>
                            )
                        })
                    }
                </div>
                    )
        } else {
            return "No messages yet"
        }
    };

    submitHandle= () => {
        if(this.state.term) {
           // this.socket.emit('hi','hi');
            this.props.sendMessage(this.props.current_user._id,this.props.match.params.name, this.state.term);
            this.setState({term: ''});
        }
    };
    render() {
        return(
            <div className='row'>

                <div  style={{marginBottom:'100px'} }>
                    <ul>
                    {this.renderContent()};
                    </ul>


                </div>
                <div className='row'>
                <div  className='col offset-m1 m10 darken-2 page-footer' id='footer' >
                <textarea  value={this.state.term} className='input-field lighten-2'  onChange={(event) => this.setState({term : event.target.value })}/>
                <button className='right btn-flat teal ' onClick={this.submitHandle}>
                         <i className="material-icons">send</i>
                </button>
                </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {

    console.log(state.chats)
    return {
        chats: state.chats,
        current_user:state.auth
    }

}

export default connect(mapStateToProps,{fetchChats,sendMessage})(withRouter(Chat));