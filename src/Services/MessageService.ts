import axios from 'axios';
import authHeader from './AuthHeader';
import authService from './AuthService';
import AuthService from './AuthService';
import { UserProps } from '../shared/interfaces';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8080';

export default class MessageService {
  
  static async getConversation(otherUserId: number, myUserId: number): Promise<any> {
    
    return axios.get(API_URL + `/conversation/${myUserId}/${otherUserId}`)
  }
}


