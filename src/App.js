import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Componentes/header';
import Inicio from './Componentes/inicio';
import Registro from './Componentes/registro';
import Subcripto from './Componentes/subcripto';


class App extends Component {

  render() {

    return (
      <div className="App">
        <Header/>
        <Router>
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route path="/registro" component={Registro} />
            <Route path="/subcripto" component={Subcripto} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default  App;
