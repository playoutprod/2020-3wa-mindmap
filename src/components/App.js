
import React,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Node from './Node';
import SettingsPopin from './SettingsPopin';
import Breadcrumbs from './Breadcrumbs';
import View from './View'
import { generate_id as uuid } from '../utils/utils';

import '../css/app.css';


const firstChilds = [
  {id:uuid(),name:"child 1"},
  {id:uuid(),name:"child 2",color:"#E9DE7F",borderRadius:10}
]

class App extends React.Component{

  state = {
    target:null
  }

  getSettings = (target) => {
    this.setState({
      target : target
    })
  }
  closeSettings = (target) => {
    this.setState({
      target : null
    })
  }

  render(){
    return(
      <div className="app">
        <Router>

          <View>
            <Node id="main" path="/" getSettings={this.getSettings} childnodes={firstChilds} name="main"></Node>
          </View>
          <div className="header">
            <Route path="/" render={(props)=>{
                return props.location.pathname !== '/' ? <Link to="/"><span className="back"></span></Link> : <Fragment/>
              }}>
            </Route>
            <Route path="/" component={Breadcrumbs}/>
          </div>
          {this.state.target && <SettingsPopin target={this.state.target} closeFct={this.closeSettings}/>}
        </Router>
      </div>
    )
  }

}
export default App;
