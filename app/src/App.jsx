import { RouterProvider } from 'react-router-dom'

import Header from './components/header/header.jsx'
import {router} from "./routes.jsx"

import './App.css'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='main-content'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
