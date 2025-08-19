const API = localStorage.API || 'http://127.0.0.1:8000';
const authStatus = document.getElementById('auth-status');

document.getElementById('register-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = Object.fromEntries(fd.entries());
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
  });
  authStatus.textContent = 'Registro: ' + res.status + '\n' + await res.text();
});

document.getElementById('login-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = {username: fd.get('email'), password: fd.get('password')};
  const res = await fetch(`${API}/auth/token`, {
    method: 'POST', headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: new URLSearchParams({...body, grant_type:''})
  });
  const data = await res.json();
  if (res.ok){
    localStorage.token = data.access_token;
    authStatus.textContent = 'Autenticado. Token salvo.';
  } else {
    authStatus.textContent = 'Falha no login: ' + res.status + '\n' + JSON.stringify(data);
  }
});
