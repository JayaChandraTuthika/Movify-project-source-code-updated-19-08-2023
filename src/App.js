import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import MoviesContext from "./context/MoviesContext";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";
import Popular from "./components/Popular";
import WishlistComponent from "./components/WishlistComponent";
import TVshows from "./components/TVshows";
import TVshowDetails from "./components/TVshowDetails";
import ProtectedRoutes from "./components/ProtectedRoutes";
// import UserProfile from './components/UserProfile';
import UserSettings from "./components/UserSettings";
import NotFound from "./components/NotFound";

const App = () => {
  const [isDark, toggleTheme] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [wishlist, setWishList] = useState([]);
  const [userDetails, onChangeUserDetails] = useState({});

  const onChangesearchText = (val) => {
    setSearchText(val);
  };

  const changeUserDetails = (user) => {
    onChangeUserDetails(user);
  };

  const toggleWishListItem = (movie) => {
    // console.log(wishlist)
    const mov = wishlist.find((each) => each.id === movie.id);
    if (mov === undefined) {
      setWishList([...wishlist, movie]);
    } else {
      const newWishList = wishlist.filter((each) => each.id !== movie.id);
      // console.log(newWishList)
      setWishList(newWishList);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        toggleTheme,
        isDark,
        searchText,
        onChangesearchText,
        wishlist,
        toggleWishListItem,
        userDetails,
        changeUserDetails,
      }}
    >
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movies/:id" element={<MovieDetails />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/popular" element={<Popular />} />
          <Route exact path="/tvshows" element={<TVshows />} />
          <Route exact path="/tv/:id" element={<TVshowDetails />} />
          <Route exact path="/wishlisted" element={<WishlistComponent />} />
          <Route exact path="/settings" element={<UserSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MoviesContext.Provider>
  );
};

export default App;
