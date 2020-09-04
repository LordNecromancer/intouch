import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import ReactToolTip from 'react-tooltip';
//import DropDown from "./general/DropDown";
//import {Dropdown} from "semantic-ui-react";
import {Dropdown,Button} from "semantic-ui-react";

const dropDownOptions=[
    {
        key:'logout',
        text:'logout',
        value:'logout',
        as:'a',
        href:'/api/logout'

    },{
    key:'add',
        text:'setting',
        value:'setting',
        as:Link,
        to:'/settings'
    }
]
class Header extends Component{



    renderContent() {


        switch (this.props.auth) {

            case null :
                return;
            case false :
                return [
                    <li key='1'><a href="/login/google/oauth"> login with google </a></li>,
                    <li key='2'><Link to='/sign_up' >
                        Sign Up
                    </Link>
                    </li>,
                    <li key='3'><Link to='/log_in'>login</Link></li>



                ];

            default :
                return [
                    <li key='4'>        <ReactToolTip/>                    </li>,



                    <li key='5'>

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

                    <li key='6'>
                        <Link  data-tip="friend requests" to='/user/requests' className='collection-item'>
                            friend requests
                            <span className='new badge'>{this.props.auth.friendRequestsReceived.length}</span>
                        </Link>
                    </li>,

                    <li key='7'>
                        <Link  data-tip="friends"  to='/user/friends' >
                            <span >friends</span>
                        </Link>
                    </li>,
                    <li key='8'>
                        <Link  data-tip="messages"  to='/messages' >
                            messages
                        </Link>
                    </li>,

                        /*<DropDown style ={{zIndex:10}} main={{title:'settings'}} list={[{title:'logout',aLink:'/api/logout'},{title:'add friend',link:'/'}]}>*/
                    <li key='9'>
                        <div className='left'>
                            <Button.Group color='teal' style={{height:'9.4vh',marginBottom:'0'}} >
                                <Button>
                            <img style={{width:'50px',height:'50px'}} className='circle responsive-img' src={this.props.auth.imageName ?  'http://localhost:5000/'+this.props.auth.imageName: ''}/>
                            {this.props.auth.username}
                                </Button>

                                <Dropdown className='button icon' floating  trigger={<React.Fragment />} options={dropDownOptions}/>

                            </Button.Group>
                        </div>
                    </li>


                ];

        }
    }
    render() {
        return(
            <nav >
            <div className="nav-wrapper" style={{backgroundColor:'orange' }}>
                <Link to={this.props.auth ? '/dashboard' : '/'}  className=" left brand-logo ">
                    <img style={{height:'9.3vh'}} className='ui image medium' src='http://localhost:5000/logo1.png'/>

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