import Popin from './Popin';
import Control from './Control';
import React from 'react';

export default class SettingsPopin extends React.Component{

  state = {
    value:null
  }
  popin=React.createRef();

  color = this.props.target ? this.props.target.state.color : null;
  name = this.props.target ? this.props.target.state.name : null;
  borderRadius = this.props.target ? this.props.target.state.borderRadius : null;

  onControlChange = (param,value) => {
    if(this.props.target){
      this.props.target.updateSettings({
        [param]:value
      })
    }
    this.setState({
      [param]:value
    })
  }
  deleteNode = () =>{
    if(this.props.target){
      this.props.target.unMount(null,true)
    }
    this.popin.current.hide();
  }

  render(){
    return(
      <Popin ref={this.popin} name="settings" className="settings" {...this.props}>
        <Control inHeader type="delete" delete={this.deleteNode}></Control>
        <Control onControlChange={this.onControlChange} param="name" value={this.name} type="text" name="name" ></Control>
        <Control onControlChange={this.onControlChange} param="color" value={this.color} type="colors" name="border-color" values={["#E97F7F","#E9DE7F","#8BE97F","#7FC0E9"]}></Control>
        <Control onControlChange={this.onControlChange} param="borderRadius" value={this.borderRadius} type="value" name="border-radius"></Control>
      </Popin>
    )
  }
}
