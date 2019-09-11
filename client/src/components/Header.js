import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


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
                    <li><a href="/api/logout"> logout</a></li>,
                    <li>

                        <Link to="/post/new" >
                        new post

                        </Link>
                    </li>
                ];

        }
    }
    render() {
        return(
            <nav>
            <div className="nav-wrapper">
                <Link to={this.props.auth ? '/dashboard' : '/'}  className="brand-logo">
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