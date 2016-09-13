/**
 * @author Kent C. Dodds <kent@doddsfamily.us> (http://kentcdodds.com)
 * @license MIT
 */
'use strict';

var React = require('react');

module.exports = function getContextProviderCurried(context, children) {
  if (typeof children === 'undefined') {
    return function getContextProviderGetter(children) {
      return getContextProvider(context, children);
    };
  } else {
    return getContextProvider(context, children);
  }
};

function getContextProvider(context, children) {
  var ContextProvider = React.createClass({
    displayName: 'ContextProvider',

    getChildContext: function getChildContext() {
      return context;
    },
    childContextTypes: Object.keys(context).reduce(function (obj, key) {
      obj[key] = React.PropTypes.any;
      return obj;
    }, {}),
    render: function render() {
      return children;
    }
  });
  return React.createElement(ContextProvider, null);
};
