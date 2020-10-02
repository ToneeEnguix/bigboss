import React from 'react';
import HomeCarousel from "../components/HomeCarousel";
import OtherCompetitions from "../components/OtherCompetitions";
import RecentWinners from "../components/RecentWinners";
import HowToPlay from "../components/HowToPlay"

function Home() {
  return (
    <React.Fragment>

    <HomeCarousel/>
    <OtherCompetitions/>
    <RecentWinners/>
    <HowToPlay/>
    </React.Fragment>
  );
}

export default Home;