import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../pages/home';
import Profil from '../../pages/profil';
import Trending from '../../pages/trending';
import Navbar from "../Navbar";

const index = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profil} />
                <Route path="/trending" exact component={Trending} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;