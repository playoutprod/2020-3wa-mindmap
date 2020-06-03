import React from 'react';
import Add from './Add'
import '../css/nodelink.css';






export default (props)=>(
  <div className={"nodelink "+props.type+" "+(props.childs ? 'childs' : '')}>
    <div className="line" style={{backgroundColor:(props.color ? props.color : "#FFF")}}></div>
    {props.type && props.type === 'add' && <Add color={props.color ? props.color : "#FFF"} handleClick={props.handleClick ? props.handleClick : null }/>}
  </div>)
