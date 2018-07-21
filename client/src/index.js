import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import registerServiceWorker from './registerServiceWorker'
import App from './components/app'

import './stylesheets/index.css'

moment.locale('en-NZ')

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
