import axios from 'axios';
import authHeaders from './AuthHeader';
import authService from './AuthService';
import { UserProps } from '../shared/UserProps';
import { PostProps } from '../shared/PostProps';
import getHeaders from './AuthHeader';

const API_URL = 'http://127.0.0.1:8000';

export default class PlanteService {

  static getFeed(): Promise<any> {
    return axios.get(API_URL + '/plants?skip=0&limit=100', getHeaders());
  }

  static newPlant(nom: string, type: string, description: string, photo: string) {

    const currentUser : null | UserProps = authService.getCurrentUser()

    if(currentUser === null) {
      throw new Error("No user in getCurrentUser")
    }

    axios.post(API_URL + "new", { headers: authHeaders(), body: {
      nom: nom,
      type: type,
      description: description,
      photo: photo,
      user_id: currentUser.id
    } })
  }

  static deletePlant(plant_id: number) {

    const currentUser : null | UserProps = authService.getCurrentUser()

    if(!currentUser) {
      throw new Error("No user in getCurrentUser")
    }

    axios.delete(`${API_URL}/delete/${plant_id}`, getHeaders())
  }

  static updatePlant(plant_id: number, nom: string, type: string, description: string, photo: string) {

    const currentUser : null | UserProps = authService.getCurrentUser()

    if(currentUser === null) {
      throw new Error("No user in getCurrentUser")
    }

    axios.put(API_URL + "new", { headers: authHeaders(), data: {
      body: {
        plant_id: plant_id,
        nom: nom,
        type: type,
        description: description,
        photo: photo,
        user_id: currentUser.id
      }
    } })
  }
}
