import axios from 'axios';
import { UserProps } from '../shared/interfaces';
import getHeaders from './AuthHeader';

const API_URL = 'http://127.0.0.1:8000';

class UserService {

  getUserById(userId: number): Promise<any> {
    return axios.get(API_URL + `/user/${userId}`, getHeaders());
  }

  updateUser(id: number, username: string, bio: string, location: string, profilPicture: string, role: string): Promise<any> {

    const body = {
      username: username,
      bio,
      location: location,
      profilPicture: profilPicture,
      role: role
    }

    return axios.put(API_URL + `/user/${id}`, body, getHeaders())
  }

}

export default new UserService();