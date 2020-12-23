import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {resendToken} from "../actions";
import {Link, withRouter} from 'react-router-dom';
import '../flex.css';

class SendEmail extends Component{

    state={term:'',btnDisable:false,time:0};

    submitHandle= () => {
        if(this.state.term) {
            // this.socket.emit('hi','hi');
            this.props.resendToken( this.state.term,this.props.history);
            this.setState((state )=>{return {btnDisable:true,time:300}},this.setTimer)

        }
    };

    setTimer= () => {
            this.interval=setInterval(() =>{
                this.setState(state => {return state.time>0 ?{time : state.time-1}:{time:0,btnDisable:false}});

            },1000);


    }

    render() {
        return (

            <div>
                <p>if you didn't receive a token enter your email below and press send</p>
            <input type='email' onChange={(event )=> this.setState({term:event.target.value})}/>
                <button className='right btn-flat teal ' disabled={this.state.btnDisable} onClick={this.submitHandle}>
                    <i className="material-icons">send</i>
                </button>
                <div>
                    {this.state.time>0 ? Math.floor(this.state.time/60)+' : '+this.state.time%60 :''}
                </div>

        </div>
        )
    }
}

export default connect(null,{resendToken})(withRouter(SendEmail))