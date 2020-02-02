import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import Volunteer from "./components/Volunteer/Volunteer"
import AboutUs from "./components/AboutUs/AboutUs"
import FAQ from "./components/FAQ/FAQ"
import RubberDucky from "./components/Render/Render"
import NotFound from "./views/NotFound/NotFound";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import './assets/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/Volunteer" component={Volunteer}></Route>
        <Route exact path="/AboutUs" component={AboutUs}></Route>
        <Route exact path="/FAQ" component={FAQ}></Route>
        <Route exact path="/Products/RubberDucky" component={RubberDucky}></Route>
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
