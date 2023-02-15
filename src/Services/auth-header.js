export default function authHeaders() {

  const token = localStorage.getItem('token');

  return token ? 
  { 
    'Content-Type': 'application/json',
    "access_token": token
  }
  :
  {
    'Content-Type': 'application/json',
  }
}

