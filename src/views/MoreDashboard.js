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



const MoreDashboard = ({ match }) => {




    return (

        <div css={{ marginTop: "4rem" }}>
            <div css={{ marginLeft: "4rem" }}>
                <div css={{ display: "flex", marginTop: "1rem", width:"95%" }}>
                    <MoreDashboardNav />
                    <Route path={`${match.path}/about`} component={About} />
                       <Route path={`${match.path}/faq`} component={FAQ} />
                    <Route path={`${match.path}/privacy`} component={Privacy} />
                    <Route path={`${match.path}/terms`} component={Terms} /> 

                    <Route path={match.path} exact  component={About}>
                        
                    </Route>
                </div>
            </div>
        </div>
    )
}

export default MoreDashboard;