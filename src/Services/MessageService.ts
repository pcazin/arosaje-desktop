import axios from 'axios';
import authHeader from './AuthHeader';
import authService from './AuthService';

const API_URL = 'http://localhost:8080/api/message/';

class MessageService {
  
  /* getMessagesMenu() {
    return axios.get(API_URL + 'menu', { headers: authHeader(), data: { body: authService.getCurrentUser()?.id ?? null } });
  } */

  /* getMessagesDetails() {
    return axios.get(API_URL + 'details', { headers: authHeader(), data: { body: authService.getCurrentUser()?.id ?? null } });
  } */

  addMessage(message: string, receiver_id: string) {
    return axios.post(API_URL + 'add', {
      headers: authHeader(),
      data: {
        message: message,
        user_id: authService.getCurrentUser()?.id ?? null,
        receiver_id: receiver_id
      }
    });
  }

  /* deleteConversation(receiver_id: string) {
    return axios.delete(API_URL + 'delete', {
      headers: authHeader(),
      data: {
        user_id: authService.getCurrentUser()?.id ?? null,
        receiver_id: receiver_id
      }
    });
  } */
}

export default new MessageService();
