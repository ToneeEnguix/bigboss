import React, { useContext } from 'react'
/* @jsx jsx */
import { jsx } from '@emotion/core/'
import MoreDashboardNav from "../components/MoreDashboardNav";
import {
    Route,
    Redirect,
} from "react-router-dom";
import About from "../components/About";
import FAQ from "../components/FAQ";
import Privacy from "../components/Privacy";
import Terms from "../components/Terms";
import Careers from "../components/Careers";
import facepaint from 'facepaint';


const breakpoints = [576, 950, 992, 1200]

const mq = facepaint(
    breakpoints.map(bp => `@media (min-width: ${bp}px)`));



const MoreDashboard = ({ match }) => {




    return (

        <div css={{ marginTop: "4rem" }}>
            <div css={mq({ marginLeft:["1rem","2rem","4rem","4rem"]})}>
                <div css={{ display: "flex", marginTop: "1rem", width:"95%" }}>
                    <MoreDashboardNav />
                    <Route path={`${match.path}/about`} component={About} />
                       <Route path={`${match.path}/faq`} component={FAQ} />
                    <Route path={`${match.path}/privacy`} component={Privacy} />
                    <Route path={`${match.path}/terms`} component={Terms} /> 
                    <Route path={`${match.path}/careers`} component={Careers} /> 
                    <Route path={match.path} exact  component={About}>
                        
                    </Route>
                </div>
            </div>
        </div>
    )
}

export default MoreDashboard;