import React from 'react';

export default ({input,label,type, meta :{touched,error}}) =>{

    return (
        <div style={{marginBottom : '15px'}}>
        <label>{label}</label>

        <div className="row ">
            <input className="input-field col s12 m8 offset-m2" {...input} type={type} style={{marginBottom : '5px'}} />


        </div>
            <div className="red-text row"  >
                <p className="col offset-m2">
                    {touched && error}
                </p>
            </div>
        </div>
    )

}