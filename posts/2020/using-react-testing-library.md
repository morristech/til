---
title: 'Using React testing library'
description: Testing your React components don't need to be difficult
tags: [React]
---

<figure class='cover'>
<img src='https://source.unsplash.com/DErxVSSQNdM/600x400' />
</figure>

[react-testing-library](https://github.com/testing-library/react-testing-library) is a very light-weight tool for testing React components. Here's a few tips on how to get started with it.

## Using test ID attributes

Consider adding `data-testid` attributes to your components. This makes them easy to target, and lets us refer to them without having to resort to XPath or CSS.

```js
const TextToolbar = () => (
  <div>
    {/* Notice the data-testid attributes! */}
    <button data-testid='button:bold'>Bold</button>
    <button data-testid='button:italic'>Italic</button>
    <button data-testid='button:underline'>Underline</button>
  </div>
)
```

Using test ID attributes is advocated by many testing frameworks. I first came across it in Cypress, [which recommends a very similar practice](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements).

## Smoke tests using test ID's

The react-testing-library API comes with `getBy` functions that will raise an error if they're not found. By having a test that only has .getBy calls, we effectively make a "smoke" test that will fail if the elements are missing.

```js
import { render } from 'react-testing-library'

it('works', () => {
  const co = render(<TextToolbar />)

  // This test will fail if these aren't present.
  co.getByTestId('button:bold')
  co.getByTestId('button:italic')
  co.getByTestId('button:underline')
})
```

## Simulating events

The API comes with a `fireEvent` helper that lets you simulate any DOM event. Use it to simulate clicks (`fireEvent.click(element)`), key presses (`fireEvent.keyPress(el)`, and anything else really!

```js
import { render, fireEvent, act, cleanup } from 'react-testing-library'

// Calls cleanup() after every test
afterEach(cleanup)

it('works', () => {
  const co = render(<TextToolbar />)

  const button = co.getByTestId('button:insertImage')

  // Click the button.
  act(() => { fireEvent.click(button) })

  // Ensure that something happens
  await waitForElement(() => (
    co.getTestById('insertImageDialog')
  ))
})
```

## Jest DOM

Try [`@testing-library/jest-dom`](https://npm.im/@testing-library/jest-dom) to add a few custom matchers.

```js
// See https://github.com/kentcdodds/react-testing-library#global-config
import 'jest-dom/extend-expect'
```

```js
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import HiddenMessage from '../hidden-message'

it('works', () => {
  const button = screen.getByLabelText(/Submit/)

  expect(button).toBeInTheDocument()
  expect(button).toBeEnabled()
  expect(button).toHaveStyle('color: red')
})
```

<!--

## Other things to try

```js
// Find text by regexp
co.getByText(/Image has been saved/i)
```

-->
