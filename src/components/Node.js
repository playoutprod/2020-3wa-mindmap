import React,{Component,Fragment} from 'react';
import {Route,Link} from 'react-router-dom';
import { generate_id as uuid } from '../utils/utils';

import '../css/node.css';
import NodeLink from './NodeLink';
import VerticalLink from './VerticalLink';

import img_settings from '../images/settings.svg';
import img_magnify from '../images/magnify.svg';

export default class Node extends Component{

  htmlnode = React.createRef();

  state = {
    index :this.props.index ? this.props.index : 0,
    parentLength :this.props.parentLength ? this.props.parentLength : 1,
    name : this.props.name ? this.props.name : 'new node',
    childnodes:this.props.childnodes ? this.props.childnodes : [],
    position : 0,
    hover:0,
    color: this.props.color ? this.props.color : "#E97F7F",
    borderRadius : this.props.borderRadius >-1 ? this.props.borderRadius : 2,
  }


  updatePosition = ()=>{
    if(this.htmlnode.current){
      let parentNode = this.htmlnode.current.parentNode.parentNode.getBoundingClientRect();
      let thisNode = this.htmlnode.current.getBoundingClientRect();
      let newPos = (parentNode.top+parentNode.height/2)-(thisNode.top+thisNode.height/2);
      if(this.props.scale !== false){
        newPos = newPos/this.props.scale
      }
      if(this.state.position !== newPos){
        this.setState({
          position : newPos
        })
      }
    }
  }

  addChild = (event)=>{
    if(this.props.onUpdate){
      this.props.onUpdate(this.props.id);
    }
    event.preventDefault();
    this.state.childnodes.push({id:uuid(),name:"new node",color:this.state.color,borderRadius:this.state.borderRadius})
    this.setState(prevState =>{
      return({
        chilnodes : prevState.childnodes
      })
    })
  }

  onChildUpdate = (id)=>{
      this.forceUpdate();
      if(this.props.onUpdate){
        this.props.onUpdate(this.props.id);
      }
  }

  handleHover = (e) => {
    this.setState({
      hover : e.type === 'mouseover'
    })
  }

  unMount = (index,first = false) => {
    if(first){
      this.props.unMount(this.state.index)
    }else if(index>-1){
      this.state.childnodes.splice(index, 1);
      this.setState( prevState => {
        return({
          childnodes : prevState.childnodes
        })
      })
    }
  }

  getSettings = (target) => {
    if(this.props.getSettings){
      this.props.getSettings(target);
    }
  }

  updateSettings = (newState) => {
    this.setState((prevState)=>(newState))
  }

  render(){
    const path = this.props.path + (this.props.id ? ':'+this.props.id : '')+'?';
    const childs = this.state.childnodes ? this.state.childnodes : [];
    const childrenCount = childs.length;

    return(
      <div name={this.state.name} ref={this.htmlnode} className={"node p_"+this.state.parentLength+" i_"+this.state.index+" c_"+childrenCount} path={path}>
        <Route path={path} render={(routeProps)=>{
          return(
            <Fragment>
            {

              this.props.path.replace(/[:?]/g,'').indexOf(routeProps.location.pathname)>-1 &&
              <div className="content">

                {this.props.path !== "/" && <VerticalLink display={this.props.scale === false ? 'none' : 'block'} size={this.state.position} color={this.state.color}/>}
                {this.props.path !== "/" && <NodeLink type="from" color={this.state.color}/>}
                <div className="nodeContent" style={{borderColor:this.state.color,borderRadius:parseInt(this.state.borderRadius)/4+'em'}} onMouseOver={this.handleHover} onMouseOut={this.handleHover}>
                  <div className="text">{this.state.name ? this.state.name : "new node"}</div>
                  <div className="hoverContent" style={{opacity:(this.state.hover ? 1 : 0)}}>
                    <button className="settings" onClick={(e)=>{this.getSettings(this)}}><img alt="settings" src={img_settings}></img></button>
                    <Link className="magnify" to={this.props.path.replace(/[:?]/g,'')+this.props.id}><img alt="magnify" src={img_magnify}></img></Link>
                  </div>
                </div>
                {
                  childrenCount<3 ? <NodeLink childs={childrenCount>0} type="add" handleClick={this.addChild} color={this.state.color}/> : <NodeLink type="to" color={this.state.color}/>
                }
              </div>
          }
          </Fragment>
          )
        }}>
        </Route>
        <div className="children">
          {
          childs.map((child,k)=>{

            const childnodes = generateNodes(child.name);

            const attr = {
              scale:this.props.scale,
              name:child.name,
              key : child.id ? child.id : k,
              index :k,
              id:child.id,
              unMount : this.unMount,
              borderRadius :child.borderRadius ? child.borderRadius : null,
              color :child.color ? child.color : '#E97F7F',
              getSettings : this.getSettings,
              parentPos : this.state.position,
              onUpdate:this.onChildUpdate,
              path:path+'/',
              parentLength:childrenCount,
              childnodes:childnodes
            }

            return(<Node {...attr} />)
          })
        }
      </div>
      </div>
    );
  }

  componentDidMount(){
    this.updatePosition();
  }

  componentDidUpdate(){
    this.updatePosition();
  }
}

function generateNodes(name){
  if(name === 'child 1'){
    return [{id:uuid(),name : "subchild 11"},{id:uuid().replace('-',''),name : "subchild 12"}]
  }else if(name === 'child 2'){
    return [{id:uuid(),name : "subchild 21",color:"#7FC0E9",borderRadius:0},{id:uuid(),name : "subchild 22"},{name : "subchild 23"}]
  }else if(name === 'subchild 22'){
    return [{id:uuid(),name : "subsubchild 221"},{name : "subsubchild 22"},{id:uuid(),name : "subsubchild 23",color:"#8BE97F",borderRadius:5}]
  }else{
    return(null)
  }
}
