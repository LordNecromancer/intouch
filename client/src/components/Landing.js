import React,{Component} from 'react';
import composeComment from "./ComposeComment";
import Modal from "./Modal";
import LogInForm from './registering/LogInForm'
import '../flex.css'

class Landing extends Component{

    state={isShowing:false};

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }
    render() {
        return(
            <div className='flex-container ' >


                <div className='landing' style={{flexBasis:'15%'}}>
                </div>
                <div className='landing' style={{flexBasis:'15%'}}>
                <h1>
                   intouch
               </h1>

                <h5>
                    contact your friends
                </h5>
                </div>

                <div className='landing' style={{flexBasis:'50%',padding:'25px 25px'}}>
                <LogInForm/>
                </div>
            </div>

        );
    }
}

export default Landing;