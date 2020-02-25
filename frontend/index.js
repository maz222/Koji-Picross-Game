/**
 * common/index.js
 *
 * What it Does:
 *   This file sets up our react app to render inside of the root html
 *   file. The global css file is included here as well as our service
 *   worker is registered.
 *
 * Things to Change:
 *   Anything outside of react that needs to be included in your project
 *   can go here. If you want additional CSS files you can include them
 *   here.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './index.css';
import App from './Wrapper/App';
import Container from './Wrapper/Components/Container';

const render = Component => {
  console.log('render');
  ReactDOM.render(
    <AppContainer>
      <Container>
        <Component />
      </Container>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./Wrapper/App', () => {
    render(App);
  });
}
