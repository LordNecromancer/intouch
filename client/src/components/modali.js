import React from 'react';
import Modali,{useModali} from 'modali';
import {connect} from 'react-redux';
import {sendFriendRequest} from "../actions";
import ReactToolTip from 'react-tooltip';

const MyModali = (props) =>{
    const [myModal,toggleMyModal]=useModali({
        animated:true,
        title:'Verify action',
        message:'are you sure you want to remove this user from your friends ?',
        buttons:[
            <Modali.Button
                label='Cancel'
                isStyleCancel
                onClick={()=> toggleMyModal()}
                />,
            <Modali.Button
                label='Remove friend'
                isStyleDestructive
                onClick={() => {props.sendFriendRequest(props.name); toggleMyModal();}}
            />
        ]
    });

    return(
        <div>
            <button onClick={toggleMyModal} data-for='friendRemove' data-tip='remove friend'>
                <i  className="material-icons">highlight_off</i>
                <ReactToolTip id="friendRemove"/>
            </button>
            <Modali.Modal {...myModal}/>
        </div>
    )



};


export default connect(null,{sendFriendRequest})(MyModali);