import './App.css';
import { Redirect, Switch, Route, Router } from "react-router-dom";

import RouteGuard from './Routes/RouteGuard';

import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilPage from './Pages/ProfilPage';
import PlantPage from './Pages/PlantPage';
import NewPlantPage from './Pages/NewPlantPage';
import ConversationsMenuPage from './Pages/ConversationsMenuPage';
import ConversationsDetailsPage from './Pages/ConversationsDetailsPage';

function App() {
  return (
    <Router>
      <Switch>

        <RouteGuard
          exact
          path="/"
          component={HomePage}
        />

        <Route
          path="/login"
          component={LoginPage}
        />

        <Route
          path="/register"
          component={RegisterPage}
        />

        <RouteGuard
          exact
          path="/profil"
          component={ProfilPage}
        />

        <RouteGuard
          exact
          path="/profil/:id?"
          component={ProfilPage}
        />

        <RouteGuard
          exact
          path="/plant/:id"
          component={PlantPage}
        />

        <RouteGuard
          exact
          path="/plant/new"
          component={NewPlantPage}
        />

        <RouteGuard
          exact
          path="/messages"
          component={ConversationsMenuPage}
        />

        <RouteGuard
          exact
          path="/messages/:id"
          component={ConversationsDetailsPage}
        />

        <Redirect to="/" />

      </Switch>
    </Router>
  );
}

export default App;
