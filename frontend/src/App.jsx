import './App.css'
import Header from './components/Header/Header'
import LandingPage from './screens/LandingPage/LandingPage'
import {BrowserRouter, Route,Routes } from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import CreateNote from './screens/CreateNote/CreateNote'
import SingleNote from './screens/SingleNote/SingleNote'
import { useState } from 'react'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'


function App() {

  const [search, setSearch] = useState();

  return (
    <>
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route exact path='/mynotes' element={<MyNotes search={search}/>}/>
        <Route exact path='/login' element={<LoginScreen/>}/>
        <Route exact path='/register' element={<RegisterScreen/>}/>
        <Route exact path='/profile' element={<ProfileScreen/>}/>
        <Route exact path='/createnote' element={<CreateNote/>}/>
        <Route exact path='/note/:id' element={<SingleNote/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
