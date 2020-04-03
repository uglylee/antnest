//引入react jsx写法的必须
import React from 'react';
//引入需要用到的页面组件
import Index from './pages/index';
import Data from './pages/data/data';
import Require from './pages/require/require';
import Task from './pages/task/task';
import About from './pages/about';
//引入一些模块
import { BrowserRouter as Router, Route} from "react-router-dom";

function router(){
  return (
    <Router>
      <Route path="/index" component={Index} />
      <Route path="/about" component={About} />
      <Route path="/task" component={Task} />
      <Route path="/data" component={Data} />
      <Route path="/require" component={Require} />
    </Router>);
}

export default router;
