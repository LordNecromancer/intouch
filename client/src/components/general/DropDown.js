import React,{Component} from 'react';
import {Link} from "react-router-dom";

export default class DropDown extends Component {
    state={show:false};
    render(){
        const {main} = this.props;
        return (
            <div>
                <button onClick={this.toggleDropDown}>
                    {this.props.children}
                </button>
                 {this.state.show ? this.renderList() : ''}
            </div>
        )

    }

    toggleDropDown=(event) =>{
        event.preventDefault();
        this.setState((state) => {return {show :state.show}},this.handleEventListener)

    }

    handleEventListener=() => {
        if (this.state.show)
            document.addEventListener('click', this.toggleDropDown);
        else
            document.removeEventListener('click', this.toggleDropDown);
    }


    renderList=() =>{
        const {list}=this.props;

        return(
            <ul  className="collection" style = {{width:"100px",zIndex:10}}>
            {list.map((item) =>{


                return(
                    <li className=' collection-item'>
                <Link className='black-text' to={item.link}>{item.title}</Link>
                        <a href={item.aLink}>{item.title}</a>

            </li>
                )
        })}
            </ul>)
    }
}