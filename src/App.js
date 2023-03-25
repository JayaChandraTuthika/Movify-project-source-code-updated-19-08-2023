import { useEffect, useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login'
import Register from './components/Register';
import MoviesContext from './context/MoviesContext';
import Home from './components/Home'

const App = () => {
  const [isDark,toggleTheme] = useState(true)
  
return (<MoviesContext.Provider value={{toggleTheme,isDark}}>
<Routes>
  <Route exact path='/login' element={<Login/>}/>
  <Route exact path='/register' element={<Register/>}/>
  <Route exact path="/" element={<Home/>}/>
</Routes>
</MoviesContext.Provider>)
}

export default App;
