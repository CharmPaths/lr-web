import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "./App"

import "./index.css"
import "dayjs/locale/ru"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import * as serviceWorker from "./serviceWorker"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// serviceWorker.register()
