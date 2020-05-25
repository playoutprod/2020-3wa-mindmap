import React,{Component,Fragment} from 'react';
import {Route} from 'react-router-dom';

import spaces from '../config/spaces';

import '../css/node.css';
import NodeLink from './NodeLink';
import VerticalLink from './VerticalLink'

export default class Node extends Component{

  htmlnode = React.createRef();

  state = {
    index :this.props.index ? this.props.index : 0,
    parentLength :this.props.parentLength ? this.props.parentLength : 1,
    name:this.props.name ? this.props.name : null,
    childnodes:this.props.childNodes ? this.props.childNodes : [],
    position : 0
  }

  updatePosition = ()=>{
    if(this.state.position !== this.htmlnode.current.offsetTop){
      this.setState({
        position : this.htmlnode.current.offsetTop
      })
    }
  }

  render(){

    const path = this.props.path + (this.state.name ? ':'+this.state.name : '')+'?';
    const childrenCount = this.state.childnodes.length;

    const mgTop = this.state.index === 0 ? 0 : Math.max(spaces.minSpace,childrenCount*spaces.childCoef);
    const mgBot = this.state.index === this.state.parentLength-1 ? 0 : Math.max(spaces.minSpace,childrenCount*spaces.childCoef);

    const style = {
      marginTop:mgTop+'em',
      marginBottom:mgBot+'em'
    };

    return(
      <div ref={this.htmlnode} className={"node p_"+this.state.parentLength+" i_"+this.state.index+" c_"+childrenCount} path={path} style={style}>
        <Route path={path} render={(routeProps)=>{
          return(
            <Fragment>
            {
              this.props.path.replace(/[:?]/g,'').indexOf(routeProps.location.pathname)>-1 &&
              <div className="content">
                {this.props.path !== "/" && <VerticalLink size={this.state.position}/>}
                {this.props.path !== "/" && <NodeLink type="from"/>}
                <div className="nodeContent">
                  <div className="text">{this.state.name ? this.state.name : "new node"}</div>
                </div>
                {
                  [
                    this.state.childnodes.map((child,k)=>(<NodeLink key={k} type="to"/>)),
                    childrenCount<3 && <NodeLink type="add" key={4}/>
                  ]
                }
              </div>
          }
          </Fragment>
          )
        }}>
        </Route>
        <div className="children">
          {
          this.state.childnodes.map((child,k)=>{

            let childnodes = [];
            if(child.name === 'child1'){
              childnodes = [{name : "end11"},{name : "end12"}]
            }else if(child.name === 'child2'){
              childnodes = [{name : "end21"},{name : "end22"},{name : "end23"}]
            }else if(child.name === 'child4'){
              childnodes = [{name : "end41"},{name : "end42"},{name : "end43"}]
            }
            return(<Node key={k} name={child.name} path={path+'/'} index={k} parentLength={childrenCount} childNodes={childnodes} onUpdate={this.onUpdate}/>)
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
