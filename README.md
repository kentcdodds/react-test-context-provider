# react-test-context-provider

A function that allows you to specify context to pass to a child component (intended for testing only).

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and should
be installed as one of your project's `devDependencies`:

```
npm install --save-dev react-test-context-provider
```

## Usage

```javascript
var getContextProvider = require('react-test-context-provider')
var contextObject = {color: 'blue'} // the context you want to provide to the children components
var reactElement = getElementWithContext(contextObject, <ComponentThatNeedsContext />) // returns the react element as rendered with the given context
```

In this example, I'm using the [Jest](http://facebook.github.io/jest/) testing framework.

**Button.js**

```javascript
import React, {PropTypes} from 'react'
export default function Button({children}, {color}) {
  // function components receive context as the second argument
  return <button style={{background: color}}>{children}</button>
}
Button.propTypes = {children: PropTypes.any.isRequired}
Button.contextTypes = {color: PropTypes.string}
```

**Button.test.js**

```javascript
import React from 'react'
import renderer from 'react-test-renderer'
import getElementWithContext from 'react-test-context-provider'
import Button from './Button'

test('styles the button with a background of the context color', () => {
  const element = getElementWithContext({color: 'blue'}, <Button>Click Me</Button>)
  const component = renderer.create(element)
  expect(component).toMatchSnapshot()

  // NOTE: This API is also curried, so you can provide the context first and the children later:
  // import getContextProvider from 'react-test-context-provider'
  // const getElementWithBlueColorContext = getContextProvider({color: 'blue'})
  // const element = getElementWithBlueColorContext(<Button>Click Me</Button>)
})
```

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
