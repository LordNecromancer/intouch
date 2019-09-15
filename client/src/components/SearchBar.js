import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {findUser} from "../actions";
import {withRouter} from 'react-router-dom';

class SearchBar extends Component{

    state= {term : ''};

    render() {
        return(
            <div>
                <input onChange={(event) => this.setState({term : event.target.value })}/>
                <button onClick={() => this.props.findUser(this.state.term,this.props.history)}>
                    <i className="material-icons">search</i>
                </button>
            </div>
        )
    }
}

export default connect(null,{findUser})(withRouter(SearchBar));