/**
 * @author Kent C. Dodds <kent@doddsfamily.us> (http://kentcdodds.com)
 * @license MIT
 */
'use strict';

var React = require('react');
var PropTypes = require('prop-types');

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
  function childContextTypes() {
    return Object.keys(context).reduce(function(obj, key) {
      obj[key] = PropTypes.any;
      return obj;
    }, {});
  }

  class ContextProvider extends React.Component {
    getChildContext() {
      return context;
    }

    render() {
      return children;
    }
  }

  ContextProvider.displayName = 'ContextProvider';
  ContextProvider.childContextTypes = childContextTypes();

  return React.createElement(ContextProvider, null);
}
