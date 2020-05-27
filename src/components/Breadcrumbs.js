import React from 'react';
import {Link} from 'react-router-dom';
import "../css/breadcrumbs.css"

export default (props) => {
  let JSX = [];
  let path = '';
  const aPath = props.location.pathname.split('/');
  aPath.shift();
  aPath.forEach((item, i) => {
    JSX.push(<Link key={i} to={"/"+path}>{item}</Link>);
    if(i<aPath.length-1){
      JSX.push(<span key={i+aPath.length}>/</span>);
    }

    path=path+item+'/';
  });
  return(<div className="breadcrumb">{JSX}</div>)
}
