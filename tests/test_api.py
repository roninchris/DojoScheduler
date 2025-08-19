
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import SessionLocal, Base, engine

# Cria um cliente de teste para a aplicação
client = TestClient(app)

def setup_module(module):
    # Garante que as tabelas existam; o evento de inicialização preenche os dados
    Base.metadata.create_all(bind=engine)

def test_health():
    # Testa a rota de verificação de saúde
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_list_users_seeded():
    # Testa se os usuários iniciais foram adicionados corretamente
    r = client.get("/api/users/")
    assert r.status_code == 200
    users = r.json()
    assert any(u["email"] == "kenji.t@example.com" for u in users)

def test_list_classes_seeded():
    # Testa se as aulas iniciais foram adicionadas corretamente
    r = client.get("/api/classes/")
    assert r.status_code == 200
    classes = r.json()
    assert any(c["name"] == "Karate Fundamentals" for c in classes)

def test_create_booking_and_capacity():
    # Testa a criação de reservas e o limite de capacidade das aulas

    # Seleciona o primeiro usuário e a primeira aula
    users = client.get("/api/users/").json()
    classes = client.get("/api/classes/").json()
    uid = users[0]["id"]
    cid = classes[0]["id"]

    # Cria uma reserva
    r = client.post("/api/bookings/", json={"member_id": uid, "class_id": cid})
    assert r.status_code == 201

    # Preenche a aula até a capacidade e garante que rejeite excesso
    # Primeiro, obtém a capacidade
    cap = next(c for c in classes if c["id"] == cid)["capacity"]

    # Já reservamos 1; cria (cap-1) reservas com outros usuários se disponíveis,
    # caso contrário, cria usuários temporários.
    existing_user_ids = [u["id"] for u in users if u["id"] != uid]
    while len(existing_user_ids) < cap:
        new_user = {"name":"Temp User "+str(len(existing_user_ids)), "email":f"tmp{len(existing_user_ids)}@x.com", "phone": "000"}
        resp = client.post("/api/users/", json=new_user)
        assert resp.status_code == 201
        existing_user_ids.append(resp.json()["id"])

    # Agora cria reservas até atingir a capacidade
    created = 1
    for u in existing_user_ids:
        if created >= cap:
            break
        resp = client.post("/api/bookings/", json={"member_id": u, "class_id": cid})
        assert resp.status_code == 201
        created += 1

    # A próxima reserva deve falhar com 400 (aula cheia)
    extra_user = client.post("/api/users/", json={"name":"Overflow","email":"overflow@example.com","phone":"000"}).json()
    r = client.post("/api/bookings/", json={"member_id": extra_user["id"], "class_id": cid})
    assert r.status_code == 400
