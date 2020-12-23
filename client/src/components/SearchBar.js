import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {findUser} from "../actions";
import {withRouter} from 'react-router-dom';

class SearchBar extends Component{

    state= {term : ''};

    render() {
        return(
            <div className='row'>
            <div className='search_friend col offset-m9 m3 offset-s2 s8 darken-2 grey z-depth-3 card-panel' style={{marginTop:'40px'}}>
                <label className='label  white-text' htmlFor='search_friend'> find profiles by username</label>

                <input  className='input-field lighten-1' placeholder='Search ...'id='search_friend' onChange={(event) => this.setState({term : event.target.value })}/>
                <span style={{color:'orange'}}>{this.props.error ? this.props.error.error:''}</span>
                <button className='right btn-flat teal ' onClick={() => this.props.findUser(this.state.term,this.props.history)}>
                    <i className="material-icons">search</i>
                </button>
            </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        error:state.error
    }
}

export default connect(mapStateToProps,{findUser})(withRouter(SearchBar));