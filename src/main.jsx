import React from 'react'
import ReactDOM from 'react-dom/client'
import First from './First.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <First />
    </Provider>
)
