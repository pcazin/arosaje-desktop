export default function authHeaders() {

  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    "access_token": token
  }
}

