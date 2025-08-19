
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import SessionLocal, Base, engine

client = TestClient(app)

def setup_module(module):
    # ensure tables exist; startup event seeds data
    Base.metadata.create_all(bind=engine)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_list_users_seeded():
    r = client.get("/api/users/")
    assert r.status_code == 200
    users = r.json()
    assert any(u["email"] == "kenji.t@example.com" for u in users)

def test_list_classes_seeded():
    r = client.get("/api/classes/")
    assert r.status_code == 200
    classes = r.json()
    assert any(c["name"] == "Karate Fundamentals" for c in classes)

def test_create_booking_and_capacity():
    # pick first user and class
    users = client.get("/api/users/").json()
    classes = client.get("/api/classes/").json()
    uid = users[0]["id"]
    cid = classes[0]["id"]
    r = client.post("/api/bookings/", json={"member_id": uid, "class_id": cid})
    assert r.status_code == 201

    # Fill class to capacity and ensure it rejects overflow
    # First get capacity
    cap = next(c for c in classes if c["id"] == cid)["capacity"]
    # We already booked 1; create (cap-1) bookings with other users if available,
    # otherwise create temp users.
    existing_user_ids = [u["id"] for u in users if u["id"] != uid]
    while len(existing_user_ids) < cap:
        new_user = {"name":"Temp User "+str(len(existing_user_ids)), "email":f"tmp{len(existing_user_ids)}@x.com"}
        # add phone optional
        new_user["phone"] = "000"
        resp = client.post("/api/users/", json=new_user)
        assert resp.status_code == 201
        existing_user_ids.append(resp.json()["id"])
    # Now create bookings up to capacity
    created = 1
    for u in existing_user_ids:
        if created >= cap:
            break
        resp = client.post("/api/bookings/", json={"member_id": u, "class_id": cid})
        assert resp.status_code == 201
        created += 1

    # Next one should fail with 400 (full)
    extra_user = client.post("/api/users/", json={"name":"Overflow","email":"overflow@example.com","phone":"000"}).json()
    r = client.post("/api/bookings/", json={"member_id": extra_user["id"], "class_id": cid})
    assert r.status_code == 400
