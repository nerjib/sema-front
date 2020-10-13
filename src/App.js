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




        
      </Switch>
    </div>
  );
}

export default App;
