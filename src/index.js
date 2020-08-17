import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DropDataProvider} from "./DropContext";

ReactDOM.render(
  <DropDataProvider>
    <App/>
  </DropDataProvider>,
document.getElementById('root')
)
;