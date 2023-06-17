import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PrivateRoutes from "./routes/PrivateRoutes";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlantPage from "./pages/PlantPage";
import ProfilPage from "./pages/ProfilPage";
import RegisterPage from "./pages/RegisterPage";
import NewPlantPage from "./pages/NewPlantPage";
import UpdateProfil from "./pages/UpdateProfil";
import PlantUpdatePage from "./pages/PlantUpdatePage";
import PlantAddCommentPage from "./pages/PlantAddCommentPage";
import ProfilPageUser from "./pages/ProfilPageUser";
import ConversationsMenuPage from "./pages/ConversationsMenuPage";
import ConversationsDetailsPage from "./pages/ConversationsDetailsPage/index";

function App() {
    return (
        <div id="app">
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/plant/:plantId/comment/add/:userId" element={<PlantAddCommentPage />} />
                        <Route path="/plant/:id" element={<PlantPage />} />
                        <Route path="/plant/update/:id" element={<PlantUpdatePage />} />
                        <Route path="/plant/new" element={<NewPlantPage />} />
                        <Route path="/profil/update" element={<UpdateProfil />} />
                        <Route path="/profil/:id" element={<ProfilPageUser />} />
                        <Route path="/profil" element={<ProfilPage />} />
                        <Route path="/messages/:userId" element={<ConversationsDetailsPage />} />
                        <Route path="/messages" element={<ConversationsMenuPage />} />
                        <Route path="/" element={<HomePage />} />
                    </Route>
                </Routes>
            </Router>
            <Toaster />
        </div>
    );
}

export default App;
