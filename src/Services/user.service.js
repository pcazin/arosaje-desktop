import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {

  getMyProfil() {
    return axios.get(API_URL, { headers: authHeader(), body: {
      id: user_idauthService.getCurrentUser().id
    } });
  }

  getProfil(user_id) {
    return axios.get(API_URL, { headers: authHeader(), body: {
      id: user_id
    } });
  }

  updateProfil(bio, profil_picture, location, roles) {
    axios.update(API_URL + "update", { headers: authHeader(), body: {
      user_id: authService.getCurrentUser().id,
      bio: bio,
      profil_picture: profil_picture,
      location: location,
      roles: roles
    } })
  }
}

export default new UserService();