import axios from 'axios';
import { UserProps } from '../shared/interfaces';
import getHeaders from './AuthHeader';

const API_URL = 'http://127.0.0.1:8000';

export default class UserService {

  static async getUserById(userId: number): Promise<any> {
    return axios.get(API_URL + `/user/${userId}`, getHeaders());
  }

  static async updateUser(id: number, username: string, bio: string, location: string, profilPicture: string, role: string, password: string): Promise<any> {

    const body = {
      username: username,
      bio,
      location: location,
      profilPicture: profilPicture,
      role: role,
      password: password
    }

    return axios.put(API_URL + `/user/${id}`, body, getHeaders())
  }

}
