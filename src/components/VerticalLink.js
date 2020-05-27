import React,{Component} from 'react';

export default class VerticalLink extends Component{
  render(){
    const style={
      display:this.props.display,
      height : this.props.size ? Math.abs(this.props.size) : 0,
      top:this.props.size ? ((this.props.size > 0 ? 0 : this.props.size)+'px') : 0,
      backgroundColor: this.props.color ? this.props.color : '#FFF'
    }
    return(<div className="vlink" style={style}/>);
  }
}
