import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/rootReducer'
import { FileProvider } from './context/FileContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <FileProvider>
                <App />
            </FileProvider>
        </Provider>
    </React.StrictMode>
)
