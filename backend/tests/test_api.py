import os
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from fastapi.testclient import TestClient
from app.main import app
from app.database import init_db

init_db()
client = TestClient(app)

def test_health():
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_crud_flow():
    u = client.post("/usuarios", json={"nome": "Teste Um", "email": "teste1@example.com"})
    assert u.status_code == 201
    usuario_id = u.json()["id"]

    a = client.post("/aulas", json={
        "titulo": "Jiu-Jitsu Iniciante",
        "descricao": "No-gi básico",
        "data_hora": "2030-01-01T10:00:00",
        "capacidade": 2,
        "instrutor": "Sensei A"
    })
    assert a.status_code == 201
    aula_id = a.json()["id"]

    r1 = client.post("/reservas", json={"usuario_id": usuario_id, "aula_id": aula_id})
    assert r1.status_code == 201

    rdup = client.post("/reservas", json={"usuario_id": usuario_id, "aula_id": aula_id})
    assert rdup.status_code == 400

    u2 = client.post("/usuarios", json={"nome": "Dois", "email": "teste2@example.com"}).json()
    r2 = client.post("/reservas", json={"usuario_id": u2["id"], "aula_id": aula_id})
    assert r2.status_code == 201
    u3 = client.post("/usuarios", json={"nome": "Tres", "email": "teste3@example.com"}).json()
    r3 = client.post("/reservas", json={"usuario_id": u3["id"], "aula_id": aula_id})
    assert r3.status_code == 400
