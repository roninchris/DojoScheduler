const API = localStorage.API || 'http://127.0.0.1:8000';
const table = document.getElementById('class-table');

async function load(){
  const res = await fetch(`${API}/classes/`);
  const data = await res.json();
  table.innerHTML = '<tr><th>ID</th><th>Nome</th><th>Capacidade</th><th>Descrição</th></tr>' +
    data.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.capacity}</td><td>${c.description||''}</td></tr>`).join('');
}

document.getElementById('class-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const res = await fetch(`${API}/classes/`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(Object.fromEntries(fd.entries()))
  });
  if (res.ok) { e.target.reset(); load(); } else { alert('Erro ao salvar'); }
});

load();
