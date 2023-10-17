import './App.css'
import './assets/scss/main.scss'
import './assets/css/main.css'

// Routing
import { Routes, Route } from 'react-router-dom'

// Error Page
import { PageNotFound } from './views/PageNotFound';

// Views
// Home
import { Home } from './views/Home';

function App() {
  return (
    <>
      <Routes>
        {/* Normal routes */}
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />

        {/* Error routes */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
