import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { getPlatforms } from '@ionic/react'
import {enableLogging} from 'mobx-logger'

// lock the app to landscale on mobile
console.log('DrumVox is running on', getPlatforms())

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// enable logging for MobX
enableLogging({
	predicate: () => true,
	action: true,
    reaction: true,
    transaction: true,
    compute: true
})
