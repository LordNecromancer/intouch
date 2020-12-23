import React,{Component} from 'react';
import {connect} from 'react-redux';
import '../../flex.css'
import SendEmail from "../SendEmail";


class ShowMessage extends Component{

    render(){


        return (
            <div className='flex-container'>
                <div>
                {this.props.message? this.props.message:'No system messages'}
                {this.props.element==='send_email'? <SendEmail/>:''}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    if(state.showMessage) {
        return {
            message: state.showMessage.message,
            element: state.showMessage.element

        }
    }
    return {}
}

export default connect(mapStateToProps)(ShowMessage)