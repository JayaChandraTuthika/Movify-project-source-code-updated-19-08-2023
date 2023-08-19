import Navbar from "../Navbar";
import TrendingSlider from "../TrengingSlider/index.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./index.css";
import Sidebar from "../Sidebar";
import UpcomingSlider from "../UpcomingSlider";
import HomePoster from "../HomePoster";
import RecommendationsSlider from "../RecommendationsSlider";

const Home = () => {
  // console.log('home')
  return (
    <div className="main-background">
      <Sidebar />
      <div className="content-container">
        <Navbar />
        <HomePoster />
        <TrendingSlider />
        <UpcomingSlider />
        <RecommendationsSlider />
      </div>
    </div>
  );
};

export default Home;
