import React,{Component} from 'react';
import {connect} from 'react-redux';
import {sendComment} from '../actions';
import {withRouter} from 'react-router-dom';

class composeComment extends Component  {

    state={term : ''};


    submitHandle= () => {
        this.props.sendComment(this.state.term, this.props.postId, this.props.history);
        this.setState({term:''});
    };
    render() {
        return (
            <div>

            <span>
                <input value={this.state.term} className="input-field" onChange={(event) => this.setState({term : event.target.value })}/>

                <button type='submit' className="btn-floating right" onClick={this.submitHandle}>
                    send
                    </button>
            </span>
            </div>
        )

    }
}

export default connect(null,{sendComment})(withRouter(composeComment));