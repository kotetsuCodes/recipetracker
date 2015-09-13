import React from 'react';

var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Main from './Main.js';
import Login from './Login.js';
import Recipes from './Recipes.js';
import ShoppingLists from './ShoppingLists.js';

var App = React.createClass({

  mixins: [ReactFireMixin],

  render() {
    return (
      <div>
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><a href="#">Recipe Tracker</a></h1>
            </li>
            <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
          </ul>

          <section className="top-bar-section">
            <ul className="left">
              <li><Link to="login">Login</Link></li>
              <li><Link to="recipes">Recipes</Link></li>
              <li><Link to="shoppinglists">Shopping Lists</Link></li>
            </ul>
          </section>
        </nav>

          <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name="main" path="/" handler={Main}/>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="recipes" path="/recipes" handler={Recipes}/>
    <Route name="shoppinglists" path="/shoppinglists" handler={ShoppingLists}/>
  </Route>

);

Router.run(routes, (Root) => {
  React.render(<Root/>, document.body);
});
