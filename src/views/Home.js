import React from 'react';
import HomeCarousel from "../components/HomeCarousel";
import OtherCompetitions from "../components/OtherCompetitions";
import RecentWinners from "../components/RecentWinners";
import HowToPlay from "../components/HowToPlay";
/** @jsx jsx */
import { jsx } from '@emotion/core';

function Home() {
  return (
    <div css={{ marginTop: "7.5rem" }}>

      <HomeCarousel />
      <OtherCompetitions />
      <RecentWinners />
      <HowToPlay />
    </div>
  );
}

export default Home;