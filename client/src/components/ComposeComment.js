import React,{Component} from 'react';
import {connect} from 'react-redux';
import {sendComment} from '../actions';
import {withRouter} from 'react-router-dom';

class composeComment extends Component  {

    state={term : ''};
    render() {
        return (
            <div>

            <span>
                <input onChange={(event) => this.setState({term : event.target.value })}/>

                <button type='submit' onClick={() => this.props.sendComment(this.state.term, this.props.postId, this.props.history)}>
                    send
                    </button>
            </span>
            </div>
        )

    }
}

export default connect(null,{sendComment})(withRouter(composeComment));