import './App.css'
import './assets/scss/main.scss'
import './assets/css/main.css'

// Routing
import { Routes, Route } from 'react-router-dom'

// Error Page
import { PageNotFound } from './views/PageNotFound';

// Auth
import AuthUser from './components/AuthUser';

// Redirect
import { Redirect } from './components/Redirect';

// Views
// Home
import { Home } from './views/Home';
import { TestIndex } from './views/TestIndex';


function App() {

  const { getToken } = AuthUser();

  return (
    <>
      <Routes>
        {
          (!getToken()) ?
            <>
              {/* Normal routes */}
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/test' element={<TestIndex />} />

              <Route path='/redirectUser' element={<Redirect />} />

              {/* Error routes */}
              <Route path='*' element={<PageNotFound />} />
            </> :
            <>
              {/* Normal routes */}
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/test' element={<TestIndex />} />

              {/* Auth routes */}
              <Route path='/redirectUser' element={<Redirect />} />

              {/* Error routes */}
              <Route path='*' element={<PageNotFound />} />
            </>
        }
      </Routes>
    </>
  )
}

export default App
