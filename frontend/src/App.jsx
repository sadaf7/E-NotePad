import './App.css'
import Header from './components/Header/Header'
import LandingPage from './screens/LandingPage/LandingPage'
import {BrowserRouter, Route,Routes } from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'


function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route exact path='/mynotes' element={<MyNotes/>}/>
        <Route exact path='/login' element={<LoginScreen/>}/>
        <Route exact path='/register' element={<RegisterScreen/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
