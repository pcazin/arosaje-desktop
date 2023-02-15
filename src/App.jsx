import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import PrivateRoutes from './Routes/PrivateRoutes';

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
    <div id="app">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/messages/:username" element={<ConversationsDetailsPage />} />
            <Route path="/profil/:username" element={<ProfilPage />} />
            <Route path="/plant/:id" element={<PlantPage />} />
            <Route path="/plant/new" element={<NewPlantPage />} />
            <Route path="/profil" element={<ProfilPage />} />
            <Route path="/messages" element={<ConversationsMenuPage />} />
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

