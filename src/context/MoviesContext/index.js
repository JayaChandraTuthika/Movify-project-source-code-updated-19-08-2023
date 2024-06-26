import React from 'react'

const MoviesContext = React.createContext({
    idDark:true,
    toggleTheme:()=> {},
    searchText:"",
    onChangesearchText:() => {},
    wishlist:[],
    toggleWishListItem:() => {},
    userDetails:{},
    changeUserDetails:() => {}
})


export default MoviesContext