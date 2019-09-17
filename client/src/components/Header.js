import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import ReactToolTip from 'react-tooltip';


class Header extends Component{

    renderContent() {


        switch (this.props.auth) {

            case null :
                return;
            case false :
                return [
                    <li><a href="/login/google/oauth"> login with google </a></li>,
                    <li><Link to='/sign_up' >
                        Sign Up
                    </Link>
                    </li>,
                    <li><Link to='/log_in'>login</Link></li>



                ];

            default :
                return [
                    <li>        <ReactToolTip/>                    </li>,

                    <li>   <a   data-tip="log out" href="/api/logout"> logout</a>
                    </li>,
                    <li>

                        <Link  data-tip="create new post"
                            to={{
                                pathname: "/post/new",
                                state :{
                                    postId: '',
                                    title:'',
                                    content:''
                                }
                            }}
                        >

                            <i className="material-icons">create</i>

                        </Link>

                    </li>,

                    <li>
                        <Link  data-tip="friend requests" to='/user/requests' className='collection-item'>
                            <span className='new badge'>{this.props.auth.friendRequestsReceived.length}</span>
                        </Link>
                    </li>,

                    <li>
                        <Link  data-tip="friends"  to='/user/friends' >
                            <span >friends</span>
                        </Link>
                    </li>
                ];

        }
    }
    render() {
        return(
            <nav>
            <div className="nav-wrapper">
                <Link to={this.props.auth ? '/dashboard' : '/'}  className=" brand-logo">
                    Intouch
                </Link>
                <ul className="right">
                    {this.renderContent()}


                </ul>

            </div>
            </nav>
        );
    }


}
function mapStateToProps(state){


    return{

        auth:state.auth
    }
}

export default connect(mapStateToProps)(Header);