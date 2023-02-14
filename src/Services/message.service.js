import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service';

const API_URL = 'http://localhost:8080/api/message/';

class MessageService {

  getMessagesMenu() {
    return axios.get(API_URL + "menu", { headers: authHeader(), body: authService.getCurrentUser().id }); 
  }

  getMessagesDetails() {
    return axios.get(API_URL + "details", { headers: authHeader(), body: authService.getCurrentUser().id }); 
  }

  addMessage(message, receiver_id) {
    axios.post(API_URL + "add", { headers: authHeader(), body: {
      message: message,
      user_id: authService.getCurrentUser().id,
      receiver_id: receiver_id
    } });
  }

  deleteConversation(receiver_id) {
    axios.delete(API_URL + "delete", { headers: authHeader(), body: {
      user_id: authService.getCurrentUser().id,
      receiver_id: receiver_id
    } });
  }
}

export default new MessageService();


