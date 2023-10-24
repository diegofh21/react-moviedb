import './App.css'
import './assets/scss/main.scss'
import './assets/css/main.css'

// Spatial navigation initialization
import { init } from '@noriginmedia/norigin-spatial-navigation';

// Routing
import { Routes, Route } from 'react-router-dom'

// Error Page
import { PageNotFound } from './views/PageNotFound';

// Views
// Home
import { Home } from './views/Home';

function App() {
  
  init({
    debug: true,
    visualDebug: true,
    
  })

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
