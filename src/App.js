import { useEffect, useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login'
import Register from './components/Register';
import MoviesContext from './context/MoviesContext';
import Home from './components/Home'
import MovieDetails from './components/MovieDetails';

const App = () => {
  const [isDark,toggleTheme] = useState(true)
  const [searchText,setSearchText] = useState("")

  const onChangesearchText =(val) => {
      setSearchText(val)
  }
  
return (<MoviesContext.Provider value={{toggleTheme,isDark,searchText,onChangesearchText}}>
<Routes>
  <Route exact path='/login' element={<Login/>}/>
  <Route exact path='/register' element={<Register/>}/>
  <Route exact path="/" element={<Home/>}/>
  <Route exact path="/movies/:id" element={<MovieDetails/>}/>
</Routes>
</MoviesContext.Provider>)
}

export default App;
