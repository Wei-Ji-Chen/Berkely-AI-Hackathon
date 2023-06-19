import base64
import json
from backend.main import app

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pytest
import os
from backend.data import DATA_DIR

from backend.utils.note_utils import save_note

import datetime

from backend.database import database

client = TestClient(app)

@pytest.mark.asyncio
async def test_init():
    with TestClient(app) as client:
        response = client.get("/v1/users")
        print(response.json())
        assert response.status_code == 200

@pytest.mark.asyncio
async def test_create_notes():
    await save_note("test note", 1)
    notes = await database.fetch_all(query="SELECT * FROM notes;")
    assert len(notes) >= 1
    await database.execute(query="DELETE FROM notes;")


@pytest.mark.asyncio
async def test_create_conversation():
    with TestClient(app) as client:
        response = client.post('/v1/conversation', json={"user_id": 1, "title": "test convo", "time": str(datetime.datetime.now())})
        assert response.status_code == 200
        conversations = await database.fetch_all(query="SELECT * FROM conversations;")
        assert len(conversations) >= 1

@pytest.mark.asyncio
async def test_response():
    with TestClient(app) as client:
        simple_audio_path = os.path.join(DATA_DIR, "test_30_sec.webm") 
        with open(simple_audio_path, "rb") as f:
            simple_audio = f.read()

        response = client.post('/v1/conversation', json={"user_id": 1, "title": "test convo", "time": str(datetime.datetime.now())})
        
        assert response.status_code == 200

        encoded = base64.b64encode(simple_audio)

        response = client.post('/v1/response', json={"user_id": 1, "text": "", "conversation_id": 1, "audio": encoded.decode("utf-8")})
        assert response.status_code == 200
        assert response.json() != ""

        notes = await database.fetch_all(query = 'SELECT * FROM notes;')
        assert len(notes) != 1

        conversation = await database.fetch_one(query = 'SELECT * FROM conversations WHERE conversations.id=1;')
        print(conversation)
        assert len(conversation['messages']) > 0

        # Do second part of conversation

        second_audio_path = os.path.join(DATA_DIR, "test_second_speech.webm") 
        with open(second_audio_path, "rb") as f:
            simple_audio = f.read()

        encoded = base64.b64encode(simple_audio)

        response = client.post('/v1/response', json={"user_id": 1, "text": "", "conversation_id": 1, "audio": encoded.decode("utf-8")})
        assert response.status_code == 200
        notes = await database.fetch_all(query = 'SELECT * FROM notes;')

        conversation = await database.fetch_one(query = 'SELECT * FROM conversations WHERE conversations.id=1;')
        breakpoint()
        print(conversation)
        assert len(conversation['messages']) > 0


        assert False
        # Try adding more onto this conversation



        

