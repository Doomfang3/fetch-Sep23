import { Routes, Route } from 'react-router-dom'
import AllCharactersPage from './pages/AllCharactersPage'
import CharacterDetails from './pages/CharacterDetails'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import CharacterUpdatePage from './pages/CharacterUpdatePage'
import NewCharacterPage from './pages/NewCharacterPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/characters' element={<AllCharactersPage />} />
        <Route path='/characters/:characterId' element={<CharacterDetails />} />
        <Route path='/characters/new' element={<NewCharacterPage />} />
        <Route path='/characters/:characterId/update' element={<CharacterUpdatePage />} />

        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
