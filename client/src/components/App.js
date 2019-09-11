import React,{Component} from 'react';
import '../App.css';
import {BrowserRouter,Route} from "react-router-dom";
import Header from "./Header";
import {connect} from 'react-redux';
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import * as actions from '../actions';
import NewPostForm from "./post/NewPostForm";
import OtherUser from "./OtherUser";
import SignUpForm from "./registering/SignUpForm";
import LogInForm from "./registering/LogInForm";

class App extends Component{
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return(
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/post/new" component={NewPostForm}/>
                        <Route  path="/sign_up" component={SignUpForm}/>
                        <Route  path="/log_in" component={LogInForm}/>


                        <Route  path="/users/:name" component={OtherUser}/>



                    </div>
                </BrowserRouter>
            </div>
        );
    }


}

export default connect(null,actions)(App);