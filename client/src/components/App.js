import React,{Component} from 'react';
import '../App.css';
import {BrowserRouter,Route} from "react-router-dom";
import Header from "./Header";
import {connect} from 'react-redux';
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import {fetchUser} from '../actions';
import NewPostForm from "./post/NewPostForm";
import OtherUser from "./OtherUser";
import SignUpForm from "./registering/SignUpForm";
import LogInForm from "./registering/LogInForm";
import verifyDelete from "./post/verifyDelete";
import FriendRequests from "./FriendRequests";
import Friends from "./Friends";
import Chat from "./Chat";
import ShowMessage from "./general/ShowMessage";
import Settings from '../components/Setting';
import ReactDom from 'react-dom';
import socketIOClient from 'socket.io-client';
import MessageList from "./MessageList";
import Feed from "./Feed";
import '../flex.css'



class App extends Component{



    componentDidMount() {
        this.props.fetchUser();



    }

    render() {

        return(
            <div  >

                <BrowserRouter>
                    <div>


                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/feed" component={Feed}/>

                        <Route exact path="/post/new" component={NewPostForm}/>
                        <Route  path="/sign_up" component={SignUpForm}/>
                        <Route  path="/log_in" component={LogInForm}/>
                        <Route exact path="/post/edit" component={NewPostForm}/>
                        <Route exact path="/post/delete" component={verifyDelete}/>
                        <Route exact path="/user/requests" component={FriendRequests}/>
                        <Route exact path="/user/friends" component={Friends}/>
                        <Route exact path="/settings" component={Settings}/>
                        <Route exact path="/messages" component={MessageList}/>
                        <Route exact path="/showMessage" component={ShowMessage}/>







                        <Route  exact path="/users/:name" component={OtherUser}/>
                        <Route  exact path="/users/message/:name" component={Chat}/>




                    </div>
                </BrowserRouter>
            </div>
        );
    }


}

export default connect(null,{fetchUser})(App);