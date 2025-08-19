const API = localStorage.API || 'http://127.0.0.1:8000';
const table = document.getElementById('student-table');

async function load(){
  const res = await fetch(`${API}/students/`);
  const data = await res.json();
  table.innerHTML = '<tr><th>ID</th><th>Nome</th><th>Email</th><th>Telefone</th></tr>' +
    data.map(s=>`<tr><td>${s.id}</td><td>${s.name}</td><td>${s.email||''}</td><td>${s.phone||''}</td></tr>`).join('');
}

document.getElementById('student-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const res = await fetch(`${API}/students/`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(Object.fromEntries(fd.entries()))
  });
  if (res.ok) { e.target.reset(); load(); } else { alert('Erro ao salvar'); }
});

load();
