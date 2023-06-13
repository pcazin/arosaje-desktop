import axios from 'axios';
import { UserProps } from '../shared/interfaces';
import getHeaders from './AuthHeader';

const API_URL = 'http://127.0.0.1:8000';

class UserService {

  getUserById(userId: number): Promise<any> {
    return axios.get(API_URL + `/user/${userId}`, getHeaders());
  }

}

export default new UserService();