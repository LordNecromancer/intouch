import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchChats,sendMessage,findUser,fetchUser} from "../actions";
import {Link, withRouter} from 'react-router-dom';
import '../flex.css'
import {socket} from "./App";
import keys from '../keys'


class Chat extends Component{

    state= {term : ''};

    componentDidMount() {
        //this.props.fetchChats(this.props.match.params.name);

        let t= async () => { return this.props.fetchUser()};
        t().then(
            () =>{ this.props.fetchChats(this.props.current_user._id,this.props.match.params.name);
        this.scrollToBottom();}
        )


    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if( this.props.current_user && (JSON.stringify(prevProps.chats)!==JSON.stringify(this.props.chats) ) ) {
            //  this.props.fetchChats(this.props.current_user._id,this.props.match.params.name);
            this.scrollToBottom();


         }
    }


    renderContent = () =>{
        console.log(this.props.chats)

        if(this.props.chats && this.props.chats.messages && this.props.current_user) {
            return (
                <div className='chat_flex_container_container'>


                <div  className='  chat_flex_container'>
                    <div className="content clickable  " onClick={() =>this.props.findUser(this.props.match.params.name,this.props.history)}  style={{backgroundColor:'grey' ,alignSelf:'flex-start',width:'100%'}}>
                        <Link  className=" right brand-logo ">
                            <img style={{width:'50px',height:'50px'}} className='circle responsive-img' src={this.props.chats._users[1].imageName ?  keys.host+this.props.chats._users[1].imageName: ''}/>

                        </Link>



                    </div >
                    {

                        this.props.chats.messages.map((chat) => {
                            return (

                                <React.Fragment>
                                <div style={(chat._sender===this.props.current_user._id) ?{margin:'50px 50px',alignSelf:'flex-start',maxWidth:'45%', wordWrap:'break-word'} :{margin:'50px 50px',alignSelf:'flex-end',maxWidth:'45%', wordWrap:'break-word'}} className={(chat._sender===this.props.current_user._id) ? ' light-green  card-panel ' : ' light-blue card-panel'}>

                                    { chat.message}
                                </div>
                                    <br/>

                                </React.Fragment>
                            )
                        })
                    }
                </div>
                </div>
                    )
        } else {
            return "No messages yet"
        }
    }

    submitHandle= () => {
        if(this.state.term) {
           // this.socket.emit('hi','hi');
            this.props.sendMessage(this.props.current_user._id,this.props.match.params.name, this.state.term);
            this.setState({term: ''});
        }
    };
    render() {
        return(
            <div >


                <div style={{marginBottom:'100px'} }>

                    {this.renderContent()};



                </div>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
                <div className='row'>
                <div  className='col offset-m2 m8 offset-s2 s8 darken-2 page-footer' id='footer' >
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

    console.log(state.chats);
    return {
        current_user:state.auth,

        chats: state.chats
    }

}

export default connect(mapStateToProps,{fetchChats,sendMessage,findUser,fetchUser})(withRouter(Chat));