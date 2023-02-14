import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service';

const API_URL = 'http://localhost:8080/api/plant/';

class PlantService {

  getFeed() {
    return axios.get(API_URL + 'all', { headers: authHeader() });
  }

  newPlant(nom, type, description, photo) {
    axios.post(API_URL + "new", { headers: authHeader(), body: {
      nom: nom,
      type: type,
      description: description,
      photo: photo,
      user_id: authService.getCurrentUser().id
    } })
  }

  deletePlant(plant_id) {
    axios.delete(API_URL + "delete", { headers: authHeader(), body: {
      plant_id: plant_id,
      user_id: authService.getCurrentUser().id
    } })
  }

  updatePlant(plant_id, nom, type, description, photo) {
    axios.update(API_URL + "new", { headers: authHeader(), body: {
      plant_id: plant_id,
      nom: nom,
      type: type,
      description: description,
      photo: photo,
      user_id: authService.getCurrentUser().id
    } })
  }
}

export default new PlantService();