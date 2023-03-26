import React from 'react'

const MoviesContext = React.createContext({
    idDark:true,
    toggleTheme:()=> {},
    searchText:"",
    onChangesearchText:() => {}
})


export default MoviesContext