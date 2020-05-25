import React,{Component} from 'react';

export default class VerticalLink extends Component{
  render(){
    const style={
      height : this.props.size ? Math.abs(this.props.size) : 0,
      top:this.props.size ? ((this.props.size < 0 ? 0 : -this.props.size)+'px') : 0
    }
    return(<div className="vlink" style={style}/>);
  }
}
