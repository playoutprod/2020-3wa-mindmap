import React from 'react';
import '../css/controls.css';
import trash from '../images/trash.svg';

export default class Popin extends React.Component{

  type = this.props.type ? this.props.type : "text";
  values = this.props.values ? this.props.values : [];
  name = this.props.name ? this.props.name : '';
  param = this.props.param ? this.props.param : 'name';
  state = {
    value : this.props.value ? this.props.value : ''
  }

  changeValue = (e) => {
    let value = e.target.value ? e.target.value : e.target.getAttribute('value');
    this.onValueChange(value);
    if(e.target.getAttribute('type')){
      if(e.target.getAttribute('type')==="n"){
        value = isNaN(parseInt(value)) ? 0 : value
      }
    }
    this.setState({
      value:value
    })
  }

   incrValue = () =>{
     this.setState(prevState => {
       const prevValue = isNaN(parseInt(prevState.value)) ? 0 : parseInt(prevState.value)
       const newValue = prevValue+1;
       this.onValueChange(newValue);
       return({value : newValue})
     })
   }

   decrValue = () =>{
     this.setState(prevState => {
       const prevValue = isNaN(parseInt(prevState.value)) ? 0 : parseInt(prevState.value);
       const newValue = prevValue-1;
       this.onValueChange(newValue);
       return({value : newValue})
     })
   }

   onValueChange = (newValue)=>{
     if(this.props.onControlChange){
       this.props.onControlChange(this.param,newValue);
     }
   }

  render(){
    const jsx = {
      "text" : (<input value={this.state.value} onChange={this.changeValue} type="text"/>),
      "colors" : (
        <div className="picker">
          {
            this.values.map((value,k)=>{
              let style={backgroundColor:value};
              if(this.state.value === value){
                style={
                  backgroundColor:value,
                  border : "2px solid #FFF"
                }
              }
              return(<div onClick={this.changeValue} value={value} style={style} key={k} className="color"></div>)
            })
          }
        </div>
      ),
      "value" : (
        <div className="value">
          <span className="remove" onClick={this.decrValue}></span>
          <input type="n" value={isNaN(parseInt(this.state.value)) ? 0 : parseInt(this.state.value)} onChange={this.changeValue}></input>
          <span className="add" onClick={this.incrValue}></span>
        </div>
      ),
      "delete" : (<div className="delete" onClick={this.props.delete ? this.props.delete : ()=>(false)}><img alt="delete" src={trash}></img></div>)
    }
    return(
      <div className={"control"}>
        <label>{this.name}</label>
        {
          jsx[this.type]
        }
      </div>
    )
  }
}
