import React from 'react';
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Reports from './components/reports/reports';
import FloodReports from './components/reports/floodreports';
import KDMap from './components/Map/kdmap';
import ReportDetails from './components/reports/reportDetails';
import UpdateAid from './components/reports/updateAid'
import IncidentMap from './components/Map/incident';
import Login from './components/login';
import ReportsByLGA from './components/reports/reportsbylga'
import DraftReports from './components/reports/draftreports';
import DraftDetails from './components/reports/draftdetails';
import UpdateOid from './components/reports/updateoid';
import UpdateVid from './components/reports/updatevid';
import UpdateCategory from './components/reports/updatecategory';
import FollowupReports from './components/reports/followupreports';
import FollowupDetails from './components/reports/followupdetails';
import Volunteers from './components/users/volunteers';
import FollowupLists from './components/reports/followlists';
import ClosedReports from './components/reports/closedreports';
import CategoryFollowup from './components/reports/categoryfollowup';
//import ReportsDetails


function App() {
  return (
    <div className="App">
     <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/reports" exact component={Reports} />
        <Route path="/floodreports" exact component={FloodReports} />
        <Route path="/kdmap" exact component={KDMap} />
        <Route path="/reports/:id" exact component={ReportDetails} />
        <Route path="/updateaid/:id" exact component={UpdateAid} />
        <Route path="/incidentmap/:id" exact component={IncidentMap} />
        <Route path="/login" exact component={Login} />
        <Route path="/reportsbylga/:id" exact component={ReportsByLGA} />
        <Route path="/drafts" exact component={DraftReports} />
        <Route path="/draft/:id" exact component={DraftDetails} />
        <Route path="/closedreports" exact component={ClosedReports} />
        <Route path="/updateoid/:id" exact component={UpdateOid} />
        <Route path="/updatevid/:id" exact component={UpdateVid} />
        <Route path="/updatecategory/:id" exact component={UpdateCategory} />
        <Route path="/followupcategory/:id" exact component={CategoryFollowup} />

        <Route path="/followup" exact component={FollowupReports} />
        <Route path="/followup/:id" exact component={FollowupDetails} />
        <Route path="/draft/followup/:id" exact component={FollowupLists} />
        <Route path="/volunteers" exact component={Volunteers} />












        
      </Switch>
    </div>
  );
}

export default App;
