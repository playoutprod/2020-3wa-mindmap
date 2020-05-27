import React from 'react';


export default class View extends React.Component{

  constructor(props){
    super(props)
    window.onmousewheel = this.onMouseWheel;
    this._scrollTimeout = null;
  }

  dragStyle = {
    width:'100%',
    height:'100%',
    position:'fixed',
    top:0,
    left:0,
    pointerEvents:'all'
  }

  state = {
    translate :[0,0],
    scale : 1,
    wheeling :false
  }

  start = [0,0];
  position = [0,0];
  scale = 1;

  onMouseWheel = (e) => {

    clearTimeout(this._scrollTimeout);
    this._scrollTimeout = setTimeout(() => {
        this.setState({
          wheeling :false
        })
    }, 250);

    const scale = this.state.scale+e.deltaY/100
    this.setState({
        wheeling : true,
        scale: scale >= 0.5 ? scale : 0.5
    })
  }

  startDrag = (e) => {
    this.start = [e.screenX,e.screenY]
    this.position = this.state.translate;
    e.target.addEventListener('mousemove',this.moveView)
  }
  stopDrag = (e) => {
    e.target.removeEventListener('mousemove',this.moveView)
  }
  moveView = (e) =>{
    this.setState({
      translate : [this.position[0]+e.screenX-this.start[0],this.position[1]+e.screenY-this.start[1]]
    })
  }
  render(){
    let JSX = this.props.children;
    if(!Array.isArray(this.props.children)){
      JSX = [this.props.children]
    }


    const viewStyle = {
      transform:'translate('+this.state.translate[0]+'px,'+this.state.translate[1]+'px) scale('+this.state.scale+','+this.state.scale+')'
    }
    return(
      <div className="view" style={{pointerEvents:'none'}}>
        <div style={this.dragStyle} className="view_handler" onMouseDown={this.startDrag} onMouseUp={this.stopDrag}></div>
        <div className="view_content" style={viewStyle}>
          {JSX.map((child,k)=>(<child.type key={k} scale={this.state.wheeling === false && this.state.scale} {...child.props}/>))}
        </div>
      </div>
    )
  }
  componentWillUnmount(){
    window.onmousewheel = null;
  }
}
