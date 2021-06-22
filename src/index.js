require('file-loader?name=[name].[ext]!./index.html')
import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './scss/main.scss'


const appElement = document.getElementById('app')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

  ,  appElement
)