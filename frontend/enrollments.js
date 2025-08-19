const API = localStorage.API || 'http://127.0.0.1:8000';
const table = document.getElementById('enroll-table');

async function load(){
  const res = await fetch(`${API}/enrollments/`);
  const data = await res.json();
  table.innerHTML = '<tr><th>ID</th><th>Aluno</th><th>Classe</th><th>Criado em</th></tr>' +
    data.map(e=>`<tr><td>${e.id}</td><td>${e.student_id}</td><td>${e.class_id}</td><td>${new Date(e.created_at).toLocaleString()}</td></tr>`).join('');
}

document.getElementById('enroll-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const res = await fetch(`${API}/enrollments/`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(Object.fromEntries(fd.entries()))
  });
  if (res.ok) { e.target.reset(); load(); } else { alert('Erro ao reservar (capacidade cheia ou duplicada)'); }
});

load();
