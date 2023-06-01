import axios from 'axios';
import authHeader from './AuthHeader';
import authService from './AuthService';
import { UserProps } from '../shared/UserProps';
import { PostProps } from '../shared/PostProps';

const API_URL = 'http://127.0.0.1:8000';

export default class PlanteService {

  static getFeed(): Promise<PostProps[]> {
    return axios.get(API_URL + '/plants?skip=0&limit=100', { headers: authHeader() });
  }

  static newPlant(nom: string, type: string, description: string, photo: string) {

    const currentUser : null | UserProps = authService.getCurrentUser()

    if(currentUser === null) {
      throw new Error("No user in getCurrentUser")
    }

    axios.post(API_URL + "new", { headers: authHeader(), body: {
      nom: nom,
      type: type,
      description: description,
      photo: photo,
      user_id: currentUser.id
    } })
  }

  static deletePlant(plant_id: number) {

    const currentUser : null | UserProps = authService.getCurrentUser()

    if(currentUser === null) {
      throw new Error("No user in getCurrentUser")
    }

    axios.delete(API_URL + "delete", { headers: authHeader(), data: {
      body: {
        plant_id: plant_id,
        user_id: currentUser.id
      }
    } })
  }

  static updatePlant(plant_id: number, nom: string, type: string, description: string, photo: string) {

    const currentUser : null | UserProps = authService.getCurrentUser()

    if(currentUser === null) {
      throw new Error("No user in getCurrentUser")
    }

    axios.put(API_URL + "new", { headers: authHeader(), data: {
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
