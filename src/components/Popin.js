import React from 'react';
import '../css/popin.css';

export default class Popin extends React.Component{

  state = {
    display:false
  }

  hide = () => {
    this.setState({
      display:false
    })
    if(this.props.closeFct){
      this.props.closeFct();
    }
  }

  show = () => {
    this.setState({
      display:true
    })
  }

  render(){


    return(
      <div className="popin" style={{display:(this.state.display || this.props.target ? 'flex' : 'none')}}>
        <div className="overlay" onClick={this.hide}/>
        <div className={"window "+(this.props.className ? this.props.className : '')}>
          <div className="header">
            <span className="title">{this.props.name ? this.props.name : 'popin'}</span>
            {
              this.props.children.map((control,k)=>{
                if(control.props.inHeader){
                  return(control)
                }else{
                  return(null)
                }
              })
            }
          </div>
          <div className="content">
          {
            this.props.children.map((control,k)=>{
              if(control.props.inHeader !== true){
                return(control)
              }else{
                return(null)
              }
            })
          }
          </div>
        </div>
      </div>
    )
  }
}
