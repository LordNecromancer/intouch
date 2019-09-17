import React,{Component} from 'react';
import composeComment from "./ComposeComment";
import Modal from "./Modal";

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
            <div className='center-align '>


                <h1>
                   intouch
               </h1>

                <h5>
                    contact your friends
                </h5>

            </div>

        );
    }
}

export default Landing;