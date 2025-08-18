export const API_BASE = (path) => `${localStorage.getItem("apiUrl") || "http://127.0.0.1:8000"}${path}`;

export async function api(path, opts={}){
  const res = await fetch(API_BASE(path), {
    headers: {"Content-Type":"application/json"},
    ...opts
  });
  const text = await res.text();
  try { return {ok: res.ok, status: res.status, data: text ? JSON.parse(text) : null}; }
  catch { return {ok: res.ok, status: res.status, data: text}; }
}

export function navHtml(active){
  return `
  <header class="header">
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;">
      <h1 class="text-2xl" style="font-weight:800">🥋 Dojo Scheduler</h1>
      <nav class="nav" style="display:flex;gap:.35rem;">
        <a href="index.html" ${active==="home"?"style='background:rgba(255,255,255,.18)';":""}>Início</a>
        <a href="usuarios.html" ${active==="usuarios"?"style='background:rgba(255,255,255,.18)';":""}>Usuários</a>
        <a href="aulas.html" ${active==="aulas"?"style='background:rgba(255,255,255,.18)';":""}>Aulas</a>
        <a href="reservas.html" ${active==="reservas"?"style='background:rgba(255,255,255,.18)';":""}>Reservas</a>
      </nav>
    </div>
  </header>`;
}

export function footerHtml(){
  return `<footer class="footer"><div class="container" style="padding:1rem">Projeto acadêmico – ESII • MVC • Testes com Pytest</div></footer>`;
}

export function mountLayout(active){
  document.body.insertAdjacentHTML("afterbegin", navHtml(active));
  document.body.insertAdjacentHTML("beforeend", footerHtml());
}

export function toast(msg){ alert(msg); }
