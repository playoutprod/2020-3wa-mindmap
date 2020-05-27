import React from 'react';
import '../css/nodelink.css';
export default (props)=>(<div style={{borderColor:(props.color ? props.color : "#FFF")}} className="addSymbol" onClick={props.handleClick ? props.handleClick : null}>+</div>)
