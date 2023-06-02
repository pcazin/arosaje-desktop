import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import PrivateRoutes from './routes/PrivateRoutes';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilPage from './pages/ProfilPage';
import PlantPage from './pages/PlantPage';
import NewPlantPage from './pages/NewPlantPage';
import ConversationsMenuPage from './pages/ConversationsMenuPage';
import ConversationsDetailsPage from './pages/ConversationsDetailsPage/index';

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

