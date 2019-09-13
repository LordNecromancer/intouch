import React,{Component} from 'react';
import composeComment from "./ComposeComment";

class Landing extends Component{

    render() {
        return(
            <div className='center-align'>
                <composeComment postId="0"/>
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