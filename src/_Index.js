var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var Router = require('react-router-component')
var Locations = Router.Locations;
var Location = Router.Location;

//components
var Login = require('./Login');
var Recipes = require('./Recipes');
var ShoppingLists = require('./ShoppingLists');

var App = React.createClass({

  mixins: [ReactFireMixin],

  render: function() {
    return (
      <Locations>
        <Location path="/" handler={Login} />
        <Location path="/Recipes" handler={Recipes} />
        <Location path="/ShoppingLists" handler={ShoppingLists} />
      </Locations>
    )
  }
})

React.render(React.createElement(App), document.body);
