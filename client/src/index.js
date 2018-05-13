import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import 'backbone'
import 'backbone-relational'
import 'backbone.memento'

import registerServiceWorker from './registerServiceWorker'
import App from './components/app'

import './stores/app'
import './stores/client'
import './stores/invoice'
import './stores/row'
import './stores/snippet'

import './stylesheets/index.css'

moment.locale('en-NZ')

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
